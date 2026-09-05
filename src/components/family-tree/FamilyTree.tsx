"use client";
// src/components/FamilyTree.tsx

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, X, ChevronDown, ChevronRight, Users, User } from "lucide-react";
import { familyTreeData, FamilyMember } from "@/data/familyData";
import {
  countMembers,
  getMaxGeneration,
  countByGender, // এখানে countByGender ইমপোর্ট করছি
  searchMembers,
  getGenerationLabel,
  getAncestorKeys,
} from "@/utils/familyUtils";

/* ─────────────────────────────────────────────
   Stats Section (পরিসংখ্যান)
   ───────────────────────────────────────────── */

function Stats() {
  const total = countMembers(familyTreeData);
  const generations = getMaxGeneration(familyTreeData) + 1;
  // countByGender ব্যবহার করা হয়েছে
  const males = countByGender(familyTreeData, "male");
  const females = countByGender(familyTreeData, "female");

  const items = [
    { label: "মোট সদস্য", value: total, icon: <Users size={16} /> },
    { label: "প্রজন্ম", value: generations, icon: <ChevronRight size={16} /> },
    { label: "পুরুষ", value: males, icon: <User size={16} /> },
    { label: "মহিলা", value: females, icon: <User size={16} /> },
  ];

  return (
    <section aria-label="পরিসংখ্যান" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-3.5 sm:p-4"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            {item.icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-stone-500">{item.label}</p>
            <p className="text-lg font-bold text-stone-800 leading-tight">
              {item.value}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}

/* ─────────────────────────────────────────────
   Search Bar (সার্চ বার)
   ───────────────────────────────────────────── */

function SearchBar({ onSelect }: { onSelect: (key: string) => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchMembers(familyTreeData, query), [query]);

  // Click outside to close dropdown
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handlePick(key: string) {
    onSelect(key);
    setQuery("");
    setOpen(false);
  }

  return (
    <search ref={ref} className="relative">
      <label className="sr-only" htmlFor="family-search">
        সদস্য খুঁজুন
      </label>
      <div
        className={`flex items-center gap-2.5 rounded-2xl border bg-white px-4 py-3 transition-shadow ${
          open && query ? "border-emerald-400 shadow-lg shadow-emerald-100" : "border-stone-200"
        }`}
      >
        <Search size={18} className="shrink-0 text-stone-400" />
        <input
          id="family-search"
          type="text"
          placeholder="নাম দিয়ে খুঁজুন..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query && setOpen(true)}
          className="w-full bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            aria-label="মুছুন"
            className="shrink-0 rounded-full p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {open && query && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-stone-200 bg-white shadow-xl">
          {results.length === 0 ? (
            <p className="p-5 text-center text-sm text-stone-400">কোনো সদস্য পাওয়া যায়নি</p>
          ) : (
            <ul role="listbox" className="p-1.5">
              <li className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-stone-400">
                {results.length} জন পাওয়া গেছে
              </li>
              {results.slice(0, 12).map((m) => (
                <li key={m.key}>
                  <button
                    onClick={() => handlePick(m.key)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-stone-50"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${
                        m.gender === "female" ? "bg-rose-400" : "bg-slate-500"
                      }`}
                    >
                      {m.title.charAt(0)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-stone-700">
                        {m.title}
                      </span>
                      <span className="block text-[11px] text-stone-400">
                        {getGenerationLabel(m.generation)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </search>
  );
}

/* ─────────────────────────────────────────────
   Tree Node (সিংগল কার্ড)
   ───────────────────────────────────────────── */

function TreeNode({
  member,
  expandedKeys,
  toggleKey,
  highlightedKey,
}: {
  member: FamilyMember;
  expandedKeys: Set<string>;
  toggleKey: (key: string) => void;
  highlightedKey: string | null;
}) {
  const isExpanded = expandedKeys.has(member.key);
  const hasChildren = !!(member.children && member.children.length > 0);
  const isRoot = member.generation === 0;
  const isHighlighted = highlightedKey === member.key;

  /* Root Banner */
  if (isRoot) {
    return (
      <article id={`m-${member.key}`}>
        <button
          onClick={() => toggleKey(member.key)}
          aria-expanded={isExpanded}
          className="group flex w-full items-center justify-between rounded-2xl bg-emerald-600 px-5 py-4 text-left text-white shadow-md shadow-emerald-200 transition-all active:scale-[0.99] sm:px-6 sm:py-5"
        >
          <div className="flex items-center gap-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-xl sm:h-12 sm:w-12 sm:text-2xl">
              🌳
            </span>
            <div>
              <h2 className="text-lg font-bold sm:text-xl">{member.title}</h2>
              <p className="text-xs text-emerald-100 sm:text-sm">পারিবারিক বংশতালিকা</p>
            </div>
          </div>
          <ChevronDown
            size={20}
            className={`shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-0" : "-rotate-90"}`}
          />
        </button>

        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-1.5 pl-3 sm:pl-5" role="group">
            {member.children!.map((child) => (
              <TreeNode
                key={child.key}
                member={child}
                expandedKeys={expandedKeys}
                toggleKey={toggleKey}
                highlightedKey={highlightedKey}
              />
            ))}
          </div>
        )}
      </article>
    );
  }

  /* Normal Member Card */
  const isFemale = member.gender === "female";

  return (
    <article id={`m-${member.key}`} className="relative">
      {/* Vertical guide line */}
      <div className="absolute -bottom-1.5 left-[17px] top-10 w-px bg-stone-200 sm:left-[19px]" />

      <button
        onClick={() => hasChildren && toggleKey(member.key)}
        aria-expanded={hasChildren ? isExpanded : undefined}
        className={`group relative flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all sm:gap-3.5 sm:px-4 sm:py-3 ${
          isHighlighted
            ? "border-amber-300 bg-amber-50 shadow-md shadow-amber-100"
            : "border-stone-100 bg-white hover:border-stone-200 hover:shadow-sm"
        } ${hasChildren ? "cursor-pointer" : "cursor-default"}`}
      >
        {/* Avatar */}
        <span
          className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white sm:h-9 sm:w-9 ${
            isFemale ? "bg-rose-400" : "bg-slate-500"
          }`}
        >
          {member.title.charAt(0)}
        </span>

        {/* Info */}
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold text-stone-800 sm:text-[15px]">
              {member.title}
            </span>
          </span>
          <span className="flex items-center gap-2 text-[11px] text-stone-400 sm:text-xs">
            <span>{getGenerationLabel(member.generation)}</span>
            {hasChildren && (
              <>
                <span className="text-stone-300">·</span>
                <span>{member.children!.length} সন্তান</span>
              </>
            )}
          </span>
        </span>

        {/* Expand Chevron */}
        {hasChildren && (
          <ChevronDown
            size={16}
            className={`shrink-0 text-stone-400 transition-transform duration-200 ${
              isExpanded ? "rotate-0" : "-rotate-90"
            }`}
          />
        )}
      </button>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="mt-1.5 space-y-1.5 pl-5 sm:pl-7" role="group">
          {member.children!.map((child) => (
            <TreeNode
              key={child.key}
              member={child}
              expandedKeys={expandedKeys}
              toggleKey={toggleKey}
              highlightedKey={highlightedKey}
            />
          ))}
        </div>
      )}
    </article>
  );
}

/* ─────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────── */

export default function FamilyTree() {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    () => new Set(["1", "1-1", "1-2", "1-1-1"])
  );
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);

  const toggleKey = useCallback((key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  // Expand All
  const expandAll = useCallback(() => {
    const all = new Set<string>();
    function walk(nodes: FamilyMember[]) {
      for (const n of nodes) {
        all.add(n.key);
        if (n.children) walk(n.children);
      }
    }
    walk(familyTreeData);
    setExpandedKeys(all);
  }, []);

  // Collapse All
  const collapseAll = useCallback(() => {
    setExpandedKeys(new Set(["1"]));
  }, []);

  // Handle Search Selection
  const handleSelect = useCallback(
    (key: string) => {
      // Expand all ancestors first
      const ancestors = getAncestorKeys(key);
      setExpandedKeys((prev) => {
        const next = new Set(prev);
        ancestors.forEach((k) => next.add(k));
        return next;
      });
      setHighlightedKey(key);

      // Smooth scroll to the element
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(`m-${key}`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 150);
      });

      // Remove highlight after 3.5s
      setTimeout(() => setHighlightedKey(null), 3500);
    },
    []
  );

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header Section */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-5 pt-8 sm:px-6 sm:pt-12 sm:pb-8">
          <div className="text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 sm:text-sm">
              🌳 বংশতালিকা
            </span>
            <h1 className="text-2xl font-bold text-stone-800 sm:text-3xl">বাছার বংশ</h1>
            <p className="mt-1.5 text-sm text-stone-500 sm:text-base">
              পরিবারের সকল সদস্যের তথ্য
            </p>
          </div>

          <div className="mt-5 sm:mt-6">
            <Stats />
          </div>

          <div className="mt-4 sm:mt-5">
            <SearchBar onSelect={handleSelect} />
          </div>

          {/* Quick Actions */}
          <nav aria-label="দ্রুত কাজ" className="mt-4 flex items-center justify-center gap-2 sm:mt-5">
            <button
              onClick={expandAll}
              className="rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-50 sm:text-sm"
            >
              সব খুলুন
            </button>
            <button
              onClick={collapseAll}
              className="rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-50 sm:text-sm"
            >
              সব বন্ধ করুন
            </button>
          </nav>
        </div>
      </header>

      {/* Tree Section */}
      <section aria-label="বংশতালিকা" className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-8">
        <div className="space-y-2">
          {familyTreeData.map((node) => (
            <TreeNode
              key={node.key}
              member={node}
              expandedKeys={expandedKeys}
              toggleKey={toggleKey}
              highlightedKey={highlightedKey}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 text-center">
        <p className="text-xs text-stone-400 sm:text-sm">❤️ বাছার পরিবারের জন্য তৈরি</p>
      </footer>
    </main>
  );
}