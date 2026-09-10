"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import ImpactCounters from "@/components/ImpactCounters";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Timeline from "@/components/Timeline";
import DonorWall from "@/components/DonorWall";
import Newsletter from "@/components/Newsletter";
import DepartmentGrid from "@/components/DepartmentGrid";
import DepartmentHighlights from "@/components/DepartmentHighlights";
import SystemFlow from "@/components/SystemFlow";
import ImpactSection from "@/components/ImpactSection";
import DonationSection from "@/components/DonationSection";
import VolunteerOpportunities from "@/components/VolunteerOpportunities";
import CommunityWall from "@/components/CommunityWall";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#070b14] transition-colors duration-300 overflow-x-hidden w-full">
      <Hero />
      <Mission />
      <ImpactCounters />
      <DepartmentGrid />
      <Features />
      <SystemFlow />
      <ImpactSection />
      <DepartmentHighlights /> 
      <Testimonials />
      <Timeline />
      <DonorWall />
      <CommunityWall />
      <DonationSection />
      <VolunteerOpportunities />
      <Newsletter />
    </main>
  );
}