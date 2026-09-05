"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { FiPlay, FiX } from "react-icons/fi";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

interface MissionProps {
  language: "bn" | "en";
}

export default function Mission({ language }: MissionProps) {
  const [showModal, setShowModal] = useState(false);
  const missionRef = useRef<HTMLElement>(null);

  useScrollAnimation();
  useGSAP(
    () => {
      gsap.set(".mission-title", { y: 60, opacity: 0 });
      gsap.set(".mission-text", { y: 40, opacity: 0 });
      gsap.set(".mission-button", { y: 30, opacity: 0 });
      gsap.set(".mission-image", { x: 50, opacity: 0 });
      gsap.set(".mission-stats", { scale: 0.8, opacity: 0 });

      gsap.to(".mission-title", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".mission-title",
          start: "top 85%",
        },
      });

      gsap.to(".mission-text", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".mission-text",
          start: "top 85%",
        },
      });

      gsap.to(".mission-button", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".mission-button",
          start: "top 85%",
        },
      });

      gsap.to(".mission-image", {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".mission-image",
          start: "top 85%",
        },
      });

      gsap.to(".mission-stats", {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".mission-stats",
          start: "top 85%",
        },
      });
    },
    { scope: missionRef }
  );

  return (
    <section
      ref={missionRef}
      className="py-20 bg-slate-50 dark:bg-[#070b14] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Story */}
          <div>
            <h2 className="mission-title font-poppins text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              {language === "bn" ? "আমাদের গল্প ও দর্শন" : "Our Story & Vision"}
            </h2>

            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === "bn" ? (
                <>
                  <p className="mission-text text-lg">
                    বাছার পরিবারের একটি স্বপ্ন থেকে শুরু। আমরা বিশ্বাস করি যে
                    শিক্ষা, দক্ষতা এবং পারস্পরিক সহায়তার মাধ্যমে আমাদের
                    কমিউনিটির প্রতিটি মানুষ সফল হতে পারে।
                  </p>
                  <p className="mission-text">
                    BASAR Group শুধু একটি প্রতিষ্ঠান নয়, এটি একটি আন্দোলন।
                    আমাদের লক্ষ্য হল এমন একটি ব্যবস্থা গড়ে তোলা যেখানে প্রতিটি
                    ব্যক্তি তার সম্ভাবনা বাস্তবায়ন করতে পারে।
                  </p>
                  <p className="mission-text">
                    গ্রন্থাগার থেকে শুরু করে আইটি পার্ক পর্যন্ত - আমাদের প্রতিটি
                    বিভাগ একে অপরের সাথে সংযুক্ত এবং একটি সাধারণ উদ্দেশ্যে কাজ
                    করছে।
                  </p>
                </>
              ) : (
                <>
                  <p className="mission-text text-lg">
                    It started with a dream from the Basar family. We believe
                    that through education, skills, and mutual support, every
                    person in our community can succeed.
                  </p>
                  <p className="mission-text">
                    BASAR Group is not just an institution, it&apos;s a
                    movement. Our goal is to build a system where every
                    individual can realize their potential.
                  </p>
                  <p className="mission-text">
                    From the library to the IT park - each of our departments is
                    connected and working towards a common purpose.
                  </p>
                </>
              )}
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="mission-button group mt-8 inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
            >
              {language === "bn"
                ? "সম্পূর্ণ গল্প পড়ুন"
                : "Read our full story"}
              <FiPlay className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
            </button>
          </div>

          {/* Right Column - Image/Video */}
          <div className="mission-image relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-slate-200 dark:border-[#303030]">
              <Image
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="BASAR Group Community"
                layout="responsive"
                width={600}
                height={400}
                className="group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Play Button Overlay */}
              <button
                onClick={() => setShowModal(true)}
                className="absolute inset-0 flex items-center justify-center group/play cursor-pointer"
                aria-label="Play video"
              >
                <div className="w-16 h-16 bg-white/90 dark:bg-[#1f1f1f]/90 rounded-full flex items-center justify-center group-hover/play:bg-white dark:group-hover/play:bg-[#252525] group-hover/play:scale-110 transition-all duration-300 shadow-lg border border-slate-200 dark:border-slate-700">
                  <FiPlay className="w-7 h-7 text-blue-600 dark:text-blue-400 ml-1" />
                </div>
              </button>
            </div>

            {/* Floating Stats */}
            <div className="mission-stats absolute -bottom-6 -right-6 bg-white dark:bg-[#141414] rounded-2xl shadow-xl p-6 border border-slate-200 dark:border-[#303030]">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                  2019
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {language === "bn" ? "প্রতিষ্ঠিত" : "Established"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-[#2a2a2a]">
              <h3 className="font-poppins text-xl font-bold text-slate-900 dark:text-white">
                {language === "bn"
                  ? "আমাদের সম্পূর্ণ গল্প"
                  : "Our Complete Story"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                <p>
                  {language === "bn"
                    ? "বাছার ফাউন্ডেশন, বাছার সুপার শপ, বাছার গ্রন্থাগার ও বাছার আইটি পার্ক—সবকিছু এক সুতোয় গাঁথা। আমাদের উদ্দেশ্য শিক্ষা, উদ্যোক্তা তৈরি ও পারস্পরিক সহযোগিতার মাধ্যমে একটি স্বাবলম্বী কমিউনিটি গঠন করা।"
                    : "BASAR Foundation, Super Shop, Library, and IT Park are bound by one mission: creating a self-sustaining ecosystem powered by education, enterprise, and mutual solidarity."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
