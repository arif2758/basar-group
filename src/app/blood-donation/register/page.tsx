import React from "react";
import BloodDonorRegister from "../bloodComponents/BloodDonorRegister";

export const metadata = {
  title: "রক্তদাতা নিবন্ধন | বাছার রক্তদান নেটওয়ার্ক",
  description: "স্বেচ্ছায় রক্তদাতা হিসেবে নাম নিবন্ধন করুন এবং আপনার ডিজিটাল ডোনার হিরো কার্ড সংগ্রহ করুন।",
};

export default function DonorRegisterPage() {
  return (
    <div className="space-y-8">
      <BloodDonorRegister />
    </div>
  );
}
