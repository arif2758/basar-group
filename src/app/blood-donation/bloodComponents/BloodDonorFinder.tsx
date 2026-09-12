"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  Droplet,
  ShieldCheck,
  Filter,
} from "lucide-react";

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  phone: string;
  district: string;
  upazila: string;
  totalDonations: number;
  lastDonationDate: string; // YYYY-MM-DD
  isAvailable: boolean;
  donorBadge: string;
}

const mockDonors: Donor[] = [
  {
    id: "D-101",
    name: "মেহেদী হাসান রনি",
    bloodGroup: "O+",
    phone: "01711223344",
    district: "মাদারীপুর",
    upazila: "মাদারীপুর সদর",
    totalDonations: 8,
    lastDonationDate: "2026-05-10",
    isAvailable: true,
    donorBadge: "গোল্ডেন লাইফসেভার",
  },
  {
    id: "D-102",
    name: "তানভীর আহমেদ শুভ",
    bloodGroup: "A+",
    phone: "01822334455",
    district: "মাদারীপুর",
    upazila: "শিবচর",
    totalDonations: 4,
    lastDonationDate: "2026-06-01",
    isAvailable: true,
    donorBadge: "সিলভার ডোনার",
  },
  {
    id: "D-103",
    name: "ডা. নওশাদ কবির",
    bloodGroup: "B+",
    phone: "01933445566",
    district: "ফরিদপুর",
    upazila: "ফরিদপুর সদর",
    totalDonations: 12,
    lastDonationDate: "2026-08-20",
    isAvailable: false,
    donorBadge: "প্লাটিনাম হিরো",
  },
  {
    id: "D-104",
    name: "সাকলাইন মাহমুদ",
    bloodGroup: "O-",
    phone: "01744556677",
    district: "ঢাকা",
    upazila: "মিরপুর",
    totalDonations: 6,
    lastDonationDate: "2026-04-15",
    isAvailable: true,
    donorBadge: "গোল্ডেন লাইফসেভার",
  },
  {
    id: "D-105",
    name: "জাহিদুল ইসলাম",
    bloodGroup: "AB+",
    phone: "01855667788",
    district: "ঢাকা",
    upazila: "উত্তরা",
    totalDonations: 2,
    lastDonationDate: "2026-05-28",
    isAvailable: true,
    donorBadge: "ব্রোঞ্জ ডোনার",
  },
  {
    id: "D-106",
    name: "রাফসান জামিল",
    bloodGroup: "A-",
    phone: "01966778899",
    district: "চট্টগ্রাম",
    upazila: "পাহাড়তলী",
    totalDonations: 5,
    lastDonationDate: "2026-03-12",
    isAvailable: true,
    donorBadge: "গোল্ডেন লাইফসেভার",
  },
  {
    id: "D-107",
    name: "আরিফুল ইসলাম",
    bloodGroup: "B-",
    phone: "01777889900",
    district: "রাজশাহী",
    upazila: "বোয়ালিয়া",
    totalDonations: 3,
    lastDonationDate: "2026-07-10",
    isAvailable: false,
    donorBadge: "সিলভার ডোনার",
  },
  {
    id: "D-108",
    name: "শাহিন রেজা",
    bloodGroup: "AB-",
    phone: "01888990011",
    district: "খুলনা",
    upazila: "খালিশপুর",
    totalDonations: 7,
    lastDonationDate: "2026-05-02",
    isAvailable: true,
    donorBadge: "গোল্ডেন লাইফসেভার",
  },
];

const bloodGroups = ["সব", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const districts = [
  "সব জেলা",
  "মাদারীপুর",
  "ফরিদপুর",
  "ঢাকা",
  "চট্টগ্রাম",
  "রাজশাহী",
  "খুলনা",
  "বরিশাল",
  "সিলেট",
  "রংপুর",
  "ময়মনসিংহ",
  "কুমিল্লা",
];

interface BloodDonorFinderProps {
  initialGroup?: string;
  initialDistrict?: string;
}

export default function BloodDonorFinder({
  initialGroup = "সব",
  initialDistrict = "সব জেলা",
}: BloodDonorFinderProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>(initialGroup);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict);
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredDonors = useMemo(() => {
    return mockDonors.filter((donor) => {
      const matchGroup = selectedGroup === "সব" || donor.bloodGroup === selectedGroup;
      const matchDistrict = selectedDistrict === "সব জেলা" || donor.district === selectedDistrict;
      const matchAvailability = !onlyAvailable || donor.isAvailable;
      const matchSearch =
        !searchQuery ||
        donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donor.upazila.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donor.district.toLowerCase().includes(searchQuery.toLowerCase());

      return matchGroup && matchDistrict && matchAvailability && matchSearch;
    });
  }, [selectedGroup, selectedDistrict, onlyAvailable, searchQuery]);

  return (
    <section className="py-8 sm:py-12 bg-slate-50 dark:bg-[#141414] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl space-y-6">
        {/* Filter Control Card */}
        <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-[#303030] shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-[#262626]">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Search className="size-5 text-[#1677ff]" />
                <span>রক্তদাতা ফিল্টার ও অনুসন্ধান</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                রক্তের গ্রুপ, জেলা বা এলাকা দিয়ে তাৎক্ষণিক ডোনার খুঁজুন
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer bg-slate-50 dark:bg-[#141414] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#303030]">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>শুধু প্রস্তুত (Available) রক্তদাতা</span>
              </label>
            </div>
          </div>

          {/* Group Filter Chips */}
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
              রক্তের গ্রুপ নির্বাচন করুন:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {bloodGroups.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setSelectedGroup(bg)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedGroup === bg
                      ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                      : "bg-slate-50 dark:bg-[#141414] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#303030] hover:border-rose-400"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* District & Search Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                জেলা নির্বাচন:
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-[#1677ff]"
              >
                {districts.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                উপজেলা / এলাকার নাম দিয়ে খুঁজুন:
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="যেমন: শিবচর, মিরপুর, সদর..."
                className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
              >
              </input>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>মোট পাওয়া গেছে: <strong className="text-slate-900 dark:text-white font-bold">{filteredDonors.length} জন রক্তদাতা</strong></span>
          <span>সরাসরি কল বা WhatsApp করতে পারেন</span>
        </div>

        {/* Donors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredDonors.map((donor) => (
            <div
              key={donor.id}
              className="bg-white dark:bg-[#1f1f1f] rounded-2xl border border-slate-200 dark:border-[#303030] p-5 shadow-xs flex flex-col justify-between hover:border-[#1677ff] dark:hover:border-[#1677ff] transition-all"
            >
              <div>
                {/* Blood Group & Status */}
                <div className="flex items-start justify-between mb-3">
                  <div className="size-12 rounded-xl bg-rose-50 dark:bg-[#2c1618] border border-rose-200/80 dark:border-[#5b2123] text-rose-600 dark:text-[#ff7875] flex items-center justify-center font-black text-lg shadow-xs">
                    {donor.bloodGroup}
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                      donor.isAvailable
                        ? "bg-emerald-50 dark:bg-[#162312] text-emerald-600 dark:text-[#49aa19] border-emerald-200 dark:border-[#274916]"
                        : "bg-amber-50 dark:bg-[#2b2111] text-amber-600 dark:text-[#d89614] border-amber-200 dark:border-[#594214]"
                    }`}
                  >
                    <span className={`size-1.5 rounded-full ${donor.isAvailable ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                    <span>{donor.isAvailable ? "প্রস্তুত (Available)" : "বিশ্রামে"}</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {donor.name}
                </h3>

                <div className="mt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-slate-400 shrink-0" />
                    <span>{donor.upazila}, {donor.district}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Droplet className="size-3.5 text-rose-500 shrink-0" />
                    <span>মোট রক্তদান: <strong className="text-slate-800 dark:text-slate-200">{donor.totalDonations} বার</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5 text-[11px]">
                    <Calendar className="size-3.5 text-slate-400 shrink-0" />
                    <span>শেষ দান: {donor.lastDonationDate}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons: 1-Click Dial & WhatsApp */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#262626] grid grid-cols-2 gap-2">
                <a
                  href={`tel:${donor.phone}`}
                  className="h-9 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all"
                >
                  <Phone className="size-3.5" />
                  <span>কল দিন</span>
                </a>

                <a
                  href={`https://wa.me/88${donor.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="size-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredDonors.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-[#1f1f1f] rounded-2xl border border-slate-200 dark:border-[#303030] p-6 space-y-3">
            <Droplet className="size-10 text-rose-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">কোনো রক্তদাতা খুঁজে পাওয়া যায়নি</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              অনুগ্রহ করে ফিল্টার পরিবর্তন করুন অথবা লাইভ রক্তের জরুরি আবেদন পোস্ট করুন।
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
