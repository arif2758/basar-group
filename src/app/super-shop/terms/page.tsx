import { FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "শর্তাবলী | বাসার সুপার শপ",
  description: "বাসার সুপার শপের ব্যবহারের নিয়ম ও শর্তাবলী।",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex p-4 bg-primary/10 rounded-2xl">
            <FileText className="size-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">ব্যবহারের শর্তাবলী</h1>
          <p className="text-muted-foreground text-sm">বাসার সুপার শপ ব্যবহার করার পূর্বে নিয়মাবলী পড়ুন</p>
        </div>

        <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-3">
            <h2 className="text-base font-bold text-foreground">১. অর্ডার ও মূল্য নির্ধারণ</h2>
            <p>
              সব পণ্যের মূল্য ওয়েবসাইটে প্রদর্শিত রয়েছে। পণ্যের মূল্য যেকোনো সময় পরিবর্তনশীল। অর্ডার প্লেস করার পর অর্ডারের কনফার্মেশন কল দেওয়া হবে।
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-3">
            <h2 className="text-base font-bold text-foreground">২. ডেলিভারি ও রিসিভ</h2>
            <p>
              ডেলিভারি ম্যানের কাছ থেকে পার্সেল গ্রহণের পূর্বে চেক করে নেওয়া বাধ্যতামূলক। পণ্য হাতে পাওয়ার পর ত্রুটি থাকলে তা তাৎক্ষণিকভাবে জানাতে হবে।
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-3">
            <h2 className="text-base font-bold text-foreground">৩. একাউন্ট ও নিরাপত্তা</h2>
            <p>
              আপনার একাউন্টের তথ্য ও পাসওয়ার্ডের গোপনীয়তা বজায় রাখার দায়িত্ব আপনার। যেকোনো সন্দেহজনক কার্যক্রম পরিলক্ষিত হলে দ্রুত আমাদের সাথে যোগাযোগ করুন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
