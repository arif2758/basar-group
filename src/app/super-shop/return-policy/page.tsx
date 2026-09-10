import { RefreshCcw } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "রিটার্ন পলিসি | বাসার সুপার শপ",
  description: "বাসার সুপার শপের পণ্য ফেরত ও রিফান্ড নীতিমালা।",
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex p-4 bg-primary/10 rounded-2xl">
            <RefreshCcw className="size-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">রিটার্ন ও রিফান্ড পলিসি</h1>
          <p className="text-muted-foreground text-sm">গ্রাহক সন্তুষ্টি আমাদের সর্বোচ্চ অগ্রাধিকার</p>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "পণ্য ফেরতের শর্তাবলী",
              content:
                "পণ্য হাতে পাওয়ার ৭ দিনের মধ্যে ফেরত দেওয়া যাবে, যদি পণ্যটিতে কোনো ত্রুটি বা ক্ষতির প্রমাণ থাকে অথবা ভুল পণ্য পাঠানো হয়ে থাকে। পণ্যটি অবশ্যই মূল প্যাকেজিংসহ অক্ষত অবস্থায় থাকতে হবে।",
            },
            {
              title: "রিটার্নের জন্য যোগাযোগ",
              content:
                "রিটার্নের জন্য আমাদের হেল্পলাইন বা WhatsApp (01568390014) নম্বরে মেসেজ দিন। আপনার অর্ডার আইডি এবং ত্রুটিপূর্ণ অংশের ছবি/ভিডিও সংযুক্ত করুন।",
            },
            {
              title: "রিফান্ড প্রক্রিয়া",
              content:
                "রিটার্নকৃত পণ্য আমাদের স্টোরে পৌঁছানোর পর এবং গুণগত মান যাচাইয়ের পর ৩-৫ কার্যদিবসের মধ্যে আপনার বিকাশ/নগদ/রকেট একাউন্টে রিফান্ড প্রদান করা হবে।",
            },
            {
              title: "যা রিটার্ন করা যাবে না",
              content:
                "অনুপযুক্ত ব্যবহার বা অসাবধানতাবশত ক্ষতিগ্রস্ত পণ্য, ডিসকাউন্ট/ক্লিয়ারেন্স সেলে কেনা পণ্য এবং সীল ভাঙা প্যাকেজ রিটার্নযোগ্য নয়।",
            },
          ].map((section) => (
            <div
              key={section.title}
              className="bg-card border border-border/60 rounded-2xl p-5 space-y-2"
            >
              <h2 className="text-base font-bold text-foreground">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
