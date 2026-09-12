import type { Metadata } from "next";
import VolunteerAndPartner from "../foundationComponents/VolunteerAndPartner";

export const metadata: Metadata = {
  title: "স্বেচ্ছাসেবক ও জরুরি রক্তদাতা নেটওয়ার্ক | বাছার ফাউন্ডেশন",
  description:
    "বাছার ফাউন্ডেশনের ভলান্টিয়ার উইং বা জরুরি রক্তদাতা ক্লাবে যুক্ত হয়ে সমাজ গঠনে সরাসরি অবদান রাখুন।",
  openGraph: {
    title: "স্বেচ্ছাসেবক ও রক্তদাতা নিবন্ধন | বাছার ফাউন্ডেশন",
    description: "আপনার এক ফোঁটা রক্ত বা একটু সময় বাঁচাতে পারে একটি মানুষের জীবন।",
  },
};

export default function VolunteerPage() {
  return (
    <div className="py-6 sm:py-10">
      <VolunteerAndPartner />
    </div>
  );
}
