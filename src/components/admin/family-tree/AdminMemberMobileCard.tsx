"use client";

import React from "react";
import Link from "next/link";
import { FlatFamilyMember } from "@/data/familyData";
import {
  Phone,
  MapPin,
  Heart,
  PlusCircle,
  Edit3,
  Trash2,
  GitBranch,
  GraduationCap,
  Droplet,
  CreditCard,
  Eye,
} from "lucide-react";

interface AdminMemberMobileCardProps {
  member: FlatFamilyMember;
  parent?: FlatFamilyMember | null;
  onAddChild: (member: FlatFamilyMember) => void;
  onEdit: (member: FlatFamilyMember) => void;
  onDelete: (member: FlatFamilyMember) => void;
}

export default function AdminMemberMobileCard({
  member,
  parent,
  onAddChild,
  onEdit,
  onDelete,
}: AdminMemberMobileCardProps) {
  return (
    <div className="bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#262626] rounded-2xl p-4 shadow-xs hover:border-slate-300 dark:hover:border-[#383838] transition-all">
      {/* ── Top Header: Pure Member Title + Badges (No Gender icon, No Generation Badge, No Living status) ── */}
      <div className="pb-3 border-b border-slate-100 dark:border-[#262626]">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/admin/family-tree/${member.key}`}
            className="text-base font-bold text-slate-900 dark:text-white tracking-tight hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            title="সম্পূর্ণ প্রোফাইল দেখুন"
          >
            {member.title}
          </Link>

          {/* Blood Group Badge */}
          {member.bloodGroup ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/50 shrink-0">
              <Droplet className="w-3 h-3 fill-rose-500 text-rose-500" />
              {member.bloodGroup}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-slate-500 px-1.5 py-0.5 rounded bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200/60 dark:border-[#303030] shrink-0">
              গ্রুপ নেই
            </span>
          )}
        </div>

        {/* Gen ID Badge */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="inline-flex items-center font-mono text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800/50 px-2 py-0.5 rounded-md">
            জেন আইডি: {member.key}
          </span>
        </div>
      </div>

      {/* ── Informative Fields Grid (Clean & Minimal: Education, Phone, NID, Parent, Spouse, Address) ── */}
      <div className="py-3 space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
        {/* Academic Class & Institution */}
        <div className="flex items-start gap-2.5">
          <GraduationCap className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-medium text-slate-400 block">
              অধ্যায়নরত শ্রেণি:
            </span>
            {member.academicClass ? (
              <div className="mt-0.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {member.academicClass}
                </span>
                {(member.section || member.rollNumber) && (
                  <span className="text-slate-400 text-[11px] ml-1.5 font-mono">
                    ({member.section ? `শাখা: ${member.section}` : ""}
                    {member.section && member.rollNumber ? ", " : ""}
                    {member.rollNumber ? `রোল: ${member.rollNumber}` : ""})
                  </span>
                )}
                {member.institution && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {member.institution}
                  </p>
                )}
              </div>
            ) : member.institution ? (
              <p className="font-semibold text-slate-800 dark:text-slate-200 truncate mt-0.5">
                {member.institution}
              </p>
            ) : (
              <span className="font-mono text-slate-400 text-xs">—</span>
            )}
          </div>
        </div>

        {/* Mobile Number */}
        <div className="flex items-center gap-2.5">
          <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
          <div className="min-w-0 flex-1 flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">
              মোবাইল নম্বর:
            </span>
            {member.phone ? (
              <a
                href={`tel:${member.phone}`}
                className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {member.phone}
              </a>
            ) : (
              <span className="font-mono text-slate-400 text-xs">—</span>
            )}
          </div>
        </div>

        {/* NID / Birth Certificate */}
        <div className="flex items-center gap-2.5">
          <CreditCard className="w-4 h-4 text-indigo-500 shrink-0" />
          <div className="min-w-0 flex-1 flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">
              NID / জন্ম সনদ:
            </span>
            {member.nidOrBirthCert ? (
              <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                {member.nidOrBirthCert}
              </span>
            ) : (
              <span className="font-mono text-slate-400 text-xs">—</span>
            )}
          </div>
        </div>

        {/* Parent / Guardian */}
        <div className="flex items-center gap-2.5">
          <GitBranch className="w-4 h-4 text-slate-400 shrink-0" />
          <div className="min-w-0 flex-1 flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">
              পিতা/অভিভাবক:
            </span>
            {parent ? (
              <Link
                href={`/admin/family-tree/${parent.key}`}
                className="font-semibold text-slate-800 dark:text-slate-200 hover:text-emerald-600 truncate max-w-[60%] text-right"
              >
                {parent.title}{" "}
                <span className="font-mono text-[10px] text-slate-400">
                  ({parent.key})
                </span>
              </Link>
            ) : (
              <span className="italic text-slate-400">মূল আদি পুরুষ</span>
            )}
          </div>
        </div>

        {/* Spouse (Conditional) */}
        {member.spouse && (
          <div className="flex items-center gap-2.5">
            <Heart className="w-4 h-4 text-rose-400 shrink-0" />
            <div className="min-w-0 flex-1 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-400">
                স্ত্রী/স্বামী:
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[65%] text-right">
                {member.spouse}
              </span>
            </div>
          </div>
        )}

        {/* Address (Conditional) */}
        {member.address && (
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-medium text-slate-400 block">
                ঠিকানা:
              </span>
              <p className="font-medium text-slate-800 dark:text-slate-200 truncate mt-0.5">
                {member.address}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Action Buttons Toolbar ── */}
      <div className="pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center gap-2">
        <Link
          href={`/admin/family-tree/${member.key}`}
          className="flex-1 py-1.5 px-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-indigo-200/50 dark:border-indigo-800/30"
          title="সম্পূর্ণ প্রোফাইল দেখুন"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>বিস্তারিত</span>
        </Link>

        <button
          type="button"
          onClick={() => onAddChild(member)}
          className="flex-1 py-1.5 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-emerald-200/50 dark:border-emerald-800/30"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>+ সন্তান</span>
        </button>

        <button
          type="button"
          onClick={() => onEdit(member)}
          className="flex-1 py-1.5 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-blue-200/50 dark:border-blue-800/30"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>সম্পাদনা</span>
        </button>

        {member.key !== "1" && (
          <button
            type="button"
            onClick={() => onDelete(member)}
            className="py-1.5 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer border border-rose-200/50 dark:border-rose-800/30"
            title="সদস্য মুছে ফেলুন"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
