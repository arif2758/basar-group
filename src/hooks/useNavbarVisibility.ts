"use client";

import { useState, useEffect } from "react";

/**
 * Hook to track whether the main Navbar is currently visible or hidden (due to scroll down/up).
 * Automatically stays synchronized with Navbar scroll events.
 */
export function useNavbarVisibility() {
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // When near the top, always show navbar
      if (currentScrollY < 80) {
        setIsNavVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleNavbarEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ isVisible: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.isVisible === "boolean") {
        setIsNavVisible(customEvent.detail.isVisible);
      }
    };
    window.addEventListener("navbar-visibility", handleNavbarEvent);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("navbar-visibility", handleNavbarEvent);
    };
  }, []);

  return isNavVisible;
}
