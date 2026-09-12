import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { FoundationDonation } from "@/models/FoundationDonation";
import { FoundationProject } from "@/models/FoundationProject";
import { FoundationAidRequest } from "@/models/FoundationAidRequest";
import FoundationAdminClient from "./FoundationAdminClient";

export const metadata = {
  title: "ফাউন্ডেশন অ্যাডমিন কন্ট্রোল | BASAR Group",
  description: "বাছার ফাউন্ডেশনের ফান্ড ব্যবস্থাপনা, অনুদান ট্র্যাকিং, প্রকল্প ও সাহায্য আবেদন নিয়ন্ত্রণ",
};

export const dynamic = "force-dynamic";

export default async function FoundationAdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/foundation");
  }

  const userRole = (session.user as { role?: string }).role;
  const isAdmin = userRole === "ADMIN" || userRole === "admin";
  if (!isAdmin) {
    redirect("/dashboard");
  }

  await dbConnect();

  // Fetch all foundation data
  const [
    rawDonations,
    rawProjects,
    rawAidRequests,
    totalDonationsCount,
    verifiedDonationsCount,
    pendingDonationsCount,
    activeProjectsCount,
    pendingAidCount,
  ] = await Promise.all([
    FoundationDonation.find({}).sort({ createdAt: -1 }).limit(150).lean(),
    FoundationProject.find({}).sort({ isFeatured: -1, createdAt: -1 }).lean(),
    FoundationAidRequest.find({}).sort({ createdAt: -1 }).limit(150).lean(),
    FoundationDonation.countDocuments(),
    FoundationDonation.countDocuments({ status: "verified" }),
    FoundationDonation.countDocuments({ status: "pending" }),
    FoundationProject.countDocuments({ status: "active" }),
    FoundationAidRequest.countDocuments({ status: "pending" }),
  ]);

  const donations = JSON.parse(JSON.stringify(rawDonations));
  const projects = JSON.parse(JSON.stringify(rawProjects));
  const aidRequests = JSON.parse(JSON.stringify(rawAidRequests));

  // Compute total funds collected (verified) and total disbursed
  const totalVerifiedFunds = donations
    .filter((d: any) => d.status === "verified")
    .reduce((sum: number, d: any) => sum + (d.amount || 0), 0);

  const totalDisbursedFunds = aidRequests
    .filter((a: any) => a.status === "disbursed" || a.status === "approved")
    .reduce((sum: number, a: any) => sum + (a.approvedAmount || a.requestedAmount || 0), 0);

  return (
    <FoundationAdminClient
      initialDonations={donations}
      initialProjects={projects}
      initialAidRequests={aidRequests}
      stats={{
        totalDonationsCount,
        verifiedDonationsCount,
        pendingDonationsCount,
        activeProjectsCount,
        pendingAidCount,
        totalVerifiedFunds,
        totalDisbursedFunds,
      }}
    />
  );
}
