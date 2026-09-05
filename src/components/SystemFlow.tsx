"use client";
import React, { useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";



import { useRef } from "react";
import { IconType } from "react-icons";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  FiBook,
  FiHeart,
  FiShoppingBag,
  FiMonitor,
  FiArrowRight,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

interface FlowStep {
  id: string;
  icon: IconType;
  title: string;
  description: string;
  color: string;
  example: string;
}

interface Outcome {
  icon: IconType;
  label: string;
  description: string;
  color: string;
}

const SystemFlow = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const mobileFlowRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();
  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Desktop Flow Animation
      const flowSteps = flowRef.current?.querySelectorAll(".flow-step");
      flowSteps?.forEach((step, index) => {
        gsap.fromTo(
          step,
          {
            opacity: 0,
            y: 80,
            scale: 0.8,
            rotationY: 20,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: flowRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Example Cards Animation
      const exampleCards = flowRef.current?.querySelectorAll(".example-card");
      exampleCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1 + 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: flowRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Mobile Flow Animation
      const mobileSteps =
        mobileFlowRef.current?.querySelectorAll(".mobile-step");
      mobileSteps?.forEach((step, index) => {
        gsap.fromTo(
          step,
          {
            opacity: 0,
            x: -100,
            rotationY: 15,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mobileFlowRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Mobile Arrows Animation
      const mobileArrows =
        mobileFlowRef.current?.querySelectorAll(".mobile-arrow");
      mobileArrows?.forEach((arrow, index) => {
        gsap.fromTo(
          arrow,
          {
            opacity: 0,
            scale: 0.5,
            rotation: 180,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 90,
            duration: 0.6,
            delay: index * 0.2 + 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: mobileFlowRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Outcomes Section Animation
      gsap.fromTo(
        outcomesRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: outcomesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Outcome Cards Animation
      const outcomeCards =
        outcomesRef.current?.querySelectorAll(".outcome-card");
      outcomeCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
            rotation: 5,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: outcomesRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Flow Step Circles Hover Animation
      const stepCircles = flowRef.current?.querySelectorAll(".step-circle");
      stepCircles?.forEach((circle) => {
        const circleElement = circle as HTMLElement;
        circleElement.addEventListener("mouseenter", () => {
          gsap.to(circleElement, {
            scale: 1.15,
            y: -10,
            rotation: 360,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        circleElement.addEventListener("mouseleave", () => {
          gsap.to(circleElement, {
            scale: 1,
            y: 0,
            rotation: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });

      // Example Cards Hover Animation
      const exampleCards2 = flowRef.current?.querySelectorAll(".example-card");
      exampleCards2?.forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Outcome Cards Hover Animation
      const outcomeCards2 =
        outcomesRef.current?.querySelectorAll(".outcome-card");
      outcomeCards2?.forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            scale: 1.05,
            y: -8,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Continuous floating animation for icons
      const icons = containerRef.current?.querySelectorAll(".floating-icon");
      icons?.forEach((icon, index) => {
        gsap.to(icon, {
          y: -10,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.2,
        });
      });
    },
    { scope: containerRef }
  );

  const flowSteps: FlowStep[] = [
    {
      id: "library",
      icon: FiBook,
      title: "Education",
      description: "Learning starts with access to quality resources",
      color: "#0B6E4F",
      example: "Student accesses digital learning resources and books",
    },
    {
      id: "foundation",
      icon: FiHeart,
      title: "Support",
      description: "Scholarships and assistance enable continued growth",
      color: "#2B6CB0",
      example: "Receives scholarship and healthcare support",
    },
    {
      id: "it-park",
      icon: FiMonitor,
      title: "Skills",
      description: "Technology training creates job-ready professionals",
      color: "#8B5CF6",
      example: "Learns web development and digital marketing",
    },
    {
      id: "super-shop",
      icon: FiShoppingBag,
      title: "Enterprise",
      description: "Economic opportunities through local commerce",
      color: "#FFB84D",
      example: "Starts freelancing or joins Super Shop as employee",
    },
  ];

  const outcomes: Outcome[] = [
    {
      icon: FiUsers,
      label: "Community Growth",
      description: "Stronger local networks",
      color: "#0B6E4F",
    },
    {
      icon: FiTrendingUp,
      label: "Economic Impact",
      description: "Sustainable income generation",
      color: "#2B6CB0",
    },
    {
      icon: FiHeart,
      label: "Social Development",
      description: "Improved quality of life",
      color: "#8B5CF6",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="system-flow"
      className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            How It All Connects
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A holistic ecosystem where education leads to empowerment, skills
            create opportunities, and commerce sustains community development.
          </p>
        </div>

        {/* Interactive Flow Diagram */}
        <div className="relative mb-16">
          {/* Desktop / Tablet Flow */}
          <div ref={flowRef} className="hidden md:block">
            {/* Step Circles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-start relative mb-8">
              {flowSteps.map((step) => {
                const IconComponent = step.icon;
                const isActive = activeStep === step.id;

                return (
                  <div
                    key={step.id}
                    className="flow-step flex flex-col items-center"
                  >
                    {/* Circle */}
                    <div
                      className={`step-circle relative w-20 h-20 lg:w-22 lg:h-22 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        isActive
                          ? "bg-white dark:bg-[#1f1f1f] shadow-lg scale-105"
                          : "bg-slate-50 dark:bg-[#141414] shadow-sm hover:shadow-md"
                      }`}
                      style={{
                        borderColor: step.color,
                      }}
                      onMouseEnter={() => setActiveStep(step.id)}
                      onMouseLeave={() => setActiveStep(null)}
                    >
                      <IconComponent
                        className="floating-icon w-7 h-7 lg:w-8 lg:h-8 transition-colors duration-200"
                        style={{ color: step.color }}
                      />
                    </div>

                    {/* Title + Desc */}
                    <div className="mt-4 text-center px-2">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Example Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {flowSteps.map((step) => (
                <div
                  key={step.id}
                  className="example-card p-4 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-center transition-all duration-200 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)]"
                >
                  <p
                    className="text-xs sm:text-sm font-medium"
                    style={{ color: step.color }}
                  >
                    {step.example}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Flow */}
          <div ref={mobileFlowRef} className="md:hidden space-y-6">
            {flowSteps.map((step, index) => {
              const IconComponent = step.icon;

              return (
                <div key={step.id} className="flex flex-col space-y-3">
                  <div className="mobile-step flex items-start space-x-4 p-4 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030]">
                    <div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center bg-white dark:bg-[#1f1f1f] shadow-sm shrink-0"
                      style={{ borderColor: step.color }}
                    >
                      <IconComponent
                        className="w-5 h-5"
                        style={{ color: step.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{step.description}</p>
                      <div
                        className="p-2.5 rounded-lg border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f]"
                      >
                        <p
                          className="text-xs font-medium"
                          style={{ color: step.color }}
                        >
                          {step.example}
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < flowSteps.length - 1 && (
                    <div className="flex justify-center">
                      <FiArrowRight
                        className="mobile-arrow w-4 h-4 rotate-90"
                        style={{ color: step.color }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Outcomes */}
        <div
          ref={outcomesRef}
          className="bg-slate-50 dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white text-center mb-6 tracking-tight">
            Collective Impact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {outcomes.map((outcome, index) => {
              const IconComponent = outcome.icon;

              return (
                <div
                  key={index}
                  className="outcome-card text-center p-6 rounded-xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1a1a1a] shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3.5 shadow-sm"
                    style={{ backgroundColor: outcome.color }}
                  >
                    <IconComponent className="floating-icon w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                    {outcome.label}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{outcome.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemFlow;
