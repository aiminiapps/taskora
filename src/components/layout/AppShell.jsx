"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppShell({ children }) {
  return (
    <div className="relative min-h-screen">
      {/* Deep ambient background */}
      <div className="fixed inset-0 -z-30 bg-[#07080F]" />

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
