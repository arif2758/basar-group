import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { ITJob } from "@/models/ITJob";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const jobType = searchParams.get("jobType");
    const status = searchParams.get("status");

    const query: any = {};
    if (category && category !== "all") query.category = category;
    if (jobType && jobType !== "all") query.jobType = jobType;
    if (status && status !== "all") query.status = status;

    const jobs = await ITJob.find(query).sort({ isFeatured: -1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, jobs });
  } catch (error: any) {
    console.error("Error fetching IT jobs:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch jobs" }, { status: 500 });
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

    const newJob = await ITJob.create(body);
    return NextResponse.json({ success: true, job: newJob });
  } catch (error: any) {
    console.error("Error creating IT job:", error);
    return NextResponse.json({ error: error.message || "Failed to create job" }, { status: 500 });
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
    const { id, ...updateFields } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing job ID" }, { status: 400 });
    }

    const updated = await ITJob.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
    return NextResponse.json({ success: true, job: updated });
  } catch (error: any) {
    console.error("Error updating IT job:", error);
    return NextResponse.json({ error: error.message || "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    const userRole = (session?.user as { role?: string })?.role;
    if (userRole !== "ADMIN" && userRole !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing job ID" }, { status: 400 });
    }

    await ITJob.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Job deleted" });
  } catch (error: any) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: error.message || "Failed to delete job" }, { status: 500 });
  }
}
