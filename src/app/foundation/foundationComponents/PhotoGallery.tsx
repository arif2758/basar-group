"use client";

import { useState, useRef } from "react";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    { key: "all", label: "All Projects" },
    { key: "education", label: "Education" },
    { key: "farming", label: "Farming" },
    { key: "seasonal", label: "Seasonal" },
    { key: "emergency", label: "Emergency" },
    { key: "healthcare", label: "Healthcare" },
  ];

  const photos: Photo[] = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/8613082/pexels-photo-8613082.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "education",
      title: "School Supply Distribution",
      description: "Children receiving new books and educational materials",
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/6646944/pexels-photo-6646944.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "seasonal",
      title: "Ramadan Food Packages",
      description: "Families receiving nutritious meal packages during Ramadan",
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/4960464/pexels-photo-4960464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "farming",
      title: "Improved Seeds Distribution",
      description: "Farmers receiving high-yield crop seeds and training",
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/6647004/pexels-photo-6647004.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "seasonal",
      title: "Winter Clothing Drive",
      description: "Warm clothes and blankets distribution for winter",
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/6303615/pexels-photo-6303615.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "healthcare",
      title: "Medical Camp",
      description: "Free healthcare services in rural communities",
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/6646929/pexels-photo-6646929.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "emergency",
      title: "Disaster Relief",
      description: "Emergency aid distribution after natural disasters",
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "education",
      title: "Study Tables Distribution",
      description: "Providing proper study furniture for home learning",
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "farming",
      title: "Agricultural Training",
      description: "Teaching modern farming techniques to increase productivity",
    },
    {
      id: 9,
      src: "https://images.pexels.com/photos/6647028/pexels-photo-6647028.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "seasonal",
      title: "Eid Celebrations",
      description: "Bringing joy to children during Eid festivities",
    },
    {
      id: 10,
      src: "https://images.pexels.com/photos/6256304/pexels-photo-6256304.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "emergency",
      title: "Clean Water Project",
      description: "Installing water purification systems in affected areas",
    },
    {
      id: 11,
      src: "https://images.pexels.com/photos/8923859/pexels-photo-8923859.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "education",
      title: "Solar Study Lights",
      description: "Providing rechargeable LED lights for evening studies",
    },
    {
      id: 12,
      src: "https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      category: "farming",
      title: "Farm Equipment Support",
      description: "Essential tools and equipment for efficient farming",
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
    <section ref={containerRef} className="py-20 marble-gradient">
      <div className="container mx-auto px-4">
        <div className="gallery-header text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Our Work in Pictures
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A visual journey through our programs and the communities we serve.
            Every image tells a story of hope, progress, and positive change.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons flex flex-wrap justify-center mb-12">
          <div className="bg-gray-100 rounded-full p-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-full m-1 transition-all duration-300 font-semibold ${
                  activeFilter === filter.key
                    ? "bg-emerald-600 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-white hover:shadow-md"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, ) => (
            <div
              key={photo.id}
              className="photo-card group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-lg mb-1">
                      {photo.title}
                    </h4>
                    <p className="text-white/90 text-sm">{photo.description}</p>
                  </div>
                  <button
                    onClick={() => openLightbox(photo)}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    <ZoomIn className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                  {photo.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="load-more-btn text-center mt-12">
          <button className="teal-slate-gradient text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-emerald-700 hover:to-sky-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            View More Photos
          </button>
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
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