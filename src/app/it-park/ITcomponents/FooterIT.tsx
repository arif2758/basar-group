"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebook,
  FaGraduationCap,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";

gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

function FooterIT() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Create a smooth reveal timeline for the entire footer
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: "bottom 95%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate footer sections with a wave-like stagger effect
    tl.fromTo(".footer-section", 
      {
        opacity: 0,
        y: 60,
        rotationX: -15,
        transformOrigin: "50% 100%"
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: {
          each: 0.2,
          from: "start",
          ease: "sine.inOut"
        },
        ease: "expo.out"
      }
    )

    // Animate the divider line
    .fromTo(".footer-divider", 
      {
        scaleX: 0,
        transformOrigin: "left center"
      },
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.inOut"
      }, "-=0.6"
    )

    // Copyright section slides up smoothly
    .fromTo(".copyright-section", 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");

    // Sophisticated hover animations for social icons
    gsap.utils.toArray<HTMLElement>(".social-icon").forEach((icon, index) => {
      // Create individual timelines for each icon
      const hoverTl = gsap.timeline({ paused: true });
      
      hoverTl.to(icon, {
        scale: 1.2,
        rotation: 10,
        color: "#10b981", // emerald-500
        duration: 0.3,
        ease: "back.out(2)"
      })
      .to(icon, {
        y: -3,
        duration: 0.2,
        ease: "power2.out"
      }, "-=0.1");

      Observer.create({
        target: icon,
        type: "pointer",
        onHover: () => hoverTl.play(),
        onHoverEnd: () => hoverTl.reverse()
      });

      // Add a subtle floating animation
      gsap.to(icon, {
        y: -2,
        duration: 2 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      });
    });

    // Enhanced navigation link animations
    gsap.utils.toArray<HTMLElement>(".nav-link").forEach(link => {
      const linkTl = gsap.timeline({ paused: true });
      
      linkTl.to(link, {
        x: 5,
        color: "#ffffff",
        duration: 0.3,
        ease: "power2.out"
      });

      Observer.create({
        target: link,
        type: "pointer",
        onHover: () => linkTl.play(),
        onHoverEnd: () => linkTl.reverse()
      });
    });

    // Add subtle parallax effect to the entire footer
    gsap.to(containerRef.current, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <footer className="bg-gray-900 text-white py-16" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="footer-grid grid md:grid-cols-4 gap-8 mb-12">
          <div className="footer-section">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <FaGraduationCap className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold">BASAR IT Park</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering communities through education, creating opportunities
              for growth and prosperity.
            </p>
            <div className="flex space-x-4">
              <FaFacebook className="social-icon text-2xl cursor-pointer" />
              <FaTwitter className="social-icon text-2xl cursor-pointer" />
              <FaInstagram className="social-icon text-2xl cursor-pointer" />
              <FaLinkedin className="social-icon text-2xl cursor-pointer" />
            </div>
          </div>

          <div className="footer-section">
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#about"
                  className="nav-link text-gray-400 cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="nav-link text-gray-400 cursor-pointer"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="#jobs"
                  className="nav-link text-gray-400 cursor-pointer"
                >
                  Job Board
                </Link>
              </li>
              <li>
                <Link
                  href="#events"
                  className="nav-link text-gray-400 cursor-pointer"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="#guardian"
                  className="nav-link text-gray-400 cursor-pointer"
                >
                  Guardian Access
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="text-lg font-bold mb-6">Programs</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400">Web Development</span>
              </li>
              <li>
                <span className="text-gray-400">Graphics Design</span>
              </li>
              <li>
                <span className="text-gray-400">Digital Marketing</span>
              </li>
              <li>
                <span className="text-gray-400">Photography</span>
              </li>
              <li>
                <span className="text-gray-400">Co-Working Space</span>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-emerald-400" />
                <span className="text-gray-400">
                  BASAR Community, Local Area
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-emerald-400" />
                <span className="text-gray-400">+880 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-emerald-400" />
                <span className="text-gray-400">info@basaritpark.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright-section border-t border-gray-800 pt-8">
          <div className="footer-divider absolute left-0 right-0 h-px bg-gray-800"></div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 BASAR IT Park. All rights reserved. Built with ❤️ for
              community growth.
            </p>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="nav-link text-gray-400 cursor-pointer"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="nav-link text-gray-400 cursor-pointer"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="nav-link text-gray-400 cursor-pointer"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterIT;