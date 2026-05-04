"use client";

import AppShell from "@/components/layout/AppShell";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesBentoSection from "@/components/landing/FeaturesBentoSection";
import MeetAgentsSection from "@/components/landing/MeetAgentsSection";
import BottomCTASection from "@/components/landing/BottomCTASection";

export default function Home() {
  return (
    <AppShell>
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <FeaturesBentoSection />
      <MeetAgentsSection />
      <BottomCTASection />
    </AppShell>
  );
}
