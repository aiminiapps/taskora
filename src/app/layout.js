import { Space_Grotesk, DM_Mono } from "next/font/google";
import WalletProvider from "@/components/providers/WalletProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.orkestri-ai.xyz"),
  title: {
    default: "Orkestri AI — Multi-Agent Crypto Intelligence Arena",
    template: "%s | Orkestri AI",
  },
  description:
    "Navigate the crypto landscape with real-time multi-agent consensus. Compare AI-powered crypto investment analyses from Research, Market, and Risk agents for smarter investment decisions.",
  keywords: [
    "Orkestri AI",
    "crypto",
    "AI agents",
    "crypto investment",
    "AI market analysis",
    "blockchain",
    "DeFi",
    "multi-agent consensus"
  ],
  authors: [{ name: "Orkestri AI", url: "https://www.orkestri-ai.xyz" }],
  creator: "Orkestri AI",
  icons: {
    icon: "/agent.png",
    shortcut: "/agent.png",
    apple: "/agent.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.orkestri-ai.xyz",
    siteName: "Orkestri AI",
    title: "Orkestri AI — Multi-Agent Crypto Intelligence Arena",
    description:
      "Navigate the crypto landscape with real-time multi-agent consensus from Research, Market, and Risk agents.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Orkestri AI — Multi-Agent Crypto Intelligence Arena",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orkestri AI — Multi-Agent Crypto Intelligence Arena",
    description:
      "Compare AI-powered crypto investment analyses from Research, Market, and Risk agents.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${dmMono.variable} dark`}
    >
      <head>
        {/* Organization Schema for Google Knowledge Panel & Official Links */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Orkestri AI",
              url: "https://www.orkestri-ai.xyz",
              logo: "https://www.orkestri-ai.xyz/agent.png",
              sameAs: [
                "https://orkestri-ai.gitbook.io/orkestri-ai-docs",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-animated">
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
