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
                  Community Grocery & Youth Enterprise
                </p>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Your neighborhood grocery digitally transformed. 100% farm-fresh produce delivered in 2 hours, with profits directly funding free IT education and library programs.
            </p>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="max-w-sm">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Get Weekly Deals & Coupons
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm outline-none focus:border-emerald-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Subscribed! Check your inbox for 10% coupon.</span>
                </p>
              )}
            </form>
          </div>

          {/* Grocery Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/super-shop/shop?category=fresh-produce" className="hover:text-emerald-400 transition-colors">
                  Fresh Produce
                </Link>
              </li>
              <li>
                <Link href="/super-shop/shop?category=vegetables" className="hover:text-emerald-400 transition-colors">
                  Vegetables & Greens
                </Link>
              </li>
              <li>
                <Link href="/super-shop/shop?category=dairy" className="hover:text-emerald-400 transition-colors">
                  Pure Dairy & Eggs
                </Link>
              </li>
              <li>
                <Link href="/super-shop/shop?category=grains-&-rice" className="hover:text-emerald-400 transition-colors">
                  Rice & Organic Grains
                </Link>
              </li>
              <li>
                <Link href="/super-shop/shop?category=seafood" className="hover:text-emerald-400 transition-colors">
                  Fresh Fish & Seafood
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/super-shop/shop" className="hover:text-emerald-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/super-shop/cart" className="hover:text-emerald-400 transition-colors">
                  My Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/foundation" className="hover:text-emerald-400 transition-colors">
                  Social Welfare Mission
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Help & Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Payment Badges */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact & Hours
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
                <span>BASAR Complex, Dhaka, Bangladesh</span>
              </div>
            </div>

            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Payment Methods
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
          <p>© {new Date().getFullYear()} BASAR Super Shop. A BASAR Group Initiative. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}