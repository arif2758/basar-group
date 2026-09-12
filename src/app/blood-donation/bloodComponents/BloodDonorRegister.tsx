"use client";

import React, { useState } from "react";
import {
  Droplet,
  CheckCircle2,
  ShieldCheck,
  Send,
  Calendar,
  Award,
  User,
  Heart,
  Loader2,
  Sparkles,
} from "lucide-react";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const districts = [
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
  "অন্যান্য",
];

export default function BloodDonorRegister() {
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [gender, setGender] = useState("পুরুষ");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("মাদারীপুর");
  const [upazila, setUpazila] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState("");
  const [totalDonations, setTotalDonations] = useState("0");
  const [agreeHealth, setAgreeHealth] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredHero, setRegisteredHero] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !upazila || !agreeHealth) {
      alert("অনুগ্রহ করে সকল তথ্য পূরণ করুন এবং স্বাস্থ্যবিধিতে সম্মতি প্রদান করুন।");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const memberId = `BD-HERO-${Math.floor(10000 + Math.random() * 90000)}`;
      setRegisteredHero({
        memberId,
        name,
        bloodGroup,
        phone,
        district,
        upazila,
        totalDonations: Number(totalDonations) || 0,
      });
    }, 900);
  };

  return (
    <section className="py-8 sm:py-12 bg-slate-50 dark:bg-[#141414] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-[#162312] text-emerald-600 dark:text-[#49aa19] border border-emerald-200/80 dark:border-[#274916] text-xs font-bold mb-3 tracking-wide shadow-xs">
            <Sparkles className="size-3.5" />
            <span>স্বেচ্ছাসেবী রক্তদাতা নিবন্ধন</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            রক্তদাতা হিরো হিসেবে যুক্ত হোন
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            আপনার রক্তের গ্রুপ ও এলাকা রেজিস্টার করে রাখুন। জরুরি মুহূর্তে কোনো বিপন্ন মানুষের জীবন বাঁচাতে আপনার ফোন বেজে উঠবে।
          </p>
        </div>

        <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl border border-slate-200 dark:border-[#303030] p-5 sm:p-8 shadow-sm">
          {registeredHero ? (
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="size-16 rounded-full bg-emerald-100 dark:bg-[#162312] text-emerald-600 dark:text-[#49aa19] border border-emerald-200 dark:border-[#274916] mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="size-9" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  অভিনন্দন, আপনি এখন একজন নিবন্ধিত রক্তদাতা!
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  বাছার রক্তদান নেটওয়ার্কে যুক্ত হওয়ার জন্য আপনাকে আন্তরিক ধন্যবাদ ও শ্রদ্ধা।
                </p>
              </div>

              {/* Digital Hero Donor Card */}
              <div className="max-w-sm mx-auto p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl border border-slate-700 text-left relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">
                      বাছার রক্তদান নেটওয়ার্ক
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">{registeredHero.name}</h4>
                    <p className="text-xs text-slate-400">{registeredHero.upazila}, {registeredHero.district}</p>
                  </div>

                  <div className="size-12 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                    {registeredHero.bloodGroup}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700/80 flex justify-between items-baseline text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400">ডোনার আইডি:</span>
                    <p className="font-mono font-bold text-emerald-400">{registeredHero.memberId}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400">স্ট্যাটাস:</span>
                    <p className="font-bold text-white flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      ভেরিফাইড ডোনার
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setRegisteredHero(null)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white transition-colors cursor-pointer"
                >
                  আরেকটি রেজিস্ট্রেশন করুন
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Group Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  ১. আপনার রক্তের গ্রুপ নির্বাচন করুন *
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {bloodGroups.map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => setBloodGroup(bg)}
                      className={`py-2 px-1 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
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

              {/* Personal Information */}
              <div className="pt-4 border-t border-slate-100 dark:border-[#262626] space-y-3.5">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  ২. ব্যক্তিগত ও যোগাযোগের তথ্য:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      আপনার পূর্ণ নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="উদা: তাওহীদ হাসান"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      সক্রিয় মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      জেলা *
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-[#1677ff]"
                    >
                      {districts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      উপজেলা / থানা / এলাকা *
                    </label>
                    <input
                      type="text"
                      required
                      value={upazila}
                      onChange={(e) => setUpazila(e.target.value)}
                      placeholder="উদা: শিবচর"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      লিঙ্গ
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                    >
                      <option value="পুরুষ">পুরুষ</option>
                      <option value="নারী">নারী</option>
                      <option value="অন্যান্য">অন্যান্য</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      বয়স (বছর)
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="উদা: ২৪"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      ওজন (কেজি)
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="উদা: ৬০"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>
                </div>
              </div>

              {/* Donation History */}
              <div className="pt-4 border-t border-slate-100 dark:border-[#262626] space-y-3">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  ৩. রক্তদানের পূর্ব অভিজ্ঞতা:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      সর্বশেষ রক্তদানের তারিখ (যদি পূর্বে দিয়ে থাকেন)
                    </label>
                    <input
                      type="date"
                      value={lastDonationDate}
                      onChange={(e) => setLastDonationDate(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      মোট কতবার রক্ত দিয়েছেন?
                    </label>
                    <input
                      type="number"
                      value={totalDonations}
                      onChange={(e) => setTotalDonations(e.target.value)}
                      placeholder="0"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>
                </div>
              </div>

              {/* Health Agreement */}
              <div className="pt-4 border-t border-slate-100 dark:border-[#262626]">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    required
                    checked={agreeHealth}
                    onChange={(e) => setAgreeHealth(e.target.checked)}
                    className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span>
                    আমি নিশ্চিত করছি যে আমার বয়স ১৮ বছরের বেশি, ওজন ৪৫ কেজির বেশি এবং আমি রক্তদানের মতো সুস্থ শারীরিক অবস্থায় আছি।
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl text-xs sm:text-sm font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>নিবন্ধন সম্পন্ন হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Droplet className="size-4 fill-current" />
                    <span>রক্তদাতা হিসেবে নিবন্ধন সম্পন্ন করুন</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
