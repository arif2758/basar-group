import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, Observer } from "@/utils/mockGsap";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

function SDG() {
  const containerRef = useRef<HTMLElement>(null);

  useScrollAnimation();
  useGSAP(() => {
    if (!containerRef.current) return;

    // Header animation
    gsap.fromTo(".header-animate", 
      {
        opacity: 0,
        y: 30 
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".header-animate",
          start: "top 80%",
          once: true
        }
      }
    );

    // SDG cards animation with stagger
    gsap.fromTo(".sdg-card", 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sdg-grid",
          start: "top 80%",
          once: true
        }
      }
    );

    // Card hover animations using GSAP Observer
    gsap.utils.toArray<HTMLElement>(".sdg-card").forEach(card => {
      Observer.create({
        target: card,
        type: "pointer",
        onHover: () => {
          gsap.to(card, { 
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            duration: 0.3, 
            ease: "power2.out" 
          });
        },
        onHoverEnd: () => {
          gsap.to(card, { 
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            duration: 0.3, 
            ease: "power2.out" 
          });
        }
      });
    });

  }, { scope: containerRef });

  const goals = [
    {
      number: "4",
      title: "গুণগত শিক্ষা (Quality Education)",
      description: "সকলের জন্য সহজলভ্য ও মানসম্পন্ন ব্যবহারিক আইটি শিক্ষা নিশ্চিতকরণ",
    },
    {
      number: "1",
      title: "দারিদ্র্য বিমোচন (No Poverty)",
      description: "প্রযুক্তি দক্ষতা অর্জনের মাধ্যমে বিকল্প ও সম্মানজনক উপার্জনের সুযোগ তৈরি",
    },
    {
      number: "8",
      title: "মর্যাদাপূর্ণ কাজ ও অর্থনৈতিক প্রবৃদ্ধি (Decent Work)",
      description: "ডিজিটাল অর্থনীতিতে যুব সমাজের কর্মসংস্থান ও অর্থনৈতিক প্রবৃদ্ধি ত্বরান্বিত করা",
    },
  ];

  return (
    <section 
      className="py-20 bg-slate-900 dark:bg-[#070b14] text-white transition-colors duration-200" 
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="header-animate text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            টেকসই উন্নয়ন লক্ষ্যমাত্রা (SDGs)
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            শিক্ষা, কর্মসংস্থান ও মেধা বিকাশের মাধ্যমে জাতিসংঘের টেকসই উন্নয়ন লক্ষ্য বাস্তবায়নে আমাদের প্রয়াস
          </p>
        </div>

        <div className="sdg-grid grid md:grid-cols-3 gap-8 text-center">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="sdg-card bg-slate-800/80 dark:bg-[#141414] border border-slate-700/60 dark:border-[#303030] rounded-2xl p-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:border-emerald-500/50 transition-all cursor-pointer"
            >
              <div className="text-6xl font-bold mb-4">#{goal.number}</div>
              <h3 className="text-xl font-bold mb-4">{goal.title}</h3>
              <p className="opacity-90">{goal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SDG;