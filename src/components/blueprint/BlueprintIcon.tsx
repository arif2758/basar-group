// src/components/blueprint/BlueprintIcon.tsx
"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

interface BlueprintIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function BlueprintIcon({
  name,
  className = "w-5 h-5",
  size = 20,
}: BlueprintIconProps) {
  const iconsMap = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>;
  const IconComponent = iconsMap[name] || LucideIcons.Sparkles;
  return <IconComponent className={className} size={size} />;
}
