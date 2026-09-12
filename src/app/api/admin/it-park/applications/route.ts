import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { ITJobApplication } from "@/models/ITJobApplication";
import { ITJob } from "@/models/ITJob";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");
    const status = searchParams.get("status");

    const query: any = {};
    if (jobId) query.jobId = jobId;
    if (status && status !== "all") query.status = status;

    const applications = await ITJobApplication.find(query)
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    console.error("Error fetching job applications:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const application = await ITJobApplication.create(body);
    if (body.jobId) {
      await ITJob.findByIdAndUpdate(body.jobId, { $inc: { applicantCount: 1 } });
    }

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    console.error("Error submitting job application:", error);
    return NextResponse.json({ error: error.message || "Failed to submit application" }, { status: 500 });
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
    const { id, status, adminFeedback } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing application ID" }, { status: 400 });
    }

    const updateFields: any = {};
    if (status) updateFields.status = status;
    if (adminFeedback !== undefined) updateFields.adminFeedback = adminFeedback;
    updateFields.reviewedBy = session.user.name || session.user.email;

    const updated = await ITJobApplication.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    return NextResponse.json({ success: true, application: updated });
  } catch (error: any) {
    console.error("Error updating application:", error);
    return NextResponse.json({ error: error.message || "Failed to update application" }, { status: 500 });
  }
}
