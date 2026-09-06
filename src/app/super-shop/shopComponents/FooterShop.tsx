"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Heart,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

export default function FooterShop() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-[#070b14] text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/super-shop" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  BASAR Super Shop
                </h3>
                <p className="text-xs text-emerald-400 font-medium">
                  কমিউনিটি গ্রোসারি ও তরুণদের সামাজিক উদ্যোগ
                </p>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              আপনার পরিচিত গ্রোসারি সেবা এখন আধুনিক ডিজিটাল রূপে। 100% খামারের তাজা পণ্য 2 ঘণ্টায় ডেলিভারি, যার মুনাফা সরাসরি ব্যয় হয় বিনামূল্যে IT শিক্ষা ও পাঠাগার পরিচালনায়।
            </p>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="max-w-sm">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                সাপ্তাহিক স্পেশাল ডিল ও কুপন পান
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm outline-none focus:border-emerald-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <span>যুক্ত হোন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>ধন্যবাদ! 10% ছাড়ের কুপনের জন্য আপনার ইনবক্স চেক করুন।</span>
                </p>
              )}
            </form>
          </div>

          {/* Grocery Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              ক্যাটাগরি
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/super-shop/shop?category=fresh-produce" className="hover:text-emerald-400 transition-colors">
                  তাজা শাকসবজি ও ফল
                </Link>
              </li>
              <li>
                <Link href="/super-shop/shop?category=vegetables" className="hover:text-emerald-400 transition-colors">
                  শাকসবজি
                </Link>
              </li>
              <li>
                <Link href="/super-shop/shop?category=dairy" className="hover:text-emerald-400 transition-colors">
                  খাঁটি দুগ্ধজাত ও ডিম
                </Link>
              </li>
              <li>
                <Link href="/super-shop/shop?category=grains-&-rice" className="hover:text-emerald-400 transition-colors">
                  চাল ও অর্গানিক শস্য
                </Link>
              </li>
              <li>
                <Link href="/super-shop/shop?category=seafood" className="hover:text-emerald-400 transition-colors">
                  তাজা মাছ ও সি-ফুড
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              কাস্টমার সার্ভিস
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/super-shop/shop" className="hover:text-emerald-400 transition-colors">
                  সকল পণ্যসমূহ
                </Link>
              </li>
              <li>
                <Link href="/super-shop/cart" className="hover:text-emerald-400 transition-colors">
                  আমার শপিং কার্ট
                </Link>
              </li>
              <li>
                <Link href="/foundation" className="hover:text-emerald-400 transition-colors">
                  সামাজিক কল্যাণ মিশন
                </Link>
              </li>
              <li>
                <Link href="/super-shop/contact" className="hover:text-emerald-400 transition-colors">
                  সাহায্য ও কাস্টমার সাপোর্ট
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Payment Badges */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              যোগাযোগ ও সময়সূচি
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400 mb-5">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+88 01700-000000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>shop@basargroup.org</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>বাছার কমপ্লেক্স, ঢাকা, বাংলাদেশ</span>
              </div>
            </div>

            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              পেমেন্ট মাধ্যমসমূহ
            </h5>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] font-bold text-pink-400 border border-slate-700">
                bKash
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] font-bold text-orange-400 border border-slate-700">
                Nagad
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] font-bold text-purple-400 border border-slate-700">
                Rocket
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] font-bold text-emerald-400 border border-slate-700">
                Cash on Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BASAR Super Shop | বাছার গ্রুপ উদ্যোগ। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              গোপনীয়তা নীতি
            </Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
              ব্যবহারের শর্তাবলী
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}