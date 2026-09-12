"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallbackUrl = searchParams.get("callbackUrl");
  const callbackUrl =
    rawCallbackUrl &&
    !rawCallbackUrl.startsWith("/login") &&
    rawCallbackUrl !== "/family-tree" &&
    rawCallbackUrl !== "/admin/family-tree"
      ? rawCallbackUrl
      : "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      {/* Login Card */}
      <div className="w-full max-w-[420px] bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2a2a2a] rounded-2xl p-8 sm:p-10 shadow-xl dark:shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-[28px] font-semibold text-slate-900 dark:text-white tracking-tight">লগিন করুন</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 dark:border-[#303030] hover:bg-slate-50 dark:hover:bg-[#1f1f1f] bg-white dark:bg-transparent transition-colors text-slate-700 dark:text-white text-sm font-medium shadow-sm"
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-slate-200 dark:bg-[#303030]"></div>
          <span className="px-4 text-xs text-slate-400">অথবা</span>
          <div className="flex-grow h-px bg-slate-200 dark:bg-[#303030]"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* Email / Username Input */}
          <div className="relative">
            <Mail className="w-[18px] h-[18px] text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email বা Username"
              disabled={loading}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-[#303030] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-[#1677ff]/20 transition-colors"
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
              disabled={loading}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-[#303030] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-[#1677ff]/20 transition-colors"
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

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between pt-1 pb-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#303030] bg-[#141414] text-[#1677ff] focus:ring-[#1677ff] focus:ring-offset-0 focus:ring-1"
              />
              <span className="text-sm text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">মনে রাখুন</span>
            </label>
            <Link href="#" className="text-sm text-[#1677ff] hover:text-[#4096ff] transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#1677ff] hover:bg-[#4096ff] text-white font-medium text-[15px] transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "লগইন হচ্ছে..." : "লগিন করুন"}
          </button>

          {/* Dev Quick Admin Login */}
          {process.env.NODE_ENV === "development" && (
            <button
              type="button"
              id="dev-autofill-btn"
              onClick={() => {
                setEmail("admin");
                setPassword("basaradmin2026");
              }}
              className="w-full mt-2 py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              ⚡ অটো-ফিল অ্যাডমিন ক্রেডেনশিয়াল (Dev)
            </button>
          )}
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/register" className="text-[#1677ff] hover:text-[#4096ff] font-medium transition-colors">
              রেজিস্টার করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="w-full flex items-center justify-center p-8 text-slate-500">লোড হচ্ছে...</div>}>
      <LoginForm />
    </Suspense>
  );
}
