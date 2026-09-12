import type { Metadata } from "next";
import QuickDonation from "../foundationComponents/QuickDonation";

export const metadata: Metadata = {
  title: "অনলাইন অনুদান ও যাকাত ক্যালকুলেটর | বাছার ফাউন্ডেশন - BASAR Foundation",
  description:
    "বিকাশ, নগদ, রকেট বা ব্যাংকের মাধ্যমে নিরাপদে সরাসরি বাছার ফাউন্ডেশনে অনুদান ও যাকাত প্রদান করুন। তাত্ক্ষণিক ডিজিটাল রসিদ সংগ্রহ করুন।",
  openGraph: {
    title: "অনলাইন অনুদান ও যাকাত | বাছার ফাউন্ডেশন",
    description: "আপনার অনুদান পৌঁছে যাবে প্রকৃত সুবিধাবঞ্চিত মানুষের কাছে। শতভাগ স্বচ্ছ ও জবাবদিহিতামূলক মানবসেবা।",
  },
};

export default function DonatePage() {
  return (
    <div className="py-6 sm:py-10">
      <QuickDonation />
    </div>
  );
}
