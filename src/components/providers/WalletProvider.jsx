"use client";

import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiAdapter, projectId, networks } from "@/lib/wallet";
import { useState } from "react";

const metadata = {
  name: "Orkestri AI",
  description: "Multi-Agent Crypto Analysis Arena",
  url: typeof window !== "undefined" ? window.location.origin : "https://orkestri.ai",
  icons: [],
};

// Initialize AppKit ONCE at module level (before any component renders)
let appKitInitialized = false;
if (projectId && !appKitInitialized) {
  createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks,
    defaultNetwork: networks[0],
    metadata,
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent": "#7c75ff",
      "--w3m-border-radius-master": "2px",
    },
    features: {
      analytics: false,
    },
  });
  appKitInitialized = true;
}

export default function WalletProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
