import { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "আপনার কার্ট | বাসার সুপার শপ",
  description: "আপনার পছন্দের পণ্যগুলো চেকআউট করার জন্য প্রস্তুত করুন।",
};

export default function CartPage() {
  return <CartPageClient />;
}
