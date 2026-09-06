"use client";

import { useState, useRef } from "react";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);
 
interface Photo {
  id: number;
  src: string;
  category: string;
  title: string;
  description: string;
}

const PhotoGallery = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxImage, setLightboxImage] = useState<Photo | null>(null);
  const containerRef = useRef(null);

  const filters = [
    { key: "all", label: "সকল কার্যক্রম" },
    { key: "education", label: "শিক্ষা সহায়তা" },
    { key: "farming", label: "কৃষি সহায়তা" },
    { key: "seasonal", label: "মৌসুমি উপহার" },
    { key: "emergency", label: "জরুরি ত্রাণ" },
    { key: "healthcare", label: "স্বাস্থ্যসেবা" },
  ];

  const photos: Photo[] = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/8613082/pexels-photo-8613082.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "education",
      title: "শিক্ষা উপকরণ বিতরণ",
      description: "সুবিধাবঞ্চিত শিক্ষার্থীদের মাঝে নতুন বই, খাতা ও স্কুলব্যাগ বিতরণ",
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/6646944/pexels-photo-6646944.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "seasonal",
      title: "রমজান ফুড প্যাকেজ",
      description: "পবিত্র রমজানে অসহায় পরিবারের জন্য পুষ্টিকর খাদ্য ও ইফতার সামগ্রী বিতরণ",
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/4960464/pexels-photo-4960464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "farming",
      title: "উন্নত জাতের বীজ বিতরণ",
      description: "প্রান্তিক কৃষকদের মাঝে অধিক ফলনশীল বীজ ও আধুনিক প্রশিক্ষণ প্রদান",
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/6647004/pexels-photo-6647004.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "seasonal",
      title: "শীতবস্ত্র ও কম্বল বিতরণ",
      description: "কঠোর শীতে শীতার্ত মানুষের সুরক্ষায় উষ্ণ পোশাক ও লেপ-কম্বল বিতরণ",
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/6303615/pexels-photo-6303615.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "healthcare",
      title: "ফ্রি মেডিকেল ক্যাম্প",
      description: "প্রত্যন্ত গ্রামীণ জনগোষ্ঠীর জন্য বিনামূল্যে বিশেষজ্ঞ চিকিৎসাসেবা ও ওষুধ প্রদান",
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/6646929/pexels-photo-6646929.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "emergency",
      title: "দুর্যোগকালীন জরুরি ত্রাণ",
      description: "বন্যা ও প্রাকৃতিক দুর্যোগে ক্ষতিগ্রস্ত পরিবারের মাঝে দ্রুত খাদ্য ও ওষুধ সহায়তা",
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "education",
      title: "পড়ার টেবিল-চেয়ার বিতরণ",
      description: "শিশুদের স্বাচ্ছন্দ্যে পড়াশোনার জন্য ঘরোয়া উপযোগী ফার্নিচার প্রদান",
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "farming",
      title: "কৃষি আধুনিকায়ন প্রশিক্ষণ",
      description: "উৎপাদনশীলতা বাড়াতে কৃষকদের পরিবেশবান্ধব জৈব চাষাবাদ পদ্ধতি প্রশিক্ষণ",
    },
    {
      id: 9,
      src: "https://images.pexels.com/photos/6647028/pexels-photo-6647028.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "seasonal",
      title: "ঈদ আনন্দ ও নতুন জামা",
      description: "সুবিধাবঞ্চিত শিশুদের জন্য ঈদের খুশি ছড়িয়ে দিতে রঙিন নতুন পোশাক বিতরণ",
    },
    {
      id: 10,
      src: "https://images.pexels.com/photos/6256304/pexels-photo-6256304.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "emergency",
      title: "নিরাপদ খাবার পানি প্রকল্প",
      description: "আর্সেনিকমুক্ত গভীর নলকূপ ও ওয়াটার পিউরিফিকেশন সিস্টেম স্থাপন",
    },
    {
      id: 11,
      src: "https://images.pexels.com/photos/8923859/pexels-photo-8923859.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "education",
      title: "সোলার স্টাডি ল্যাম্প",
      description: "বিদ্যুৎবিহীন চরাঞ্চলে শিশুদের পড়াশোনায় আলো ছড়িয়ে দিতে রিচার্জেবল সোলার ল্যাম্প",
    },
    {
      id: 12,
      src: "https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "farming",
      title: "কৃষি যন্ত্রপাতি সহায়তা",
      description: "প্রান্তিক কৃষকদের সাশ্রয়ী ও দ্রুত চাষাবাদের জন্য ছোট আধুনিক কৃষি সরঞ্জাম",
    },
  ];

  const filteredPhotos =
    activeFilter === "all"
      ? photos
      : photos.filter((photo) => photo.category === activeFilter);

  const openLightbox = (photo: Photo) => {
    setLightboxImage(photo);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  useScrollAnimation();
  useGSAP(() => {
    // Header animation
    gsap.from(".gallery-header", {
      scrollTrigger: {
        trigger: ".gallery-header",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Filter buttons animation
    gsap.from(".filter-buttons", {
      scrollTrigger: {
        trigger: ".filter-buttons",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    // Load more button animation
    gsap.from(".load-more-btn", {
      scrollTrigger: {
        trigger: ".load-more-btn",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });

  }, { scope: containerRef, dependencies: [activeFilter] });

  // Photo grid animation when filter changes
  useScrollAnimation();
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".photo-card").forEach((card, index) => {
      gsap.fromTo(card, 
        { y: 30, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.5,
          delay: index * 0.05,
          ease: "power2.out"
        }
      );
    });
  }, [activeFilter]);

  return (
    <section ref={containerRef} className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="gallery-header text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            ছবিতে আমাদের সমাজকল্যাণমূলক কার্যক্রম
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            আমাদের নানা কর্মসূচি ও সেবাগ্রহীতাদের প্রাণবন্ত মুহূর্তসমূহের এক ঝলক। প্রতিটি ছবি বলে আশার গল্প ও ইতিবাচক রূপান্তরের কথা।
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons flex flex-wrap justify-center mb-12">
          <div className="bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl p-1.5 flex flex-wrap gap-1">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium ${
                  activeFilter === filter.key
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#1f1f1f]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="photo-card group relative bg-white dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden relative">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-base mb-1">
                      {photo.title}
                    </h4>
                    <p className="text-white/80 text-xs leading-relaxed">{photo.description}</p>
                  </div>
                  <button
                    onClick={() => openLightbox(photo)}
                    aria-label="Zoom Photo"
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full transition-all duration-200"
                  >
                    <ZoomIn className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-emerald-600/90 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                  {filters.find(f => f.key === photo.category)?.label || photo.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="load-more-btn text-center mt-12">
          <button className="bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-[#1f1f1f] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#303030] px-8 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm active:scale-[0.98]">
            আরও ছবি দেখুন
          </button>
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="max-w-4xl max-h-full">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-2xl"
              />
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-4 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {lightboxImage.title}
                </h3>
                <p className="text-white/90">{lightboxImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;