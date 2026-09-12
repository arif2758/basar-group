"use client";

import React, { useState } from "react";
import {
  Heart,
  Gift,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Download,
  Sparkles,
  ArrowRight,
  User,
  Phone,
  Mail,
  Building,
  Smartphone,
  Wallet,
  Coins,
  Loader2,
  Receipt,
  X,
} from "lucide-react";

interface SponsorItem {
  id: string;
  name: string;
  category: string;
  unitPrice: number;
  icon: string;
  unit: string;
  impactText: string;
}

const sponsorItems: SponsorItem[] = [
  {
    id: "school-bag",
    name: "স্কুল ব্যাগ ও স্টেশনারি কিট",
    category: "শিক্ষা",
    unitPrice: 500,
    icon: "🎒",
    unit: "১ জন শিশু",
    impactText: "১টি শিশুর এক বছরের বই, খাতা, কলম ও সুন্দর ব্যাগ নিশ্চিত করে।",
  },
  {
    id: "warm-blanket",
    name: "উষ্ণ কম্বল ও শীতবস্ত্র",
    category: "শীতবস্ত্র",
    unitPrice: 400,
    icon: "🧥",
    unit: "১টি পরিবার",
    impactText: "কঠোর শীতে নদীভাঙন এলাকার ১টি পরিবারের সদস্যদের উষ্ণতা উপহার দেয়।",
  },
  {
    id: "solar-lamp",
    name: "সোলার রিচার্জেবল স্টাডি ল্যাম্প",
    category: "শিক্ষা ও আলো",
    unitPrice: 1200,
    icon: "💡",
    unit: "১ জন শিক্ষার্থী",
    impactText: "বিদ্যুৎবিহীন চরাঞ্চলে রাতে পড়ার টেবিল আলোকিত রাখে।",
  },
  {
    id: "farmer-seeds",
    name: "উচ্চফলনশীল বীজ ও সার প্যাকেজ",
    category: "কৃষি",
    unitPrice: 1500,
    icon: "🌾",
    unit: "১ জন কৃষক",
    impactText: "বন্যাপরবর্তী ১ বিঘা জমিতে নতুন ফসল ফলানোর পথ খুলে দেয়।",
  },
  {
    id: "sewing-machine",
    name: "টেকসই সেলাই মেশিন",
    category: "স্বাবলম্বীকরণ",
    unitPrice: 8500,
    icon: "🧵",
    unit: "১ জন দুস্থ মা",
    impactText: "একজন অসহায় নারীকে পরিবার চালানোর স্থায়ী উপার্জনের উৎস দেয়।",
  },
  {
    id: "water-tubewell",
    name: "বিশুদ্ধ পানির গভীর নলকূপ",
    category: "স্বাস্থ্য ও পানি",
    unitPrice: 25000,
    icon: "💧",
    unit: "১টি পুরো গ্রাম / পাড়া",
    impactText: "২০০+ মানুষের জন্য আর্সেনিকমুক্ত নিরাপদ খাবার পানি নিশ্চিত করে।",
  },
];

const presetAmounts = [200, 500, 1000, 2500, 5000, 10000];

interface QuickDonationProps {
  selectedCauseTitle?: string;
}

export default function QuickDonation({ selectedCauseTitle }: QuickDonationProps) {
  const [activeTab, setActiveTab] = useState<"general" | "zakat" | "sponsor">("general");
  
  // Amounts
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedSponsorId, setSelectedSponsorId] = useState<string>("school-bag");
  const [sponsorQuantity, setSponsorQuantity] = useState<number>(1);

  // Zakat Calculator
  const [cashInHand, setCashInHand] = useState<string>("");
  const [goldSilverValue, setGoldSilverValue] = useState<string>("");
  const [businessAssets, setBusinessAssets] = useState<string>("");
  const [debtsOwed, setDebtsOwed] = useState<string>("");

  // Payment & Donor
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket" | "bank">("bkash");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>("");
  const [donorPhone, setDonorPhone] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");

  // State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Calculated Zakat
  const calculateTotalZakat = () => {
    const cash = Number(cashInHand) || 0;
    const assets = Number(goldSilverValue) || 0;
    const business = Number(businessAssets) || 0;
    const debts = Number(debtsOwed) || 0;
    const netWealth = Math.max(0, cash + assets + business - debts);
    return Math.round(netWealth * 0.025);
  };

  const currentFinalAmount = () => {
    if (activeTab === "sponsor") {
      const item = sponsorItems.find((s) => s.id === selectedSponsorId);
      return (item?.unitPrice || 500) * sponsorQuantity;
    }
    if (activeTab === "zakat") {
      const zakat = calculateTotalZakat();
      if (customAmount) return Number(customAmount) || 0;
      return zakat > 0 ? zakat : selectedAmount;
    }
    if (customAmount) {
      return Number(customAmount) || 0;
    }
    return selectedAmount;
  };

  const handleAmountPresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(val);
    if (val) {
      setSelectedAmount(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = currentFinalAmount();
    if (finalAmount <= 0) {
      alert("অনুগ্রহ করে অনুদানের একটি সঠিক পরিমাণ নির্বাচন বা প্রদান করুন।");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedTrx = transactionId || `TRX-${Date.now().toString().slice(-8)}`;
      const receiptNo = `BF-DON-${Math.floor(100000 + Math.random() * 900000)}`;

      let purposeTitle = "সাধারণ মানবকল্যাণ তহবিল";
      if (activeTab === "zakat") purposeTitle = "যাকাত ও দারিদ্র্য বিমোচন ফান্ড";
      if (activeTab === "sponsor") {
        const item = sponsorItems.find((s) => s.id === selectedSponsorId);
        purposeTitle = `স্পনসরশিপ: ${item?.name} (${sponsorQuantity} ${item?.unit})`;
      } else if (selectedCauseTitle) {
        purposeTitle = `ক্যাম্পেইন: ${selectedCauseTitle}`;
      }

      setReceiptData({
        receiptNo,
        trxId: generatedTrx,
        date: new Date().toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" }),
        amount: finalAmount,
        donorName: isAnonymous ? "বেনামী শুভাকাঙ্ক্ষী (Anonymous)" : donorName || "শ্রদ্ধেয় শুভাকাঙ্ক্ষী",
        donorPhone: donorPhone || "N/A",
        purpose: purposeTitle,
        paymentMethod: paymentMethod.toUpperCase(),
      });
    }, 1200);
  };

  const handleCopyReceipt = () => {
    if (!receiptData) return;
    const text = `বাছার ফাউন্ডেশন - ডিজিটাল ডোনেশন রসিদ\nরসিদ নং: ${receiptData.receiptNo}\nতারিখ: ${receiptData.date}\nদাতা: ${receiptData.donorName}\nখাত: ${receiptData.purpose}\nপরিমাণ: ৳${receiptData.amount.toLocaleString("bn-BD")}\nপেমেন্ট মেথড: ${receiptData.paymentMethod} (TrxID: ${receiptData.trxId})\n\nআমাদের পাশে থাকার জন্য ধন্যবাদ!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="quick-donation" className="py-12 sm:py-16 bg-slate-50 dark:bg-[#141414] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-[#111a2c] text-[#1677ff] dark:text-[#4096ff] border border-blue-200/80 dark:border-[#15325b] text-xs font-bold mb-4 tracking-wide shadow-xs">
            <Heart className="size-3.5 fill-current" />
            <span>সরাসরি অনলাইন অনুদান ও যাকাত</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            সহজেই অনুদান দিন ও নিশ্চিত করুন <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1677ff] via-sky-500 to-emerald-500">
              টেকসই সমাজকল্যাণ ও স্বচ্ছতা
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            বিকাশ, নগদ, রকেট বা ব্যাংকের মাধ্যমে নিরাপদে সরাসরি ফান্ডে যুক্ত হোন এবং সঙ্গে সঙ্গে ডিজিটাল রসিদ সংগ্রহ করুন।
          </p>
        </div>

        {/* Main Donation Container */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#1f1f1f] rounded-2xl border border-slate-200 dark:border-[#303030] p-5 sm:p-8 lg:p-10 shadow-sm">
          {/* Tab Selector */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] mb-8">
            <button
              onClick={() => setActiveTab("general")}
              className={`py-2.5 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "general"
                  ? "bg-[#1677ff] text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#262626]"
              }`}
            >
              <Heart className="size-4 shrink-0" />
              <span>সাধারণ অনুদান</span>
            </button>

            <button
              onClick={() => setActiveTab("zakat")}
              className={`py-2.5 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "zakat"
                  ? "bg-[#1677ff] text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#262626]"
              }`}
            >
              <Calculator className="size-4 shrink-0" />
              <span>যাকাত ক্যালকুলেটর</span>
            </button>

            <button
              onClick={() => setActiveTab("sponsor")}
              className={`py-2.5 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "sponsor"
                  ? "bg-[#1677ff] text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#262626]"
              }`}
            >
              <Gift className="size-4 shrink-0" />
              <span>উপহার স্পনসর</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Tab 1: General Donation */}
            {activeTab === "general" && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2.5">
                    অনুদানের পরিমাণ নির্বাচন করুন (টাকায়):
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleAmountPresetClick(amt)}
                        className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                          selectedAmount === amt && !customAmount
                            ? "bg-[#1677ff] text-white border-[#1677ff] shadow-xs"
                            : "bg-slate-50 dark:bg-[#141414] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#303030] hover:border-[#1677ff]"
                        }`}
                      >
                        ৳{amt.toLocaleString("bn-BD")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                    অথবা নিজের ইচ্ছামতো যেকোনো পরিমাণ লিখুন:
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      ৳
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="যেমন: ৩,৫০০"
                      className="w-full h-11 pl-8 pr-4 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:border-[#1677ff] transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Zakat Calculator */}
            {activeTab === "zakat" && (
              <div className="space-y-5 animate-fadeIn">
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-[#2b2111] border border-amber-200/80 dark:border-[#594214] text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                  <Coins className="size-4.5 shrink-0 text-amber-600 dark:text-[#d89614] mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>যাকাত নির্দেশিকা:</strong> এক বছর সংরক্ষিত মোট উদ্বৃত্ত সম্পদের ২.৫% যাকাত হিসেবে প্রদান করা ফরজ। নিচের ফিল্ডগুলোতে আপনার সম্পদের আনুমানিক মান বসিয়ে স্বয়ংক্রিয় যাকাত বের করুন।
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      নগদ টাকা ও ব্যাংক ব্যালেন্স (৳)
                    </label>
                    <input
                      type="number"
                      value={cashInHand}
                      onChange={(e) => setCashInHand(e.target.value)}
                      placeholder="0"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white font-bold text-xs focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      স্বর্ণ ও রূপার বর্তমান বাজারমূল্য (৳)
                    </label>
                    <input
                      type="number"
                      value={goldSilverValue}
                      onChange={(e) => setGoldSilverValue(e.target.value)}
                      placeholder="0"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white font-bold text-xs focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      ব্যবসার বিক্রয়যোগ্য পণ্যের মূল্য (৳)
                    </label>
                    <input
                      type="number"
                      value={businessAssets}
                      onChange={(e) => setBusinessAssets(e.target.value)}
                      placeholder="0"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white font-bold text-xs focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      বর্তমান ঋণ ও অবিলম্বে প্রদেয় দেনা (৳)
                    </label>
                    <input
                      type="number"
                      value={debtsOwed}
                      onChange={(e) => setDebtsOwed(e.target.value)}
                      placeholder="0"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white font-bold text-xs focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>
                </div>

                {/* Zakat Result Box */}
                <div className="p-4 rounded-xl bg-[#e6f4ff] dark:bg-[#111a2c] border border-[#91caff]/60 dark:border-[#15325b] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">হিসাবকৃত প্রদেয় যাকাত (২.৫%):</p>
                    <p className="text-2xl font-black text-[#1677ff] dark:text-[#4096ff]">
                      ৳{calculateTotalZakat().toLocaleString("bn-BD")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const z = calculateTotalZakat();
                      if (z > 0) {
                        setSelectedAmount(z);
                        setCustomAmount("");
                      }
                    }}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-[#1677ff] text-white hover:bg-[#4096ff] transition-all shadow-xs cursor-pointer"
                  >
                    এই পরিমাণ যাকাত ফান্ডে যুক্ত করুন
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Sponsor an Item */}
            {activeTab === "sponsor" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sponsorItems.map((item) => {
                    const isSelected = selectedSponsorId === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedSponsorId(item.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-blue-50/70 dark:bg-[#111a2c] border-[#1677ff] shadow-xs"
                            : "bg-slate-50 dark:bg-[#141414] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#424242]"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-xs font-bold text-[#1677ff] dark:text-[#4096ff] bg-blue-100/60 dark:bg-[#15325b] px-2 py-0.5 rounded-md">
                              ৳{item.unitPrice.toLocaleString("bn-BD")} / {item.unit}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</h4>
                          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                            {item.impactText}
                          </p>
                        </div>

                        {isSelected && (
                          <div className="mt-3 pt-2 border-t border-blue-200 dark:border-[#15325b] flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">সংখ্যা:</span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSponsorQuantity((q) => Math.max(1, q - 1));
                                }}
                                className="size-6 rounded-md bg-slate-200 dark:bg-[#262626] text-slate-900 dark:text-white font-bold flex items-center justify-center text-xs cursor-pointer"
                              >
                                -
                              </button>
                              <span className="font-bold text-xs">{sponsorQuantity}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSponsorQuantity((q) => q + 1);
                                }}
                                className="size-6 rounded-md bg-slate-200 dark:bg-[#262626] text-slate-900 dark:text-white font-bold flex items-center justify-center text-xs cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="pt-6 border-t border-slate-100 dark:border-[#262626] space-y-3.5">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                পেমেন্ট মাধ্যম বেছে নিন:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "bkash", name: "bKash (বিকাশ)", num: "01712-345678 (মার্চেন্ট)" },
                  { id: "nagad", name: "Nagad (নগদ)", num: "01987-654321 (মার্চেন্ট)" },
                  { id: "rocket", name: "Rocket (রকেট)", num: "01811-223344 (মার্চেন্ট)" },
                  { id: "bank", name: "Bank Transfer", num: "Islami Bank / City Bank" },
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === method.id
                        ? "bg-white dark:bg-[#141414] border-[#1677ff] ring-2 ring-[#1677ff]/20 shadow-xs"
                        : "bg-slate-50 dark:bg-[#141414] border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#424242]"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">{method.name}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block">{method.num}</span>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <div
                        className={`size-3.5 rounded-full border flex items-center justify-center ${
                          paymentMethod === method.id ? "border-[#1677ff] bg-[#1677ff]" : "border-slate-300 dark:border-slate-600"
                        }`}
                      >
                        {paymentMethod === method.id && <div className="size-1 rounded-full bg-white" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Number Instruction */}
              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-[#111a2c] border border-blue-200/60 dark:border-[#15325b] text-xs text-slate-700 dark:text-slate-300 space-y-0.5">
                <p className="font-semibold text-[#1677ff] dark:text-[#4096ff]">
                  💳 পেমেন্ট নির্দেশনা:
                </p>
                <p>
                  আপনার {paymentMethod.toUpperCase()} অ্যাপ থেকে অনুদানের টাকা <strong>বাছার ফাউন্ডেশনের মার্চেন্ট নম্বরে</strong> প্রদান করে নিচের ট্রানজেকশন আইডি প্রদান করুন অথবা সাবমিট করুন।
                </p>
              </div>
            </div>

            {/* Donor Information */}
            <div className="pt-6 border-t border-slate-100 dark:border-[#262626] space-y-3.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  দাতার পরিচয় ও রসিদের বিবরণ:
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded border-slate-300 text-[#1677ff] focus:ring-[#1677ff]"
                  />
                  <span>বেনামে দান করতে চাই</span>
                </label>
              </div>

              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      আপনার পুরো নাম *
                    </label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="উদা: আরিফুর রহমান"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      মোবাইল নম্বর (এসএমএস রসিদের জন্য) *
                    </label>
                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      ট্রানজেকশন আইডি (TrxID)
                    </label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="উদা: 9M76AX89"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Total Summary & Submit */}
            <div className="pt-6 border-t border-slate-100 dark:border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">মোট অনুদানের পরিমাণ:</p>
                <p className="text-3xl font-black text-[#1677ff] dark:text-[#4096ff]">
                  ৳{currentFinalAmount().toLocaleString("bn-BD")}
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || currentFinalAmount() <= 0}
                className="w-full sm:w-auto px-8 h-12 rounded-xl text-sm font-bold text-white bg-[#1677ff] hover:bg-[#4096ff] active:scale-[0.98] transition-all shadow-[0_4px_14px_rgba(22,119,255,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4.5 animate-spin" />
                    <span>অনুদান সম্পন্ন হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Heart className="size-4.5 fill-current" />
                    <span>অনলাইন অনুদান নিশ্চিত করুন</span>
                    <ArrowRight className="size-4.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Digital Receipt Modal */}
      {receiptData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setReceiptData(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-[#141414] transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>

            {/* Success Header */}
            <div className="text-center space-y-1.5">
              <div className="size-12 rounded-full bg-emerald-100 dark:bg-[#162312] text-emerald-600 dark:text-[#49aa19] border border-emerald-200 dark:border-[#274916] mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="size-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                অনুদানের জন্য আন্তরিক ধন্যবাদ!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                আপনার অনুদান বাছার ফাউন্ডেশনের তহবিলে সফলভাবে যুক্ত হয়েছে।
              </p>
            </div>

            {/* Receipt Card */}
            <div className="rounded-xl bg-slate-50 dark:bg-[#141414] border border-dashed border-slate-300 dark:border-[#303030] p-4.5 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-[#262626]">
                <span className="font-bold text-[#1677ff] dark:text-[#4096ff]">বাছার ফাউন্ডেশন</span>
                <span className="font-mono text-slate-500">{receiptData.receiptNo}</span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>দাতার নাম:</span>
                <span className="font-bold text-slate-900 dark:text-white">{receiptData.donorName}</span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>অনুদানের খাত:</span>
                <span className="font-semibold text-slate-900 dark:text-white text-right">{receiptData.purpose}</span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>তারিখ:</span>
                <span className="font-medium text-slate-900 dark:text-white">{receiptData.date}</span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>পেমেন্ট ও TrxID:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {receiptData.paymentMethod} ({receiptData.trxId})
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-[#262626] flex justify-between items-baseline">
                <span className="font-bold text-slate-800 dark:text-slate-200">মোট প্রদান:</span>
                <span className="text-xl font-black text-emerald-600 dark:text-[#49aa19]">
                  ৳{receiptData.amount.toLocaleString("bn-BD")}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCopyReceipt}
                className="flex-1 h-10.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-[#141414] hover:bg-slate-200 dark:hover:bg-[#262626] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#303030] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="size-4" />
                <span>{copied ? "কপি হয়েছে!" : "রসিদ কপি করুন"}</span>
              </button>
              <button
                onClick={() => setReceiptData(null)}
                className="flex-1 h-10.5 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ঠিক আছে</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
