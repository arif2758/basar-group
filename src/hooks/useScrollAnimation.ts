"use client";

import { useEffect } from "react";

/**
 * useScrollAnimation
 * A lightweight hook to trigger CSS animations when elements enter the viewport.
 * 
 * Usage:
 * 1. Add `.animate-on-scroll` to the elements you want to animate.
 * 2. Add specific animation classes like `.fade-up`, `.scale-up`, etc.
 * 3. Call `useScrollAnimation()` in your component (it runs on mount).
 */
export function useScrollAnimation() {
  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add 'is-visible' class to trigger CSS animation
            entry.target.classList.add("is-visible");
            // Optional: Unobserve after animating once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px", // Trigger slightly before it comes into full view
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    // Find all elements with .animate-on-scroll
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
}
