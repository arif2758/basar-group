"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

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
    <section ref={containerRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Volunteer Form */}
          <div className="volunteer-section">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Become a Volunteer
            </h2>
            <p className="text-gray-600 mb-8">
              Join our community of dedicated volunteers and make a direct
              impact in people&apos;s lives.
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A86B] focus:border-transparent outline-none transition-all duration-300"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A86B] focus:border-transparent outline-none transition-all duration-300"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A86B] focus:border-transparent outline-none transition-all duration-300"
              />
              <textarea
                placeholder="Why do you want to volunteer with us?"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A86B] focus:border-transparent outline-none transition-all duration-300"
              ></textarea>
              <button
                type="submit"
                className="w-full teal-slate-gradient text-white py-3 rounded-lg hover:bg-green-700 hover:scale-105 transition-all duration-300 font-semibold"
              >
                Join Our Team
              </button>
            </form>
          </div>

          {/* Partners */}
          <div className="partners-section">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Partners
            </h2>
            <p className="text-gray-600 mb-8">
              Working together with leading organizations to maximize our
              impact.
            </p>

            <div className=" grid grid-cols-2 md:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className=" bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-center"
                >
                  <div className="text-3xl mb-2">{partner.logo}</div>
                  <h3 className="font-semibold text-gray-800">
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
