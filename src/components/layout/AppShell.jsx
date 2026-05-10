"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppShell({ children }) {
  return (
    <div className="relative min-h-screen">
      {/* Deep ambient background */}
      <div className="fixed inset-0 -z-30 bg-[#07080F]" />
      
      {/* Subtle radial glow — purple top-left */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] -z-20 opacity-[0.07]"
        style={{ background: "radial-gradient(circle at 30% 20%, #8B5CF6 0%, transparent 60%)" }} 
      />
      
      {/* Subtle radial glow — cyan bottom-right */}
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] -z-20 opacity-[0.05]"
        style={{ background: "radial-gradient(circle at 70% 80%, #22D3EE 0%, transparent 60%)" }} 
      />

      {/* Dot pattern overlay */}
      <div className="fixed inset-0 dot-pattern -z-10" />

      {/* Top navbar */}
      <Navbar />

      {/* Main content */}
      <main className="pt-24 pb-8 min-h-screen">
        {children}
      </main>

      {/* Global Footer */}
      <Footer />
    </div> 
  );
}
