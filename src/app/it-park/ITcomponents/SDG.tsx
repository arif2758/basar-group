import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

function SDG() {
  const containerRef = useRef<HTMLElement>(null);

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
      title: "Quality Education",
      description: "Providing accessible IT education for all",
    },
    {
      number: "1",
      title: "No Poverty",
      description: "Creating income opportunities through skill development",
    },
    {
      number: "8",
      title: "Decent Work",
      description: "Promoting employment and economic growth",
    },
  ];

  return (
    <section 
      className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white" 
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="header-animate text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sustainable Development Goals
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Contributing to global sustainability through education,
            employment, and community development
          </p>
        </div>

        <div className="sdg-grid grid md:grid-cols-3 gap-8 text-center">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="sdg-card bg-white/10 backdrop-blur-sm rounded-xl p-8 cursor-pointer"
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