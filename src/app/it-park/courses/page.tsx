import React from "react";
import CoursesClient from "./CoursesClient";
import { dbConnect } from "@/lib/db";
import { ITCourse } from "@/models/ITCourse";

export const metadata = {
  title: "প্রযুক্তি কোর্স ও বুটক্যাম্প | বাছার আইটি পার্ক",
  description: "ওয়েব ডেভেলপমেন্ট, UI/UX ডিজাইন, পাইথন ও ডিজিটাল মার্কেটিং লাইভ কোর্স এবং সরাসরি অনলাইন ভর্তি।",
};

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  let courses: any[] = [];
  try {
    await dbConnect();
    const rawCourses = await ITCourse.find({ status: { $ne: "completed" } })
      .sort({ isFeatured: -1, createdAt: -1 })
      .lean();
    courses = JSON.parse(JSON.stringify(rawCourses));
  } catch (error) {
    console.error("Error fetching courses on page load:", error);
  }

  return (
    <div className="space-y-8">
      <CoursesClient initialCourses={courses} />
    </div>
  );
}
