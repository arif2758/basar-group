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

  // ✅ useMemo দিয়ে stable করে ফেললাম
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

  // ✅ Animate counters with useCallback
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
      label: "Lives Transformed",
      color: "from-emerald-400 to-emerald-600",
      description: "People directly impacted by our programs",
    },
    {
      icon: BookOpen,
      count: counts.students,
      label: "Students Supported",
      color: "from-sky-400 to-sky-600",
      description: "Children receiving educational assistance",
    },
    {
      icon: Heart,
      count: counts.families,
      label: "Families Helped",
      color: "from-pink-400 to-pink-600",
      description: "Families receiving ongoing support",
    },
    {
      icon: Utensils,
      count: counts.meals,
      label: "Meals Provided",
      color: "from-amber-400 to-amber-600",
      description: "Nutritious meals served to those in need",
    },
    {
      icon: Stethoscope,
      count: counts.patients,
      label: "Patients Treated",
      color: "from-red-400 to-red-600",
      description: "Medical care provided through our health programs",
    },
    {
      icon: Home,
      count: counts.homes,
      label: "Homes Built",
      color: "from-purple-400 to-purple-600",
      description: "Safe housing provided to vulnerable families",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every donation creates ripple effects of positive change.
            Here&asop;s how your generosity has transformed lives across
            communities worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`bg-gradient-to-r ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
                    {stat.count.toLocaleString()}+
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {stat.label}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            ); 
          })}
        </div> 

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="marble-gradient rounded-3xl p-8 max-w-4xl mx-auto border border-emerald-100">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Be Part of Our Growing Impact
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of compassionate donors who are making a difference
              every day. Your contribution, no matter the size, creates lasting
              change.
            </p>
            <button className="teal-slate-gradient text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Making Impact Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
