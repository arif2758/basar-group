import React from "react";
import BloodCompatibilityGuide from "../bloodComponents/BloodCompatibilityGuide";

export const metadata = {
  title: "রক্তদান নির্দেশিকা ও FAQ | বাছার রক্তদান নেটওয়ার্ক",
  description: "রক্তের গ্রুপ সামঞ্জস্যতা চার্ট, রক্তদানের নিয়মাবলি, স্বাস্থ্যগত উপকারিতা ও সাধারণ প্রশ্নোত্তর।",
};

export default function BloodGuidelinePage() {
  return (
    <div className="space-y-8">
      <BloodCompatibilityGuide />
    </div>
  );
}
