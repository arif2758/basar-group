"use client";
// src/components/ImpactCounters.tsx

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
    <span className="font-bold text-3xl sm:text-4xl lg:text-5xl text-blue-600 dark:text-blue-400">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function ImpactCounters() {
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
      icon: <FaUserGraduate size={36} className="text-blue-600 dark:text-blue-400" />,
    },
    { id: "books", icon: <FaBook size={36} className="text-emerald-600 dark:text-emerald-400" /> },
    { id: "jobs", icon: <FaBriefcase size={36} className="text-indigo-600 dark:text-indigo-400" /> },
    { id: "meals", icon: <FaUtensils size={36} className="text-amber-600 dark:text-amber-400" /> },
    {
      id: "mentor",
      icon: <FaChalkboardTeacher size={36} className="text-purple-600 dark:text-purple-400" />,
    },
  ];

  return (
    <section className="relative py-20 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            আমাদের প্রভাব
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            সংখ্যায় দেখুন আমরা কতটা পরিবর্তন এনেছি আমাদের কমিউনিটিতে
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
        >
          {impactCounters.map((counter, index) => (
            <div
              key={counter.id}
              className="bg-slate-50 dark:bg-[#141414] rounded-xl text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5 p-6 border border-slate-200 dark:border-[#303030] group"
            >
              <div className="flex justify-center mb-4 transition-transform duration-200 group-hover:scale-110">
                {icons[index].icon}
              </div>
              <Counter
                target={counter.value}
                suffix={counter.suffix}
                isVisible={isVisible}
              />
              <p className="text-slate-700 dark:text-slate-300 font-medium text-sm mt-3">
                {counter.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
