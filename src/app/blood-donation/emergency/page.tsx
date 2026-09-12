import React from "react";
import EmergencyBloodRequest from "../bloodComponents/EmergencyBloodRequest";

export const metadata = {
  title: "জরুরি রক্তের অনুরোধ (SOS) | বাছার রক্তদান নেটওয়ার্ক",
  description: "মুমূর্ষু রোগীর জন্য তাৎক্ষণিক জরুরি রক্তের পোস্ট করুন। লাইভ ট্র্যাকিং টিকেট ও সোশ্যাল শেয়ারিং সুবিধা।",
};

export default function EmergencyRequestPage() {
  return (
    <div className="space-y-8">
      <EmergencyBloodRequest />
    </div>
  );
}
