import { ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "প্রাইভেসি পলিসি | বাসার সুপার শপ",
  description: "বাসার সুপার শপের গোপনীয়তা ও তথ্য সুরক্ষা নীতিমালা।",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex p-4 bg-primary/10 rounded-2xl">
            <ShieldCheck className="size-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">প্রাইভেসি পলিসি</h1>
          <p className="text-muted-foreground text-sm">আপনার তথ্যের সর্বোচ্চ সুরক্ষা নিশ্চিতকরণ</p>
        </div>

        <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-3">
            <h2 className="text-base font-bold text-foreground">১. তথ্য সংগ্রহ ও ব্যবহার</h2>
            <p>
              অর্ডার প্রসেসিং, ডেলিভারি সম্পন্নকরণ এবং কাস্টমার সেবার মানোন্নয়নের জন্য আমরা আপনার নাম, ফোন নম্বর, ডেলিভারি ঠিকানা ও ইমেইল সংগ্রহ করে থাকি।
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-3">
            <h2 className="text-base font-bold text-foreground">২. তথ্য নিরাপত্তা</h2>
            <p>
              আপনার ব্যক্তিগত তথ্য অত্যন্ত সুরক্ষিতভাবে সংরক্ষণ করা হয়। কোনো বাণিজ্যিক উদ্দেশ্যে তৃতীয় কোনো পক্ষের সাথে আপনার ব্যক্তিগত তথ্য বিক্রয় বা বিনিময় করা হয় না।
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-3">
            <h2 className="text-base font-bold text-foreground">৩. কুকিজ এবং অ্যানালিটিক্স</h2>
            <p>
              আমাদের ওয়েবসাইটের পারফরম্যান্স ও কার্ট স্টোরেজের জন্য স্ট্যান্ডার্ড ব্রাউজার কুকিজ ব্যবহার করা হয়, যা আপনার শপিং অভিজ্ঞতাকে দ্রুত ও সহজ করে তোলে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
