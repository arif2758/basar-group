import type { Metadata } from "next";
import DonorWall from "../foundationComponents/DonorWall";

export const metadata: Metadata = {
  title: "সম্মানিত দাতাদের প্রাচীর (Donor Wall) | বাছার ফাউন্ডেশন",
  description:
    "বাছার ফাউন্ডেশনের সম্মানিত পৃষ্ঠপোষক, শুভাকাঙ্ক্ষী ও সহযোগী সংস্থাসমূহের তালিকা ও অবদান।",
  openGraph: {
    title: "সম্মানিত দাতাদের প্রাচীর | বাছার ফাউন্ডেশন",
    description: "যাঁদের উদারতায় দূর হচ্ছে সমাজের অন্ধকার।",
  },
};

export default function DonorsPage() {
  return (
    <div className="py-6 sm:py-10">
      <DonorWall />
    </div>
  );
}
