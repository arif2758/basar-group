import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { ITEvent } from "@/models/ITEvent";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query: any = {};
    if (status && status !== "all") query.status = status;

    const events = await ITEvent.find(query).sort({ eventDate: 1 }).lean();
    return NextResponse.json({ success: true, events });
  } catch (error: any) {
    console.error("Error fetching IT events:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch events" }, { status: 500 });
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

    const newEvent = await ITEvent.create(body);
    return NextResponse.json({ success: true, event: newEvent });
  } catch (error: any) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: error.message || "Failed to create event" }, { status: 500 });
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
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }

    const updated = await ITEvent.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
    return NextResponse.json({ success: true, event: updated });
  } catch (error: any) {
    console.error("Error updating event:", error);
    return NextResponse.json({ error: error.message || "Failed to update event" }, { status: 500 });
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
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }

    await ITEvent.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Event deleted" });
  } catch (error: any) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: error.message || "Failed to delete event" }, { status: 500 });
  }
}
