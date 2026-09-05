"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";


import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";


gsap.registerPlugin(useGSAP, ScrollTrigger);

function VirtualTour() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();
  useGSAP(() => {
    // Header animation
    gsap.set(headerRef.current, { y: 30, opacity: 0 });
    
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

    // Image animation
    gsap.set(imageRef.current, { scale: 0.9, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: imageRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.to(imageRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        });
      },
      once: true
    });

    // Play button floating animation
    gsap.to(playButtonRef.current, {
      scale: 1.05,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Play button hover animation
    if (playButtonRef.current) {
      playButtonRef.current.addEventListener('mouseenter', () => {
        gsap.to(playButtonRef.current, {
          scale: 1.2,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      playButtonRef.current.addEventListener('mouseleave', () => {
        gsap.to(playButtonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      playButtonRef.current.addEventListener('click', () => {
        gsap.to(playButtonRef.current, {
          scale: 0.9,
          duration: 0.1,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Virtual Tour</h2>
          <p className="text-xl opacity-90 mb-12 max-w-3xl mx-auto">
            Explore our facilities and see where the magic happens
          </p>

          <div ref={imageRef} className="relative max-w-4xl mx-auto">
            <Image
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
              alt="Virtual Tour"
              width={1000}
              height={600}
              className="rounded-lg shadow-2xl w-full"
            />
            <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
              <div
                ref={playButtonRef}
                className="bg-emerald-600 rounded-full p-6 shadow-lg hover:bg-emerald-700 transition-colors duration-300"
              >
                <FaPlay className="text-white text-3xl ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VirtualTour;