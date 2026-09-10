"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Truck,
  Building2,
  ChevronDown,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CONTACT_METHODS = [
  {
    icon: Phone,
    title: "হটলাইন ও সরাসরি কল",
    details: "01754154374",
    actionText: "সরাসরি কল দিন",
    href: "tel:01754154374",
    availability: "সকাল ৯:০০ - রাত ১০:০০ (প্রতিদিন)",
    badge: "ইনস্ট্যান্ট কল",
  },
  {
    icon: MessageCircle,
    title: "হোয়াটসঅ্যাপ চ্যাট",
    details: "01568390014",
    actionText: "হোয়াটসঅ্যাপে মেসেজ দিন",
    href: "https://wa.me/8801568390014?text=হ্যালো!+বাসার+সুপার+শপ+সম্পর্কে+জানতে+চাই।",
    availability: "২৪/৭ সক্রিয় কাস্টমার কেয়ার",
    badge: "সবচেয়ে দ্রুত",
    isWhatsApp: true,
  },
  {
    icon: Mail,
    title: "ইমেইল সাপোর্ট",
    details: "support@basargroup.com",
    actionText: "ইমেইল পাঠান",
    href: "mailto:support@basargroup.com",
    availability: "২ থেকে ৪ ঘণ্টার মধ্যে রেসপন্স",
    badge: "অফিসিয়াল",
  },
  {
    icon: MapPin,
    title: "আমাদের শপ ও আউটলেট",
    details: "কেরানীগঞ্জ, ঢাকা, বাংলাদেশ",
    actionText: "লোকেশন দেখুন",
    href: "https://maps.google.com/?q=Keraniganj,+Dhaka",
    availability: "সপ্তাহের ৭ দিনই খোলা",
    badge: "ভিজিট করুন",
  },
];

const FAQS = [
  {
    question: "ডেলিভারি পেতে কত দিন সময় লাগে?",
    answer:
      "ঢাকার ভেতরে সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ৪৮ থেকে ৭২ ঘণ্টার মধ্যে ক্যাশ অন ডেলিভারিতে হোম ডেলিভারি সম্পন্ন হয়।",
  },
  {
    question: "পণ্য পছন্দ না হলে বা সমস্যা থাকলে কীভাবে রিটার্ন করব?",
    answer:
      "পণ্য ডেলিভারি পাওয়ার পর কোনো সমস্যা বা ত্রুটি থাকলে আমাদের WhatsApp বা হটলাইনে যোগাযোগ করুন। আমাদের টিম দ্রুত যাচাই করে ৭ দিনের মধ্যে সহজ এক্সচেঞ্জ বা রিফান্ডের ব্যবস্থা করবে।",
  },
  {
    question: "আমি কি ডেলিভারির সময় পণ্য দেখে মূল্য পরিশোধ করতে পারি?",
    answer:
      "হ্যাঁ, সারা বাংলাদেশে ১০০% ক্যাশ অন ডেলিভারি (COD) সুবিধা রয়েছে। ডেলিভারিম্যানের সামনে পার্সেল চেক করে নিশ্চিন্তে মূল্য পরিশোধ করতে পারবেন।",
  },
  {
    question: "আমার অর্ডারের বর্তমান অবস্থা কীভাবে জানব?",
    answer:
      "আমাদের ওয়েবসাইটের 'অর্ডার ট্র্যাক' মেন্যুতে গিয়ে আপনার অর্ডার আইডি (যেমন: GH-WEB-260910-0003) অথবা ১১ ডিজিটের মোবাইল নম্বর দিলেই লাইভ স্ট্যাটাস দেখতে পারবেন।",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "অর্ডার সংক্রান্ত জিজ্ঞাসা",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error("অনুগ্রহ করে নাম, ফোন নম্বর এবং বার্তা পূরণ করুন");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("আপনার বার্তা সফলভাবে গৃহীত হয়েছে! আমাদের প্রতিনিধি দ্রুত যোগাযোগ করবেন।");
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "অর্ডার সংক্রান্ত জিজ্ঞাসা",
        message: "",
      });
    }, 800);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendViaWhatsApp = () => {
    if (!formData.name.trim() || !formData.message.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম ও বার্তা লিখুন");
      return;
    }

    const text = `*নতুন যোগাযোগ বার্তা - বাসার সুপার শপ*\n\nনাম: ${formData.name}\nফোন: ${formData.phone || "দেওয়া হয়নি"}\nবিষয়: ${formData.subject}\nবার্তা:\n${formData.message}`;
    window.open(`https://wa.me/8801568390014?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen pb-16 pt-3">
      {/* Hero Banner Section */}
      <section className="container mx-auto px-4 mb-8">
        <div className="bg-white dark:bg-[#141414] rounded-3xl border border-slate-200 dark:border-[#303030] p-8 sm:p-12 text-center shadow-sm relative overflow-hidden transition-colors">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e6f4ff] dark:bg-[#111a2c] border border-[#91caff] dark:border-[#153450] text-[#1677ff] dark:text-[#1668dc] text-xs font-semibold mb-4">
            <Sparkles className="size-3.5" />
            <span>২৪/৭ কাস্টমার সার্ভিস ও সাপোর্ট</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            আমাদের সাথে যোগাযোগ করুন
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            আপনার যেকোনো প্রশ্ন, অর্ডার ট্র্যাকিং, বাল্ক ক্রয় বা ফিডব্যাকের জন্য আমরা সবসময় প্রস্তুত।
            নিচের যেকোনো মাধ্যমে নির্দ্বিধায় আমাদের সাথে যুক্ত হোন।
          </p>
        </div>
      </section>

      {/* 4 Contact Channels Cards Grid */}
      <section className="container mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CONTACT_METHODS.map((method, idx) => {
            const Icon = method.icon;
            return (
              <a
                key={idx}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group bg-white dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-[#303030] p-6 shadow-sm hover:border-[#1677ff] dark:hover:border-[#1668dc] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={cn(
                        "size-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                        method.isWhatsApp
                          ? "bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20"
                          : "bg-[#e6f4ff] dark:bg-[#111a2c] text-[#1677ff] dark:text-[#1668dc] border border-[#91caff]/60 dark:border-[#153450]",
                      )}
                    >
                      <Icon className="size-6" />
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2.5 py-0.5 rounded-full border",
                        method.isWhatsApp
                          ? "bg-[#25D366]/10 text-[#25D366] border-[#25D366]/30"
                          : "bg-slate-100 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#303030]",
                      )}
                    >
                      {method.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    {method.title}
                  </h3>

                  <p className="text-sm font-mono font-bold text-[#1677ff] dark:text-[#1668dc] mb-2">
                    {method.details}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {method.availability}
                  </p>
                </div>

                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#1677ff] dark:group-hover:text-[#1668dc] flex items-center gap-1.5 transition-colors">
                  <span>{method.actionText}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Main Form & Support Info Grid */}
      <section className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#141414] rounded-3xl border border-slate-200 dark:border-[#303030] p-6 sm:p-10 shadow-sm transition-colors">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 flex items-center gap-2">
                <Send className="size-5 text-[#1677ff]" />
                আমাদের বার্তা পাঠান
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                নিচের ফর্মটি পূরণ করে সাবমিট করুন অথবা সরাসরি হোয়াটসঅ্যাপে বার্তা পাঠান
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    আপনার নাম <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="যেমন: আরিফ হাসান"
                    className="h-11 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-300 dark:border-[#424242] text-slate-900 dark:text-white placeholder:text-slate-400 font-medium text-sm focus-visible:ring-4 focus-visible:ring-[#1677ff]/10 focus-visible:border-[#1677ff] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    মোবাইল নম্বর <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="যেমন: 017XXXXXXXX"
                    className="h-11 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-300 dark:border-[#424242] text-slate-900 dark:text-white placeholder:text-slate-400 font-medium text-sm focus-visible:ring-4 focus-visible:ring-[#1677ff]/10 focus-visible:border-[#1677ff] transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    ইমেইল এড্রেস <span className="text-slate-400 font-normal">(ঐচ্ছিক)</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="h-11 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-300 dark:border-[#424242] text-slate-900 dark:text-white placeholder:text-slate-400 font-medium text-sm focus-visible:ring-4 focus-visible:ring-[#1677ff]/10 focus-visible:border-[#1677ff] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    বার্তার বিষয়
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-300 dark:border-[#424242] text-slate-900 dark:text-white font-medium text-sm px-3 focus:outline-none focus:ring-4 focus:ring-[#1677ff]/10 focus:border-[#1677ff] transition-all"
                  >
                    <option value="অর্ডার সংক্রান্ত জিজ্ঞাসা">অর্ডার সংক্রান্ত জিজ্ঞাসা</option>
                    <option value="ডেলিভারি সমস্যা">ডেলিভারি সমস্যা</option>
                    <option value="পণ্য রিটার্ন বা পরিবর্তন">পণ্য রিটার্ন বা পরিবর্তন</option>
                    <option value="পণ্য অনুসন্ধান বা স্টক">পণ্য অনুসন্ধান বা স্টক</option>
                    <option value="মতামত ও পরামর্শ">মতামত ও পরামর্শ</option>
                    <option value="অন্যান্য">অন্যান্য</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  আপনার বার্তা <span className="text-red-500">*</span>
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="আপনার প্রশ্ন বা প্রয়োজনীয় তথ্য বিস্তারিত লিখুন..."
                  className="rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-300 dark:border-[#424242] text-slate-900 dark:text-white placeholder:text-slate-400 font-medium text-sm focus-visible:ring-4 focus-visible:ring-[#1677ff]/10 focus-visible:border-[#1677ff] transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-12 rounded-xl bg-[#1677ff] hover:bg-[#4096ff] active:bg-[#0958d9] text-white font-bold text-sm tracking-wide shadow-sm hover:shadow-md transition-all gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>পাঠানো হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      <span>বার্তা পাঠান</span>
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  variant="outline"
                  className="h-12 rounded-xl border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 font-bold text-sm transition-all gap-2"
                >
                  <MessageCircle className="size-4" />
                  <span>WhatsApp এ পাঠান</span>
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: Support & FAQs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Operating Hours Card */}
            <div className="bg-white dark:bg-[#141414] rounded-3xl border border-slate-200 dark:border-[#303030] p-6 sm:p-8 shadow-sm transition-colors space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-[#262626]">
                <div className="size-10 rounded-xl bg-[#e6f4ff] dark:bg-[#111a2c] text-[#1677ff] dark:text-[#1668dc] flex items-center justify-center">
                  <Clock className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    কার্যক্রমের সময়সূচি
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    আমাদের কাস্টমার কেয়ার ও সাপোর্ট টিম
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030]">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    সোমবার - রবিবার (হটলাইন)
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    9:00 AM - 10:00 PM
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030]">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    WhatsApp লাইভ চ্যাট
                  </span>
                  <span className="font-bold text-[#25D366] font-mono">
                    24/7 актив
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030]">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    হোম ডেলিভারি সময়
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    24 - 72 ঘণ্টা
                  </span>
                </div>
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="bg-white dark:bg-[#141414] rounded-3xl border border-slate-200 dark:border-[#303030] p-6 sm:p-8 shadow-sm transition-colors space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-[#262626]">
                <div className="size-10 rounded-xl bg-[#e6f4ff] dark:bg-[#111a2c] text-[#1677ff] dark:text-[#1668dc] flex items-center justify-center">
                  <HelpCircle className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    সাধারণ জিজ্ঞাসা (FAQ)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    কাস্টমারদের সচরাচর সাধারণ প্রশ্নাবলী
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 dark:border-[#303030] overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full text-left p-3.5 flex items-center justify-between gap-2 text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-[#1677ff] dark:hover:text-[#1668dc] transition-colors bg-slate-50/50 dark:bg-[#1f1f1f]/50"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={cn(
                            "size-4 text-slate-400 transition-transform duration-200 shrink-0",
                            isOpen && "rotate-180 text-[#1677ff]",
                          )}
                        />
                      </button>

                      {isOpen && (
                        <div className="p-3.5 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-[#1f1f1f]/50 border-t border-slate-100 dark:border-[#262626]">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trust Assurance Strip */}
            <div className="p-5 rounded-2xl bg-[#e6f4ff]/50 dark:bg-[#111a2c]/50 border border-[#91caff]/60 dark:border-[#153450] flex items-center gap-3">
              <ShieldCheck className="size-6 text-[#1677ff] shrink-0" />
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                আপনার প্রতিটি মতামত ও বার্তা আমাদের সেবার মান উন্নয়নে অত্যন্ত মূল্যবান।
                আমরা সর্বোচ্চ আন্তরিকতার সাথে সহায়তা করতে প্রতিশ্রুতিবদ্ধ।
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
