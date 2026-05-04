"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppShell({ children }) {
  return (
    <div className="relative min-h-screen">
      {/* Background layers */}
      <div className="fixed inset-0 bg-gradient-animated -z-20" />
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
