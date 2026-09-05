"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  UserPlus,
  TreePine,
  Search,
  Check,
  AlertCircle,
  Sparkles,
  User,
  Heart,
  Briefcase,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { FamilyMember } from "@/data/familyData";
import {
  getAllSelectableParents,
  generateNextChildKey,
  getGenerationLabel,
  findMemberByKey,
} from "@/utils/familyUtils";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  treeData: FamilyMember[];
  initialParentKey?: string;
  onAddMember: (
    parentKey: string,
    memberData: Omit<FamilyMember, "key" | "generation">,
    submitterInfo?: { name: string; phone: string }
  ) => void;
}

export default function AddMemberModal({
  isOpen,
  onClose,
  treeData,
  initialParentKey,
  onAddMember,
}: AddMemberModalProps) {
  const [parentKey, setParentKey] = useState<string>("");
  const [parentSearch, setParentSearch] = useState<string>("");
  const [isParentDropdownOpen, setIsParentDropdownOpen] = useState(false);

  // Member form fields
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isAlive, setIsAlive] = useState<boolean>(true);
  const [birthYear, setBirthYear] = useState("");
  const [deathYear, setDeathYear] = useState("");
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [spouse, setSpouse] = useState("");
  const [bio, setBio] = useState("");

  // Submitter info (who submitted the info)
  const [submitterName, setSubmitterName] = useState("");
  const [submitterPhone, setSubmitterPhone] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset or set initial parent on open
  useEffect(() => {
    if (isOpen) {
      const defaultKey = initialParentKey || "1-1-1-1-1"; // Default to Malek Basar or initial
      setParentKey(defaultKey);
      const parentMember = findMemberByKey(treeData, defaultKey);
      if (parentMember) {
        setParentSearch(`${parentMember.title} (আইডি: ${parentMember.key})`);
      }
      setErrors({});
    }
  }, [isOpen, initialParentKey, treeData]);

  // All selectable parents
  const allParents = useMemo(
    () => getAllSelectableParents(treeData),
    [treeData]
  );

  // Filtered parents based on search input
  const filteredParents = useMemo(() => {
    if (!parentSearch.trim()) return allParents.slice(0, 15);
    const q = parentSearch.toLowerCase();
    return allParents
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.key.toLowerCase().includes(q)
      )
      .slice(0, 20);
  }, [allParents, parentSearch]);

  // Selected parent member
  const selectedParent = useMemo(
    () => findMemberByKey(treeData, parentKey),
    [treeData, parentKey]
  );

  // Auto-calculated proposed semantic ID
  const proposedKey = useMemo(() => {
    if (!selectedParent) return "";
    return generateNextChildKey(selectedParent.key, selectedParent.children);
  }, [selectedParent]);

  const proposedGen = useMemo(() => {
    if (!selectedParent) return 1;
    return selectedParent.generation + 1;
  }, [selectedParent]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!parentKey) {
      newErrors.parent = "অনুগ্রহ করে পিতা/অভিভাবক নির্বাচন করুন";
    }
    if (!title.trim()) {
      newErrors.title = "সদস্যের পূর্ণ নাম দেওয়া আবশ্যক";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddMember(
      parentKey,
      {
        title: title.trim(),
        gender,
        isAlive,
        birthYear: birthYear.trim() || undefined,
        deathYear: !isAlive ? deathYear.trim() || undefined : undefined,
        profession: profession.trim() || undefined,
        phone: phone.trim() || undefined,
        address: address.trim() || undefined,
        spouse: spouse.trim() || undefined,
        bio: bio.trim() || undefined,
      },
      submitterName.trim()
        ? {
            name: submitterName.trim(),
            phone: submitterPhone.trim(),
          }
        : undefined
    );

    // Reset Form
    setTitle("");
    setBirthYear("");
    setDeathYear("");
    setProfession("");
    setPhone("");
    setAddress("");
    setSpouse("");
    setBio("");
    setSubmitterName("");
    setSubmitterPhone("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10">
        {/* Mobile Pull Bar */}
        <div className="sm:hidden w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mt-3 mb-1 flex-shrink-0" />

        {/* Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 flex-shrink-0 bg-slate-50/70 dark:bg-[#0c121e]/70 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <UserPlus className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                পরিবারে নতুন সদস্য যুক্ত করুন
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                বংশলতিকায় নতুন সন্তান বা সদস্যের তথ্য অন্তর্ভুক্তি ফর্ম
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto px-5 sm:px-6 py-5 space-y-5 flex-1">
          {/* Section 1: Parent Selection & Auto Semantic ID */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-3">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              ১. পিতা বা অভিভাবক নির্বাচন করুন <span className="text-rose-500">*</span>
            </label>

            {/* Parent Searchable Combobox */}
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={parentSearch}
                  onChange={(e) => {
                    setParentSearch(e.target.value);
                    setIsParentDropdownOpen(true);
                  }}
                  onFocus={() => setIsParentDropdownOpen(true)}
                  placeholder="পিতার নাম বা আইডি দিয়ে খুঁজুন..."
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1a2233] border text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.parent
                      ? "border-rose-500"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>

              {errors.parent && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.parent}
                </p>
              )}

              {/* Dropdown Options */}
              {isParentDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#151c2c] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-30 max-h-56 overflow-y-auto p-1.5 animate-fade-in">
                  {filteredParents.length === 0 ? (
                    <p className="p-3 text-center text-xs text-slate-400">
                      কোনো অভিভাবক পাওয়া যায়নি
                    </p>
                  ) : (
                    filteredParents.map((p) => {
                      const isSelected = p.key === parentKey;
                      return (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => {
                            setParentKey(p.key);
                            setParentSearch(`${p.title} (আইডি: ${p.key})`);
                            setIsParentDropdownOpen(false);
                            setErrors((prev) => ({ ...prev, parent: "" }));
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                            isSelected
                              ? "bg-emerald-600 text-white font-bold"
                              : "hover:bg-slate-100 dark:hover:bg-[#1e2535] text-slate-800 dark:text-slate-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                p.gender === "female"
                                  ? "bg-rose-500"
                                  : "bg-blue-500"
                              }`}
                            />
                            <span className="truncate font-semibold">{p.title}</span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            <span className="font-mono text-[10px] opacity-75">
                              {p.key}
                            </span>
                            <span className="text-[10px] opacity-75">
                              {getGenerationLabel(p.generation)}
                            </span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Generated Semantic ID Preview Badge */}
            {selectedParent && proposedKey && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-600 dark:text-slate-300">
                  স্বয়ংক্রিয়ভাবে নির্ধারিত আইডি:
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>আইডি: {proposedKey}</span>
                  <span className="text-[10px] font-sans font-normal opacity-75">
                    ({getGenerationLabel(proposedGen)})
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Section 2: Personal Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              ২. সদস্যের মৌলিক তথ্য
            </h3>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                সদস্যের পুরো নাম <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors((prev) => ({ ...prev, title: "" }));
                }}
                placeholder="যেমন: তানভীর বাছার, সেলিনা আক্তার..."
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1a2233] border text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.title
                    ? "border-rose-500"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              />
              {errors.title && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Gender & Living Status Toggle Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Gender Radio Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  লিঙ্গ
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      gender === "male"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-slate-100 dark:bg-[#1a2233] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <span>পুরুষ ♂</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      gender === "female"
                        ? "bg-rose-600 text-white shadow-md shadow-rose-500/20"
                        : "bg-slate-100 dark:bg-[#1a2233] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <span>মহিলা ♀</span>
                  </button>
                </div>
              </div>

              {/* Living Status Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  জীবনাবস্থা
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAlive(true)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isAlive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                        : "bg-slate-100 dark:bg-[#1a2233] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <span>জীবিত</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAlive(false)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      !isAlive
                        ? "bg-slate-700 text-white shadow-md shadow-slate-700/20"
                        : "bg-slate-100 dark:bg-[#1a2233] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <span>পরলোকগত</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Birth & Death Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  জন্ম সাল
                </label>
                <input
                  type="text"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  placeholder="যেমন: ১৯৯৫"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  মৃত্যু সাল {!isAlive && "(যদি প্রযোজ্য)"}
                </label>
                <input
                  type="text"
                  disabled={isAlive}
                  value={deathYear}
                  onChange={(e) => setDeathYear(e.target.value)}
                  placeholder={isAlive ? "জীবিত" : "যেমন: ২০২২"}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-40"
                />
              </div>
            </div>

            {/* Profession & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  পেশা
                </label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="যেমন: সফটওয়্যার ইঞ্জিনিয়ার, ব্যবসায়ী..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  মোবাইল নম্বর
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="যেমন: ০১৭১২-৩৪৫৬৭৮"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Address & Spouse */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  বর্তমান ঠিকানা
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="যেমন: ঢাকা, বাংলাদেশ"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  জীবনসঙ্গী (স্বামী / স্ত্রী)
                </label>
                <input
                  type="text"
                  value={spouse}
                  onChange={(e) => setSpouse(e.target.value)}
                  placeholder="স্বামী বা স্ত্রীর নাম"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Bio / Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                সংক্ষিপ্ত পরিচিতি বা বিশেষ তথ্য
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="সদস্যের অবদান বা বিশেষ কোনো তথ্য..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>
          </div>

          {/* Section 3: Submitter Information */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              ৩. আবেদনকারীর তথ্য (ঐচ্ছিক - ভেরিফিকেশনের জন্য)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                value={submitterName}
                onChange={(e) => setSubmitterName(e.target.value)}
                placeholder="আপনার নাম"
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400"
              />
              <input
                type="tel"
                value={submitterPhone}
                onChange={(e) => setSubmitterPhone(e.target.value)}
                placeholder="আপনার মোবাইল নম্বর"
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col xs:flex-row items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="w-full xs:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              বাতিল করুন
            </button>

            <button
              type="submit"
              className="w-full xs:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>সদস্য যুক্ত করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
