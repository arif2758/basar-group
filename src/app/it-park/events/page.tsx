import React from "react";
import EventsClient from "./EventsClient";
import { dbConnect } from "@/lib/db";
import { ITEvent } from "@/models/ITEvent";

export const metadata = {
  title: "সেমিনার ও টেক ইভেন্ট | বাছার আইটি পার্ক",
  description: "বাছার হ্যাকাথন, ফ্রিল্যান্সিং সেমিনার ও প্রযুক্তি কর্মশালায় অংশ নিন ও ডিজিটাল পাস সংগ্রহ করুন।",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  let events: any[] = [];
  try {
    await dbConnect();
    const rawEvents = await ITEvent.find({ status: { $ne: "completed" } })
      .sort({ eventDate: 1 })
      .lean();
    events = JSON.parse(JSON.stringify(rawEvents));
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  return (
    <div className="space-y-8">
      <EventsClient initialEvents={events} />
    </div>
  );
}
