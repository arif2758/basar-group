import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, ScrollTrigger, Observer } from "@/utils/mockGsap";

import { FaClock, FaGraduationCap, FaShieldAlt } from 'react-icons/fa';
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function GuardianDashboard() {
  const containerRef = useRef<HTMLElement>(null);

  useScrollAnimation();
  useGSAP(() => {
    if (!containerRef.current) return;

    // Entrance animations
    gsap.fromTo(".fade-left", 
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        }
      }
    );

    gsap.fromTo(".fade-right",
      {
        opacity: 0,
        x: 50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        }
      }
    );

    // Set initial properties and hover effects
    gsap.set(".icon-hover", { 
      transformOrigin: "center",
      cursor: "pointer"
    });

    gsap.set(".btn-hover", { 
      transformOrigin: "center",
      cursor: "pointer"
    });

    // Icon hover animations
    gsap.utils.toArray<HTMLElement>(".icon-hover").forEach(icon => {
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(icon, { scale: 1.1, duration: 0.3, ease: "power2.out" });

      icon.addEventListener("mouseenter", () => hoverTl.play());
      icon.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Button hover animation
    const buttonHover = gsap.timeline({ paused: true });
    buttonHover.to(".btn-hover", { 
      y: -3, 
      scale: 1.05, 
      duration: 0.3, 
      ease: "power2.out" 
    });

    gsap.utils.toArray<HTMLElement>(".btn-hover").forEach(btn => {
      btn.addEventListener("mouseenter", () => buttonHover.restart());
      btn.addEventListener("mouseleave", () => buttonHover.reverse());
    });

  }, { scope: containerRef });

  return (
    <section id="guardian" className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="fade-left text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              অভিভাবক ড্যাশবোর্ড (Guardian Dashboard)
            </h2>
            <p className="fade-left text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8">
              আমাদের নিরাপদ অভিভাবক পোর্টালের মাধ্যমে আপনার সন্তানের ক্লাসের অগ্রগতি ও নিরাপত্তার সার্বক্ষণিক তথ্য জানুন
            </p>

            <div className="space-y-6">
              <div className="fade-left flex items-center space-x-4">
                <div className="icon-hover bg-emerald-600 p-3 rounded-lg">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">লাইভ CCTV ও নিরাপত্তা পর্যবেক্ষণ</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">ক্লাস চলাকালীন শিক্ষার্থীর নিরাপত্তা রিয়েল-টাইমে পর্যবেক্ষণ করুন</p>
                </div>
              </div>

              <div className="fade-left flex items-center space-x-4">
                <div className="icon-hover bg-emerald-600 p-3 rounded-lg">
                  <FaClock className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">উপস্থিতি ও সময়সূচি ট্র্যাকিং</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">দৈনিক ক্লাসের উপস্থিতি ও ডিজিটাল অ্যাক্টিভিটি রিপোর্ট</p>
                </div>
              </div>

              <div className="fade-left flex items-center space-x-4">
                <div className="icon-hover bg-emerald-600 p-3 rounded-lg">
                  <FaGraduationCap className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">অধ্যয়ন অগ্রগতি ও মূল্যায়ন রিপোর্ট</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">কোর্সের অগ্রগতি, প্রজেক্ট মূল্যায়ন ও মেধা বিকাশের বিস্তারিত রিপোর্ট</p>
                </div>
              </div>
            </div>

            <button className="fade-left btn-hover mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium text-sm shadow-sm transition-all duration-200 active:scale-[0.98]">
              ড্যাশবোর্ডে প্রবেশ করুন
            </button>
          </div>

          <div className="fade-right">
            <Image
              src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg"
              alt="Guardian Dashboard"
              width={800}
              height={600}
              className="rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
              priority
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default GuardianDashboard;