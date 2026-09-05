"use client";

import React, { useState } from "react";
import {
  X,
  User,
  Heart,
  Briefcase,
  Phone,
  MapPin,
  Calendar,
  GitBranch,
  CornerDownRight,
  PlusCircle,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
  TreePine,
  ShieldAlert,
} from "lucide-react";
import { FamilyMember } from "@/data/familyData";
import {
  getGenerationLabel,
  getGenerationColor,
  getAncestryLineage,
  parseMemberKeyInfo,
} from "@/utils/familyUtils";

interface MemberDetailModalProps {
  member: FamilyMember | null;
  treeData: FamilyMember[];
  isOpen: boolean;
  onClose: () => void;
  onSelectMember: (member: FamilyMember) => void;
  onOpenAddChild: (parentMember: FamilyMember) => void;
  onFocusInTree?: (member: FamilyMember) => void;
}

export default function MemberDetailModal({
  member,
  treeData,
  isOpen,
  onClose,
  onSelectMember,
  onOpenAddChild,
  onFocusInTree,
}: MemberDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !member) return null;

  const lineage = getAncestryLineage(treeData, member.key);
  const isFemale = member.gender === "female";
  const genColor = getGenerationColor(member.generation);
  const keyInfo = parseMemberKeyInfo(member.key);

  const handleCopyLink = () => {
    const textToCopy = `বাছার পরিবারবৃক্ষ: ${member.title} (আইডি: ${member.key}, ${getGenerationLabel(
      member.generation
    )})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10">
        {/* Mobile Pull Bar */}
        <div className="sm:hidden w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mt-3 mb-1 flex-shrink-0" />

        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 flex-shrink-0 bg-slate-50/70 dark:bg-[#0c121e]/70 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TreePine className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                সদস্য প্রোফাইল ও বংশপরিচয়
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyLink}
              title="তথ্য কপি করুন"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">কপি</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-5 sm:px-6 py-5 space-y-6 flex-1">
          {/* Main Profile Header with Avatar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 pb-5 border-b border-slate-100 dark:border-slate-800/80">
            {/* Large Avatar */}
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-black shadow-lg flex-shrink-0 ${
                isFemale
                  ? "bg-gradient-to-br from-rose-500 via-pink-600 to-rose-700 shadow-rose-500/25"
                  : "bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 shadow-blue-500/25"
              }`}
            >
              {member.title.charAt(0)}
            </div>

            {/* Member Identity & Badges */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                {/* Generation Badge */}
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-md"
                  style={{
                    backgroundColor: `${genColor}15`,
                    color: genColor,
                    border: `1px solid ${genColor}35`,
                  }}
                >
                  {getGenerationLabel(member.generation)}
                </span>

                {/* Semantic ID Badge */}
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-[#1a2233] text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60" title="অর্থবোধক বংশলতিকা আইডি">
                  আইডি: {member.key}
                </span>

                {/* Living Status */}
                {member.isAlive === false ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    পরলোকগত
                  </span>
                ) : member.isAlive === true ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    জীবিত
                  </span>
                ) : null}
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {member.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>{isFemale ? "মহিলা ♀" : "পুরুষ ♂"}</span>
                <span>•</span>
                <span>
                  পিতার {keyInfo.birthOrder === 1 ? "১ম" : keyInfo.birthOrder === 2 ? "২য়" : keyInfo.birthOrder === 3 ? "৩য়" : `${keyInfo.birthOrder}তম`} সন্তান
                </span>
                {member.children && (
                  <>
                    <span>•</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {member.children.length} জন সন্তান
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Biographical & Personal Details Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-[#0c121e]/80 border border-slate-200/80 dark:border-slate-800/80">
            {/* Life span (Birth & Death) */}
            {(member.birthYear || member.deathYear) && (
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">জীবনকাল</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {member.birthYear || "অজানা"} - {member.isAlive ? "বর্তমান" : member.deathYear || "অজানা"}
                  </p>
                </div>
              </div>
            )}

            {/* Profession */}
            {member.profession && (
              <div className="flex items-start gap-2.5">
                <Briefcase className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">পেশা</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {member.profession}
                  </p>
                </div>
              </div>
            )}

            {/* Phone */}
            {member.phone && (
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">মোবাইল নম্বর</p>
                  <a
                    href={`tel:${member.phone}`}
                    className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    {member.phone}
                  </a>
                </div>
              </div>
            )}

            {/* Address */}
            {member.address && (
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">ঠিকানা / বাসস্থান</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {member.address}
                  </p>
                </div>
              </div>
            )}

            {/* Spouse */}
            {member.spouse && (
              <div className="flex items-start gap-2.5 sm:col-span-2">
                <Heart className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">জীবনসঙ্গী (স্বামী/স্ত্রী)</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {member.spouse}
                  </p>
                </div>
              </div>
            )}

            {/* Bio Note */}
            {member.bio && (
              <div className="sm:col-span-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">সংক্ষিপ্ত পরিচিতি</p>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            )}
          </div>

          {/* Ancestry Lineage Trail (বংশধারা ক্রম) */}
          <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-[#0c121e]/80 border border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-emerald-500" />
                <span>বংশলতিকা শিকড় (Ancestry Trail)</span>
              </p>
              <span className="text-[11px] text-slate-400">ক্লিক করে প্রোফাইলে যান</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {lineage.map((anc, idx) => {
                const isCurrent = anc.key === member.key;
                return (
                  <React.Fragment key={anc.key}>
                    <button
                      onClick={() => onSelectMember(anc)}
                      className={`px-2.5 py-1 rounded-lg transition-all font-medium flex items-center gap-1.5 ${
                        isCurrent
                          ? "bg-emerald-600 text-white font-bold shadow-sm"
                          : "bg-white dark:bg-[#1a2233] text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-[#25324b] hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200/60 dark:border-slate-700/60"
                      }`}
                    >
                      <span className="text-[10px] opacity-75 font-mono">
                        {idx === 0 ? "মূল" : `${idx}ম`}
                      </span>
                      <span>{anc.title}</span>
                    </button>
                    {idx < lineage.length - 1 && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Children / Descendants Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                সন্তানদের তালিকা ({member.children?.length || 0})
              </h3>

              <button
                onClick={() => onOpenAddChild(member)}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ সন্তান যোগ করুন</span>
              </button>
            </div>

            {member.children && member.children.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {member.children.map((child) => {
                  const childFemale = child.gender === "female";
                  const childGenColor = getGenerationColor(child.generation);
                  return (
                    <button
                      key={child.key}
                      onClick={() => onSelectMember(child)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#0c121e]/80 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/15 border border-slate-200/60 dark:border-slate-800/80 hover:border-emerald-500/30 text-left transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                            childFemale ? "bg-rose-500" : "bg-blue-500"
                          }`}
                        >
                          {child.title.charAt(0)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                            {child.title}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            {child.key}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: `${childGenColor}15`,
                            color: childGenColor,
                          }}
                        >
                          {getGenerationLabel(child.generation)}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-5 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0c121e]/40">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  এই সদস্যের পরবর্তী কোনো সন্তানের তথ্য এখনো যুক্ত করা হয়নি।
                </p>
                <button
                  onClick={() => onOpenAddChild(member)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>প্রথম সন্তান যোগ করুন</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="px-5 sm:px-6 py-3.5 bg-slate-50 dark:bg-[#0c121e] border-t border-slate-100 dark:border-slate-800/80 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2.5 flex-shrink-0">
          {onFocusInTree && (
            <button
              onClick={() => {
                onFocusInTree(member);
                onClose();
              }}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-center"
            >
              ট্রি-তে এই সদস্যকে দেখুন
            </button>
          )}

          <div className="flex items-center gap-2 justify-end flex-1">
            <button
              onClick={() => onOpenAddChild(member)}
              className="w-full xs:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ সন্তান যোগ করুন</span>
            </button>

            <button
              onClick={onClose}
              className="w-full xs:w-auto px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
