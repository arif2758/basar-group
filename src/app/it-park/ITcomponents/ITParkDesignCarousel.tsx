"use client";

import React, { useState, useEffect, useCallback, useMemo, useSyncExternalStore } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  MapPin,
  Building2,
  Coffee,
  Laptop,
  TreePine,
  Zap,
  Play,
  Pause
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DesignSlide {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryIcon: React.ElementType;
  badge: string;
  imageUrl: string;
  location: string;
}

const DESIGN_SLIDES: DesignSlide[] = [
  {
    id: "balashur-campus",
    title: "বাছার ইকো আইটি পার্ক — মূল ক্যাম্পাস ও সেন্ট্রাল ইনোভেশন হাব",
    subtitle: "প্রাকৃতিক সবুজ ও সমকালীন গ্লাস-ফেসাড স্থাপত্যের সমন্বয়ে বালাসুরে প্রস্তাবিত বাছার আইটি পার্কের মূল কেন্দ্রীয় কমপ্লেক্স ও টেক একাডেমি।",
    category: "মাস্টারপ্ল্যান ও ক্যাম্পাস",
    categoryIcon: Building2,
    badge: "প্রস্তাবিত মূল ক্যাম্পাস",
    imageUrl: "https://res.cloudinary.com/tanjumart/image/upload/v1794798055/eco_garden_it_park_balashur_1794719680535_vzsjip.jpg",
    location: "বালাসুর, ঢাকা-মাওয়া এক্সপ্রেসওয়ে সংলগ্ন",
  },
  {
    id: "mango-orchard-cafe",
    title: "আমবাগান স্টাডি ক্যাফে ও ওপেন-এয়ার লার্নিং প্যাভিলিয়ন",
    subtitle: "ঘন ছায়াঘেরা ঐতিহ্যবাহী আমবাগানের স্নিগ্ধ পরিবেশে শিক্ষার্থী ও ফ্রিল্যান্সারদের জন্য উন্মুক্ত রিডিং জোন, ক্যাফেটেরিয়া ও আইডিয়া শেয়ারিং স্পট।",
    category: "স্টাডি ক্যাফে",
    categoryIcon: Coffee,
    badge: "ওপেন-এয়ার ক্যাফে",
    imageUrl: "https://res.cloudinary.com/tanjumart/image/upload/v1794798057/dense_mango_orchard_study_cafe_1794725099346_kriq4g.jpg",
    location: "আমবাগান ইকো জোন, ক্যাম্পাস প্রাঙ্গণ",
  },
  {
    id: "eco-flush-tables",
    title: "ইকো গার্ডেন ফ্লাশ-টেবিল ওয়ার্কস্টেশন ও আউটডোর ল্যাব",
    subtitle: "বাগানের প্রাকৃতিক ল্যান্ডস্কেপের সাথে মিশে থাকা আধুনিক এর্গোনমিক আউটডোর টেবিল, যেখানে রয়েছে বিদ্যুৎ ও নিরবচ্ছিন্ন ওয়াইফাই সংযোগ।",
    category: "আউটডোর ওয়ার্কস্টেশন",
    categoryIcon: Laptop,
    badge: "স্মার্ট ওয়ার্কস্টেশন",
    imageUrl: "https://res.cloudinary.com/tanjumart/image/upload/v1794798056/bangladesh_eco_study_park_flush_table_1794725276778_uq9mdb.jpg",
    location: "ইকো গার্ডেন কর্নার, জোন-১",
  },
  {
    id: "courtyard-cafe",
    title: "বাছার কোর্টইয়ার্ড ক্যাফে ও কমিউনিটি প্লাজা",
    subtitle: "তরুণ উদ্যোক্তা, সফটওয়্যার ইঞ্জিনিয়ার এবং শিক্ষার্থীদের মিলনমেলা — যেখানে চায়ের আড্ডার সাথে জন্ম নেবে নতুন নতুন টেক স্টার্টআপ ও উদ্ভাবন।",
    category: "কমিউনিটি প্লাজা",
    categoryIcon: Coffee,
    badge: "কোর্টইয়ার্ড ক্যাফে",
    imageUrl: "https://res.cloudinary.com/tanjumart/image/upload/v1794798055/basar_courtyard_cafe_realistic_v4_tcdbvk.jpg",
    location: "সেন্ট্রাল কোর্টইয়ার্ড, মেইন বিল্ডিং",
  },
  {
    id: "garden-study-park",
    title: "ইকো গার্ডেন স্টাডি পার্ক ও গ্রুপ কোলাবোরেশন জোন",
    subtitle: "কোলাহলমুক্ত সবুজ পরিবেশ যেখানে শিক্ষার্থীরা দলগত প্রজেক্ট, পেয়ার প্রোগ্রামিং ও স্কিল ডেভেলপমেন্ট বুটক্যাম্পে অংশ নিতে পারবেন।",
    category: "গ্রুপ স্টাডি জোন",
    categoryIcon: TreePine,
    badge: "গ্রিন লার্নিং স্পেস",
    imageUrl: "https://res.cloudinary.com/tanjumart/image/upload/v1794798055/eco_garden_study_park_bangladesh_1794724569073_ytnxjf.jpg",
    location: "সাউথ গার্ডেন লন",
  },
  {
    id: "mango-tree-tables",
    title: "হেরিটেজ ম্যাঙ্গো ট্রি ওয়ার্কিং বেঞ্চ ও কোডিং লাউঞ্জ",
    subtitle: "প্রকৃতির ঐতিহ্য ও আধুনিক প্রযুক্তির অনন্য মিশ্রণ — শতাব্দীপ্রাচীন আমগাছের শীতল ছায়ায় বসে ল্যাপটপে কোডিং ও গ্লোবাল ক্লায়েন্টের কাজ।",
    category: "হেরিটেজ কোডিং লাউঞ্জ",
    categoryIcon: Zap,
    badge: "হেরিটেজ স্পেস",
    imageUrl: "https://res.cloudinary.com/tanjumart/image/upload/v1794798055/bangladesh_garden_mango_tree_study_table_fixed_1794724220978_wdpfzk.jpg",
    location: "হেরিটেজ গ্রোভ, বাছার আইটি পার্ক",
  },
  {
    id: "perfected-eco-park",
    title: "পারফেক্টেড ইকো স্টাডি পার্ক ও স্মার্ট এআই প্যাভিলিয়ন",
    subtitle: "গ্লাস রুফটপ, সোলার গ্রিড এবং ডিজিটাল ইন্টারঅ্যাক্টিভ ডিসপ্লেসহ বাছার আইটি পার্কের ভবিষ্যৎমুখী আধুনিক স্থাপত্য মডেল।",
    category: "স্মার্ট প্যাভিলিয়ন",
    categoryIcon: Building2,
    badge: "স্মার্ট ইনোভেশন",
    imageUrl: "https://res.cloudinary.com/tanjumart/image/upload/v1794798055/eco_garden_study_park_perfected_1794724959689_xxy5vc.jpg",
    location: "নর্থ প্যাভিলিয়ন এরিয়া",
  },
  {
    id: "twilight-coffee-garden",
    title: "টোয়াইলাইট কফি গার্ডেন ও ইভনিং কোর্টইয়ার্ড লাউঞ্জ",
    subtitle: "গোধূলি ও সন্ধ্যার উষ্ণ আলোছায়ায় শান্ত মনোরম পরিবেশ — যেখানে মুক্তমঞ্চ, ওয়ার্ম লাইটিং এবং কফি কর্নারে জমবে ডেভেলপার ও ফ্রিল্যান্সারদের সান্ধ্যকালীন আড্ডা।",
    category: "ইভনিং কোর্টইয়ার্ড",
    categoryIcon: Coffee,
    badge: "টোয়াইলাইট লাউঞ্জ",
    imageUrl: "https://res.cloudinary.com/tanjumart/image/upload/v1794799459/Twilight_Coffee_Garden_Courtyard_ekoiva.png",
    location: "সেন্ট্রাল কোর্টইয়ার্ড গার্ডেন",
  },
];

const emptySubscribe = () => () => {};

export default function ITParkDesignCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxSlide, setLightboxSlide] = useState<DesignSlide | null>(null);

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const autoplayPlugin = useMemo(() => {
    if (!isClient) return undefined;
    return Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true });
  }, [isClient]);

  const plugins = useMemo(() => {
    return autoplayPlugin ? [autoplayPlugin] : [];
  }, [autoplayPlugin]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    plugins
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    if (!autoplayPlugin) return;
    if (isPlaying) {
      autoplayPlugin.stop();
      setIsPlaying(false);
    } else {
      autoplayPlugin.play();
      setIsPlaying(true);
    }
  }, [autoplayPlugin, isPlaying]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    setSelectedIndex(emblaApi.selectedScrollSnap());

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSlide(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentSlide = DESIGN_SLIDES[selectedIndex];

  return (
    <section className="relative w-full space-y-3 pt-1">
      {/* Top Header: Vision & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 px-1">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>প্রস্তাবিত স্থাপত্য ও ইকো-ক্যাম্পাস ডিজাইন ভিশন</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            বাছার আইটি পার্ক — ভবিষ্যত ক্যাম্পাস রূপরেখা
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            প্রকৃতি, নিরিবিলি পরিবেশ এবং অত্যাধুনিক প্রযুক্তির সমন্বয়ে আমাদের ভবিষ্যৎ ক্যাম্পাসের পরিকল্পনা।
          </p>
        </div>

        {/* Action Controls & Counter */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-slate-600 dark:text-slate-300 shadow-2xs">
            <span className="text-[#1677ff]">{String(selectedIndex + 1).padStart(2, "0")}</span>
            <span className="text-slate-400 mx-1">/</span>
            <span>{String(DESIGN_SLIDES.length).padStart(2, "0")}</span>
          </div>

          <button
            onClick={toggleAutoplay}
            type="button"
            aria-label={isPlaying ? "পজ করুন" : "প্লে করুন"}
            className="size-8 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-slate-600 dark:text-slate-300 hover:text-[#1677ff] hover:border-[#1677ff]/40 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            title={isPlaying ? "অটোপ্লে বন্ধ করুন" : "অটোপ্লে চালু করুন"}
          >
            {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={scrollPrev}
              type="button"
              aria-label="পূর্ববর্তী ডিজাইন"
              className="size-8 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-200 hover:text-[#1677ff] hover:border-[#1677ff]/40 hover:scale-105 active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={scrollNext}
              type="button"
              aria-label="পরবর্তী ডিজাইন"
              className="size-8 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-200 hover:text-[#1677ff] hover:border-[#1677ff]/40 hover:scale-105 active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Image Stage (100% Pure Clean Image - No Text Overlays) */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] shadow-md group">
        <div className="overflow-hidden w-full relative" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {DESIGN_SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className="flex-[0_0_100%] min-w-0 relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] max-h-[560px] select-none bg-slate-900 cursor-pointer"
                onClick={() => setLightboxSlide(slide)}
              >
                {/* 100% Crystal Clean Image - No Dark Gradient, No Text */}
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  className="object-cover object-center transition-transform duration-500 hover:scale-[1.01]"
                />

                {/* Subtle Floating Maximize Button in Corner */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxSlide(slide);
                  }}
                  aria-label="ছবিটি বড় করে দেখুন"
                  className="absolute top-4 right-4 z-20 size-9 rounded-xl bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg opacity-80 group-hover:opacity-100"
                  title="বড় করে দেখুন"
                >
                  <Maximize2 className="size-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Floating Left & Right Arrows */}
          <button
            onClick={scrollPrev}
            type="button"
            aria-label="পূর্ববর্তী স্লাইড"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg hidden sm:flex opacity-70 hover:opacity-100"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={scrollNext}
            type="button"
            aria-label="পরবর্তী স্লাইড"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg hidden sm:flex opacity-70 hover:opacity-100"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Minimalist Indicators (Pure dots, no container bg/border) */}
          <div className="absolute bottom-3.5 right-4 sm:right-6 z-20 flex items-center gap-1.5">
            {DESIGN_SLIDES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollTo(dotIdx)}
                aria-label={`স্লাইড ${dotIdx + 1}-এ যান`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]",
                  dotIdx === selectedIndex
                    ? "w-6 bg-white shadow-xs"
                    : "w-1.5 bg-white/60 hover:bg-white/90"
                )}
              />
            ))}
          </div>
        </div>

        {/* Clean Info Caption Strip Placed BELOW the Image (Unobstructed View) */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#1a1a1a] border-t border-slate-100 dark:border-[#282828]">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1677ff] dark:text-[#4096ff]">
                ডিজাইন নং {selectedIndex + 1} • {currentSlide.category}
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <MapPin className="size-3 text-rose-500 shrink-0" />
                {currentSlide.location}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {currentSlide.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {currentSlide.subtitle}
            </p>
          </div>

          <button
            onClick={() => setLightboxSlide(currentSlide)}
            type="button"
            className="self-start sm:self-center shrink-0 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#252525] hover:bg-slate-200 dark:hover:bg-[#303030] text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200 dark:border-[#333]"
          >
            <Maximize2 className="size-3.5" />
            <span>বড় করে দেখুন</span>
          </button>
        </div>
      </div>

      {/* 7-Thumbnail Preview Rail */}
      <div className="w-full overflow-x-auto no-scrollbar pt-1 pb-1">
        <div className="flex items-center gap-2.5 min-w-max">
          {DESIGN_SLIDES.map((slide, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={slide.id}
                onClick={() => scrollTo(idx)}
                type="button"
                className={cn(
                  "group relative flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl border transition-all text-left cursor-pointer",
                  isActive
                    ? "bg-white dark:bg-[#1f1f1f] border-[#1677ff] shadow-sm ring-1 ring-[#1677ff]/30 scale-[1.02]"
                    : "bg-white/60 dark:bg-[#1a1a1a]/60 border-slate-200 dark:border-[#2b2b2b] hover:border-slate-400 dark:hover:border-[#404040] opacity-75 hover:opacity-100"
                )}
              >
                {/* Micro Thumbnail Image */}
                <div className="relative size-11 sm:size-12 rounded-xl overflow-hidden shrink-0 border border-black/10 dark:border-white/10">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    fill
                    sizes="60px"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-[#1677ff]/20 flex items-center justify-center">
                      <span className="size-2 rounded-full bg-white ring-2 ring-[#1677ff]" />
                    </div>
                  )}
                </div>

                {/* Micro Meta */}
                <div className="space-y-0.5 max-w-[130px] sm:max-w-[150px]">
                  <p
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-wider line-clamp-1",
                      isActive ? "text-[#1677ff]" : "text-slate-400"
                    )}
                  >
                    ডিজাইন {idx + 1} • {slide.badge}
                  </p>
                  <p
                    className={cn(
                      "text-xs font-semibold truncate",
                      isActive
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-600 dark:text-slate-300"
                    )}
                  >
                    {slide.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal (Completely Unobstructed High-Res Image View) */}
      {lightboxSlide && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Top Bar with Title & Close */}
          <div className="flex items-center justify-between gap-4 text-white">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                {lightboxSlide.category} • {lightboxSlide.location}
              </span>
              <h4 className="text-sm sm:text-base font-bold">{lightboxSlide.title}</h4>
            </div>

            <button
              onClick={() => setLightboxSlide(null)}
              type="button"
              aria-label="বন্ধ করুন"
              className="size-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Centered High-Res Pure Image (No overlay at all) */}
          <div className="relative flex-grow flex items-center justify-center my-2 overflow-hidden rounded-2xl">
            <div className="relative w-full h-full max-w-6xl max-h-[82vh]">
              <Image
                src={lightboxSlide.imageUrl}
                alt={lightboxSlide.title}
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Bottom Bar Info */}
          <div className="max-w-4xl mx-auto text-center space-y-1 text-slate-300 pb-1">
            <p className="text-xs sm:text-sm">{lightboxSlide.subtitle}</p>
            <p className="text-[11px] text-slate-500">
              কীবোর্ডের <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-slate-300">ESC</kbd> চেপে প্রস্থান করুন
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
