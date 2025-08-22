// src/components/ImpactCounters.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { impactCounters } from "@/lib/data";
import {
  FaUserGraduate,
  FaBook,
  FaBriefcase,
  FaUtensils,
  FaChalkboardTeacher,
} from "react-icons/fa";

interface CounterProps {
  target: number;
  suffix: string;
  isVisible: boolean;
}

function Counter({ target, suffix, isVisible }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target, isVisible]);

  return (
    <span className="font-bold text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-teal-300 via-emerald-300 to-sky-400 bg-clip-text text-transparent drop-shadow-lg">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
 
interface ImpactCountersProps {
  language: "bn" | "en";
}

export default function ImpactCounters({ language }: ImpactCountersProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const icons = [
    {
      id: "students",
      icon: <FaUserGraduate size={42} className="text-teal-300" />,
    },
    { id: "books", icon: <FaBook size={42} className="text-emerald-300" /> },
    { id: "jobs", icon: <FaBriefcase size={42} className="text-sky-300" /> },
    { id: "meals", icon: <FaUtensils size={42} className="text-yellow-300" /> },
    {
      id: "mentor",
      icon: <FaChalkboardTeacher size={42} className="text-pink-300" />,
    },
  ];

  return (
    <section className="relative py-20 teal-slate-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-white mb-4">
            {language === "bn" ? "আমাদের প্রভাব" : "Our Impact"}
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            {language === "bn"
              ? "সংখ্যায় দেখুন আমরা কতটা পরিবর্তন এনেছি আমাদের কমিউনিটিতে"
              : "See in numbers how much change we have brought to our community"}
          </p>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {impactCounters.map((counter, index) => (
            <div
              key={counter.id}
              className="bg-white/5 hover:bg-white/10 backdrop-blur-lg rounded-2xl text-center shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6 border border-white/10 group"
            >
              <div className="flex justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                {icons[index].icon}
              </div>
              <Counter
                target={counter.value}
                suffix={counter.suffix}
                isVisible={isVisible}
              />
              <p className="text-slate-200 font-medium mt-3">
                {language === "bn"
                  ? counter.label
                      .replace("Students Helped", "ছাত্রছাত্রী সাহায্য")
                      .replace("Books Donated", "বই দান")
                      .replace("Local Jobs Created", "স্থানীয় চাকরি সৃষ্টি")
                      .replace("Meals Served", "খাবার পরিবেশন")
                      .replace("Hours Mentored", "ঘন্টা পরামর্শ")
                  : counter.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
