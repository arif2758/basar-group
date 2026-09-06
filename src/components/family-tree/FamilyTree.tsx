"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Link from "next/link";
import {
  Search,
  X,
  ChevronDown,
  ChevronRight,
  Users,
  User,
  GitBranch,
  TreePine,
  RotateCcw,
  Heart,
  ListTree,
  Columns3,
  Sparkles,
  ArrowRight,
  CornerDownRight,
  ExternalLink,
  SlidersHorizontal,
  UserPlus,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { familyTreeData, FamilyMember } from "@/data/familyData";
import {
  countMembers,
  getMaxGeneration,
  countByGender,
  searchMembers,
  getGenerationLabel,
  getGenerationColor,
  getAncestorKeys,
  findMemberByKey,
  getAncestryLineage,
  flattenMembers,
  addMemberToTree,
} from "@/utils/familyUtils";
import MemberDetailModal from "./MemberDetailModal";
import AddMemberModal from "./AddMemberModal";

/* ─────────────────────────────────────────────
   Nextra Tree Item Component (কম্প্যাক্ট ট্রি রো)
   ───────────────────────────────────────────── */

interface NextraTreeItemProps {
  member: FamilyMember;
  expandedKeys: Set<string>;
  toggleKey: (key: string) => void;
  selectedKey: string;
  onSelectMember: (member: FamilyMember) => void;
  highlightedKey: string | null;
  selectedGender: "all" | "male" | "female";
  depth?: number;
}

function NextraTreeItem({
  member,
  expandedKeys,
  toggleKey,
  selectedKey,
  onSelectMember,
  highlightedKey,
  selectedGender,
  depth = 0,
}: NextraTreeItemProps) {
  const isExpanded = expandedKeys.has(member.key);
  const hasChildren = !!(member.children && member.children.length > 0);
  const isSelected = selectedKey === member.key;
  const isHighlighted = highlightedKey === member.key;
  const isFemale = member.gender === "female";
  const genColor = getGenerationColor(member.generation);

  // Gender filter check
  const matchesGender =
    selectedGender === "all" ||
    !member.gender ||
    member.gender === selectedGender;

  if (!matchesGender) return null;

  return (
    <div className="select-none" id={`node-${member.key}`}>
      {/* Compact Row */}
      <div
        className={`group relative flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl cursor-pointer text-xs sm:text-sm transition-all duration-150 ${
          isSelected
            ? "bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold border-l-2 border-emerald-500"
            : isHighlighted
              ? "bg-amber-400/20 text-amber-900 dark:text-amber-200 font-bold border-l-2 border-amber-500"
              : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1a2233] hover:text-slate-900 dark:hover:text-white"
        }`}
        onClick={() => {
          onSelectMember(member);
          if (hasChildren && !isExpanded) {
            toggleKey(member.key);
          }
        }}
      >
        {/* Left: Chevron + Gender indicator + Title */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Fold/Unfold Chevron Icon */}
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleKey(member.key);
              }}
              className="p-1 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              aria-label={isExpanded ? "সংকুচিত করুন" : "প্রসারিত করুন"}
            >
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isExpanded
                    ? "rotate-90 text-emerald-600 dark:text-emerald-400"
                    : "rotate-0"
                }`}
              />
            </button>
          ) : (
            <span className="w-5 h-5 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            </span>
          )}

          {/* Gender Dot Indicator */}
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              isFemale
                ? "bg-rose-500 shadow-sm shadow-rose-500/40"
                : "bg-blue-500 shadow-sm shadow-blue-500/40"
            }`}
            title={isFemale ? "মহিলা" : "পুরুষ"}
          />

          {/* Member Name */}
          <span className="truncate leading-tight font-medium text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
            {member.title}
          </span>
        </div>

        {/* Right: Generation & Children count tags */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md leading-none hidden sm:inline-block"
            style={{
              backgroundColor: `${genColor}15`,
              color: genColor,
              border: `1px solid ${genColor}30`,
            }}
          >
            {getGenerationLabel(member.generation)}
          </span>

          {hasChildren && (
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                isSelected
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-200/80 dark:bg-[#242424] text-slate-600 dark:text-slate-400"
              }`}
            >
              {member.children!.length}
            </span>
          )}
        </div>
      </div>

      {/* Sub-tree with Indented Guide Line (Nextra style) */}
      {hasChildren && isExpanded && (
        <div className="relative pl-3.5 ml-3 border-l border-slate-200 dark:border-slate-800 space-y-0.5 mt-0.5">
          {member.children!.map((child) => (
            <NextraTreeItem
              key={child.key}
              member={child}
              expandedKeys={expandedKeys}
              toggleKey={toggleKey}
              selectedKey={selectedKey}
              onSelectMember={onSelectMember}
              highlightedKey={highlightedKey}
              selectedGender={selectedGender}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Ant Design Cascader View Component
   (ক্যাসকেডার ড্রিলডাউন কলাম ভিউ)
   ───────────────────────────────────────────── */

interface CascaderViewProps {
  treeData: FamilyMember[];
  selectedKey: string;
  onSelectMember: (member: FamilyMember) => void;
  selectedGender: "all" | "male" | "female";
}

function AntDCascaderView({
  treeData,
  selectedKey,
  onSelectMember,
  selectedGender,
}: CascaderViewProps) {
  const lineage = useMemo(
    () => getAncestryLineage(treeData, selectedKey),
    [treeData, selectedKey],
  );

  // Build the levels of columns
  const levels = useMemo(() => {
    const columns: FamilyMember[][] = [];

    // Column 0: Root children (Gen 1)
    if (treeData[0]?.children) {
      columns.push(treeData[0].children);
    }

    // Subsequent columns based on selected lineage
    for (let i = 1; i < lineage.length; i++) {
      const parentInLineage = lineage[i];
      if (parentInLineage?.children && parentInLineage.children.length > 0) {
        columns.push(parentInLineage.children);
      }
    }

    return columns;
  }, [treeData, lineage]);

  return (
    <div className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl p-4 shadow-sm overflow-hidden">
      {/* Cascader Column Headers / Breadcrumbs */}
      <div className="flex items-center gap-1.5 pb-3 mb-3 border-b border-slate-100 dark:border-[#262626] text-xs font-semibold text-slate-500 dark:text-slate-400 overflow-x-auto no-scrollbar">
        <span className="text-slate-400">ক্যাসকেড লেভেল:</span>
        {lineage.map((m, idx) => (
          <React.Fragment key={m.key}>
            <button
              onClick={() => onSelectMember(m)}
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold whitespace-nowrap"
            >
              {m.title}
            </button>
            {idx < lineage.length - 1 && (
              <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Cascading Columns Container (Horizontal Drilldown) */}
      <div className="flex gap-3 overflow-x-auto pb-2 min-h-[380px]">
        {levels.map((columnMembers, colIdx) => (
          <div
            key={colIdx}
            className="w-56 sm:w-64 flex-shrink-0 border border-slate-200/80 dark:border-slate-800 rounded-xl p-2 bg-slate-50/60 dark:bg-[#111726]/60 max-h-[440px] overflow-y-auto"
          >
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2 py-1 mb-1 border-b border-slate-200/50 dark:border-slate-800">
              {getGenerationLabel(colIdx + 1)}
            </div>

            <div className="space-y-1">
              {columnMembers
                .filter(
                  (m) =>
                    selectedGender === "all" ||
                    !m.gender ||
                    m.gender === selectedGender,
                )
                .map((item) => {
                  const isSelected = lineage.some((l) => l.key === item.key);
                  const isExact = selectedKey === item.key;
                  const hasChildren = item.children && item.children.length > 0;
                  const isFemale = item.gender === "female";

                  return (
                    <button
                      key={item.key}
                      onClick={() => onSelectMember(item)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors text-left ${
                        isExact
                          ? "bg-emerald-600 text-white font-bold shadow-sm"
                          : isSelected
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-[#1a2233] hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            isFemale ? "bg-rose-500" : "bg-blue-500"
                          }`}
                        />
                        <span className="truncate font-medium">
                          {item.title}
                        </span>
                      </div>

                      {hasChildren && (
                        <ChevronRight
                          className={`w-3.5 h-3.5 flex-shrink-0 ${
                            isExact ? "text-white" : "text-slate-400"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Selected Member Profile Dossier Panel
   (ডানপাশের সক্রিয় সদস্য প্রোফাইল ও বংশলতিকা)
   ───────────────────────────────────────────── */

interface MemberDossierProps {
  member: FamilyMember;
  treeData: FamilyMember[];
  onSelectKey: (key: string) => void;
  onOpenAddChild?: (member: FamilyMember) => void;
  onOpenDetailModal?: (member: FamilyMember) => void;
}

function MemberDossier({
  member,
  treeData,
  onSelectKey,
  onOpenAddChild,
  onOpenDetailModal,
}: MemberDossierProps) {
  const lineage = getAncestryLineage(treeData, member.key);
  const isFemale = member.gender === "female";
  const genColor = getGenerationColor(member.generation);

  return (
    <div className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl p-5 sm:p-6 shadow-sm sticky top-24 transition-colors">
      {/* Header Accent */}
      <div className="flex items-center gap-3.5 pb-5 border-b border-slate-100 dark:border-[#262626] mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md flex-shrink-0 ${
            isFemale
              ? "bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/20"
              : "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20"
          }`}
        >
          {member.title.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
            {member.title}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-md"
              style={{
                backgroundColor: `${genColor}15`,
                color: genColor,
                border: `1px solid ${genColor}30`,
              }}
            >
              {getGenerationLabel(member.generation)}
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-slate-300">
              আইডি: {member.key}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#202020] text-slate-600 dark:text-slate-300">
              {isFemale ? "মহিলা ♀" : "পুরুষ ♂"}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {onOpenDetailModal && (
          <button
            onClick={() => onOpenDetailModal(member)}
            className="py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-[#1f2535] hover:bg-slate-200 dark:hover:bg-[#2a3449] text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors text-center"
          >
            বিস্তারিত প্রোফাইল
          </button>
        )}
        {onOpenAddChild && (
          <button
            onClick={() => onOpenAddChild(member)}
            className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ সন্তান যোগ</span>
          </button>
        )}
      </div>

      {/* Biographical Details (if available) */}
      {(member.profession ||
        member.phone ||
        member.address ||
        member.birthYear) && (
        <div className="mb-4 p-3 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200/60 dark:border-[#262626] text-xs space-y-1.5">
          {member.profession && (
            <p className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <span className="text-slate-400">পেশা:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {member.profession}
              </span>
            </p>
          )}
          {member.phone && (
            <p className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <span className="text-slate-400">মোবাইল:</span>
              <a
                href={`tel:${member.phone}`}
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {member.phone}
              </a>
            </p>
          )}
          {member.address && (
            <p className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <span className="text-slate-400">ঠিকানা:</span>
              <span className="font-semibold text-slate-900 dark:text-white truncate">
                {member.address}
              </span>
            </p>
          )}
        </div>
      )}

      {/* Ancestry Trail Breadcrumb */}
      <div className="mb-4 p-3 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200/60 dark:border-[#262626]">
        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <GitBranch className="w-3 h-3 text-emerald-500" />
          <span>বংশলতিকা ক্রাম্ব (Lineage Trail)</span>
        </p>
        <div className="space-y-1">
          {lineage.map((anc, idx) => {
            const isCurrent = anc.key === member.key;
            return (
              <div key={anc.key} className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-mono text-[10px] w-4">
                  {idx === 0 ? "মূল" : `${idx}ম`}
                </span>
                {idx > 0 && (
                  <CornerDownRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
                )}
                <button
                  onClick={() => onSelectKey(anc.key)}
                  className={`truncate text-left transition-colors ${
                    isCurrent
                      ? "text-emerald-600 dark:text-emerald-400 font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {anc.title}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Children Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            সন্তানদের তালিকা ({member.children?.length || 0})
          </p>
          {onOpenAddChild && (
            <button
              onClick={() => onOpenAddChild(member)}
              className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              + সন্তান যোগ
            </button>
          )}
        </div>

        {member.children && member.children.length > 0 ? (
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {member.children.map((child) => {
              const childFemale = child.gender === "female";
              return (
                <button
                  key={child.key}
                  onClick={() => onSelectKey(child.key)}
                  className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] hover:bg-emerald-500/10 dark:hover:bg-emerald-500/15 border border-slate-200/60 dark:border-[#262626] hover:border-emerald-500/30 text-left transition-colors group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 ${
                        childFemale ? "bg-rose-500" : "bg-blue-500"
                      }`}
                    >
                      {child.title.charAt(0)}
                    </span>
                    <span className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {child.title}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 flex-shrink-0 ml-2">
                    {child.children?.length
                      ? `${child.children.length} সন্তান`
                      : "সন্তান নেই"}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-400 text-center py-4 border border-dashed border-slate-200 dark:border-[#262626] rounded-xl">
            এই সদস্যের পরবর্তী কোনো সন্তানের তথ্য নেই।
          </p>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main FamilyTree Component
   ───────────────────────────────────────────── */

export default function FamilyTree() {
  // Tree data with localStorage persistence
  const [treeData, setTreeData] = useState<FamilyMember[]>(familyTreeData);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("basar_family_tree_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTreeData(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load family tree from localStorage", e);
    }
  }, []);

  // Tree expanded nodes state
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    () => new Set(["1", "1-1", "1-2", "1-1-1", "1-1-1-1"]),
  );

  // Selected member for profile
  const [selectedMember, setSelectedMember] = useState<FamilyMember>(
    () => treeData[0]?.children?.[0] || treeData[0],
  );

  // Modals state
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailMember, setDetailMember] = useState<FamilyMember | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalParentKey, setAddModalParentKey] = useState<
    string | undefined
  >(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<
    "all" | "male" | "female"
  >("all");
  const [viewStyle, setViewStyle] = useState<"nextra" | "cascader">("nextra");
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Search Results
  const searchResults = useMemo(
    () => searchMembers(treeData, searchQuery),
    [treeData, searchQuery],
  );

  // Toggle tree node
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
    walk(treeData);
    setExpandedKeys(all);
  }, [treeData]);

  // Collapse All
  const collapseAll = useCallback(() => {
    setExpandedKeys(new Set(["1"]));
  }, []);

  // Select Member & Expand Lineage
  const handleSelectMember = useCallback(
    (member: FamilyMember, openDetail: boolean = false) => {
      setSelectedMember(member);
      if (openDetail) {
        setDetailMember(member);
        setIsDetailModalOpen(true);
      }
      const ancestors = getAncestorKeys(member.key);
      setExpandedKeys((prev) => {
        const next = new Set(prev);
        ancestors.forEach((k) => next.add(k));
        return next;
      });
    },
    [],
  );

  const handleSelectKey = useCallback(
    (key: string, openDetail: boolean = false) => {
      const found = findMemberByKey(treeData, key);
      if (found) {
        handleSelectMember(found, openDetail);
      }
    },
    [treeData, handleSelectMember],
  );

  // Live fetch from database on mount
  useEffect(() => {
    let isMounted = true;
    fetch("/api/family-tree?t=" + Date.now())
      .then((r) => r.json())
      .then((data) => {
        if (isMounted && data.success && data.tree && data.tree.length > 0) {
          setTreeData(data.tree);
          try {
            localStorage.setItem(
              "basar_family_tree_data",
              JSON.stringify(data.tree),
            );
          } catch (e) {
            console.error(e);
          }
        }
      })
      .catch((err) =>
        console.warn("Failed to fetch live family tree, using cached:", err),
      );
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Add Member
  const handleAddMember = useCallback(
    async (
      parentKey: string,
      memberData: Omit<FamilyMember, "key" | "generation">,
      submitterInfo?: { name: string; phone: string },
    ) => {
      // 1. Submit crowd-sourced request to MongoDB Atlas
      try {
        const parent = findMemberByKey(treeData, parentKey);
        await fetch("/api/family-tree/request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...memberData,
            parentKey,
            parentName: parent?.title || "",
            submitterName: submitterInfo?.name || "",
            submitterPhone: submitterInfo?.phone || "",
          }),
        });
      } catch (e) {
        console.warn("Could not send request to API:", e);
      }

      // 2. Optimistic local update
      const result = addMemberToTree(treeData, parentKey, memberData);
      if (result) {
        setTreeData(result.updatedTree);
        try {
          localStorage.setItem(
            "basar_family_tree_data",
            JSON.stringify(result.updatedTree),
          );
        } catch (e) {
          console.error("Failed to save to localStorage", e);
        }

        // Expand parent branch
        const ancestors = getAncestorKeys(result.newMember.key);
        setExpandedKeys((prev) => {
          const next = new Set(prev);
          ancestors.forEach((k) => next.add(k));
          next.add(parentKey);
          next.add(result.newMember.key);
          return next;
        });

        // Select and highlight new member
        setSelectedMember(result.newMember);
        setDetailMember(result.newMember);
        setHighlightedKey(result.newMember.key);

        // Show toast
        setToastMessage(
          `সদস্য "${result.newMember.title}" এর তথ্য সেন্ট্রাল ডাটাবেজে সফলভাবে গৃহীত হয়েছে! (আইডি: ${result.newMember.key})`,
        );
        setTimeout(() => setToastMessage(null), 5000);
        setTimeout(() => setHighlightedKey(null), 3500);

        // Open new member profile
        setIsDetailModalOpen(true);
      }
    },
    [treeData],
  );

  // Search Pick
  const handleSearchPick = useCallback(
    (m: FamilyMember) => {
      handleSelectMember(m, true);
      setHighlightedKey(m.key);
      setIsSearchOpen(false);
      setSearchQuery("");

      // Smooth scroll into view
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(`node-${m.key}`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 150);
      });

      setTimeout(() => setHighlightedKey(null), 3500);
    },
    [handleSelectMember],
  );

  const totalMembers = useMemo(() => countMembers(treeData), [treeData]);
  const maxGen = useMemo(() => getMaxGeneration(treeData) + 1, [treeData]);
  const maleCount = useMemo(() => countByGender(treeData, "male"), [treeData]);
  const femaleCount = useMemo(
    () => countByGender(treeData, "female"),
    [treeData],
  );

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-200 pb-20">
      {/* Compact Mobile-First Header */}
      <header className="pt-6 pb-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Title, Stats & Add Member Action */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-2">
                <TreePine className="w-3.5 h-3.5" />
                <span>বংশলতিকা ও ঐতিহ্য</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                বাছার বংশের ফ্যামিলি ট্রি
              </h1>
            </div>

            {/* Quick Pill Stats Bar & Add Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#151c2c] border border-slate-200/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 shadow-sm">
                  👥 {totalMembers} জন সদস্য
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#151c2c] border border-slate-200/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 shadow-sm">
                  🌳 {maxGen}টি প্রজন্ম
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20 dark:border-blue-500/40">
                  ♂ {maleCount} পুরুষ
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/20 dark:border-rose-500/40">
                  ♀ {femaleCount} মহিলা
                </span>
              </div>

              {/* Admin Panel Link */}
              <Link
                href="/admin/family-tree"
                className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#151c2c] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border border-slate-200/80 dark:border-slate-700/60 shadow-sm transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>অ্যাডমিন প্যানেল</span>
              </Link>

              {/* + Add Member Button - Temporarily Hidden
              <button
                onClick={() => {
                  setAddModalParentKey(selectedMember?.key || "1-1-1-1-1");
                  setIsAddModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ নতুন সদস্য যোগ করুন</span>
              </button>
              */}
            </div>
          </div>

          {/* Search Bar & Mode Switcher Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            {/* Search Input */}
            <div ref={searchRef} className="relative flex-1">
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] focus-within:border-emerald-500 transition-colors">
                <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => searchQuery && setIsSearchOpen(true)}
                  placeholder="সদস্যের নাম দিয়ে সার্চ করুন (যেমন: মালেক বাছার, জাকির, সেলিনা)..."
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Instant Search Dropdown */}
              {isSearchOpen && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto p-1.5 animate-fade-in">
                  {searchResults.length === 0 ? (
                    <p className="p-4 text-center text-xs text-slate-400">
                      কোনো সদস্য পাওয়া যায়নি
                    </p>
                  ) : (
                    searchResults.slice(0, 10).map((m) => (
                      <button
                        key={m.key}
                        onClick={() => handleSearchPick(m)}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-left text-xs transition-colors group"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              m.gender === "female"
                                ? "bg-rose-500"
                                : "bg-blue-500"
                            }`}
                          />
                          <span className="font-bold text-slate-900 dark:text-white truncate">
                            {m.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 flex-shrink-0 ml-2">
                          {getGenerationLabel(m.generation)}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* View Mode & Filter Controls */}
            <div className="flex flex-col xs:flex-row sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              {/* Nextra vs Cascader Switcher */}
              <div className="grid grid-cols-2 sm:flex items-center bg-slate-100 dark:bg-[#151c2c] p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60 flex-1 sm:flex-initial">
                <button
                  onClick={() => setViewStyle("nextra")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    viewStyle === "nextra"
                      ? "bg-white dark:bg-[#0c121e] text-emerald-600 dark:text-emerald-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  title="Nextra ডকস সাইডবার স্টাইল"
                >
                  <ListTree className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="whitespace-nowrap">সাইডবার ট্রি</span>
                </button>

                <button
                  onClick={() => setViewStyle("cascader")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    viewStyle === "cascader"
                      ? "bg-white dark:bg-[#0c121e] text-emerald-600 dark:text-emerald-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  title="AntD ক্যাসকেডার ড্রিলডাউন স্টাইল"
                >
                  <Columns3 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="whitespace-nowrap">ক্যাসকেডার</span>
                </button>
              </div>

              {/* Gender Filter Pills */}
              <div className="grid grid-cols-3 sm:flex items-center gap-1 flex-1 sm:flex-initial">
                {(["all", "male", "female"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold text-center transition-colors ${
                      selectedGender === g
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-[#151c2c] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-[#1e283d] hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {g === "all" ? "সকল" : g === "male" ? "পুরুষ" : "মহিলা"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {viewStyle === "nextra" ? (
          /* Split Layout: Nextra Sidebar Tree (Left) + Member Dossier (Right) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Compact Tree Directory */}
            <div className="lg:col-span-7 bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl p-4 sm:p-5 shadow-sm">
              {/* Quick Actions Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-[#262626] text-xs">
                <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                  বংশলতিকা নেভিগেটর
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={expandAll}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold"
                  >
                    সব খুলুন
                  </button>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <button
                    onClick={collapseAll}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold"
                  >
                    সব বন্ধ করুন
                  </button>
                </div>
              </div>

              {/* Tree Content */}
              <div className="space-y-1">
                {treeData.map((rootNode) => (
                  <NextraTreeItem
                    key={rootNode.key}
                    member={rootNode}
                    expandedKeys={expandedKeys}
                    toggleKey={toggleKey}
                    selectedKey={selectedMember.key}
                    onSelectMember={(m) => {
                      handleSelectMember(m, true);
                    }}
                    highlightedKey={highlightedKey}
                    selectedGender={selectedGender}
                  />
                ))}
              </div>
            </div>

            {/* Right: Selected Member Dossier (Desktop Sticky) */}
            <div className="hidden lg:block lg:col-span-5">
              <MemberDossier
                member={selectedMember}
                treeData={treeData}
                onSelectKey={handleSelectKey}
                onOpenAddChild={(m) => {
                  setAddModalParentKey(m.key);
                  setIsAddModalOpen(true);
                }}
                onOpenDetailModal={(m) => {
                  setDetailMember(m);
                  setIsDetailModalOpen(true);
                }}
              />
            </div>
          </div>
        ) : (
          /* Cascader Multi-Column Drilldown Mode (Ant Design Cascader Style) */
          <div className="space-y-6">
            <AntDCascaderView
              treeData={treeData}
              selectedKey={selectedMember.key}
              onSelectMember={(m) => {
                handleSelectMember(m, true);
              }}
              selectedGender={selectedGender}
            />

            <div className="max-w-2xl">
              <MemberDossier
                member={selectedMember}
                treeData={treeData}
                onSelectKey={handleSelectKey}
                onOpenAddChild={(m) => {
                  setAddModalParentKey(m.key);
                  setIsAddModalOpen(true);
                }}
                onOpenDetailModal={(m) => {
                  setDetailMember(m);
                  setIsDetailModalOpen(true);
                }}
              />
            </div>
          </div>
        )}
      </main>

      {/* Mobile Floating Bottom Bar / Quick Actions */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 pl-11 sm:pl-0 pointer-events-none">
        <div
          onClick={() => {
            setDetailMember(selectedMember);
            setIsDetailModalOpen(true);
          }}
          className="pointer-events-auto bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md border border-slate-200/80 dark:border-[#303030] rounded-2xl p-3 shadow-xl flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={`w-3 h-3 rounded-full flex-shrink-0 ${
                selectedMember.gender === "female"
                  ? "bg-rose-500"
                  : "bg-blue-500"
              }`}
            />
            <div className="min-w-0">
              <p className="text-xs text-slate-400">নির্বাচিত সদস্য:</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {selectedMember.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setAddModalParentKey(selectedMember?.key || "1-1-1-1-1");
                setIsAddModalOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1 text-slate-700 dark:text-slate-200"
            >
              <UserPlus className="w-3.5 h-3.5 text-emerald-500" />
              <span>+ যোগ</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setDetailMember(selectedMember);
                setIsDetailModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <span>বিস্তারিত</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Member Profile Details Modal */}
      <MemberDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        member={detailMember || selectedMember}
        treeData={treeData}
        onSelectMember={(m) => {
          handleSelectMember(m, true);
        }}
        onOpenAddChild={(parentM) => {
          setAddModalParentKey(parentM.key);
          setIsDetailModalOpen(false);
          setIsAddModalOpen(true);
        }}
        onFocusInTree={(m) => {
          handleSearchPick(m);
        }}
      />

      {/* Add New Member Modal Form */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        treeData={treeData}
        initialParentKey={addModalParentKey || selectedMember?.key}
        onAddMember={handleAddMember}
      />

      {/* Floating Success Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up max-w-sm">
          <div className="bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold border border-emerald-400/40">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
