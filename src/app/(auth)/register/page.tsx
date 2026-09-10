"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Mail, Lock, User as UserIcon, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCredentialsRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong.");
      } else {
        toast.success("Account created successfully! Please sign in.");
        setFullname("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      toast.error("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    signIn("google", { callbackUrl: "/admin/family-tree" });
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      {/* Register Card */}
      <div className="w-full max-w-[420px] bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2a2a2a] rounded-2xl p-8 sm:p-10 shadow-xl dark:shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-[28px] font-semibold text-slate-900 dark:text-white tracking-tight">রেজিস্টার করুন</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </div>

        {/* Google Sign Up */}
        <button
          onClick={handleGoogleSignup}
          type="button"
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 dark:border-[#303030] hover:bg-slate-50 dark:hover:bg-[#1f1f1f] bg-white dark:bg-transparent transition-colors text-slate-700 dark:text-white text-sm font-medium shadow-sm disabled:opacity-50"
        >
          <FcGoogle className="w-5 h-5" />
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-slate-200 dark:bg-[#303030]"></div>
          <span className="px-4 text-xs text-slate-400">অথবা</span>
          <div className="flex-grow h-px bg-slate-200 dark:bg-[#303030]"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleCredentialsRegister} className="space-y-4">
          {/* Full Name Input */}
          <div className="relative">
            <UserIcon className="w-[18px] h-[18px] text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Full name"
              disabled={loading}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-[#303030] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-[#1677ff]/20 transition-colors disabled:opacity-50"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="w-[18px] h-[18px] text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              disabled={loading}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-[#303030] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-[#1677ff]/20 transition-colors disabled:opacity-50"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="w-[18px] h-[18px] text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              minLength={8}
              disabled={loading}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-[#303030] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-[#1677ff]/20 transition-colors disabled:opacity-50"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 pl-1">
            অন্তত ৮ টি অক্ষর, একটি বড় হাতের অক্ষর ও একটি নাম্বার থাকতে হবে
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-lg bg-[#1677ff] hover:bg-[#4096ff] text-white font-medium text-[15px] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "রেজিস্টার হচ্ছে..." : "রেজিস্টার করুন"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link href="/login" className="text-[#1677ff] hover:text-[#4096ff] font-medium transition-colors">
              লগিন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
