// src/app/admin/shop/page.tsx
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { Order } from "@/models/Order";
import ShopAdminClient from "./ShopAdminClient";
import type { IOrderSerializable } from "@/types/order";

export const metadata = {
  title: "সুপার শপ অ্যাডমিন | BASAR Group",
  description: "অর্ডার ব্যবস্থাপনা, স্ট্যাটাস আপডেট ও কাস্টমার ট্র্যাকিং",
};

export const dynamic = "force-dynamic";

export default async function ShopAdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/shop");
  }

  const userRole = (session.user as { role?: string }).role;
  const isAdmin = userRole === "ADMIN" || userRole === "admin";
  if (!isAdmin) {
    redirect("/dashboard");
  }

  await dbConnect();

  const [
    allOrders,
    totalOrders,
    pendingOrders,
    confirmedOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
  ] = await Promise.all([
    Order.find({}).sort({ createdAt: -1 }).limit(100).lean(),
    Order.countDocuments(),
    Order.countDocuments({ orderStatus: "pending" }),
    Order.countDocuments({ orderStatus: "confirmed" }),
    Order.countDocuments({ orderStatus: "processing" }),
    Order.countDocuments({ orderStatus: "shipped" }),
    Order.countDocuments({ orderStatus: "delivered" }),
    Order.countDocuments({ orderStatus: "cancelled" }),
  ]);

  const orders: IOrderSerializable[] = JSON.parse(JSON.stringify(allOrders));

  return (
    <ShopAdminClient
      initialOrders={orders}
      stats={{
        totalOrders,
        pendingOrders,
        confirmedOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
      }}
    />
  );
}
