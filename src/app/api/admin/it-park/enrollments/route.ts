import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { ITCourseEnrollment } from "@/models/ITCourseEnrollment";
import { ITCourse } from "@/models/ITCourse";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query: any = {};
    if (status && status !== "all") query.status = status;

    const enrollments = await ITCourseEnrollment.find(query)
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    return NextResponse.json({ success: true, enrollments });
  } catch (error: any) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch enrollments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const timestamp = Date.now().toString().slice(-5);
    const randomHex = Math.floor(100 + Math.random() * 900);
    const admissionRoll = `ITP-${timestamp}-${randomHex}`;

    const newEnrollment = await ITCourseEnrollment.create({
      ...body,
      admissionRoll: body.admissionRoll || admissionRoll,
    });

    if (body.courseId) {
      await ITCourse.findByIdAndUpdate(body.courseId, { $inc: { enrolledCount: 1 } });
    }

    return NextResponse.json({ success: true, enrollment: newEnrollment });
  } catch (error: any) {
    console.error("Error creating enrollment:", error);
    return NextResponse.json({ error: error.message || "Failed to submit admission" }, { status: 500 });
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
      return NextResponse.json({ error: "Missing enrollment ID" }, { status: 400 });
    }

    const updateFields: any = {};
    if (status) {
      updateFields.status = status;
      if (status === "confirmed") {
        updateFields.confirmedBy = session.user.name || session.user.email;
        updateFields.confirmedAt = new Date();
      }
    }
    if (notes !== undefined) updateFields.notes = notes;

    const updated = await ITCourseEnrollment.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    return NextResponse.json({ success: true, enrollment: updated });
  } catch (error: any) {
    console.error("Error updating enrollment:", error);
    return NextResponse.json({ error: error.message || "Failed to update enrollment" }, { status: 500 });
  }
}
