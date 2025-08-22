import { Eye, Globe, Target } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AboutBasarFoundation() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
      className="py-20 bg-gradient-to-br from-emerald-50 to-sky-50"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 ref={headerRef} className="text-4xl font-bold text-gray-800 mb-6">
              About BASAR Foundation
            </h2> 

            <div className="space-y-6 mb-8">
              <div 
                ref={(el) => { itemsRef.current[0] = el; }}
                className="flex items-start space-x-4"
              >
                <Target className="text-[#00A86B] w-6 h-6 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Mission
                  </h3>
                  <p className="text-gray-600">
                    To empower communities through education, healthcare, and
                    sustainable development initiatives that create lasting
                    positive change.
                  </p>
                </div>
              </div>

              <div 
                ref={(el) => { itemsRef.current[1] = el; }}
                className="flex items-start space-x-4"
              >
                <Eye className="text-[#FFD700] w-6 h-6 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Vision
                  </h3>
                  <p className="text-gray-600">
                    A world where every individual has access to quality
                    education, healthcare, and opportunities for sustainable
                    development.
                  </p>
                </div>
              </div>

              <div 
                ref={(el) => { itemsRef.current[2] = el; }}
                className="flex items-start space-x-4"
              >
                <Globe className="text-blue-500 w-6 h-6 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    SDG Alignment
                  </h3>
                  <p className="text-gray-600">
                    Our work directly contributes to UN Sustainable Development
                    Goals: No Poverty, Quality Education, Good Health, and Clean
                    Water.
                  </p>
                </div>
              </div>
            </div>

            <blockquote 
              ref={quoteRef}
              className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#00A86B]"
            >
              <p className="text-lg italic text-gray-700">
                Education is the most powerful weapon to change the world.
              </p>
              <cite className="text-[#00A86B] font-semibold">
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
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutBasarFoundation;