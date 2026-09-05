// src/utils/familyUtils.ts

import { FamilyMember, FlatFamilyMember } from "@/data/familyData";

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
    m.title.toLowerCase().includes(q)
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

export function getGenerationColor(gen: number): string {
  const colors = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
  ];
  return colors[gen % colors.length];
}

// নির্দিষ্ট key দিয়ে সদস্য খোঁজা
export function findMemberByKey(
  members: FamilyMember[],
  key: string
): FamilyMember | null {
  for (const node of members) {
    if (node.key === key) return node;
    if (node.children) {
      const found = findMemberByKey(node.children, key);
      if (found) return found;
    }
  }
  return null;
}

// কোনো সদস্যের পূর্বপুরুষের ধারাবাহিক তালিকা (Lineage Path)
export function getAncestryLineage(
  members: FamilyMember[],
  targetKey: string
): FamilyMember[] {
  const result: FamilyMember[] = [];
  const parts = targetKey.split("-");
  for (let i = 1; i <= parts.length; i++) {
    const k = parts.slice(0, i).join("-");
    const node = findMemberByKey(members, k);
    if (node) result.push(node);
  }
  return result;
}

// ─────────────────────────────────────────────
// অর্থবোধক আইডি ও ট্রি মিউটেশন ইউটিলিটি
// ─────────────────────────────────────────────

// পিতা/অভিভাবকের আইডির ওপর ভিত্তি করে পরবর্তী সন্তানের অর্থবোধক ইউনিক আইডি তৈরি
export function generateNextChildKey(
  parentKey: string,
  existingChildren?: FamilyMember[]
): string {
  if (!existingChildren || existingChildren.length === 0) {
    return `${parentKey}-1`;
  }

  // বিদ্যমান সন্তানদের শেষের ডিজিটগুলোর মধ্যে সর্বোচ্চ সংখ্যাটি বের করা
  let maxOrder = 0;
  for (const child of existingChildren) {
    const parts = child.key.split("-");
    const lastPart = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(lastPart) && lastPart > maxOrder) {
      maxOrder = lastPart;
    }
  }

  // যদি কোনো কারণে পার্স না হয় তবে মোট দৈর্ঘ্যের ওপর ভিত্তি করে
  const nextOrder = maxOrder > 0 ? maxOrder + 1 : existingChildren.length + 1;
  return `${parentKey}-${nextOrder}`;
}

// আইডির তথ্য পার্স করা (প্রজন্ম, সন্তানের ক্রম ও পিতার আইডি)
export function parseMemberKeyInfo(key: string): {
  generation: number;
  birthOrder: number;
  parentKey: string | null;
} {
  const parts = key.split("-");
  const birthOrder = parseInt(parts[parts.length - 1], 10) || 1;
  const generation = Math.max(0, parts.length - 1);
  const parentKey = parts.length > 1 ? parts.slice(0, -1).join("-") : null;

  return {
    generation,
    birthOrder,
    parentKey,
  };
}

// ড্রপডাউনে পিতা/অভিভাবক নির্বাচনের জন্য সকল সদস্যের তালিকা
export function getAllSelectableParents(
  members: FamilyMember[]
): { key: string; title: string; generation: number; gender?: string }[] {
  return flattenMembers(members).map((m) => ({
    key: m.key,
    title: m.title,
    generation: m.generation,
    gender: m.gender,
  }));
}

// পরিবারবৃক্ষে নতুন সদস্য যুক্ত করার মূল ফাংশন (ইমিউটেবল)
export function addMemberToTree(
  tree: FamilyMember[],
  parentKey: string,
  newMemberData: Omit<FamilyMember, "key" | "generation">
): { updatedTree: FamilyMember[]; newMember: FamilyMember } | null {
  // ডিপ কপি তৈরি
  const clonedTree: FamilyMember[] = JSON.parse(JSON.stringify(tree));

  const parent = findMemberByKey(clonedTree, parentKey);
  if (!parent) {
    console.error(`Parent with key ${parentKey} not found.`);
    return null;
  }

  const nextKey = generateNextChildKey(parent.key, parent.children);
  const newMember: FamilyMember = {
    ...newMemberData,
    key: nextKey,
    generation: parent.generation + 1,
    children: [],
  };

  if (!parent.children) {
    parent.children = [];
  }
  parent.children.push(newMember);

  return {
    updatedTree: clonedTree,
    newMember,
  };
}

// সদস্যের তথ্য আপডেট করার ফাংশন (ইমিউটেবল)
export function updateMemberInTree(
  tree: FamilyMember[],
  key: string,
  updatedData: Partial<FamilyMember>
): { updatedTree: FamilyMember[]; updatedMember: FamilyMember | null } {
  const clonedTree: FamilyMember[] = JSON.parse(JSON.stringify(tree));
  const member = findMemberByKey(clonedTree, key);
  if (!member) {
    return { updatedTree: tree, updatedMember: null };
  }

  // Preserve key, generation, and children while updating other fields
  Object.assign(member, updatedData, {
    key: member.key,
    generation: member.generation,
    children: member.children,
  });

  return {
    updatedTree: clonedTree,
    updatedMember: member,
  };
}

// সদস্যকে পরিবারবৃক্ষ থেকে মুছে ফেলার ফাংশন (ইমিউটেবল)
export function deleteMemberFromTree(
  tree: FamilyMember[],
  key: string
): { updatedTree: FamilyMember[]; success: boolean } {
  // রুট নোড মুছে ফেলা যাবে না
  if (key === "1") {
    return { updatedTree: tree, success: false };
  }

  const clonedTree: FamilyMember[] = JSON.parse(JSON.stringify(tree));

  function removeRecursively(nodes: FamilyMember[]): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].key === key) {
        nodes.splice(i, 1);
        return true;
      }
      if (nodes[i].children && nodes[i].children!.length > 0) {
        const removed = removeRecursively(nodes[i].children!);
        if (removed) return true;
      }
    }
    return false;
  }

  const success = removeRecursively(clonedTree);
  return {
    updatedTree: success ? clonedTree : tree,
    success,
  };
}

// নির্দিষ্ট সদস্যের সকল বংশধরদের key বের করা
export function getAllDescendantKeys(
  members: FamilyMember[],
  parentKey: string
): string[] {
  const parent = findMemberByKey(members, parentKey);
  if (!parent || !parent.children) return [];

  const keys: string[] = [];
  function collect(nodes: FamilyMember[]) {
    for (const node of nodes) {
      keys.push(node.key);
      if (node.children) collect(node.children);
    }
  }
  collect(parent.children);
  return keys;
}

// ট্রিকে প্যারেন্ট কি সহ ফ্ল্যাট লিস্টে রূপান্তর করা (MongoDB সংরক্ষণের উপযোগী)
export function flattenMembersWithParent(
  members: FamilyMember[],
  parentKey: string | null = null
): FlatFamilyMember[] {
  const result: FlatFamilyMember[] = [];
  function walk(nodes: FamilyMember[], pKey: string | null) {
    for (const node of nodes) {
      result.push({
        key: node.key,
        title: node.title,
        gender: node.gender,
        generation: node.generation,
        parentKey: pKey,
        birthYear: node.birthYear,
        deathYear: node.deathYear,
        isAlive: node.isAlive,
        phone: node.phone,
        address: node.address,
        profession: node.profession,
        spouse: node.spouse,
        bio: node.bio,
      });
      if (node.children && node.children.length > 0) {
        walk(node.children, node.key);
      }
    }
  }
  walk(members, parentKey);
  return result;
}

// ফ্ল্যাট লিস্ট থেকে নেস্টেড ট্রি ডাটাবেজ রিকন্সট্রাক্ট করা
export function buildTreeFromFlatList(flatList: FlatFamilyMember[]): FamilyMember[] {
  if (!flatList || flatList.length === 0) return [];

  const map = new Map<string, FamilyMember>();
  const roots: FamilyMember[] = [];

  // ১. সকল নোড তৈরি
  for (const item of flatList) {
    map.set(item.key, {
      ...item,
      children: [],
    });
  }

  // ২. প্যারেন্ট-চাইল্ড সম্পর্ক স্থাপন
  for (const item of flatList) {
    const node = map.get(item.key)!;
    if (item.parentKey && map.has(item.parentKey)) {
      const parent = map.get(item.parentKey)!;
      if (!parent.children) parent.children = [];
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  // ৩. সন্তানদের অর্ডারিং বা সর্টিং নিশ্চিত করা
  function sortChildren(node: FamilyMember) {
    if (node.children && node.children.length > 0) {
      node.children.sort((a, b) => {
        const aPart = parseInt(a.key.split("-").pop() || "0", 10);
        const bPart = parseInt(b.key.split("-").pop() || "0", 10);
        return aPart - bPart;
      });
      node.children.forEach(sortChildren);
    }
  }
  roots.forEach(sortChildren);

  return roots;
}

