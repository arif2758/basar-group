import type { Metadata } from "next";
import FoundationWrapperClient from "./foundationComponents/FoundationWrapperClient";



export const metadata: Metadata = {
  title: "বাছার ফাউন্ডেশন | BASAR Foundation - Learn. Earn. Empower. | BASAR Group",
  description:
    "বাছার ফাউন্ডেশনের শিক্ষা, স্বাস্থ্যসেবা ও মানবিক উন্নয়ন কার্যক্রম। সুবিধাবঞ্চিত মানুষের পাশে দাঁড়িয়ে টেকসই ভবিষ্যৎ বিনির্মাণে আমাদের সাথে যুক্ত হোন।",
  keywords: [
    "BASAR Foundation",
    "বাছার ফাউন্ডেশন",
    "NGO Bangladesh",
    "Nonprofit Organization",
    "Education Support",
    "Healthcare Aid",
    "Humanitarian Work",
    "Charity in Bangladesh",
  ],
  openGraph: {
    title: "বাছার ফাউন্ডেশন | BASAR Foundation - মানবসেবা ও সমাজকল্যাণ",
    description:
      "শিক্ষা, স্বাস্থ্যসেবা ও মানবিক সহায়তার মাধ্যমে সমাজের মানুষের জীবনমান উন্নয়ন। একসাথে গড়ে তুলি সুন্দর ভবিষ্যৎ।",
    url: "https://yourdomain.com/foundation",
    siteName: "বাছার ফাউন্ডেশন | BASAR Foundation",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "বাছার ফাউন্ডেশন",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "বাছার ফাউন্ডেশন | BASAR Foundation - Learn. Earn. Empower.",
    description:
      "শিক্ষা, স্বাস্থ্য ও জরুরি ত্রাণের মাধ্যমে সুবিধাবঞ্চিত মানুষের জীবনযাত্রার রূপান্তরে কাজ করছে বাছার ফাউন্ডেশন।",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
};

export default function FoundationPage() {
  return <FoundationWrapperClient />;
}
