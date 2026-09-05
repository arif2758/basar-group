"use client";



import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";

import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: "UN SDG", logo: "🌍" },
  { name: "UNESCO", logo: "📚" },
  { name: "WHO", logo: "🏥" },
  { name: "UNICEF", logo: "👶" },
  { name: "Red Cross", logo: "➕" },
  { name: "Oxfam", logo: "🤝" },
];

function VolunteerAndPartner() {
  const containerRef = useRef(null);

  useScrollAnimation();
  useGSAP(
    () => {
      // Volunteer section - simple left slide
      gsap.from(".volunteer-section", {
        scrollTrigger: {
          trigger: ".volunteer-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Partners section - simple right slide
      gsap.from(".partners-section", {
        scrollTrigger: {
          trigger: ".partners-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Volunteer Form */}
          <div className="volunteer-section bg-white dark:bg-[#141414] p-8 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Become a Volunteer
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Join our community of dedicated volunteers and make a direct
              impact in people&apos;s lives.
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm"
              />
              <textarea
                placeholder="Why do you want to volunteer with us?"
                rows={4}
                className="w-full px-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-all duration-200 font-medium text-sm shadow-sm active:scale-[0.99]"
              >
                Join Our Team
              </button>
            </form>
          </div>

          {/* Partners */}
          <div className="partners-section flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Our Partners
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Working together with leading organizations to maximize our
              impact.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#141414] p-5 rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-200 text-center group"
                >
                  <div className="text-3xl mb-2 transition-transform duration-200 group-hover:scale-110">{partner.logo}</div>
                  <h3 className="font-medium text-slate-900 dark:text-white text-xs sm:text-sm">
                    {partner.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VolunteerAndPartner;
