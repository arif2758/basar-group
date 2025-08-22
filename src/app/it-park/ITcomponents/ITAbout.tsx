"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaClock, FaGlobe, FaShieldAlt } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ITAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Header animation
    gsap.set(headerRef.current, { y: 40, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(headerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        });
      },
      once: true
    });

    // Left content animation
    gsap.set(leftContentRef.current, { x: -50, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: leftContentRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.to(leftContentRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        });
      },
      once: true
    });

    // Right content animation
    gsap.set(rightContentRef.current, { x: 50, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: rightContentRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.to(rightContentRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        });
      },
      once: true
    });

    // Features animation
    const features = featuresRef.current.filter(Boolean);
    gsap.set(features, { y: 20, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: features[0],
      start: "top 80%",
      onEnter: () => {
        gsap.to(features, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.3
        });
      },
      once: true
    });
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About BASAR IT Park
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A revolutionary concept that merges IT education with community
            space, creating a safe, inspiring environment where learning leads
            to earning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={leftContentRef}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Our Vision
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              BASAR IT Park combines the structured learning environment of
              BASAR IT Center with the open, nature-filled atmosphere of BASAR
              Park. This unique approach creates a holistic learning experience
              that nurtures both technical skills and personal growth.
            </p>
            <div className="space-y-4">
              {[
                { icon: FaShieldAlt, text: "24/7 CCTV monitoring for safety" },
                { icon: FaClock, text: "Flexible schedules for students" },
                { icon: FaGlobe, text: "Solar-powered evening learning" }
              ].map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => { featuresRef.current[index] = el; }}
                  className="flex items-center space-x-3"
                >
                  <feature.icon className="text-emerald-600 text-xl" />
                  <span className="text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={rightContentRef} className="relative">
            <Image
              src="https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg"
              alt="BASAR IT Park"
              width={800}
              height={500}
              className="rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-emerald-600/20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ITAbout;