import type { Metadata } from "next";
import ITParkWrapperClient from "./ITcomponents/ITParkWrapperClient";

export const metadata: Metadata = {
  title: "বাছার আইটি পার্ক | BASAR IT Park - Learn. Earn. Empower.",
  description:
    "বাছার আইটি পার্ক (BASAR IT Park) তথ্যপ্রযুক্তি শিক্ষা, দক্ষতা উন্নয়ন ও ডিজিটাল কর্মসংস্থানের আধুনিক কেন্দ্র। ওয়েব ডেভেলপমেন্ট, গ্রাফিক্স ডিজাইন, ডিজিটাল মার্কেটিং ও কো-ওয়ার্কিং স্পেসের মাধ্যমে তরুণদের স্বাবলম্বী করার সামাজিক উদ্যোগ।",
  keywords: [
    "BASAR IT Park",
    "বাছার আইটি পার্ক",
    "IT Park Bangladesh",
    "প্রযুক্তি প্রশিক্ষণ",
    "Skill Development",
    "Job Board",
    "Co-Working Space",
    "Virtual Tour",
    "Student Help Desk",
    "Learn. Earn. Empower.",
  ],
  openGraph: {
    title: "বাছার আইটি পার্ক | BASAR IT Park - Learn. Earn. Empower.",
    description:
      "প্রযুক্তি শিক্ষা, ক্যারিয়ার ও কর্মসংস্থানের আধুনিক প্ল্যাটফর্ম। বাছার আইটি পার্কে দক্ষতা অর্জন করুন এবং স্বাবলম্বী হোন।",
    url: "https://yourdomain.com/it-park",
    siteName: "BASAR Group",
    images: [
      {
        url: "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg",
        width: 1200,
        height: 630,
        alt: "BASAR IT Park",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "বাছার আইটি পার্ক | BASAR IT Park - Learn. Earn. Empower.",
    description:
      "প্রযুক্তি দক্ষতা অর্জন করুন, ফ্রিল্যান্সিং ও কর্মসংস্থানে নিজের ক্যারিয়ার গড়ুন বাছার আইটি পার্কের সাথে।",
    images: [
      "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg",
    ],
  },
  alternates: {
    canonical: "https://yourdomain.com/it-park",
  },
};

function ITParkPage() {
  return <ITParkWrapperClient />;
}

export default ITParkPage;
