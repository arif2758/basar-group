import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { FoundationAidRequest } from "@/models/FoundationAidRequest";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const aidType = searchParams.get("aidType");

    const query: any = {};
    if (status && status !== "all") query.status = status;
    if (aidType && aidType !== "all") query.aidType = aidType;

    const requests = await FoundationAidRequest.find(query)
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return NextResponse.json({ success: true, requests });
  } catch (error: any) {
    console.error("Error fetching aid requests:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch requests" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const newRequest = await FoundationAidRequest.create(body);
    return NextResponse.json({ success: true, request: newRequest });
  } catch (error: any) {
    console.error("Error creating aid request:", error);
    return NextResponse.json({ error: error.message || "Failed to submit request" }, { status: 500 });
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
    const { id, status, approvedAmount, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing request ID" }, { status: 400 });
    }

    const updateFields: any = {};
    if (status) {
      updateFields.status = status;
      updateFields.reviewedBy = session.user.name || session.user.email;
      if (status === "disbursed") {
        updateFields.disbursedDate = new Date();
      }
    }
    if (approvedAmount !== undefined) updateFields.approvedAmount = approvedAmount;
    if (adminNotes !== undefined) updateFields.adminNotes = adminNotes;

    const updatedRequest = await FoundationAidRequest.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    return NextResponse.json({ success: true, request: updatedRequest });
  } catch (error: any) {
    console.error("Error updating aid request:", error);
    return NextResponse.json({ error: error.message || "Failed to update request" }, { status: 500 });
  }
}
