'use client';

import Link from 'next/link';
import { FiUsers, FiClock, FiAward, FiBriefcase } from 'react-icons/fi';
import { features } from '@/lib/data';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeaturesProps {
  language: 'bn' | 'en';
}

const iconMap = { 
  FiUsers,
  FiClock,
  FiAward,
  FiBriefcase,
};

export default function Features({ language }: FeaturesProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

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

    // Feature cards animation
    const cards = cardsRef.current.filter(Boolean);
    gsap.set(cards, { y: 40, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: cards[0],
      start: "top 75%",
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        });
      },
      once: true
    });

    // Hover animations
    cards.forEach((card) => {
      if (card) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -5,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    });
  }, []);

  return (
    <section className="py-20 marble-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-neutral-dark mb-4">
            {language === 'bn' ? 'বিশেষ সুবিধা' : 'Special Features'}
          </h2>
          <p className="text-gray-600 text-lg">
            {language === 'bn' 
              ? 'আমাদের সদস্যদের জন্য বিশেষ সুবিধা ও সেবা'
              : 'Special facilities and services for our members'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            
            return (
              <Link
                key={index}
                href={feature.link}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="group bg-white rounded-xl p-6 shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-accent to-accent-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-dark mb-2">
                  {language === 'bn' 
                    ? feature.title
                      .replace('Membership', 'সদস্যপদ')
                      .replace('Quick Delivery', 'দ্রুত ডেলিভারি')
                      .replace('Monthly Quiz', 'মাসিক কুইজ')
                      .replace('Local Jobs', 'স্থানীয় চাকরি')
                    : feature.title
                  }
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'bn' 
                    ? feature.description
                      .replace('100৳ Refundable membership fee', '১০০৳ ফেরতযোগ্য সদস্যপদ ফি')
                      .replace('30-min book delivery service', '৩০ মিনিটে বই ডেলিভারি সার্ভিস')
                      .replace('Quiz contests with rewards', 'পুরস্কারসহ কুইজ প্রতিযোগিতা')
                      .replace('Employment & delivery opportunities', 'কর্মসংস্থান ও ডেলিভারি সুযোগ')
                    : feature.description
                  }
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}