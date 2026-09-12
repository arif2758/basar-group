import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { ITCourse } from "@/models/ITCourse";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    const query: any = {};
    if (category && category !== "all") query.category = category;
    if (status && status !== "all") query.status = status;

    const courses = await ITCourse.find(query).sort({ isFeatured: -1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, courses });
  } catch (error: any) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch courses" }, { status: 500 });
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

    const slug = (body.title || "course")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + `-${Date.now().toString().slice(-4)}`;

    const newCourse = await ITCourse.create({
      ...body,
      slug: body.slug || slug,
    });

    return NextResponse.json({ success: true, course: newCourse });
  } catch (error: any) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: error.message || "Failed to create course" }, { status: 500 });
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
      return NextResponse.json({ error: "Missing course ID" }, { status: 400 });
    }

    const updatedCourse = await ITCourse.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    return NextResponse.json({ success: true, course: updatedCourse });
  } catch (error: any) {
    console.error("Error updating course:", error);
    return NextResponse.json({ error: error.message || "Failed to update course" }, { status: 500 });
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
      return NextResponse.json({ error: "Missing course ID" }, { status: 400 });
    }

    await ITCourse.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Course deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting course:", error);
    return NextResponse.json({ error: error.message || "Failed to delete course" }, { status: 500 });
  }
}
