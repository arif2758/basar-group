// src/app/blueprint/[slug]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import DocsView from "@/components/blueprint/DocsView";

export default function BlueprintSlugDocPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : ((params?.slug as string) || "constitution");

  return <DocsView slug={slug} />;
}

