// src/components/family-tree/FamilyTreeSearch.tsx
"use client";
import React, { useState, useMemo } from "react";
import { Search, X, MapPin } from "lucide-react";
import { familyTreeData, FamilyMember } from "@/data/familyData";
import {
  searchMembers,
  getGenerationLabel,
  getGenerationColor,
} from "@/utils/familyUtils";

interface FamilyTreeSearchProps {
  onMemberSelect?: (key: string) => void;
}

export default function FamilyTreeSearch({
  onMemberSelect,
}: FamilyTreeSearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const results: FamilyMember[] = useMemo(() => {
    return searchMembers(familyTreeData, query);
  }, [query]);

  return (
    <div className="relative">
      {/* Search Input */}
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 
                     bg-white dark:bg-gray-900 transition-all duration-300
                     ${
                       isFocused
                         ? "border-indigo-500 shadow-lg shadow-indigo-500/20"
                         : "border-gray-200 dark:border-gray-700"
                     }`}
      >
        <Search
          size={20}
          className={`transition-colors ${
            isFocused ? "text-indigo-500" : "text-gray-400"
          }`}
        />
        <input
          type="text"
          placeholder="🔍 নাম দিয়ে সদস্য খুঁজুন..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="flex-1 outline-none bg-transparent text-gray-800 
                     dark:text-gray-200 placeholder-gray-400"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="p-1 rounded-full hover:bg-gray-100 
                       dark:hover:bg-gray-800 transition-colors"
          >
            <X size={16} className="text-gray-400" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {query && isFocused && (
        <div
          className="absolute top-full left-0 right-0 mt-2 
                     bg-white dark:bg-gray-900 rounded-2xl border 
                     border-gray-200 dark:border-gray-700 shadow-2xl 
                     z-50 max-h-80 overflow-y-auto"
        >
          {results.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              <p className="text-4xl mb-2">😔</p>
              <p>কোনো সদস্য পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="p-2">
              <p className="px-3 py-1 text-xs text-gray-400">
                {results.length} জন পাওয়া গেছে
              </p>
              {results.slice(0, 10).map((member) => (
                <button
                  key={member.key}
                  onClick={() => {
                    onMemberSelect?.(member.key);
                    setQuery("");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 
                             rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 
                             transition-colors text-left"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center 
                               justify-center text-white text-sm font-bold"
                    style={{
                      backgroundColor:
                        member.gender === "female" ? "#ec4899" : "#3b82f6",
                    }}
                  >
                    {member.gender === "female" ? "♀" : "♂"}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {member.title}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-gray-400" />
                      <span
                        className="text-xs font-medium"
                        style={{
                          color: getGenerationColor(member.generation),
                        }}
                      >
                        {getGenerationLabel(member.generation)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
              {results.length > 10 && (
                <p className="text-center text-xs text-gray-400 py-2">
                  আরো {results.length - 10} জন...
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}