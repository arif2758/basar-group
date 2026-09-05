import { Eye, Globe, Target } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";




gsap.registerPlugin(ScrollTrigger);

function AboutBasarFoundation() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

    // Mission/Vision/SDG items with stagger
    const items = itemsRef.current.filter(Boolean);
    gsap.set(items, { x: -30, opacity: 0 });
    ScrollTrigger.create({
      trigger: items[0],
      start: "top 75%",
      onEnter: () => {
        gsap.to(items, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out"
        });
      },
      once: true
    });

    // Quote animation
    gsap.set(quoteRef.current, { y: 20, opacity: 0 });
    ScrollTrigger.create({
      trigger: quoteRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(quoteRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        });
      },
      once: true
    });

    // Image animation
    gsap.set(imageRef.current, { x: 30, opacity: 0 });
    ScrollTrigger.create({
      trigger: imageRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.to(imageRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        });
      },
      once: true
    });

  }, []);

  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-[#070b14] border-t border-slate-200 dark:border-[#303030] transition-colors duration-200"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 ref={headerRef} className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              About BASAR Foundation
            </h2> 

            <div className="space-y-6 mb-8">
              <div 
                ref={(el) => { itemsRef.current[0] = el; }}
                className="flex items-start space-x-4 p-4 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-[#303030] hover:bg-slate-50 dark:hover:bg-[#141414] transition-all duration-200"
              >
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-[#00A86B] border border-emerald-100 dark:border-emerald-800/40">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Mission
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    To empower communities through education, healthcare, and
                    sustainable development initiatives that create lasting
                    positive change.
                  </p>
                </div>
              </div>

              <div 
                ref={(el) => { itemsRef.current[1] = el; }}
                className="flex items-start space-x-4 p-4 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-[#303030] hover:bg-slate-50 dark:hover:bg-[#141414] transition-all duration-200"
              >
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-500 border border-amber-100 dark:border-amber-800/40">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Vision
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    A world where every individual has access to quality
                    education, healthcare, and opportunities for sustainable
                    development.
                  </p>
                </div>
              </div>

              <div 
                ref={(el) => { itemsRef.current[2] = el; }}
                className="flex items-start space-x-4 p-4 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-[#303030] hover:bg-slate-50 dark:hover:bg-[#141414] transition-all duration-200"
              >
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-500 border border-blue-100 dark:border-blue-800/40">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    SDG Alignment
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Our work directly contributes to UN Sustainable Development
                    Goals: No Poverty, Quality Education, Good Health, and Clean
                    Water.
                  </p>
                </div>
              </div>
            </div>

            <blockquote 
              ref={quoteRef}
              className="bg-slate-50 dark:bg-[#141414] p-6 rounded-xl border border-slate-200 dark:border-[#303030] border-l-4 border-l-[#00A86B] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
            >
              <p className="text-lg italic text-slate-700 dark:text-slate-300">
                Education is the most powerful weapon to change the world.
              </p>
              <cite className="text-[#00A86B] font-semibold block mt-2">
                - Nelson Mandela
              </cite>
            </blockquote>
          </div>

          <div ref={imageRef}>
            <Image
              src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="About Us"
              width={600}
              height={400}
              className="rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutBasarFoundation;