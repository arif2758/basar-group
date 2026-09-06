"use client";
import React, { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  CheckCircle,
  Clock,
  Truck,
  BookOpen,
  Users,
  Shield,
  Star,
  AlertCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Membership: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();
  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      // Membership Plans Animation
      gsap.fromTo(
        plansRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: plansRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Benefits Animation
      gsap.fromTo(
        benefitsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const rules = [
    {
      icon: BookOpen,
      title: "একবারে একটি বই",
      description:
        "সদস্যগণ একবারে একটি বই ধার নিতে পারবেন। পরবর্তী বই নেওয়ার পূর্বে পূর্ববর্তী বইটি জমা দিতে হবে।",
    },
    {
      icon: Users,
      title: "শিক্ষার্থীদের অগ্রাধিকার",
      description:
        "অ্যাকাডেমিক এবং শিক্ষামূলক বই সংগ্রহের ক্ষেত্রে শিক্ষার্থীদের সর্বোচ্চ অগ্রাধিকার দেওয়া হয়।",
    },
    {
      icon: Truck,
      title: "30 মিনিটে ফ্রি ডেলিভারি",
      description:
        "ঢাকা শহরের নির্দিষ্ট এলাকায় সদস্যদের জন্য 30 মিনিটে ফ্রি ডেলিভারি সেবা। বই পৌঁছাবে আপনার ঠিকানায়।",
    },
    {
      icon: Clock,
      title: "বই ফেরতের নীতি",
      description:
        "বই সাধারণত 14 দিনের মধ্যে ফেরত দিতে হবে। অন্য কোনো পাঠকের অনুরোধ না থাকলে সময় বৃদ্ধি করা সম্ভব।",
    },
    {
      icon: Shield,
      title: "বইয়ের যত্ন ও সুরক্ষা",
      description:
        "বইয়ের সঠিক যত্ন নিন। বইয়ের ক্ষতিসাধন বা হারিয়ে ফেললে প্রতিস্থাপন বা ক্ষতিপূরণ প্রযোজ্য হতে পারে।",
    },
  ];

  const benefits = [
    "500+ বাছাইকৃত সমৃদ্ধ বইয়ের সংগ্রহে অ্যাক্সেস",
    "ঢাকায় দ্রুততম 30 মিনিটে ফ্রি ডেলিভারি সেবা",
    "নতুন প্রকাশিত ও সংগৃহীত বইয়ে অগ্রাধিকার",
    "রিডিং ট্র্যাকার এবং ব্যাজ অর্জন সুবিধা",
    "মাসিক কুইজ ও আকর্ষণীয় পুরস্কার প্রতিযোগিতা",
    "কমিউনিটি পাঠচক্র ও মতবিনিময় ফোরাম",
    "ব্যক্তিগত পছন্দ অনুযায়ী বইয়ের সুপারিশ",
    "শিক্ষার্থীদের জন্য কোনো বিলম্ব ফি নেই",
  ];

  const membershipPlans = [
    {
      name: "শিক্ষার্থী মেম্বারশিপ (Student)",
      price: "৳100",
      period: "ফেরতযোগ্য জামানত",
      description: "বৈধ স্টুডেন্ট আইডিধারী শিক্ষার্থীদের জন্য প্রযোজ্য",
      features: [
        "একবারে একটি বই পড়ার সুযোগ",
        "30 মিনিটে ফ্রি ডেলিভারি",
        "14 দিন বই রাখার সুবিধা",
        "শিক্ষার্থী হিসেবে বিশেষ অগ্রাধিকার",
        "রিডিং ট্র্যাকার ও প্রোফাইল অ্যাক্সেস",
        "মাসিক কুইজ প্রতিযোগিতায় অংশগ্রহণ",
      ],
      popular: true,
    },
    {
      name: "সাধারণ মেম্বারশিপ (General)",
      price: "৳200",
      period: "ফেরতযোগ্য জামানত",
      description: "চাকরিজীবী, গবেষক ও সাধারণ বইপ্রেমী পাঠকদের জন্য",
      features: [
        "একবারে একটি বই পড়ার সুযোগ",
        "30 মিনিটে ফ্রি ডেলিভারি",
        "14 দিন বই রাখার সুবিধা",
        "সকল বইয়ের সংগ্রহে পূর্ণ অ্যাক্সেস",
        "রিডিং ট্র্যাকার ও প্রোফাইল অ্যাক্সেস",
        "মাসিক কুইজ প্রতিযোগিতায় অংশগ্রহণ",
      ],
      popular: false,
    },
  ];

  const faq = [
    {
      question: "মেম্বারশিপ ফি কি সম্পূর্ণ ফেরতযোগ্য?",
      answer:
        "হ্যাঁ! মেম্বারশিপ বাতিল করার সাথে সাথেই জামানতের টাকা 100% ফেরত দেওয়া হয়। বইয়ের সুরক্ষা নিশ্চিত করতেই এই ফেরতযোগ্য জামানত নেওয়া হয়।",
    },
    {
      question: "30 মিনিটের ডেলিভারি প্রক্রিয়া কীভাবে কাজ করে?",
      answer:
        "বইটির অনুরোধ অনুমোদনের পর প্রতিদিন সকাল 9 AM থেকে রাত 9 PM-এর মধ্যে 30 মিনিটের মধ্যে বই আপনার ঠিকানায় পৌঁছে দেওয়া হয়। ঢাকা শহরের অধিকাংশ এলাকায় এই সুবিধা রয়েছে।",
    },
    {
      question: "বই হারিয়ে গেলে বা ক্ষতিগ্রস্ত হলে কী করণীয়?",
      answer:
        "দুর্ঘটনা ঘটতেই পারে। সামান্য দাগ বা ব্যবহারে কোনো চার্জ নেই। তবে গুরুতর ক্ষতি বা বই হারিয়ে গেলে নতুন বই প্রতিস্থাপন অথবা সমপরিমাণ মূল্য পরিশোধ করতে হবে।",
    },
    {
      question: "বই পড়ার সময়সীমা কি বাড়ানো যায়?",
      answer:
        "হ্যাঁ, যদি বইটি অন্য কোনো পাঠক আগে থেকে বুক না করে থাকেন তবে আরও 7 দিন সময় বাড়িয়ে নিতে পারবেন। অ্যাপের মাধ্যমে বা ফোনে জানালেই হবে।",
    },
    {
      question: "ডিজিটাল বা ই-বুকের কোনো ব্যবস্থা আছে কি?",
      answer:
        "স্ক্রিন টাইম কমিয়ে বই পড়ার গভীর আনন্দ ধরে রাখতে আমরা মূলত ফিজিক্যাল প্রিন্টেড বই দিয়ে থাকি। তবে বিরল ও শিক্ষামূলক বইয়ের ক্ষেত্রে ই-বুক চালুর পরিকল্পনা চলছে।",
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
            যুক্ত হোন BASAR গ্রন্থাগারে
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            আমাদের পাঠক পরিবারের অংশ হোন এবং আপনার জ্ঞানার্জনের যাত্রাকে নতুন রূপ দিন। সহজ নিয়ম, সেরা বই এবং অসাধারণ কমিউনিটি সুবিধা।
          </p>
        </div>

        {/* Membership Plans */}
        <div
          ref={plansRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {membershipPlans.map((plan, index) => (
            <div
              key={index}
              className={`plan-card relative bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-200 ${
                plan.popular ? "ring-2 ring-emerald-500/80" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-emerald-600 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                  সর্বাধিক জনপ্রিয়
                </div>
              )}

              <div className="p-8 text-center bg-slate-50/50 dark:bg-[#1a1a1a]/50">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{plan.price}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{plan.period}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{plan.description}</p>
              </div>

              <div className="p-8">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="/granthagar/books-catalog"
                  className="block text-center w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-6 rounded-xl font-medium text-sm transition-colors shadow-sm active:scale-[0.99]"
                >
                  এখনই যুক্ত হোন
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div
          ref={benefitsRef}
          className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8 mb-12"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center flex items-center justify-center space-x-2">
            <Star className="w-5 h-5 text-amber-400 fill-current" />
            <span>মেম্বারশিপের বিশেষ সুবিধাসমূহ</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-[#1a1a1a] border border-slate-100 dark:border-[#262626] text-xs sm:text-sm text-slate-700 dark:text-slate-300"
              >
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rules and Policies */}
        <div
          ref={rulesRef}
          className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8 mb-12"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            সুশৃঙ্খল পাঠাগার পরিচালনার নীতিমালা
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rules.map((rule, index) => (
              <div
                key={index}
                className="rule-card bg-slate-50 dark:bg-[#1a1a1a] rounded-xl p-5 border border-slate-200 dark:border-[#262626] shadow-sm"
              >
                <div className="w-10 h-10 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center mb-3">
                  <rule.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                  {rule.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div
          ref={noticeRef}
          className="bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 mb-12 text-slate-800 dark:text-slate-200"
        >
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-base font-semibold text-amber-700 dark:text-amber-400 mb-2">
                জরুরি তথ্যাবলী
              </h3>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <p>• মেম্বারশিপ বাতিলের সাথে সাথে আপনার জামানতের টাকা 100% ফেরত দেওয়া হবে।</p>
                <p>• শিক্ষার্থী মেম্বারশিপের জন্য শিক্ষাপ্রতিষ্ঠানের বৈধ স্টুডেন্ট আইডি ভেরিফিকেশন প্রযোজ্য।</p>
                <p>• ঢাকা শহরে প্রতিদিন সকাল 9 AM থেকে রাত 9 PM পর্যন্ত সপ্তাহের 7 দিনই ডেলিভারি সেবা সক্রিয়।</p>
                <p>• বইসমূহ যত্নসহকারে পড়া এবং নির্ধারিত সময়ে ফেরত দিয়ে সুবিধাসমূহ বজায় রাখুন।</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div ref={faqRef} className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            সাধারণ জিজ্ঞাসা ও প্রশ্নোত্তর (FAQ)
          </h2>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <div
                key={index}
                className="faq-item border-b border-slate-100 dark:border-[#262626] pb-4 last:border-b-0"
              >
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  {item.question}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="bg-slate-900 dark:bg-[#141414] border border-slate-800 dark:border-[#303030] rounded-2xl shadow-sm p-8 sm:p-12 text-white text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            বই পড়ার রোমাঞ্চকর যাত্রা শুরু করতে প্রস্তুত?
          </h2>
          <p className="text-slate-300 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            আমাদের কমিউনিটি লাইব্রেরির মাধ্যমে জ্ঞান ও দক্ষতায় এগিয়ে চলা শত শত শিক্ষার্থী ও পাঠকের সাথে আজই যুক্ত হোন।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="/granthagar/books-catalog"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3 rounded-xl font-medium text-sm transition-colors shadow-sm active:scale-[0.99]"
            >
              শিক্ষার্থী হিসেবে যুক্ত হোন (৳100)
            </a>
            <a 
              href="/granthagar/books-catalog"
              className="border border-slate-600 dark:border-[#303030] bg-transparent hover:bg-slate-800 text-slate-300 px-7 py-3 rounded-xl font-medium text-sm transition-colors"
            >
              সাধারণ মেম্বারশিপ (৳200)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
