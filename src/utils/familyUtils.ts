// src/utils/familyUtils.ts

import { FamilyMember } from "@/data/familyData";

// ফ্ল্যাট ডাটা তৈরি (সব সদস্যকে এক লিস্টে)
export function flattenMembers(members: FamilyMember[]): FamilyMember[] {
  const result: FamilyMember[] = [];
  function walk(nodes: FamilyMember[]) {
    for (const node of nodes) {
      result.push(node);
      if (node.children) walk(node.children);
    }
  }
  walk(members);
  return result;
}

// মোট সদস্য সংখ্যা
export function countMembers(members: FamilyMember[]): number {
  return flattenMembers(members).length;
}

// সর্বোচ্চ প্রজন্ম বের করা
export function getMaxGeneration(members: FamilyMember[]): number {
  return Math.max(...flattenMembers(members).map((m) => m.generation));
}

// 🟢 নতুন ফাংশন: জেন্ডার অনুযায়ী গণনা
export function countByGender(
  members: FamilyMember[],
  gender: "male" | "female"
): number {
  return flattenMembers(members).filter((m) => m.gender === gender).length;
}

// 🔵 পুরনো ফাংশনগুলো আবার ফিরিয়ে আনা (Backward Compatibility)
export const countMales = (members: FamilyMember[]) =>
  countByGender(members, "male");
export const countFemales = (members: FamilyMember[]) =>
  countByGender(members, "female");

// সার্চ ফাংশন
export function searchMembers(
  members: FamilyMember[],
  query: string
): FamilyMember[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return flattenMembers(members).filter((m) =>
    m.name.toLowerCase().includes(q)
  );
}

// প্রজন্মের বাংলা নাম
export function getGenerationLabel(gen: number): string {
  const labels: Record<number, string> = {
    0: "মূল",
    1: "১ম প্রজন্ম",
    2: "২য় প্রজন্ম",
    3: "৩য় প্রজন্ম",
    4: "৪র্থ প্রজন্ম",
    5: "৫ম প্রজন্ম",
    6: "৬ষ্ঠ প্রজন্ম",
    7: "৭ম প্রজন্ম",
  };
  return labels[gen] || `${gen}তম প্রজন্ম`;
}

// নির্দিষ্ট সদস্যের সব পূর্বপুরুষের key বের করা (সার্চের জন্য)
export function getAncestorKeys(key: string): string[] {
  const parts = key.split("-");
  const keys: string[] = [];
  for (let i = 1; i <= parts.length; i++) {
    keys.push(parts.slice(0, i).join("-"));
  }
  return keys;
}