// src/app/api/super-shop/admin/orders/[id]/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { Order } from "@/models/Order";
import type { OrderStatus } from "@/types";

const VALID_ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "ready",
  "assigned",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
  "in_return",
];

function isAdmin(session: { user?: { role?: string } } | null) {
  const role = session?.user?.role as string | undefined;
  return role === "ADMIN" || role === "admin";
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || !isAdmin(session)) {
      return NextResponse.json(
        { success: false, error: "অ্যাডমিন অ্যাক্সেস প্রয়োজন।" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { orderStatus, adminNotes } = body;

    if (orderStatus && !VALID_ORDER_STATUSES.includes(orderStatus as OrderStatus)) {
      return NextResponse.json(
        { success: false, error: `অবৈধ স্ট্যাটাস: ${orderStatus}` },
        { status: 400 }
      );
    }

    await dbConnect();

    const updateData: Record<string, unknown> = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    // Auto-set timestamps
    if (orderStatus === "shipped") updateData.shippedAt = new Date();
    if (orderStatus === "delivered") updateData.deliveredAt = new Date();
    if (orderStatus === "cancelled") updateData.cancelledAt = new Date();

    const updated = await Order.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "অর্ডার পাওয়া যায়নি।" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error: unknown) {
    console.error("Order PATCH error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "সার্ভার এরর।",
      },
      { status: 500 }
    );
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || !isAdmin(session)) {
      return NextResponse.json(
        { success: false, error: "অ্যাডমিন অ্যাক্সেস প্রয়োজন।" },
        { status: 403 }
      );
    }

    const { id } = await params;
    await dbConnect();

    const order = await Order.findById(id).lean();
    if (!order) {
      return NextResponse.json(
        { success: false, error: "অর্ডার পাওয়া যায়নি।" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error: unknown) {
    console.error("Order GET [id] error:", error);
    return NextResponse.json(
      { success: false, error: "সার্ভার এরর।" },
      { status: 500 }
    );
  }
}
