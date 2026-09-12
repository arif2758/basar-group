import React from "react";
import BloodDonorFinder from "../bloodComponents/BloodDonorFinder";

export const metadata = {
  title: "রক্তদাতা খুঁজুন | বাছার রক্তদান নেটওয়ার্ক",
  description: "৬৪ জেলার ব্লাড গ্রুপ ও উপজেলা ভিত্তিক তাৎক্ষণিক রক্তদাতা খুঁজুন ও সরাসরি কল বা হোয়াটসঅ্যাপে যোগাযোগ করুন।",
};

export default function FindDonorPage() {
  return (
    <div className="space-y-8">
      <BloodDonorFinder />
    </div>
  );
}
