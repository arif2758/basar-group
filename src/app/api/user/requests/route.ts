import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { FamilyRequestModel } from "@/models/FamilyRequest";
import { auth } from "@/auth";

async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
  return mongoose.connect(process.env.MONGODB_URI);
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const requests = await FamilyRequestModel.find({
      submitterEmail: session.user.email,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, requests }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch User Requests Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
