"use client";
// src/components/family-tree/FamilyTreeStats.tsx
import React from "react";
import { Users, GitBranch, User, UserCheck } from "lucide-react";
import { familyTreeData } from "@/data/familyData";
import {
  countMembers,
  getMaxGeneration,
  countMales,
  countFemales,
} from "@/utils/familyUtils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  bgColor: string;
}

function StatCard({ icon, label, value, color, bgColor }: StatCardProps) {
  return (
    <div
      className="rounded-2xl p-5 border backdrop-blur-sm 
                 transition-all duration-300 hover:scale-105 hover:shadow-xl"
      style={{
        borderColor: `${color}30`,
        background: `linear-gradient(135deg, ${bgColor}, transparent)`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p
            className="text-2xl font-bold"
            style={{ color }}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FamilyTreeStats() {
  const stats = [
    {
      icon: <Users size={24} />,
      label: "মোট সদস্য",
      value: countMembers(familyTreeData),
      color: "#6366f1",
      bgColor: "#6366f110",
    },
    {
      icon: <GitBranch size={24} />,
      label: "মোট প্রজন্ম",
      value: getMaxGeneration(familyTreeData) + 1,
      color: "#8b5cf6",
      bgColor: "#8b5cf610",
    },
    {
      icon: <User size={24} />,
      label: "পুরুষ",
      value: countMales(familyTreeData),
      color: "#3b82f6",
      bgColor: "#3b82f610",
    },
    {
      icon: <UserCheck size={24} />,
      label: "মহিলা",
      value: countFemales(familyTreeData),
      color: "#ec4899",
      bgColor: "#ec489910",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <StatCard key={i} {...s} />
      ))}
    </div>
  );
}