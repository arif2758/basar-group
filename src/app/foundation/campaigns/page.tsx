import type { Metadata } from "next";
import UrgentCauses from "../foundationComponents/UrgentCauses";

export const metadata: Metadata = {
  title: "চলমান মানবিক ক্যাম্পেইন ও প্রজেক্টসমূহ | বাছার ফাউন্ডেশন - BASAR Foundation",
  description:
    "বন্যার্তদের ত্রাণ, এতিম ও দরিদ্র শিশুদের শিক্ষাবৃত্তি, ফ্রি চিকিৎসা ও দুস্থ মায়েদের কর্মসংস্থান ক্যাম্পেইনের লাইভ হিসাব ও তথ্য।",
  openGraph: {
    title: "সক্রিয় মানবিক ক্যাম্পেইন | বাছার ফাউন্ডেশন",
    description: "চলমান ক্যাম্পেইনে অংশ নিয়ে একটি অসহায় পরিবারের পাশে দাঁড়ান।",
  },
};

export default function CampaignsPage() {
  return (
    <div className="py-6 sm:py-10">
      <UrgentCauses />
    </div>
  );
}
