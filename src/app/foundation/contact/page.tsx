import type { Metadata } from "next";
import ContactForm from "../foundationComponents/ContactForm";

export const metadata: Metadata = {
  title: "যোগাযোগ ও জরুরি হটলাইন | বাছার ফাউন্ডেশন",
  description:
    "বাছার ফাউন্ডেশনের প্রধান কার্যালয়, ২৪/৭ জরুরি হটলাইন নম্বর, WhatsApp চ্যাট ও সচরাচর জিজ্ঞাসিত প্রশ্নাবলী।",
  openGraph: {
    title: "যোগাযোগ ও হটলাইন | বাছার ফাউন্ডেশন",
    description: "যেকোনো জিজ্ঞাসা বা জরুরি প্রয়োজনে আমাদের সাথে সরাসরি যোগাযোগ করুন।",
  },
};

export default function ContactPage() {
  return (
    <div className="py-6 sm:py-10">
      <ContactForm />
    </div>
  );
}
