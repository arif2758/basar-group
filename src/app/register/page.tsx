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
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      {/* Register Card */}
      <div className="w-full max-w-[420px] bg-[#141414] border border-[#2a2a2a] rounded-xl p-8 sm:p-10 shadow-2xl relative z-10 animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-[28px] font-semibold text-white tracking-tight">Sign Up</h1>
        </div>

        {/* Google Sign Up */}
        <button
          onClick={handleGoogleSignup}
          type="button"
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-[#303030] hover:bg-[#1f1f1f] transition-colors text-white text-sm font-medium disabled:opacity-50"
        >
          <FcGoogle className="w-5 h-5" />
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-[#303030]"></div>
          <span className="px-4 text-xs text-slate-400">or</span>
          <div className="flex-grow h-px bg-[#303030]"></div>
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
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-[#303030] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#1677ff] transition-colors disabled:opacity-50"
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
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-[#303030] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#1677ff] transition-colors disabled:opacity-50"
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
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-transparent border border-[#303030] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#1677ff] transition-colors disabled:opacity-50"
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
          <p className="text-[11px] text-slate-500 mt-1 pl-1">
            Must be 8+ characters, with an uppercase letter & a number
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-lg bg-[#1677ff] hover:bg-[#4096ff] text-white font-medium text-[15px] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1677ff] hover:text-[#4096ff] font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
