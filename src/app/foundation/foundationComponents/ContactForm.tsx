"use client";

import React, { useState, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Heart,
  Clock,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Loader2,
} from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
    volunteer: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const containerRef = useRef(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "general",
        message: "",
        volunteer: false,
      });
      setTimeout(() => setIsSuccess(false), 6000);
    }, 800);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "প্রধান কার্যালয়",
      info: "বাছার ফাউন্ডেশন ভবন\nমাদারীপুর সদর, ঢাকা বিভাগ, বাংলাদেশ",
      color: "from-[#52c41a] to-[#237804]",
    },
    {
      icon: Phone,
      title: "হটলাইন ও জরুরি যোগাযোগ",
      info: "প্রধান: +880 171 234 5678\nজরুরি সেবা: +880 198 765 432\nWhatsApp: +880 171 234 5678",
      color: "from-[#1677ff] to-[#0958d9]",
    },
    {
      icon: Mail,
      title: "ইমেইল যোগাযোগ",
      info: "সাধারণ তথ্য: info@basarfoundation.org\nঅনুদান সহায়তা: donate@basarfoundation.org",
      color: "from-[#fa8c16] to-[#ad4e00]",
    },
    {
      icon: Clock,
      title: "অফিসের সময়সূচি",
      info: "রবিবার - বৃহস্পতিবার: 9:00 AM - 6:00 PM\nজরুরি সেবা ও অ্যাম্বুলেন্স: ২৪/৭ খোলা",
      color: "from-[#722ed1] to-[#391085]",
    },
  ];

  const subjects = [
    { value: "general", label: "সাধারণ জিজ্ঞাসা" },
    { value: "donation", label: "অনুদান সম্পর্কিত তথ্য ও রসিদ" },
    { value: "volunteer", label: "স্বেচ্ছাসেবী হওয়া ও ফিল্ডওয়ার্ক" },
    { value: "partnership", label: "প্রাতিষ্ঠানিক পার্টনারশিপ / CSR" },
    { value: "emergency", label: "জরুরি মানবিক সহায়তা ও চিকিৎসা" },
  ];

  useScrollAnimation();
  useGSAP(() => {
    gsap.from(".contact-header", {
      scrollTrigger: {
        trigger: ".contact-header",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="contact" className="py-12 sm:py-16 bg-slate-50 dark:bg-[#141414] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="contact-header text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-[#111a2c] text-[#1677ff] dark:text-[#4096ff] border border-blue-200/80 dark:border-[#15325b] text-xs font-bold mb-4 tracking-wide shadow-xs">
            <MessageSquare className="size-3.5" />
            <span>সরাসরি যোগাযোগ ও সহায়তা</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
            আমরা আছি আপনার পাশে, সবসময়
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            কর্মসূচি সম্পর্কিত যেকোনো প্রশ্ন, পরামর্শ বা সহযোগিতার জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
          {/* Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-[#303030] shadow-xs">
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const InfoIcon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`bg-gradient-to-r ${info.color} size-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs text-white`}
                      >
                        <InfoIcon className="size-4.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                          {info.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed whitespace-pre-line mt-0.5">
                          {info.info}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Call & WhatsApp Action Buttons */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-[#262626] grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+880198765432"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-xs active:scale-[0.98]"
                >
                  <PhoneCall className="size-3.5" />
                  <span>জরুরি কল</span>
                </a>
                <a
                  href="https://wa.me/8801712345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-xs active:scale-[0.98]"
                >
                  <MessageCircle className="size-3.5" />
                  <span>WhatsApp চ্যাট</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-[#303030] shadow-xs">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="size-9 rounded-xl bg-blue-50 dark:bg-[#111a2c] text-[#1677ff] dark:text-[#4096ff] flex items-center justify-center">
                  <MessageSquare className="size-4.5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    বার্তা বা জিজ্ঞাসা পাঠান
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    আমাদের টিম দ্রুততম সময়ে আপনার বার্তার উত্তর দেবে
                  </p>
                </div>
              </div>

              {isSuccess ? (
                <div className="p-6 rounded-xl bg-emerald-50 dark:bg-[#162312] border border-emerald-200 dark:border-[#274916] text-center space-y-2 animate-fadeIn">
                  <div className="size-11 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="size-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">বার্তা সফলভাবে পাঠানো হয়েছে!</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    বাছার ফাউন্ডেশনের সাথে যোগাযোগের জন্য ধন্যবাদ। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        আপনার পূর্ণ নাম *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="আপনার নাম লিখুন"
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        মোবাইল নম্বর *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="01XXXXXXXXX"
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        ইমেইল ঠিকানা
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        যোগাযোগের বিষয় *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                      >
                        {subjects.map((sub) => (
                          <option key={sub.value} value={sub.value}>
                            {sub.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      আপনার বার্তা বা বিবরণ *
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 rounded-xl text-xs sm:text-sm font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )}
                    <span>বার্তা পাঠান</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
            </h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              বাছার ফাউন্ডেশনের কার্যক্রম, আর্থিক স্বচ্ছতা ও সেবা গ্রহণ সম্পর্কিত উত্তর
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-3.5">
            {[
              {
                q: "আমি কীভাবে আমার অনুদানের সামাজিক প্রভাব ও হিসাব দেখতে পারব?",
                a: "বাছার ফাউন্ডেশনের ওয়েবসাইটে নিয়মিত প্রকল্পভিত্তিক ফটো, ভিডিও এবং আর্থিক অডিট রিপোর্ট উন্মুক্ত করা হয়। দাতা যেকোনো সময় তার দেওয়া অনুদানের হিসাব ট্র্যাক করতে পারেন।",
              },
              {
                q: "অনুদানের কি ডিজিটাল রসিদ প্রদান করা হয়?",
                a: "হ্যাঁ, অনলাইন অনুদান সম্পন্ন করার সাথে সাথে স্বয়ংক্রিয়ভাবে ইউনিক ট্র্যাকিং নম্বরসহ ডিজিটাল মানি রিসিট (E-Receipt) পাওয়া যায়।",
              },
              {
                q: "কীভাবে কোনো অসহায় ব্যক্তি চিকিৎসা বা শিক্ষা সহায়তার জন্য আবেদন করতে পারেন?",
                a: "আমাদের ওয়েবসাইটের 'সহায়তার আবেদন' পোর্টাল থেকে সরাসরি ফর্ম পূরণ করে অথবা হটলাইনে ফোন করে যে কেউ নিজের জন্য বা প্রতিবেশীর জন্য সহায়তার আবেদন করতে পারেন।",
              },
              {
                q: "বাছার ফাউন্ডেশন কি যাকাত ফান্ড পরিচালনা করে?",
                a: "হ্যাঁ, সম্পূর্ণ শরীয়াহসম্মত নিয়মে দরিদ্র ও হকদারদের মাঝে যাকাতের অর্থ সরাসরি বণ্টন করা হয়। আমাদের যাকাত ক্যালকুলেটর ব্যবহার করে সঠিক হিসাবও বের করা যায়।",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1f1f1f] rounded-xl p-4.5 border border-slate-200 dark:border-[#303030] shadow-xs"
              >
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1.5">
                  {faq.q}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;