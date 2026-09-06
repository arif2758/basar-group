"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Users,
  BookOpen,
  Heart,
  Home,
  Utensils,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";

const ImpactStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    people: 0,
    students: 0,
    families: 0,
    meals: 0,
    patients: 0,
    homes: 0,
  });

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // useMemo for stable numbers
  const finalCounts = useMemo(
    () => ({
      people: 45000,
      students: 12500,
      families: 8300,
      meals: 125000,
      patients: 15400,
      homes: 620,
    }),
    []
  );

  // Animate counters with useCallback
  const animateCounters = useCallback(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic

      setCounts({
        people: Math.floor(finalCounts.people * easedProgress),
        students: Math.floor(finalCounts.students * easedProgress),
        families: Math.floor(finalCounts.families * easedProgress),
        meals: Math.floor(finalCounts.meals * easedProgress),
        patients: Math.floor(finalCounts.patients * easedProgress),
        homes: Math.floor(finalCounts.homes * easedProgress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(finalCounts);
      }
    }, stepDuration);
  }, [finalCounts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, animateCounters]);

  const stats = [
    {
      icon: Users,
      count: counts.people,
      label: "জীবনযাত্রার রূপান্তর",
      color: "from-emerald-400 to-emerald-600",
      description: "আমাদের মানবিক উদ্যোগের মাধ্যমে প্রত্যক্ষ সুবিধাভোগী মানুষ",
    },
    {
      icon: BookOpen,
      count: counts.students,
      label: "শিক্ষার্থী সহায়তা",
      color: "from-sky-400 to-sky-600",
      description: "শিক্ষা উপকরণ ও বৃত্তিপ্রাপ্ত সুবিধাবঞ্চিত শিশু ও শিক্ষার্থী",
    },
    {
      icon: Heart,
      count: counts.families,
      label: "পরিবার পুনর্বাসন",
      color: "from-pink-400 to-pink-600",
      description: "জরুরি সহায়তা ও টেকসই পুনর্বাসন পাওয়া দুস্থ পরিবার",
    },
    {
      icon: Utensils,
      count: counts.meals,
      label: "খাদ্য সহায়তা বিতরণ",
      color: "from-amber-400 to-amber-600",
      description: "রমজান ও দুর্যোগকালীন সময়ে পুষ্টিকর খাদ্য প্যাকেজ বিতরণ",
    },
    {
      icon: Stethoscope,
      count: counts.patients,
      label: "বিনামূল্যে স্বাস্থ্যসেবা",
      color: "from-red-400 to-red-600",
      description: "ফ্রি মেডিকেল ক্যাম্প ও স্বাস্থ্য কর্মসূচির মাধ্যমে চিকিৎসাপ্রাপ্ত রোগী",
    },
    {
      icon: Home,
      count: counts.homes,
      label: "বাসস্থান ও আশ্রয় সহায়তা",
      color: "from-purple-400 to-purple-600",
      description: "গৃহহীন ও নদীভাঙন কবলিত পরিবারের জন্য নিরাপদ আবাসন নির্মাণ",
    },
  ];

  return (
    <section 
      id="impact" 
      ref={sectionRef} 
      className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            পরিসংখ্যানে আমাদের সামাজিক প্রভাব
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            আপনার প্রতিটি অনুদান মানবিক পরিবর্তনের সূচনা করে। জেনে নিন কীভাবে আপনার সহযোগিতা সাধারণ মানুষের জীবন বদলে দিচ্ছে।
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#141414] rounded-2xl p-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 dark:border-[#303030]"
              >
                <div
                  className={`bg-gradient-to-r ${stat.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 mx-auto shadow-sm`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                    {stat.count.toLocaleString()}+
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-[#141414] rounded-2xl p-8 max-w-4xl mx-auto border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              আমাদের উন্নয়ন অভিযাত্রার অংশীদার হোন
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              হাজারো সহমর্মী মানুষের সাথে যুক্ত হয়ে আর্তমানবতার সেবায় এগিয়ে আসুন। আপনার ক্ষুদ্রতম অবদানও সমাজে স্থায়ী ইতিবাচক প্রভাব ফেলতে পারে।
            </p>
            <Link 
              href="#contact"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl text-base font-medium transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98]"
            >
              আজই সহযোগিতার হাত বাড়ান
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
