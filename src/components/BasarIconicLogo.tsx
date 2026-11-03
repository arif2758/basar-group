"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BasarIconicLogoProps {
  className?: string;
  size?: number;
  variant?: "brand" | "gold" | "monochrome" | "cyan";
  withGlow?: boolean;
}

/**
 * Ultra-Premium, Masterclass Iconic Vector Logo Mark for BASAR Group.
 * Mathematical Golden-Ratio Geometry combining:
 * 1. The stylized letter 'B' (BASAR)
 * 2. Open Pages of Wisdom & Knowledge (Learn)
 * 3. Soaring Ascending Wings of Growth & Prosperity (Earn)
 * 4. Interlocking Unity Knot of Community Care (Empower)
 */
export default function BasarIconicLogo({
  className,
  size = 36,
  variant = "brand",
  withGlow = false,
}: BasarIconicLogoProps) {
  const gradientId = `basar-grad-${variant}`;
  const glowId = `basar-glow-${variant}`;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center shrink-0 select-none group", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Brand Multi-Tone Cyan / Royal Blue / Indigo Gradient */}
          <linearGradient id="basar-grad-brand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>

          {/* Luxury 24K Gold & Platinum Gradient */}
          <linearGradient id="basar-grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="85%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>

          {/* Electric Neon Cyan Gradient */}
          <linearGradient id="basar-grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Pure Crisp Monochrome */}
          <linearGradient id="basar-grad-monochrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Ambient Glow Filter */}
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Glow Aura */}
        {withGlow && (
          <circle
            cx="50"
            cy="50"
            r="38"
            fill={`url(#${gradientId})`}
            opacity="0.18"
            className="blur-md animate-pulse"
          />
        )}

        {/* Left Vertical Foundation Pillar (Continuous Spine) */}
        <path
          d="M24 16 C24 13.79 25.79 12 28 12 L32 12 C34.21 12 36 13.79 36 16 L36 84 C36 86.21 34.21 88 32 88 L28 88 C25.79 88 24 86.21 24 84 Z"
          fill={`url(#${gradientId})`}
        />

        {/* Top Loop: Open Book Wing of Knowledge (Learn) */}
        <path
          d="M36 18 C46 16 62 18 70 26 C76 32 76 42 68 47 C60 51 46 51 36 51 L36 39 C44 39 56 39 60 36 C64 33 63 28 58 26 C52 24 42 26 36 28 Z"
          fill={`url(#${gradientId})`}
          opacity="0.95"
        />

        {/* Bottom Loop: Ascending Prosperity & Empowerment Wing (Earn & Empower) */}
        <path
          d="M36 49 C48 49 65 48 74 54 C82 60 82 72 74 79 C66 85 48 85 36 83 L36 71 C44 73 58 74 64 70 C69 66 68 60 62 58 C55 56 44 57 36 57 Z"
          fill={`url(#${gradientId})`}
        />

        {/* Central Unity Diamond Sparkle / Core Innovation Node */}
        <path
          d="M50 43 L54 50 L50 57 L46 50 Z"
          fill="#ffffff"
          opacity="0.9"
        />

        {/* Dynamic Ascending Apex Feather Accent */}
        <path
          d="M66 14 C73 17 78 22 80 28 C78 24 72 20 66 18 Z"
          fill={`url(#${gradientId})`}
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
