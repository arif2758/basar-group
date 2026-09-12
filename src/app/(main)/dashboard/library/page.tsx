// src/app/(main)/dashboard/library/page.tsx
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { BookBorrow } from "@/models/BookBorrow";
import { User as UserModel } from "@/models/User";
import LibraryDashboardClient from "./LibraryDashboardClient";

export const metadata = {
  title: "গ্রন্থাগার ড্যাশবোর্ড | BASAR Group",
  description: "আপনার ধার নেওয়া বইয়ের লাইভ ট্র্যাকিং, জমা দেওয়ার শেষ তারিখ ও বুক রিকোয়েস্ট ব্যবস্থাপনা",
};

export const dynamic = "force-dynamic";

export default async function LibraryDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/library");
  }

  await dbConnect();

  // Query real user borrows from MongoDB
  const queryConditions: any[] = [];
  if (session.user.id) {
    queryConditions.push({ "user.userId": session.user.id });
  }
  if (session.user.email) {
    queryConditions.push({ "user.email": session.user.email });
  }

  const borrowsQuery = queryConditions.length > 0 ? { $or: queryConditions } : { "user.email": session.user.email };

  const rawBorrows = await BookBorrow.find(borrowsQuery)
    .sort({ createdAt: -1 })
    .lean();

  const borrows = JSON.parse(JSON.stringify(rawBorrows));

  // Compute live stats
  const activeStatuses = [
    "approved",
    "accepted",
    "dispatched",
    "in_transit",
    "delivered",
    "in_return",
    "overdue",
  ];

  const activeCount = borrows.filter((b: any) => activeStatuses.includes(b.status)).length;
  const returnedCount = borrows.filter((b: any) => b.status === "returned").length;
  const pendingCount = borrows.filter((b: any) => b.status === "pending").length;

  // Membership label
  const dbUser = session.user.email
    ? await UserModel.findOne({ email: session.user.email }).select("accountType").lean()
    : null;

  let membershipStatus = "সক্রিয় মেম্বার";
  if (dbUser?.accountType === "PREMIUM") {
    membershipStatus = "প্রিমিয়াম";
  } else if (dbUser?.accountType === "ROYAL") {
    membershipStatus = "রয়েল মেম্বার";
  }

  const stats = {
    activeCount,
    returnedCount,
    pendingCount,
    membershipStatus,
  };

  return (
    <LibraryDashboardClient
      initialBorrows={borrows}
      stats={stats}
    />
  );
}
