// src/app/api/granthagar/borrow/[id]/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { BookBorrow } from "@/models/BookBorrow";

const VALID_STATUSES = [
  "pending",
  "approved",
  "accepted",
  "dispatched",
  "in_transit",
  "delivered",
  "in_return",
  "returned",
  "overdue",
  "cancelled",
] as const;

type BorrowStatus = (typeof VALID_STATUSES)[number];

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "লগইন করা আবশ্যক।" },
        { status: 401 }
      );
    }

    const userRole = (session.user as { role?: string }).role;
    const isAdmin = userRole === "ADMIN" || userRole === "admin";

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "শুধুমাত্র অ্যাডমিন এই অপারেশন করতে পারবেন।" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status as BorrowStatus)) {
      return NextResponse.json(
        {
          success: false,
          error: `অবৈধ স্ট্যাটাস। গ্রহণযোগ্য: ${VALID_STATUSES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const updateData: Record<string, unknown> = { status };

    // Auto-set actualReturnDate when returned
    if (status === "returned") {
      updateData.actualReturnDate = new Date();
    }

    const updated = await BookBorrow.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "রেকর্ড পাওয়া যায়নি।" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, borrow: updated });
  } catch (error: unknown) {
    console.error("Borrow PATCH error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "সার্ভার এরর। কিছুক্ষণ পর আবার চেষ্টা করুন।",
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

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "লগইন করা আবশ্যক।" },
        { status: 401 }
      );
    }

    const userRole = (session.user as { role?: string }).role;
    const isAdmin = userRole === "ADMIN" || userRole === "admin";

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "অ্যাডমিন অ্যাক্সেস প্রয়োজন।" },
        { status: 403 }
      );
    }

    const { id } = await params;

    await dbConnect();

    const borrow = await BookBorrow.findById(id).lean();

    if (!borrow) {
      return NextResponse.json(
        { success: false, error: "রেকর্ড পাওয়া যায়নি।" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, borrow });
  } catch (error: unknown) {
    console.error("Borrow GET [id] error:", error);
    return NextResponse.json(
      { success: false, error: "সার্ভার এরর।" },
      { status: 500 }
    );
  }
}
