import React from "react";
import JobsClient from "./JobsClient";
import { dbConnect } from "@/lib/db";
import { ITJob } from "@/models/ITJob";

export const metadata = {
  title: "আইটি জব বোর্ড ও ক্যারিয়ার | বাছার আইটি পার্ক",
  description: "সফটওয়্যার ডেভেলপার, ডিজাইনার, এসইও ও প্রযুক্তি চাকরির সার্কুলার এবং সরাসরি সিভি সাবমিশন।",
};

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  let jobs: any[] = [];
  try {
    await dbConnect();
    const rawJobs = await ITJob.find({ status: "active" })
      .sort({ isFeatured: -1, createdAt: -1 })
      .lean();
    jobs = JSON.parse(JSON.stringify(rawJobs));
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  return (
    <div className="space-y-8">
      <JobsClient initialJobs={jobs} />
    </div>
  );
}
