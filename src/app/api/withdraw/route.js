import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY
const TOKEN_CONTRACT_ADDRESS = '0xaA1aD1B852c0b59B4608A8B3e16B73518CDDB813' // OKAI on BSC
const BSC_RPC_URL = 'https://bsc-dataseed1.binance.org'
const TOKEN_SYMBOL = 'OKAIP'
const TOKEN_DECIMALS = 18
const TRANSFER_FUNCTION_SIGNATURE = '0xa9059cbb'

// Nonce replay protection (cleared every 10 minutes)
const processedNonces = new Set()
setInterval(() => processedNonces.clear(), 600000)

// ── RPC helper ─────────────────────────────────────────────────────────────────
async function directRPCCall(method, params = []) {
  const res = await fetch(BSC_RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method, params, id: Date.now() }),
  })
  const data = await res.json()
  if (data.error) throw new Error(`RPC error: ${data.error.message}`)
  return data.result
}

// ── BEP-20 transfer data encoder ───────────────────────────────────────────────
function createTransferData(recipientAddress, tokenAmountWei) {
  const paddedAddress = recipientAddress.replace('0x', '').toLowerCase().padStart(64, '0')
  const paddedAmount = BigInt(tokenAmountWei).toString(16).padStart(64, '0')
  return TRANSFER_FUNCTION_SIGNATURE + paddedAddress + paddedAmount
}

// ── POST — Execute OKAI Withdrawal ─────────────────────────────────────────────
export async function POST(request) {
  const startTime = Date.now()
  console.log('\n[OKAIP Withdrawal] Request at:', new Date().toISOString())

  try {
    if (!ADMIN_PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'Server config: ADMIN_PRIVATE_KEY not set' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { address, message, signature, nonce, expiry, amount } = body

    // ── Validation ─────────────────────────────────────────────────────
    if (!address || !message || !signature || !nonce || !expiry || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const withdrawAmount = parseFloat(amount)
    if (isNaN(withdrawAmount) || withdrawAmount < 10) {
      return NextResponse.json({ error: 'Minimum withdrawal is 10 OKAIP' }, { status: 400 })
    }
    if (withdrawAmount > 10000) {
      return NextResponse.json(
        { error: 'Maximum withdrawal is 10,000 OKAIP per transaction' },
        { status: 400 }
      )
    }

    const ethers = await import('ethers')
    const ethersLib = ethers.default || ethers

    if (!ethersLib.isAddress(address)) {
      return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 })
    }

    const adminWallet = new ethersLib.Wallet(ADMIN_PRIVATE_KEY)

    if (address.toLowerCase() === adminWallet.address.toLowerCase()) {
      return NextResponse.json({ error: 'Cannot withdraw to admin wallet' }, { status: 400 })
    }

    // ── Signature verification ─────────────────────────────────────────
    try {
      const recovered = ethersLib.verifyMessage(message, signature)
      if (recovered.toLowerCase() !== address.toLowerCase()) {
        return NextResponse.json({ error: 'Signature mismatch' }, { status: 401 })
      }
    } catch {
      return NextResponse.json({ error: 'Signature verification failed' }, { status: 401 })
    }

    // ── Expiry + nonce replay prevention ────────────────────────────────
    const now = Math.floor(Date.now() / 1000)
    if (now > parseInt(expiry)) {
      return NextResponse.json({ error: 'Request expired — try again' }, { status: 400 })
    }
    const nonceKey = `${address.toLowerCase()}_${nonce}`
    if (processedNonces.has(nonceKey)) {
      return NextResponse.json({ error: 'Duplicate request — nonce already used' }, { status: 409 })
    }
    processedNonces.add(nonceKey)

    // ── Check user's OKAI balance from Prisma ──────────────────────────
    const userReward = await prisma.userReward.findUnique({
      where: { walletAddress: address },
    })

    const availableBalance = userReward?.okaiBalance || 0

    if (availableBalance < withdrawAmount) {
      return NextResponse.json(
        {
          error: `Insufficient balance. Available: ${availableBalance} OKAIP, requested: ${withdrawAmount} OKAIP`,
        },
        { status: 400 }
      )
    }

    console.log(`[OKAIP Withdrawal] Sending ${withdrawAmount} OKAIP to ${address}`)

    // ── Build & send on-chain transaction ───────────────────────────────
    await directRPCCall('eth_blockNumber') // verify RPC connectivity

    const [adminNonce, gasPrice] = await Promise.all([
      directRPCCall('eth_getTransactionCount', [adminWallet.address, 'pending']),
      directRPCCall('eth_gasPrice'),
    ])

    const bufferedGasPrice = Math.floor(parseInt(gasPrice, 16) * 1.2)
    const tokenAmountWei = ethersLib.parseUnits(withdrawAmount.toString(), TOKEN_DECIMALS)
    const transactionData = createTransferData(address, tokenAmountWei.toString())

    const rawTx = {
      nonce: adminNonce,
      gasPrice: '0x' + bufferedGasPrice.toString(16),
      gasLimit: '0x186A0', // 100k gas
      to: TOKEN_CONTRACT_ADDRESS,
      value: '0x0',
      data: transactionData,
      chainId: 56, // BSC Mainnet
    }

    const signedTx = await adminWallet.signTransaction(rawTx)
    const txHash = await directRPCCall('eth_sendRawTransaction', [signedTx])
    console.log('[OKAIP Withdrawal] TX sent:', txHash)

    // ── Deduct balance from Prisma immediately ─────────────────────────
    await prisma.userReward.update({
      where: { walletAddress: address },
      data: { okaiBalance: { decrement: withdrawAmount } },
    })

    // ── Create withdrawal log ──────────────────────────────────────────
    const withdrawalLog = await prisma.withdrawalLog.create({
      data: {
        walletAddress: address.toLowerCase(),
        amount: withdrawAmount,
        txHash,
        status: 'pending',
      },
    })

    // ── Log in reward logs ─────────────────────────────────────────────
    await prisma.rewardLog.create({
      data: {
        walletAddress: address,
        action: 'withdrawal',
        amount: -withdrawAmount,
        referenceId: txHash,
      },
    })

    // ── Wait for confirmation (max 30s) ────────────────────────────────
    let receipt = null
    for (let i = 0; i < 30 && !receipt; i++) {
      try {
        receipt = await directRPCCall('eth_getTransactionReceipt', [txHash])
      } catch {
        /* retry */
      }
      if (!receipt) await new Promise((r) => setTimeout(r, 1000))
    }

    const processingTime = Date.now() - startTime

    if (!receipt) {
      // TX submitted but not yet confirmed
      return NextResponse.json({
        success: true,
        txHash,
        amount: withdrawAmount,
        symbol: TOKEN_SYMBOL,
        status: 'pending',
        explorer: `https://bscscan.com/tx/${txHash}`,
        message: 'Transaction submitted — confirmation pending on-chain',
      })
    }

    if (parseInt(receipt.status, 16) !== 1) {
      // TX reverted — refund balance
      await prisma.userReward.update({
        where: { walletAddress: address },
        data: { okaiBalance: { increment: withdrawAmount } },
      })
      await prisma.withdrawalLog.update({
        where: { id: withdrawalLog.id },
        data: { status: 'failed', processingMs: processingTime },
      })

      return NextResponse.json(
        {
          error: 'Transaction reverted on-chain',
          txHash,
          explorer: `https://bscscan.com/tx/${txHash}`,
        },
        { status: 500 }
      )
    }

    // ── Success — update withdrawal log ────────────────────────────────
    await prisma.withdrawalLog.update({
      where: { id: withdrawalLog.id },
      data: {
        status: 'confirmed',
        blockNumber: parseInt(receipt.blockNumber, 16),
        gasUsed: parseInt(receipt.gasUsed, 16),
        processingMs: processingTime,
      },
    })

    console.log(
      `[OKAIP Withdrawal] SUCCESS: ${withdrawAmount} OKAIP to ${address} (${processingTime}ms)`
    )

    return NextResponse.json({
      success: true,
      txHash,
      blockNumber: parseInt(receipt.blockNumber, 16),
      gasUsed: parseInt(receipt.gasUsed, 16),
      amount: withdrawAmount,
      symbol: TOKEN_SYMBOL,
      recipient: address,
      processingTime,
      explorer: `https://bscscan.com/tx/${txHash}`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[OKAIP Withdrawal] Error:', error)
    return NextResponse.json(
      { error: 'Transaction failed: ' + error.message },
      { status: 500 }
    )
  }
}

// ── GET — Balance check / health ───────────────────────────────────────────────
export async function GET(request) {
  const url = new URL(request.url)
  const wallet = url.searchParams.get('wallet')

  // If wallet provided → return withdrawal balance info
  if (wallet) {
    try {
      const userReward = await prisma.userReward.findUnique({
        where: { walletAddress: wallet },
      })

      const withdrawals = await prisma.withdrawalLog.findMany({
        where: { walletAddress: wallet.toLowerCase() },
        orderBy: { createdAt: 'desc' },
        take: 10,
      })

      const totalWithdrawn = await prisma.withdrawalLog.aggregate({
        where: {
          walletAddress: wallet.toLowerCase(),
          status: { in: ['confirmed', 'pending'] },
        },
        _sum: { amount: true },
      })

      return NextResponse.json({
        wallet: wallet.toLowerCase(),
        totalEarned: userReward?.totalEarned || 0,
        available: userReward?.okaiBalance || 0,
        totalWithdrawn: totalWithdrawn._sum.amount || 0,
        symbol: TOKEN_SYMBOL,
        contract: TOKEN_CONTRACT_ADDRESS,
        recentWithdrawals: withdrawals,
      })
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  // Health check
  try {
    const blockNumber = await directRPCCall('eth_blockNumber')
    return NextResponse.json({
      status: 'healthy',
      system: 'Orkestri AI — OKAI Withdrawal Gateway',
      network: 'BSC Mainnet',
      chainId: 56,
      blockNumber: parseInt(blockNumber, 16),
      tokenContract: TOKEN_CONTRACT_ADDRESS,
      tokenSymbol: TOKEN_SYMBOL,
      adminConfigured: !!ADMIN_PRIVATE_KEY,
    })
  } catch (error) {
    return NextResponse.json({ status: 'unhealthy', error: error.message }, { status: 503 })
  }
}
