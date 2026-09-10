import { TrackOrderForm } from "@/components/super-shop/order/TrackOrderForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "অর্ডার ট্র্যাক করুন | বাসার সুপার শপ",
  description: "আপনার অর্ডারের বর্তমান অবস্থা জানুন।",
};

export default function TrackOrderPage() {
  return (
    <main className="min-h-screen py-10 sm:py-16 px-4">
      <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center text-slate-500">লোডিং...</div>}>
        <TrackOrderForm />
      </Suspense>
    </main>
  );
}
