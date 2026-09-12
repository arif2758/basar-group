// src/app/admin/library/page.tsx
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { BookBorrow } from "@/models/BookBorrow";
import LibraryAdminClient from "./LibraryAdminClient";

export const metadata = {
  title: "গ্রন্থাগার অ্যাডমিন কন্ট্রোল | BASAR Group",
  description: "বই ধার ব্যবস্থাপনা, স্ট্যাটাস আপডেট ও পাঠক রেকর্ড",
};

export const dynamic = "force-dynamic";

const ACTIVE_STATUSES = [
  "approved",
  "accepted",
  "dispatched",
  "in_transit",
  "delivered",
  "in_return",
  "overdue",
];

export default async function LibraryAdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/library");
  }

  const userRole = (session.user as { role?: string }).role;
  const isAdmin = userRole === "ADMIN" || userRole === "admin";
  if (!isAdmin) {
    redirect("/dashboard");
  }

  await dbConnect();

  const [allBorrows, totalBorrows, pendingBorrows, activeBorrows, returnedBorrows] =
    await Promise.all([
      BookBorrow.find({}).sort({ createdAt: -1 }).limit(100).lean(),
      BookBorrow.countDocuments(),
      BookBorrow.countDocuments({ status: "pending" }),
      BookBorrow.countDocuments({ status: { $in: ACTIVE_STATUSES } }),
      BookBorrow.countDocuments({ status: "returned" }),
    ]);

  const borrows = JSON.parse(JSON.stringify(allBorrows));

  return (
    <LibraryAdminClient
      initialBorrows={borrows}
      stats={{
        totalBorrows,
        pendingBorrows,
        activeBorrows,
        returnedBorrows,
      }}
    />
  );
}
