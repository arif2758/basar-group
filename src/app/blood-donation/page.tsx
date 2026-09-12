import React from "react";
import BloodHero from "./bloodComponents/BloodHero";
import BloodQuickNavHub from "./bloodComponents/BloodQuickNavHub";
import BloodDonorFinder from "./bloodComponents/BloodDonorFinder";
import LiveBloodRequestsFeed from "./bloodComponents/LiveBloodRequestsFeed";
import BloodCompatibilityGuide from "./bloodComponents/BloodCompatibilityGuide";

export const metadata = {
  title: "বাছার রক্তদান নেটওয়ার্ক | বাছার গ্রুপ (BASAR Group)",
  description: "সারা বাংলাদেশের ৬৪ জেলার রক্তদাতা ও মুমূর্ষু রোগীর মাঝে সেতুবন্ধন। ১ ক্লিকে রক্তদাতা খুঁজুন ও জরুরি রক্তের অনুরোধ পোস্ট করুন।",
};

export default function BloodDonationHomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section with Quick Filter & SOS CTA */}
      <BloodHero />

      {/* 6 Quick Nav Hub Cards */}
      <BloodQuickNavHub />

      {/* Live Emergency Blood Requests Feed */}
      <div className="space-y-6">
        <LiveBloodRequestsFeed />
      </div>

      {/* Donor Finder Engine */}
      <div className="space-y-6">
        <BloodDonorFinder />
      </div>

      {/* Compatibility & Health Guide */}
      <div className="space-y-6">
        <BloodCompatibilityGuide />
      </div>
    </div>
  );
}
