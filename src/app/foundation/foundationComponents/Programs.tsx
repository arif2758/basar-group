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
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    title: "Education Aid Programs",
    icon: BookOpen,
    color: "from-blue-500 to-blue-700",
    description:
      "Empowering children through quality education and learning resources",
    initiatives: [
      {
        name: "School Supply Distribution",
        description: "Books, notebooks, pens, and essential learning materials",
        impact: "12,500 students equipped",
        image:
          "https://images.pexels.com/photos/8613082/pexels-photo-8613082.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "Study Table & Chair Program",
        description: "Proper furniture for home study environments",
        impact: "3,200 families benefited",
        image:
          "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "Solar Study Lights",
        description: "Rechargeable LED lights for evening studies",
        impact: "8,500 students supported",
        image:
          "https://images.pexels.com/photos/8923859/pexels-photo-8923859.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
    ],
  },
  farming: {
    title: "Farmer Support Programs",
    icon: Sprout,
    color: "from-green-500 to-green-700",
    description:
      "Supporting agricultural communities with modern farming techniques",
    initiatives: [
      {
        name: "Improved Seed Distribution",
        description: "High-yield, climate-resistant crop varieties",
        impact: "2,800 farmers benefited",
        image:
          "https://images.pexels.com/photos/4960464/pexels-photo-4960464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "Agricultural Training",
        description: "Modern farming techniques and sustainable practices",
        impact: "1,500 farmers trained",
        image:
          "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "Farming Tools & Equipment",
        description: "Essential tools and small machinery for efficiency",
        impact: "900 farming families equipped",
        image:
          "https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
    ],
  },
  seasonal: {
    title: "Seasonal Support Programs",
    icon: Gift,
    color: "from-amber-500 to-amber-700",
    description:
      "Special assistance during religious festivals and harsh seasons",
    initiatives: [
      {
        name: "Ramadan Food Packages",
        description: "Complete iftar meals and groceries for families",
        impact: "25,000 families fed",
        image:
          "https://images.pexels.com/photos/6646944/pexels-photo-6646944.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "Winter Clothing Drive",
        description: "Warm clothes, blankets, and winter essentials",
        impact: "8,500 people warmed",
        image:
          "https://images.pexels.com/photos/6647004/pexels-photo-6647004.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "Eid Shopping Support",
        description: "New clothes and gifts for children during Eid",
        impact: "15,000 children celebrated",
        image:
          "https://images.pexels.com/photos/6647028/pexels-photo-6647028.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
    ],
  },
  emergency: {
    title: "Emergency Aid Programs",
    icon: AlertTriangle,
    color: "from-red-500 to-red-700",
    description:
      "Rapid response to natural disasters and urgent community needs",
    initiatives: [
      {
        name: "Disaster Relief Operations",
        description: "Immediate aid during floods, earthquakes, and disasters",
        impact: "12,000 families assisted",
        image:
          "https://images.pexels.com/photos/6646929/pexels-photo-6646929.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "Clean Water Projects",
        description: "Water purification systems and well drilling",
        impact: "45 communities served",
        image:
          "https://images.pexels.com/photos/6256304/pexels-photo-6256304.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
      {
        name: "Medical Emergency Fund",
        description: "Critical healthcare support for urgent medical needs",
        impact: "3,200 patients treated",
        image:
          "https://images.pexels.com/photos/6303615/pexels-photo-6303615.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      },
    ],
  },
};

const tabs: { key: ProgramKey; label: string; icon: LucideIcon }[] = [
  { key: "education", label: "Education", icon: BookOpen },
  { key: "farming", label: "Farming", icon: Sprout },
  { key: "seasonal", label: "Seasonal", icon: Gift },
  { key: "emergency", label: "Emergency", icon: AlertTriangle },
];

const Programs = () => {
  const [activeTab, setActiveTab] = useState<ProgramKey>("education");
  const containerRef = useRef(null);

  const activeProgram = programs[activeTab];
  const ActiveIcon = activeProgram.icon;

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
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="programs-header text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Our Impact Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive initiatives addressing the most pressing needs of
            underserved communities
          </p>
        </div>

        {/* Tabs */}
        <div className="programs-tabs flex flex-wrap justify-center mb-12">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full m-2 transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 hover:text-emerald-600"
                }`}
              >
                <TabIcon className="w-5 h-5" />
                <span className="font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Program */}
        <div className="max-w-6xl mx-auto">
          <div className="program-header text-center mb-12">
            <div
              className={`bg-gradient-to-r ${activeProgram.color} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6`}
            >
              <ActiveIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              {activeProgram.title}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {activeProgram.description}
            </p>
          </div>

          {/* Initiatives */}
          <div className="grid lg:grid-cols-3 gap-8">
            {activeProgram.initiatives.map((initiative, index) => (
              <div
                key={index}
                className="initiative-card bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="h-48 relative">
                  <Image
                    src={initiative.image}
                    alt={initiative.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    {initiative.name}
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {initiative.description}
                  </p>
                  <div
                    className={`bg-gradient-to-r ${activeProgram.color} text-white px-4 py-2 rounded-full text-sm font-semibold inline-block`}
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
          <div className="bg-gradient-to-r from-emerald-50 to-sky-50 rounded-3xl p-8 border border-emerald-100">
            <div className="text-center mb-8">
              <Calendar className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Upcoming Projects - 2024
              </h3>
              <p className="text-lg text-gray-600">
                Exciting new initiatives launching soon to expand our impact
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="upcoming-card bg-white rounded-2xl p-6 shadow-lg">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Mobile Learning Labs
                </h4>
                <p className="text-gray-600 text-sm">
                  Technology-equipped vehicles bringing digital education to
                  remote areas
                </p>
                <div className="text-blue-600 font-semibold mt-2">
                  Q2 2024 Launch
                </div>
              </div>

              <div className="upcoming-card bg-white rounded-2xl p-6 shadow-lg">
                <div className="bg-gradient-to-r from-green-500 to-green-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Women Empowerment Centers
                </h4>
                <p className="text-gray-600 text-sm">
                  Skill development and microfinance programs for women
                  entrepreneurs
                </p>
                <div className="text-green-600 font-semibold mt-2">
                  Q3 2024 Launch
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="bg-gradient-to-r from-amber-500 to-amber-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Sustainable Farming Hub
                </h4>
                <p className="text-gray-600 text-sm">
                  Comprehensive agricultural support center with modern
                  techniques
                </p>
                <div className="text-amber-600 font-semibold mt-2">
                  Q4 2024 Launch
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
