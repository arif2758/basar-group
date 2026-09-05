import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, Observer } from "@/utils/mockGsap";


import { FaHandHoldingHeart, FaLaptopCode, FaWifi } from 'react-icons/fa';
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

function CoWorkingSpace() {
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
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        }
      }
    );

    // Feature cards animation with stagger
    gsap.fromTo(".feature-card", 
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%"
        }
      }
    );

    // Icon hover animations using GSAP Observer
    gsap.utils.toArray<HTMLElement>(".feature-card").forEach(card => {
      const icon = card.querySelector('.feature-icon');
      
      Observer.create({
        target: card,
        type: "pointer",
        onHover: () => {
          gsap.to(icon, { 
            scale: 1.1, 
            rotation: 5, 
            duration: 0.3, 
            ease: "power2.out" 
          });
        },
        onHoverEnd: () => {
          gsap.to(icon, { 
            scale: 1, 
            rotation: 0, 
            duration: 0.3, 
            ease: "power2.out" 
          });
        }
      });
    });

  }, { scope: containerRef });

  const features = [
    {
      icon: FaWifi,
      title: "High-Speed Internet",
      description: "Reliable fiber optic connection for seamless work",
      color: "bg-blue-500",
    },
    {
      icon: FaLaptopCode,
      title: "Modern Workstations", 
      description: "Ergonomic desks and latest technology setup",
      color: "bg-purple-500",
    },
    {
      icon: FaHandHoldingHeart,
      title: "Flexible Contributions",
      description: "Pay with money or share your skills with the community",
      color: "bg-pink-500",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="header-animate text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Co-Working Space
          </h2>
          <p className="header-animate text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            High-speed internet, collaborative workspace, and flexible
            contribution options
          </p>
        </div>

        <div className="features-grid grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card text-center group cursor-pointer bg-white dark:bg-[#141414] p-8 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div
                className={`feature-icon w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-5 shadow-sm`}
              >
                <feature.icon className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoWorkingSpace;