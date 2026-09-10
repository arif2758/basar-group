"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  Save,
  Loader2,
  Camera,
  ShieldCheck
} from "lucide-react";
import { toast } from "sonner";
import { GenderType } from "@/types/enums";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    dob: "",
    gender: "",
    address: "",
    profession: "",
  });

  // Fetch user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          const user = data.user;
          setFormData({
            fullname: user.fullname || "",
            mobile: user.mobile || "",
            dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
            gender: user.gender || "",
            address: user.address || "",
            profession: user.profession || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
        // Update NextAuth session to reflect name changes globally
        if (session?.user?.fullname !== formData.fullname) {
          await update();
        }
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-slate-200 dark:border-[#303030]">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          প্রোফাইল সেটিংস
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          আপনার ব্যক্তিগত তথ্য ও যোগাযোগের ঠিকানা আপডেট করুন।
        </p>
      </div>

      <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] overflow-hidden transition-colors">
        
        {/* Profile Header/Cover */}
        <div className="h-28 bg-gradient-to-r from-blue-600 to-[#1677ff] relative">
          {session?.user?.isFamilyMember && (
            <div className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              ভেরিফায়েড মেম্বার
            </div>
          )}
        </div>
        
        {/* Avatar Section */}
        <div className="px-6 sm:px-8 pb-8 relative -mt-10">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5 mb-8">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full bg-white dark:bg-[#1f1f1f] border-4 border-white dark:border-[#1f1f1f] shadow-md flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-blue-100 dark:bg-blue-950/50 text-[#1677ff] dark:text-blue-400 flex items-center justify-center text-2xl font-bold">
                  {formData.fullname.charAt(0) || "U"}
                </div>
              </div>
              <button 
                type="button"
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                title="Update Picture"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex-1 pb-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {session?.user?.fullname}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                {session?.user?.email}
              </p>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  পূর্ণ নাম
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#262626] border border-slate-200 dark:border-[#303030] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1677ff] transition-colors"
                    placeholder="আপনার পূর্ণ নাম"
                    required
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  মোবাইল নম্বর
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#262626] border border-slate-200 dark:border-[#303030] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1677ff] transition-colors"
                    placeholder="যেমন: 01700000000"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  জন্ম তারিখ
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#262626] border border-slate-200 dark:border-[#303030] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff] transition-colors"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  লিঙ্গ
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#262626] border border-slate-200 dark:border-[#303030] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff] transition-colors appearance-none"
                >
                  <option value="">লিঙ্গ নির্বাচন করুন</option>
                  <option value={GenderType.MALE}>পুরুষ</option>
                  <option value={GenderType.FEMALE}>মহিলা</option>
                  <option value={GenderType.OTHER}>অন্যান্য</option>
                </select>
              </div>

              {/* Profession */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  পেশা
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#262626] border border-slate-200 dark:border-[#303030] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1677ff] transition-colors"
                    placeholder="যেমন: সফটওয়্যার ইঞ্জিনিয়ার"
                  />
                </div>
              </div>

            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                বর্তমান ঠিকানা
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#262626] border border-slate-200 dark:border-[#303030] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1677ff] transition-colors resize-none"
                  placeholder="আপনার বিস্তারিত ঠিকানা"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-[#1677ff] hover:bg-[#1677ff]/90 text-white font-semibold text-sm shadow-xs transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                পরিবর্তন সংরক্ষণ করুন
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
