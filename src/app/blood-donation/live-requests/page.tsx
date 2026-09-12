import React from "react";
import LiveBloodRequestsFeed from "../bloodComponents/LiveBloodRequestsFeed";

export const metadata = {
  title: "জরুরি লাইভ রিকুয়েস্ট | বাছার রক্তদান নেটওয়ার্ক",
  description: "সারা দেশের হাসপাতালগুলো থেকে আসা সরাসরি জরুরি রক্তের লাইভ আবেদন দেখুন ও দ্রুত সহায়তা করুন।",
};

export default function LiveRequestsPage() {
  return (
    <div className="space-y-8">
      <LiveBloodRequestsFeed />
    </div>
  );
}
