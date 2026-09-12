import type { Metadata } from "next";
import AidRequestSection from "../foundationComponents/AidRequestSection";

export const metadata: Metadata = {
  title: "মানবিক সহায়তার আবেদন ও ট্র্যাকিং | বাছার ফাউন্ডেশন - BASAR Foundation",
  description:
    "চিকিৎসা, শিক্ষা ফি, জরুরি খাদ্য ত্রাণ বা জীবিকা অর্জনের জন্য সরাসরি বাছার ফাউন্ডেশনে আবেদন করুন। কোনো মধ্যস্থতাকারী নেই।",
  openGraph: {
    title: "মানবিক সহায়তার আবেদন পোর্টাল | বাছার ফাউন্ডেশন",
    description: "অসহায় ও বিপদে পড়া মানুষের পাশে বাছার ফাউন্ডেশন। দ্রুত ভেরিফিকেশন ও ট্র্যাকিং সুবিধা।",
  },
};

export default function RequestAidPage() {
  return (
    <div className="py-6 sm:py-10">
      <AidRequestSection />
    </div>
  );
}
