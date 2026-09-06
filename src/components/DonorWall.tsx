"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { donors } from "@/lib/data";
import Image from "next/image";
import { FiDownload, FiHeart, FiTrendingUp, FiUsers } from "react-icons/fi";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function DonorWall() {
  const containerRef = useRef<HTMLElement>(null);
  const donorGridRef = useRef<HTMLDivElement>(null);
  const reportCardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(".main-heading", { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" })
        .fromTo(".subtitle", { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .fromTo(".donor-card",
          { opacity: 0, y: 60, scale: 0.8, rotationY: 15 },
          { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 0.6, stagger: { amount: 0.8, grid: [3, 3], from: "start" }, ease: "back.out(1.4)" }, "-=0.2")
        .fromTo(".view-all-btn", { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.3")
        .fromTo(reportCardRef.current,
          { opacity: 0, x: 100, rotationY: -15, scale: 0.9 },
          { opacity: 1, x: 0, rotationY: 0, scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .fromTo(".stat-card", { opacity: 0, y: 40, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" }, "-=0.4")
        .fromTo(".download-btn", { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2");

      const donorCards = gsap.utils.toArray<HTMLElement>(".donor-card");
      donorCards.forEach((card) => {
        const avatar = card.querySelector<HTMLImageElement>(".donor-avatar");
        const name = card.querySelector<HTMLParagraphElement>(".donor-name");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)", duration: 0.3, ease: "power2.out" });
          if (avatar) gsap.to(avatar, { scale: 1.1, rotation: 5, duration: 0.3, ease: "back.out(1.7)" });
          if (name) gsap.to(name, { color: "#10B981", duration: 0.2 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, boxShadow: "0 4px 6px rgba(0,0,0,0.1)", duration: 0.3, ease: "power2.out" });
          if (avatar) gsap.to(avatar, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
          if (name) gsap.to(name, { color: "#6B7280", duration: 0.2 });
        });
      });

      const buttons = gsap.utils.toArray<HTMLButtonElement>(".animated-btn");
      buttons.forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, { scale: 1.05, y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.2)", duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { scale: 1, y: 0, boxShadow: "0 4px 6px rgba(0,0,0,0.1)", duration: 0.3, ease: "power2.out" });
        });
      });

      gsap.to(".heart-icon", { y: -5, duration: 2, ease: "power2.inOut", yoyo: true, repeat: -1 });

      const counters = gsap.utils.toArray<HTMLElement>(".counter-number");
      counters.forEach((counter) => {
        const target = parseInt(counter.textContent?.replace(/[^\d]/g, "") || "0");
        const obj = { value: 0 };

        ScrollTrigger.create({
          trigger: counter,
          start: "top 80%",
          onEnter: () => {
            gsap.to(obj, {
              value: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                if (counter.textContent?.includes("Tk")) {
                  counter.textContent = `Tk ${Math.round(obj.value).toLocaleString()}`;
                } else {
                  counter.textContent = Math.round(obj.value).toString();
                }
              },
            });
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Donor Wall */}
          <div className="space-y-8">
            <div className="main-heading">
              <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6 flex items-center">
                <FiHeart className="heart-icon w-8 h-8 lg:w-10 lg:h-10 text-rose-500 mr-3 drop-shadow-sm" />
                আমাদের দাতাগণ
              </h2>
            </div>

            <p className="subtitle text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              যারা আমাদের কমিউনিটির উন্নয়নে অবদান রাখছেন এবং একসাথে একটি উন্নত ভবিষ্যৎ গড়ে তুলছেন
            </p>

            <div
              ref={donorGridRef}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6"
            >
              {donors.map((donor, index) => (
                <div
                  key={index}
                  className="donor-card bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-2xl p-4 lg:p-6 shadow-sm hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] dark:hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.4)] cursor-pointer group transition-all duration-200"
                >
                  <div className="relative">
                    <Image
                      src={donor.avatar}
                      alt={donor.name}
                      width={64}
                      height={64}
                      className="donor-avatar rounded-full object-cover mx-auto mb-3 ring-2 ring-emerald-100 dark:ring-emerald-900/40 group-hover:ring-emerald-400 transition-all duration-300"
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-[#141414]"></div>
                  </div>
                  <p className="donor-name text-sm text-center text-slate-700 dark:text-slate-200 font-medium truncate transition-colors duration-200">
                    {donor.name}
                  </p>
                </div>
              ))}
            </div>

            <button className="view-all-btn animated-btn bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-xs hover:shadow transition-all duration-300 flex items-center group cursor-pointer">
              <FiUsers className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              সকল দাতা দেখুন
            </button>
          </div>

          {/* Monthly Report */}
          <div ref={reportCardRef} className="lg:pl-8">
            <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-3xl shadow-sm hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] dark:hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.4)] p-8 lg:p-10 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mr-4 text-white shadow-xs">
                  <FiTrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-poppins text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                  মাসিক প্রতিবেদন
                </h3>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-sm sm:text-base">
                আমাদের কার্যক্রমের সম্পূর্ণ বিবরণ এবং আর্থিক স্বচ্ছতার জন্য প্রতি মাসে প্রকাশিত প্রতিবেদন Download করুন।
              </p>

              <div ref={statsRef} className="grid grid-cols-2 gap-4 lg:gap-6 mb-8">
                <div className="stat-card bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl p-6 text-center">
                  <div className="counter-number text-2xl lg:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    Tk 2,45,000
                  </div>
                  <div className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                    এ মাসে দান
                  </div>
                </div>
                <div className="stat-card bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-6 text-center">
                  <div className="counter-number text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    185
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    নতুন সদস্য
                  </div>
                </div>
              </div>

              <button className="download-btn animated-btn group w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl font-semibold shadow-xs hover:shadow transition-all duration-300 flex items-center justify-center cursor-pointer">
                <FiDownload className="w-5 h-5 mr-3 group-hover:translate-y-0.5 transition-transform duration-200" />
                প্রতিবেদন Download করুন
              </button>
              <p className="text-xs text-gray-500 text-center mt-4 opacity-75">
                PDF Format • 2.3 MB • সর্বশেষ আপডেট
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-2 h-2 bg-emerald-400 rounded-full opacity-60 animate-pulse"></div>
      </div>
    </section>
  );
}
