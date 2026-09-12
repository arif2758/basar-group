"use client";

import React from "react";
import Hero from "./Hero";
import QuickNavHub from "./QuickNavHub";
import AboutBasarFoundation from "./AboutBasarFoundation";
import ImpactStats from "./ImpactStats";
import Programs from "./Programs";
import BeneficiaryStories from "./BeneficiaryStories";
import PhotoGallery from "./PhotoGallery";
import Link from "next/link";
import { Heart, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";

function FoundationWrapperClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#141414] text-slate-900 dark:text-white transition-colors duration-200">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Quick Navigation Hub into Specialized Nested Pages */}
      <QuickNavHub />

      {/* 3. About Foundation & Core Mission */}
      <AboutBasarFoundation />

      {/* 4. Impact Statistics & Numbers */}
      <ImpactStats />

      {/* 5. Comprehensive Programs & Initiatives */}
      <Programs />

      {/* 6. Real Beneficiary Stories */}
      <BeneficiaryStories />

      {/* 7. Verified Photo Gallery */}
      <PhotoGallery />

      {/* 8. Call To Action Footer Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-[#1677ff] to-sky-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <div className="size-14 rounded-2xl bg-white/15 backdrop-blur-md text-white flex items-center justify-center mx-auto mb-5 shadow-lg">
            <Heart className="size-7 fill-current" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
            একটি উজ্জ্বল আগামীর জন্য আসুন হাত ধরি একসাথে
          </h2>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed mb-8">
            আপনার ছোট্ট একটি উদ্যোগ বদলে দিতে পারে কোনো শিশু, শিক্ষার্থী বা পরিবারের ভবিষ্যৎ।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/foundation/donate"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold bg-white text-[#1677ff] hover:bg-slate-50 transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Heart className="size-4 fill-current text-[#1677ff]" />
              <span>অনলাইনে অনুদান দিন</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/foundation/request-aid"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-bold bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <HelpCircle className="size-4" />
              <span>সহায়তার জন্য আবেদন করুন</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FoundationWrapperClient;
