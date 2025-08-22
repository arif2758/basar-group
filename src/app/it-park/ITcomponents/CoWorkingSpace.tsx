import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { FaHandHoldingHeart, FaLaptopCode, FaWifi } from 'react-icons/fa';

gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

function CoWorkingSpace() {
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
    <section className="py-20 bg-white" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="header-animate text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Co-Working Space
          </h2>
          <p className="header-animate text-xl text-gray-600 max-w-3xl mx-auto">
            High-speed internet, collaborative workspace, and flexible
            contribution options
          </p>
        </div>

        <div className="features-grid grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card text-center group cursor-pointer"
            >
              <div
                className={`feature-icon w-20 h-20 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-6`}
              >
                <feature.icon className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoWorkingSpace;