"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, ArrowRight, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const ClaimSchema = z.object({
  email: z.string().email("সঠিক ইমেইল দিন"),
  password: z.string().min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
});

type ClaimValues = z.infer<typeof ClaimSchema>;

export function AccountClaimForm({ orderNumber }: { orderNumber: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimValues>({
    resolver: zodResolver(ClaimSchema),
  });

  const onSubmit = async (data: ClaimValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/claim-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, orderNumber }),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "একাউন্ট তৈরি করতে সমস্যা হয়েছে");
        return;
      }

      toast.success("সফলভাবে একাউন্ট তৈরি হয়েছে!");
      
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInResult?.error) {
        toast.error("স্বয়ংক্রিয়ভাবে লগিন হতে সমস্যা হয়েছে, অনুগ্রহ করে লগিন করুন।");
        router.push("/login");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      toast.error("সার্ভার এরর, একটু পর আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 sm:p-7 max-w-lg mx-auto text-left space-y-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-3.5">
        <div className="size-11 rounded-xl bg-[#e6f4ff] dark:bg-[#111a2c] border border-[#91caff]/60 dark:border-[#15325b]/60 flex items-center justify-center text-[#1677ff] dark:text-[#3c89e8] shrink-0">
          <UserPlus className="size-5.5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">একাউন্ট তৈরি করুন (ঐচ্ছিক)</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            ভবিষ্যতে দ্রুত অর্ডার করতে এবং সব অর্ডারের স্ট্যাটাস দেখতে আপনার ইমেইল দিয়ে একটি পাসওয়ার্ড সেট করুন।
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 ml-0.5">
            ইমেইল
          </Label>
          <Input
            {...register("email")}
            type="email"
            placeholder="আপনার ইমেইল দিন"
            className="h-11 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#141414] focus:border-[#1677ff] dark:focus:border-[#1668dc] focus:ring-2 focus:ring-[#1677ff]/15 text-sm"
          />
          {errors.email && (
            <p className="text-xs text-[#cf1322] dark:text-[#ff7875] font-semibold mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 ml-0.5">
            নতুন পাসওয়ার্ড
          </Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
            className="h-11 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#141414] focus:border-[#1677ff] dark:focus:border-[#1668dc] focus:ring-2 focus:ring-[#1677ff]/15 text-sm"
          />
          {errors.password && (
            <p className="text-xs text-[#cf1322] dark:text-[#ff7875] font-semibold mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full h-12 rounded-xl text-sm font-bold text-white bg-[#1677ff] hover:bg-[#4096ff] active:bg-[#0958d9] dark:bg-[#1668dc] dark:hover:bg-[#3c89e8] shadow-[0_4px_14px_0_rgba(22,119,255,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin size-5" />
          ) : (
            <div className="flex items-center gap-2">
              <span>একাউন্ট তৈরি করে লিংক করুন</span>
              <ArrowRight className="size-4" />
            </div>
          )}
        </Button>
      </form>
    </div>
  );
}
