"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
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
        router.push("/admin/family-tree");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/admin/family-tree" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      {/* Login Card */}
      <div className="w-full max-w-[420px] bg-[#141414] border border-[#2a2a2a] rounded-xl p-8 sm:p-10 shadow-2xl relative z-10 animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-[28px] font-semibold text-white tracking-tight">Sign In</h1>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-[#303030] hover:bg-[#1f1f1f] transition-colors text-white text-sm font-medium"
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-[#303030]"></div>
          <span className="px-4 text-xs text-slate-400">or</span>
          <div className="flex-grow h-px bg-[#303030]"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="relative">
            <Mail className="w-[18px] h-[18px] text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              disabled={loading}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-[#303030] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#1677ff] transition-colors"
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
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-transparent border border-[#303030] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#1677ff] transition-colors"
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
              <span className="text-sm text-slate-200 group-hover:text-white transition-colors">Remember me</span>
            </label>
            <Link href="#" className="text-sm text-[#1677ff] hover:text-[#4096ff] transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#1677ff] hover:bg-[#4096ff] text-white font-medium text-[15px] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#1677ff] hover:text-[#4096ff] font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
