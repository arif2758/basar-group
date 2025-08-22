"use client";

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
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  return (
    <main className="min-h-screen bg-white">
      <Hero language={language} />
      <Mission language={language} />
      <ImpactCounters language={language} />
      <DepartmentGrid language={language} />

      <Features language={language} />
      <SystemFlow />
      <ImpactSection />
      <DepartmentHighlights language={language} />
      <Testimonials language={language} />
      <Timeline language={language} />
      <DonorWall language={language} />
      <CommunityWall />
      <DonationSection />
      <VolunteerOpportunities />

      <Newsletter language={language} />
    </main>
  );
}
 