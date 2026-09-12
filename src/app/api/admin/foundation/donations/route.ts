import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { FoundationDonation } from "@/models/FoundationDonation";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const query: any = {};
    if (status && status !== "all") query.status = status;
    if (category && category !== "all") query.fundCategory = category;
    if (search) {
      query.$or = [
        { donorName: { $regex: search, $options: "i" } },
        { donorPhone: { $regex: search, $options: "i" } },
        { receiptNumber: { $regex: search, $options: "i" } },
        { transactionId: { $regex: search, $options: "i" } },
      ];
    }

    const donations = await FoundationDonation.find(query)
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    return NextResponse.json({ success: true, donations });
  } catch (error: any) {
    console.error("Error fetching foundation donations:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch donations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    const timestamp = Date.now().toString().slice(-6);
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const receiptNumber = `BF-REC-${timestamp}-${randomHex}`;

    const newDonation = await FoundationDonation.create({
      ...body,
      receiptNumber: body.receiptNumber || receiptNumber,
      verifiedBy: body.status === "verified" ? (session.user.name || session.user.email) : undefined,
      verifiedAt: body.status === "verified" ? new Date() : undefined,
    });

    return NextResponse.json({ success: true, donation: newDonation });
  } catch (error: any) {
    console.error("Error creating donation record:", error);
    return NextResponse.json({ error: error.message || "Failed to create donation" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing donation ID" }, { status: 400 });
    }

    const updateData: any = {};
    if (status) {
      updateData.status = status;
      if (status === "verified") {
        updateData.verifiedBy = session.user.name || session.user.email;
        updateData.verifiedAt = new Date();
      }
    }
    if (notes !== undefined) updateData.notes = notes;

    const updatedDonation = await FoundationDonation.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return NextResponse.json({ success: true, donation: updatedDonation });
  } catch (error: any) {
    console.error("Error updating donation status:", error);
    return NextResponse.json({ error: error.message || "Failed to update donation" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    const userRole = (session?.user as { role?: string })?.role;
    if (userRole !== "ADMIN" && userRole !== "admin") {
      return NextResponse.json({ error: "Forbidden: Super Admin only" }, { status: 403 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing donation ID" }, { status: 400 });
    }

    await FoundationDonation.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Donation record deleted" });
  } catch (error: any) {
    console.error("Error deleting donation:", error);
    return NextResponse.json({ error: error.message || "Failed to delete donation" }, { status: 500 });
  }
}
