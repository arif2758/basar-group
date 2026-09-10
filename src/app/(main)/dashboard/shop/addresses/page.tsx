import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import {
  MapPin,
  ArrowLeft,
  Plus,
  Home,
  Briefcase,
  Phone,
  User as UserIcon,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "ডেলিভারি ঠিকানা | BASAR Group Super Shop",
  description: "আপনার সংরক্ষিত ডেলিভারি ঠিকানা পরিচালনা করুন",
};

export const dynamic = "force-dynamic";

export default async function ShopAddressesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard/shop/addresses");

  await dbConnect();
  const user = await User.findById(session.user.id).select("addresses fullname mobile address").lean<{
    fullname?: string;
    mobile?: string;
    address?: string;
    addresses?: Array<{
      _id: string;
      label?: string;
      name?: string;
      phone?: string;
      addressLine1?: string;
      city?: string;
      district?: string;
      isDefault?: boolean;
    }>;
  }>();

  const savedAddresses = user?.addresses || [];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-12 transition-colors">
      <Link
        href="/dashboard/shop"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#1677ff] dark:text-slate-400 dark:hover:text-[#1677ff] transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        <span>সুপার শপ ড্যাশবোর্ডে ফিরে যান</span>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <MapPin className="size-6 text-emerald-500" />
            <span>সংরক্ষিত ডেলিভারি ঠিকানা</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            সহজ ও দ্রুত চেকআউটের জন্য আপনার ডেলিভারি ঠিকানাসমূহ সংরক্ষণ করুন।
          </p>
        </div>

        <Link
          href="/dashboard/profile"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1677ff] hover:bg-[#1677ff]/90 text-white transition-colors shadow-xs shrink-0 self-start sm:self-auto"
        >
          <Plus className="size-3.5" />
          <span>ঠিকানা আপডেট করুন</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Primary Profile Address Card */}
        <div className="rounded-2xl p-5 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-3 transition-colors relative">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/40">
              <Home className="size-3" />
              <span>ডিফল্ট ঠিকানা (প্রোফাইল)</span>
            </div>
            <CheckCircle2 className="size-4 text-emerald-500" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <UserIcon className="size-3.5 text-slate-400" />
              <span>{user?.fullname || session.user.name || "গ্রাহক"}</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Phone className="size-3.5 text-slate-400" />
              <span>{user?.mobile || "ফোন নম্বর দেওয়া হয়নি"}</span>
            </p>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-100 dark:border-[#262626]">
            {user?.address || "প্রোফাইলে বিস্তারিত ঠিকানা এখনও সংরক্ষণ করা হয়নি।"}
          </p>
        </div>

        {/* Saved Addresses List */}
        {savedAddresses.map((addr, idx) => (
          <div
            key={String(addr._id || idx)}
            className="rounded-2xl p-5 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-3 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/40">
                <Briefcase className="size-3" />
                <span>{addr.label || "অন্যান্য ঠিকানা"}</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {addr.name || user?.fullname}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {addr.phone || user?.mobile}
              </p>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-100 dark:border-[#262626]">
              {addr.addressLine1}
              {addr.city ? `, ${addr.city}` : ""}
              {addr.district ? `, ${addr.district}` : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
