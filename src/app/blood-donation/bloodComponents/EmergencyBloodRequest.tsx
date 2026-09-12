"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  Send,
  CheckCircle2,
  Phone,
  Hospital,
  MapPin,
  Clock,
  Droplet,
  Calendar,
  User,
  ShieldAlert,
  Loader2,
  Copy,
  Check,
} from "lucide-react";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const bloodReasons = [
  "সিজারিয়ান / ডেলিভারি",
  "জরুরি অপারেশন / সার্জারি",
  "দুর্ঘটনাজনিত রক্তক্ষরণ",
  "থ্যালাসেমিয়া রোগী",
  "ডেঙ্গু / প্লাটিলেট প্রয়োজন",
  "ডায়ালাইসিস / কিডনি রোগী",
  "ক্যান্সার / কেমোথেরাপি",
  "অন্যান্য জরুরি কারণ",
];

export default function EmergencyBloodRequest() {
  const [patientName, setPatientName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [bagsNeeded, setBagsNeeded] = useState("1");
  const [hospitalName, setHospitalName] = useState("");
  const [district, setDistrict] = useState("মাদারীপুর");
  const [neededTime, setNeededTime] = useState("");
  const [reason, setReason] = useState(bloodReasons[0]);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !hospitalName || !district || !contactPhone) {
      alert("অনুগ্রহ করে রোগীর নাম, হাসপাতাল, জেলা ও যোগাযোগের নম্বর পূরণ করুন।");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const trackingCode = `SOS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedData({
        trackingCode,
        patientName,
        bloodGroup,
        bagsNeeded,
        hospitalName,
        district,
        neededTime: neededTime || "যতো দ্রুত সম্ভব (ASAP)",
        contactPhone,
        date: new Date().toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" }),
      });
    }, 1000);
  };

  const handleCopy = () => {
    if (!submittedData) return;
    const shareText = `🚨 জরুরি রক্তের প্রয়োজন (বাছার রক্তদান নেটওয়ার্ক)\nরোগী: ${submittedData.patientName}\nগ্রুপ: ${submittedData.bloodGroup} (${submittedData.bagsNeeded} ব্যাগ)\nহাসপাতাল: ${submittedData.hospitalName}, ${submittedData.district}\nসময়: ${submittedData.neededTime}\nযোগাযোগ: ${submittedData.contactPhone}\nট্র্যাকিং: ${submittedData.trackingCode}`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-8 sm:py-12 bg-slate-50 dark:bg-[#141414] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-[#2c1618] text-rose-600 dark:text-[#ff7875] border border-rose-200/80 dark:border-[#5b2123] text-xs font-bold mb-3 tracking-wide shadow-xs">
            <AlertTriangle className="size-3.5 animate-pulse" />
            <span>জরুরি লাইভ SOS পোস্ট</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            জরুরি রক্তের আবেদন করুন
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            আবেদনটি সাবমিট করার সাথে সাথে আমাদের লাইভ ফিড ও স্থানীয় রক্তদাতাদের নেটওয়ার্কে নোটিফিকেশন পৌঁছে যাবে।
          </p>
        </div>

        <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl border border-slate-200 dark:border-[#303030] p-5 sm:p-8 shadow-sm">
          {submittedData ? (
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="size-14 rounded-full bg-rose-100 dark:bg-[#2c1618] text-rose-600 dark:text-[#ff7875] border border-rose-200 dark:border-[#5b2123] mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="size-8" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  জরুরি রক্তের আবেদন লাইভ হয়েছে!
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  আপনার এলাকার {submittedData.bloodGroup} গ্রুপের রক্তদাতাদের কাছে অনুরোধটি পৌঁছে দেওয়া হয়েছে।
                </p>
              </div>

              {/* SOS Ticket Card */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] text-left space-y-2.5 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-[#262626]">
                  <span className="font-bold text-rose-600 dark:text-[#ff7875] flex items-center gap-1">
                    <Droplet className="size-3.5 fill-current" />
                    জরুরি রক্তের পোস্ট
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">{submittedData.trackingCode}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">রোগীর নাম:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{submittedData.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">রক্তের গ্রুপ:</span>
                  <span className="font-black text-rose-600 dark:text-[#ff7875]">{submittedData.bloodGroup} ({submittedData.bagsNeeded} ব্যাগ)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">হাসপাতাল:</span>
                  <span className="font-medium text-slate-900 dark:text-white text-right">{submittedData.hospitalName}, {submittedData.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">যোগাযোগের নম্বর:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{submittedData.contactPhone}</span>
                </div>
              </div>

              {/* Share & Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleCopy}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  <span>{copied ? "তথ্য কপি হয়েছে!" : "পোস্ট কপি করে Facebook/WhatsApp এ শেয়ার করুন"}</span>
                </button>

                <button
                  onClick={() => setSubmittedData(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-[#141414] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#303030] hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  নতুন আবেদন করুন
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Group & Bags */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  ১. রক্তের গ্রুপ ও ব্যাগের সংখ্যা নির্বাচন করুন *
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {bloodGroups.map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => setBloodGroup(bg)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        bloodGroup === bg
                          ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                          : "bg-slate-50 dark:bg-[#141414] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#303030] hover:border-rose-400"
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient & Hospital Details */}
              <div className="pt-4 border-t border-slate-100 dark:border-[#262626] space-y-3.5">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  ২. রোগী ও হাসপাতালের বিবরণ:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      রোগীর পুরো নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="উদা: ফাহমিদা আক্তার"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      কত ব্যাগ রক্ত লাগবে? *
                    </label>
                    <select
                      value={bagsNeeded}
                      onChange={(e) => setBagsNeeded(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:border-rose-500"
                    >
                      <option value="1">১ ব্যাগ</option>
                      <option value="2">২ ব্যাগ</option>
                      <option value="3">৩ ব্যাগ</option>
                      <option value="4">৪ ব্যাগ</option>
                      <option value="5+">৫+ ব্যাগ (জরুরি)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      হাসপাতাল / ক্লিনিকের নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      placeholder="উদা: মাদারীপুর সদর হাসপাতাল"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      জেলা *
                    </label>
                    <input
                      type="text"
                      required
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="উদা: মাদারীপুর"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      রক্তদানের কারণ *
                    </label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500"
                    >
                      {bloodReasons.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      রক্ত লাগার সম্ভাব্য সময় *
                    </label>
                    <input
                      type="text"
                      value={neededTime}
                      onChange={(e) => setNeededTime(e.target.value)}
                      placeholder="যেমন: আজ দুপুর ২টা / জরুরি"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t border-slate-100 dark:border-[#262626] space-y-3.5">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  ৩. যোগাযোগের তথ্য (ডোনাররা যাতে সরাসরি কল দিতে পারেন):
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      যোগাযোগকারীর নাম
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="উদা: মো. তারিকুল (ভাই)"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      সক্রিয় মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldAlert className="size-4 text-rose-500 shrink-0" />
                  <span>ভুয়া বা অসত্য তথ্য দিয়ে আবেদন করা কঠোরভাবে নিষিদ্ধ।</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 h-11 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>পোস্ট সাবমিট হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      <span>জরুরি আবেদন লাইভ করুন</span>
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
