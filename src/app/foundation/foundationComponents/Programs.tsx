"use client";

import { useState, useRef } from "react";
import {
  BookOpen,
  Sprout,
  Gift,
  AlertTriangle,
  Calendar,
  Users,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

// টাইপ ডেফিনিশন
interface Initiative {
  name: string;
  description: string;
  impact: string;
  image: string;
}

interface Program {
  title: string;
  icon: LucideIcon;
  color: string;
  description: string;
  initiatives: Initiative[];
}

type ProgramKey = "education" | "farming" | "seasonal" | "emergency";

const programs: Record<ProgramKey, Program> = {
  education: {
    title: "শিক্ষা সহায়তা কর্মসূচি (Education Aid)",
    icon: BookOpen,
    color: "from-blue-500 to-blue-700",
    description:
      "মানসম্মত শিক্ষা উপকরণ ও আধুনিক লার্নিং সুবিধার মাধ্যমে সুবিধাবঞ্চিত শিশুদের মেধা বিকাশ ও ভবিষ্যৎ ক্ষমতায়ন",
    initiatives: [
      {
        name: "স্কুল ব্যাগ ও শিক্ষা উপকরণ বিতরণ",
        description: "বই, খাতা, জ্যামিতি বক্স, কলম ও প্রয়োজনীয় শিক্ষা সহায়ক সামগ্রী প্রদান",
        impact: "12,500 শিক্ষার্থী উপকৃত",
        image:
          "https://images.pexels.com/photos/8613082/pexels-photo-8613082.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "পড়ার টেবিল ও চেয়ার সহায়তা",
        description: "শিশুদের পড়াশোনার উপযোগী ঘরোয়া পরিবেশ গড়ে তোলার জন্য টেকসই ফার্নিচার",
        impact: "3,200 পরিবার উপকৃত",
        image:
          "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "সোলার স্টাডি ল্যাম্প বিতরণ",
        description: "বিদ্যুৎহীন চরাঞ্চলে সন্ধ্যায় পড়াশোনার জন্য রিচার্জেবল সোলার ল্যাম্প",
        impact: "8,500 শিক্ষার্থী উপকৃত",
        image:
          "https://images.pexels.com/photos/8923859/pexels-photo-8923859.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
    ],
  },
  farming: {
    title: "কৃষি ও কৃষক উন্নয়ন কর্মসূচি (Farmer Support)",
    icon: Sprout,
    color: "from-green-500 to-green-700",
    description:
      "আধুনিক কৃষি প্রযুক্তি, উচ্চফলনশীল বীজ ও টেকসই পদ্ধতির মাধ্যমে প্রান্তিক কৃষকদের জীবিকা সুরক্ষা",
    initiatives: [
      {
        name: "উন্নত ও উচ্চফলনশীল বীজ বিতরণ",
        description: "জলবায়ু সহনশীল ও অধিক ফলনশীল জাতের বিভিন্ন ফসলের বীজ প্রদান",
        impact: "2,800 কৃষক উপকৃত",
        image:
          "https://images.pexels.com/photos/4960464/pexels-photo-4960464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "ব্যবহারিক কৃষি প্রশিক্ষণ",
        description: "আধুনিক চাষাবাদ, জৈব সার প্রস্তুত ও টেকসই কৃষিপদ্ধতি শেখানো",
        impact: "1,500 কৃষক প্রশিক্ষিত",
        image:
          "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "কৃষি যন্ত্রপাতি ও সরঞ্জাম সহায়তা",
        description: "কৃষিকাজ সহজ ও সাশ্রয়ী করতে প্রয়োজনীয় ছোট যন্ত্রপাতি বিতরণ",
        impact: "900 কৃষক পরিবার উপকৃত",
        image:
          "https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
    ],
  },
  seasonal: {
    title: "মৌসুমি ও ধর্মীয় উৎসব সহায়তা (Seasonal Support)",
    icon: Gift,
    color: "from-amber-500 to-amber-700",
    description:
      "পবিত্র রমজান, ঈদ ও শীতকালে দরিদ্র ও অসহায় পরিবারের মুখে হাসি ফোটাতে বিশেষ মানবিক উপহার",
    initiatives: [
      {
        name: "রমজান ফুড প্যাকেজ বিতরণ",
        description: "মাসব্যাপী পুষ্টিকর ইফতার ও নিত্যপ্রয়োজনীয় খাদ্যসামগ্রী বিতরণ",
        impact: "25,000 পরিবার উপকৃত",
        image:
          "https://images.pexels.com/photos/6646944/pexels-photo-6646944.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "শীতবস্ত্র ও কম্বল বিতরণ কর্মসূচি",
        description: "কঠোর শীতে শীতার্ত মানুষের সুরক্ষায় উষ্ণ পোশাক ও লেপ-কম্বল প্রদান",
        impact: "8,500 শীতার্ত উপকৃত",
        image:
          "https://images.pexels.com/photos/6647004/pexels-photo-6647004.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "ঈদ উপহার ও নতুন পোশাক",
        description: "সুবিধাবঞ্চিত শিশুদের জন্য ঈদের আনন্দ ছড়িয়ে দিতে নতুন জামা ও উপহার সামগ্রী",
        impact: "15,000 শিশুর মুখে হাসি",
        image:
          "https://images.pexels.com/photos/6647028/pexels-photo-6647028.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
    ],
  },
  emergency: {
    title: "জরুরি দুর্যোগ ও স্বাস্থ্য ত্রাণ (Emergency Aid)",
    icon: AlertTriangle,
    color: "from-red-500 to-red-700",
    description:
      "বন্যা, অগ্নিকাণ্ড ও আকস্মিক দুর্যোগে দ্রুত সাড়াদান এবং তাৎক্ষণিক খাদ্য, পানি ও চিকিৎসাসেবা",
    initiatives: [
      {
        name: "দুর্যোগকালীন জরুরি ত্রাণ কার্যক্রম",
        description: "বন্যা ও প্রাকৃতিক দুর্যোগে পানিবন্দি মানুষদের শুকনো খাবার ও জীবনরক্ষা সামগ্রী",
        impact: "12,000 পরিবার উপকৃত",
        image:
          "https://images.pexels.com/photos/6646929/pexels-photo-6646929.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "নিরাপদ সুপেয় পানি প্রকল্প",
        description: "গভীর নলকূপ স্থাপন ও আর্সেনিকমুক্ত ওয়াটার ফিল্টারিং ব্যবস্থা স্থাপন",
        impact: "45টি গ্রাম উপকৃত",
        image:
          "https://images.pexels.com/photos/6256304/pexels-photo-6256304.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "জরুরি চিকিৎসা সহায়তা তহবিল",
        description: "দরিদ্র ও জটিল রোগীদের জরুরি অপারেশন ও ওষুধ সহায়তা প্রদান",
        impact: "3,200 রোগী উপকৃত",
        image:
          "https://images.pexels.com/photos/6303615/pexels-photo-6303615.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
    ],
  },
};

const tabs: { key: ProgramKey; label: string; icon: LucideIcon }[] = [
  { key: "education", label: "শিক্ষা সহায়তা", icon: BookOpen },
  { key: "farming", label: "কৃষি ও কৃষক উন্নয়ন", icon: Sprout },
  { key: "seasonal", label: "মৌসুমি সহায়তা", icon: Gift },
  { key: "emergency", label: "জরুরি ত্রাণ", icon: AlertTriangle },
];

const Programs = () => {
  const [activeTab, setActiveTab] = useState<ProgramKey>("education");
  const containerRef = useRef(null);

  const activeProgram = programs[activeTab];
  const ActiveIcon = activeProgram.icon;

  useScrollAnimation();
  useGSAP(() => {
    // Header animation
    gsap.from(".programs-header", {
      scrollTrigger: {
        trigger: ".programs-header",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Tabs animation
    gsap.from(".programs-tabs", {
      scrollTrigger: {
        trigger: ".programs-tabs",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    // Program header animation
    gsap.from(".program-header", {
      scrollTrigger: {
        trigger: ".program-header",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    // Upcoming projects animation
    gsap.from(".upcoming-projects", {
      scrollTrigger: {
        trigger: ".upcoming-projects",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Upcoming project cards stagger
    gsap.from(".upcoming-card", {
      scrollTrigger: {
        trigger: ".upcoming-projects",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "sine.out",
    });

  }, { scope: containerRef, dependencies: [activeTab] });

  // Initiative cards animation when tab changes
  useScrollAnimation();
  useGSAP(() => {
    gsap.from(".initiative-card", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "sine.out",
    });
  }, [activeTab]);

  return (
    <section
      ref={containerRef}
      id="programs"
      className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200"
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="programs-header text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            আমাদের উন্নয়ন ও সহায়তা কর্মসূচিসমূহ
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            সুবিধাবঞ্চিত মানুষের মৌলিক চাহিদা পূরণ এবং টেকসই স্বাবলম্বিতা অর্জনে বহুমুখী মানবিক উদ্যোগ
          </p>
        </div>

        {/* Tabs */}
        <div className="programs-tabs flex flex-wrap justify-center mb-12 gap-2">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium border ${
                  activeTab === tab.key
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white dark:bg-[#141414] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Program */}
        <div className="max-w-6xl mx-auto">
          <div className="program-header text-center mb-12">
            <div
              className={`bg-gradient-to-r ${activeProgram.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm`}
            >
              <ActiveIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              {activeProgram.title}
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {activeProgram.description}
            </p>
          </div>

          {/* Initiatives */}
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {activeProgram.initiatives.map((initiative, index) => (
              <div
                key={index}
                className="initiative-card bg-white dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden group"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={initiative.image}
                    alt={initiative.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {initiative.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {initiative.description}
                  </p>
                  <div
                    className={`bg-gradient-to-r ${activeProgram.color} text-white px-3 py-1 rounded-full text-xs font-medium inline-block shadow-sm`}
                  >
                    {initiative.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

       {/* Upcoming Projects */}
        <div className="upcoming-projects mt-20">
          <div className="bg-slate-50 dark:bg-[#141414] rounded-2xl p-8 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
            <div className="text-center mb-8">
              <Calendar className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                আসন্ন উন্নয়ন প্রকল্পসমূহ - 2025
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-400">
                কমিউনিটি সেবার পরিধি আরও বিস্তৃত করতে নতুন ও যুগান্তকারী উদ্যোগ
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="upcoming-card bg-white dark:bg-[#1f1f1f] rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 w-11 h-11 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  ভ্রাম্যমাণ ডিজিটাল লার্নিং ল্যাব
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  দূরবর্তী প্রত্যন্ত অঞ্চলের শিশুদের কাছে আধুনিক প্রযুক্তিনির্ভর শিক্ষা পৌঁছে দিতে ভ্রাম্যমাণ বাস ল্যাব
                </p>
                <div className="text-blue-600 dark:text-blue-400 font-semibold text-xs mt-3">
                  Q2 2025 Launch
                </div>
              </div>

              <div className="upcoming-card bg-white dark:bg-[#1f1f1f] rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-700 w-11 h-11 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  নারী ক্ষমতায়ন কেন্দ্র
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  নারী উদ্যোক্তাদের জন্য ব্যবহারিক হস্তশিল্প প্রশিক্ষণ ও স্বাবলম্বী হওয়ার ক্ষুদ্র সহায়তা
                </p>
                <div className="text-green-600 dark:text-green-400 font-semibold text-xs mt-3">
                  Q3 2025 Launch
                </div>
              </div>

              <div className="upcoming-card bg-white dark:bg-[#1f1f1f] rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
                <div className="bg-gradient-to-r from-amber-500 to-amber-700 w-11 h-11 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Sprout className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  টেকসই কৃষিব্যবস্থা হাব (Sustainable Farming)
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  আধুনিক কৃষি প্রযুক্তি ও মাটির স্বাস্থ্য পরীক্ষা সমৃদ্ধ সমন্বিত কৃষক সহায়তা কেন্দ্র
                </p>
                <div className="text-amber-600 dark:text-amber-400 font-semibold text-xs mt-3">
                  Q4 2025 Launch
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
