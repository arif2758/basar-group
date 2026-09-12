"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  FileText,
  UserCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Stethoscope,
  GraduationCap,
  Sparkles,
  Utensils,
  Briefcase,
  Loader2,
  Copy,
  Check,
} from "lucide-react";

interface AidCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  badge: string;
}

const aidCategories: AidCategory[] = [
  {
    id: "medical",
    title: "চিকিৎসা ও ঔষধ সহায়তা",
    icon: Stethoscope,
    description: "অসহায় রোগী, জটিল অপারেশন বা নিয়মিত জীবনরক্ষাকারী ঔষধ কেনার জন্য আর্থিক ও সরাসরি সহায়তা।",
    badge: "জরুরি স্বাস্থ্য",
  },
  {
    id: "education",
    title: "শিক্ষা ফি ও উপবৃত্তি",
    icon: GraduationCap,
    description: "আর্থিক টানাপোড়েনে পড়াশোনা বন্ধ হওয়ার ঝুঁকিতে থাকা শিক্ষার্থীদের মাসিক সহায়তা ও পরীক্ষার ফি।",
    badge: "মেধা ও ভবিষ্যৎ",
  },
  {
    id: "emergency",
    title: "দুর্যোগ ও খাদ্য ত্রাণ",
    icon: Utensils,
    description: "বন্যা, নদীভাঙন বা আকস্মিক বিপর্যয়ে ক্ষতিগ্রস্ত পরিবারের জন্য তাৎক্ষণিক খাদ্য ও আশ্রয় সামগ্রী।",
    badge: "জরুরি ত্রাণ",
  },
  {
    id: "livelihood",
    title: "স্বাবলম্বীকরণ উদ্যোগ",
    icon: Briefcase,
    description: "বিধবা, প্রতিবন্ধী বা কর্মহীন মানুষদের জন্য সেলাই মেশিন, ভ্যানগাড়ি বা ক্ষুদ্র ব্যবসার উপকরণ।",
    badge: "স্থায়ী জীবিকা",
  },
];

export default function AidRequestSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("medical");
  const [applicantName, setApplicantName] = useState<string>("");
  const [applicantPhone, setApplicantPhone] = useState<string>("");
  const [applicantLocation, setApplicantLocation] = useState<string>("");
  const [nidNumber, setNidNumber] = useState<string>("");
  const [requestedAmount, setRequestedAmount] = useState<string>("");
  const [reasonDescription, setReasonDescription] = useState<string>("");
  const [referencePerson, setReferencePerson] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone || !applicantLocation || !reasonDescription) {
      alert("অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর, এলাকা ও বিস্তারিত বিবরণ পূরণ করুন।");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const trackingId = `AID-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedData({
        trackingId,
        name: applicantName,
        phone: applicantPhone,
        category: aidCategories.find((c) => c.id === selectedCategory)?.title,
        location: applicantLocation,
        date: new Date().toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" }),
      });
    }, 1000);
  };

  const handleCopyTracking = () => {
    if (!submittedData) return;
    navigator.clipboard.writeText(submittedData.trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="request-aid" className="py-12 sm:py-16 bg-slate-50 dark:bg-[#141414] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-[#162312] text-emerald-600 dark:text-[#49aa19] border border-emerald-200/80 dark:border-[#274916] text-xs font-bold mb-4 tracking-wide shadow-xs">
            <HelpCircle className="size-3.5" />
            <span>সহায়তার আবেদন পোর্টাল</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            আপনি বা আপনার পরিচিত কেউ কি বিপদে? <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-[#1677ff]">
              সরাসরি বাছার ফাউন্ডেশনে আবেদন করুন
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            কোনো প্রকার মধ্যস্থতাকারী ছাড়াই সরাসরি আমাদের ভেরিফিকেশন টিমের কাছে আপনার আবেদন পৌঁছাবে। তথ্যের শতভাগ গোপনীয়তা রক্ষা করা হয়।
          </p>
        </div>

        {/* Aid Request Form Box */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#1f1f1f] rounded-2xl border border-slate-200 dark:border-[#303030] p-5 sm:p-8 lg:p-10 shadow-sm">
          {submittedData ? (
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="size-14 rounded-full bg-emerald-100 dark:bg-[#162312] text-emerald-600 dark:text-[#49aa19] border border-emerald-200 dark:border-[#274916] mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="size-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  আপনার সহায়তার আবেদন সফলভাবে গৃহীত হয়েছে!
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                  বাছার ফাউন্ডেশনের ফিল্ড ভেরিফিকেশন টিম আগামী <strong>২৪ থেকে ৪৮ ঘণ্টার মধ্যে</strong> আপনার সাথে মোবাইল ফোনে যোগাযোগ করবে।
                </p>
              </div>

              {/* Tracking ID Box */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] flex items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-slate-400">ট্র্যাকিং নম্বর:</span>
                  <p className="text-lg font-mono font-black text-[#1677ff] dark:text-[#4096ff]">
                    {submittedData.trackingId}
                  </p>
                </div>
                <button
                  onClick={handleCopyTracking}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-[#262626] border border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-[#303030] cursor-pointer"
                >
                  {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                  <span>{copied ? "কপি হয়েছে" : "কপি"}</span>
                </button>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmittedData(null);
                    setApplicantName("");
                    setApplicantPhone("");
                    setApplicantLocation("");
                    setReasonDescription("");
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white transition-colors cursor-pointer"
                >
                  আরেকটি আবেদন করুন
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Step 1: Category Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2.5">
                  ১. সহায়তার ধরন নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {aidCategories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-emerald-50/70 dark:bg-[#162312] border-emerald-500 dark:border-[#274916] ring-2 ring-emerald-500/20 shadow-xs"
                            : "bg-slate-50 dark:bg-[#141414] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#424242]"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className={`p-2 rounded-lg ${isSelected ? "bg-emerald-500 text-white" : "bg-white dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300"}`}>
                              <Icon className="size-4.5" />
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#303030]">
                              {cat.badge}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">{cat.title}</h4>
                          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                            {cat.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Applicant Information */}
              <div className="pt-6 border-t border-slate-100 dark:border-[#262626] space-y-3.5">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  ২. আবেদনকারীর ব্যক্তিগত ও যোগাযোগের তথ্য:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      আবেদনকারী / সুবিধাভোগীর পুরো নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="উদা: আকলিমা বেগম"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      মোবাইল নম্বর (যোগাযোগের জন্য সক্রিয়) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      এলাকা / গ্রাম, ইউনিয়ন ও জেলা *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantLocation}
                      onChange={(e) => setApplicantLocation(e.target.value)}
                      placeholder="উদা: শিবচর, মাদারীপুর"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      জাতীয় পরিচয়পত্র / জন্মনিবন্ধন নম্বর
                    </label>
                    <input
                      type="text"
                      value={nidNumber}
                      onChange={(e) => setNidNumber(e.target.value)}
                      placeholder="যদি থাকে (ঐচ্ছিক)"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Detailed Reason & Amount */}
              <div className="pt-6 border-t border-slate-100 dark:border-[#262626] space-y-3.5">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  ৩. বিস্তারিত সমস্যা ও সহায়তার বিবরণ:
                </label>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    আপনার বর্তমান পরিস্থিতি ও সমস্যার বিস্তারিত বিবরণ লিখুন *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reasonDescription}
                    onChange={(e) => setReasonDescription(e.target.value)}
                    placeholder="কী কারণে আপনার এই সহায়তা প্রয়োজন? (যেমন: অসুস্থতার বিবরণ, পরিবারের অবস্থা ইত্যাদি স্পষ্টভাবে লিখুন)..."
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      প্রয়োজনীয় আনুমানিক টাকার পরিমাণ (যদি জানা থাকে)
                    </label>
                    <input
                      type="text"
                      value={requestedAmount}
                      onChange={(e) => setRequestedAmount(e.target.value)}
                      placeholder="উদা: ১৫,০০০"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      স্থানীয় কোনো সম্মানিত ব্যক্তি / প্রতিবেশীর নাম ও মোবাইল (রেফারেন্স)
                    </label>
                    <input
                      type="text"
                      value={referencePerson}
                      onChange={(e) => setReferencePerson(e.target.value)}
                      placeholder="উদা: মাস্টার মোশাররফ হোসেন (018XXXXXXXX)"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-slate-100 dark:border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
                  <span>আবেদনকারীর তথ্য সম্পূর্ণ গোপন ও সংরক্ষিত রাখা হবে।</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 h-11 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 active:scale-[0.98] transition-all shadow-[0_4px_14px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>আবেদন জমা হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      <span>আবেদন সাবমিট করুন</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
