import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import { User as UserModel } from "@/models/User";
import { FamilyMemberModel } from "@/models/FamilyMember";
import { FamilyRequestModel } from "@/models/FamilyRequest";
import { Product as ProductModel } from "@/models/Product";
import { Order as OrderModel } from "@/models/Order";
import AdminOverviewClient, {
  AdminStatsData,
} from "@/components/admin/AdminOverviewClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "সেন্ট্রাল অ্যাডমিন কন্ট্রোল | BASAR Group",
  description: "বাছার গ্রুপের ৫টি উইংসের সেন্ট্রাল ড্যাশবোর্ড ও নিয়ন্ত্রণ প্যানেল",
};

async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) return;
  return mongoose.connect(process.env.MONGODB_URI);
}

export default async function AdminOverviewPage() {
  const session = await auth();

  // Redirect if not logged in
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  // Check role
  const userRole = session.user.role as string | undefined;
  const isAdmin = userRole === "ADMIN" || userRole === "admin";
  if (!isAdmin) {
    redirect("/dashboard");
  }

  // Fetch real database metrics with safe defaults
  let stats: AdminStatsData = {
    totalUsers: 0,
    totalFamilyMembers: 0,
    pendingFamilyRequests: 0,
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    recentFamilyRequests: [],
    recentOrders: [],
  };

  try {
    await connectToDB();

    const [
      totalUsers,
      totalFamilyMembers,
      pendingFamilyRequests,
      totalProducts,
      totalOrders,
      pendingOrders,
      recentFamilyReqs,
      recentOrdersRaw,
    ] = await Promise.all([
      UserModel.countDocuments().catch(() => 0),
      FamilyMemberModel.countDocuments().catch(() => 0),
      FamilyRequestModel.countDocuments({ status: "pending" }).catch(() => 0),
      ProductModel.countDocuments().catch(() => 0),
      OrderModel.countDocuments().catch(() => 0),
      OrderModel.countDocuments({
        $or: [{ status: "pending" }, { status: "Pending" }],
      }).catch(() => 0),
      FamilyRequestModel.find({ status: "pending" })
        .sort({ createdAt: -1 })
        .limit(4)
        .lean()
        .catch(() => []),
      OrderModel.find({})
        .sort({ createdAt: -1 })
        .limit(4)
        .lean()
        .catch(() => []),
    ]);

    stats = {
      totalUsers,
      totalFamilyMembers,
      pendingFamilyRequests,
      totalProducts,
      totalOrders,
      pendingOrders,
      recentFamilyRequests: recentFamilyReqs.map((r: any) => ({
        _id: r._id.toString(),
        title: r.title || "সদস্য আবেদন",
        parentKey: r.parentKey || "",
        parentName: r.parentName || "",
        status: r.status || "pending",
        createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : "",
      })),
      recentOrders: recentOrdersRaw.map((o: any) => ({
        _id: o._id.toString(),
        orderNumber: o.orderNumber || "",
        customerPhone: o.customerPhone || "",
        totalAmount: o.totalAmount || o.subtotal || 0,
        status: o.status || "pending",
        createdAt: o.createdAt ? new Date(o.createdAt).toISOString() : "",
      })),
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
  }

  const adminName =
    session.user.name ||
    (session.user as { fullname?: string }).fullname ||
    "সুপার অ্যাডমিন";

  return <AdminOverviewClient stats={stats} adminName={adminName} />;
}
