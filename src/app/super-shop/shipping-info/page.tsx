import { Truck, Clock, MapPin, CheckCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "শিপিং ও ডেলিভারি | বাসার সুপার শপ",
  description: "বাসার সুপার শপের ডেলিভারি চার্জ ও শিপিং তথ্য।",
};

export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex p-4 bg-primary/10 rounded-2xl">
            <Truck className="size-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">শিপিং ও ডেলিভারি</h1>
          <p className="text-muted-foreground text-sm">দ্রুত ও নির্ভরযোগ্য ডেলিভারি সেবা</p>
        </div>

        {/* Delivery Zones */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border-2 border-primary/40 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-9 bg-primary/10 rounded-xl flex items-center justify-center">
                <MapPin className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">ঢাকার ভেতরে</p>
                <p className="text-[11px] text-muted-foreground">ISD (Inside Dhaka)</p>
              </div>
            </div>
            <p className="text-2xl font-black text-primary">৳৬০–৳৯০</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              <span>১–২ কার্যদিবস</span>
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-9 bg-muted rounded-xl flex items-center justify-center">
                <MapPin className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">উপ-শহর</p>
                <p className="text-[11px] text-muted-foreground">SUB (গাজীপুর/সাভার...)</p>
              </div>
            </div>
            <p className="text-2xl font-black text-foreground">৳৮০–৳১৩০</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              <span>২–৩ কার্যদিবস</span>
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-9 bg-muted rounded-xl flex items-center justify-center">
                <MapPin className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">ঢাকার বাইরে</p>
                <p className="text-[11px] text-muted-foreground">OSD (সকল জেলা)</p>
              </div>
            </div>
            <p className="text-2xl font-black text-foreground">৳১১০–৳১৭০</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              <span>২–৫ কার্যদিবস</span>
            </div>
          </div>
        </div>

        {/* Info Points */}
        <div className="space-y-3">
          {[
            "অর্ডার কনফার্ম করার পর পরবর্তী কার্যদিবসে পণ্য পাঠাও/স্টেডফাস্ট কুরিয়ারে শিপমেন্ট করা হয়।",
            "ডেলিভারির আগে আমাদের প্রতিনিধি বা কুরিয়ার রাইডার ফোনে যোগাযোগ করবেন।",
            "ক্যাশ অন ডেলিভারি এবং মোবাইল ব্যাংকিং পেমেন্ট উভয় সুবিধা বিদ্যমান।",
            "মোবাইল ব্যাংকিং (bKash/Nagad/Rocket) অগ্রিম পেমেন্টে দ্রুত প্রসেসিং হয়।",
          ].map((point, i) => (
            <div key={i} className="flex items-start gap-3 bg-card border border-border/60 rounded-xl p-4">
              <CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
