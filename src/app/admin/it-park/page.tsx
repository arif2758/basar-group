import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { ITCourse } from "@/models/ITCourse";
import { ITCourseEnrollment } from "@/models/ITCourseEnrollment";
import { ITJob } from "@/models/ITJob";
import { ITJobApplication } from "@/models/ITJobApplication";
import { ITEvent } from "@/models/ITEvent";
import ITParkAdminClient from "./ITParkAdminClient";

export const metadata = {
  title: "আইটি পার্ক অ্যাডমিন কন্ট্রোল | BASAR Group",
  description: "বাছার আইটি পার্কের কোর্স এনরোলমেন্ট, জব পোর্টাল, ইভেন্ট ও কো-ওয়ার্কিং নিয়ন্ত্রণ প্যানেল",
};

export const dynamic = "force-dynamic";

export default async function ITParkAdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/it-park");
  }

  const userRole = (session.user as { role?: string }).role;
  const isAdmin = userRole === "ADMIN" || userRole === "admin";
  if (!isAdmin) {
    redirect("/dashboard");
  }

  await dbConnect();

  const [
    rawCourses,
    rawEnrollments,
    rawJobs,
    rawApplications,
    rawEvents,
    totalCoursesCount,
    totalEnrollmentsCount,
    totalJobsCount,
    totalApplicationsCount,
    totalEventsCount,
  ] = await Promise.all([
    ITCourse.find({}).sort({ createdAt: -1 }).lean(),
    ITCourseEnrollment.find({}).sort({ createdAt: -1 }).limit(150).lean(),
    ITJob.find({}).sort({ createdAt: -1 }).lean(),
    ITJobApplication.find({}).sort({ createdAt: -1 }).limit(150).lean(),
    ITEvent.find({}).sort({ createdAt: -1 }).lean(),
    ITCourse.countDocuments(),
    ITCourseEnrollment.countDocuments(),
    ITJob.countDocuments(),
    ITJobApplication.countDocuments(),
    ITEvent.countDocuments(),
  ]);

  const courses = JSON.parse(JSON.stringify(rawCourses));
  const enrollments = JSON.parse(JSON.stringify(rawEnrollments));
  const jobs = JSON.parse(JSON.stringify(rawJobs));
  const applications = JSON.parse(JSON.stringify(rawApplications));
  const events = JSON.parse(JSON.stringify(rawEvents));

  const totalCourseRevenue = enrollments
    .filter((e: any) => e.status === "confirmed")
    .reduce((sum: number, e: any) => sum + (e.paidAmount || 0), 0);

  return (
    <ITParkAdminClient
      initialCourses={courses}
      initialEnrollments={enrollments}
      initialJobs={jobs}
      initialApplications={applications}
      initialEvents={events}
      stats={{
        totalCoursesCount,
        totalEnrollmentsCount,
        totalJobsCount,
        totalApplicationsCount,
        totalEventsCount,
        totalCourseRevenue,
      }}
    />
  );
}
