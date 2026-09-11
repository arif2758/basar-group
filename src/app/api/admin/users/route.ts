import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import mongoose from "mongoose";
import { User } from "@/models/User";
import { FamilyRequestModel } from "@/models/FamilyRequest";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
  return mongoose.connect(process.env.MONGODB_URI);
}

// GET: সকল রেজিস্টার্ড ইউজার, তাদের রোল, ফ্যামিলি স্ট্যাটাস ও আবেদন ডাটা
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const userRole = (session?.user as any)?.role;
    const isAdmin = userRole === "ADMIN" || userRole === "admin";
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "অননুমোদিত অ্যাক্সেস। শুধুমাত্র অ্যাডমিনদের জন্য।" },
        { status: 403 }
      );
    }

    await connectToDB();

    const [usersRaw, requestsRaw] = await Promise.all([
      User.find({})
        .select(
          "fullname email mobile role accountType isFamilyMember genId createdAt lastLogin profilePicture"
        )
        .sort({ createdAt: -1 })
        .lean(),
      FamilyRequestModel.find({}).sort({ createdAt: -1 }).lean(),
    ]);

    // Map family tree requests by submitter email
    const requestsByEmail = new Map<string, any[]>();
    for (const r of requestsRaw) {
      const email = r.submitterEmail?.toLowerCase().trim();
      if (email) {
        if (!requestsByEmail.has(email)) requestsByEmail.set(email, []);
        requestsByEmail.get(email)!.push({
          _id: r._id.toString(),
          title: r.title,
          gender: r.gender,
          parentKey: r.parentKey,
          parentName: r.parentName,
          status: r.status,
          rejectionReason: r.rejectionReason,
          createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : "",
        });
      }
    }

    const users = usersRaw.map((u: any) => ({
      _id: u._id.toString(),
      fullname: u.fullname || "নামবিহীন ইউজার",
      email: u.email || "",
      mobile: u.mobile || "",
      role: u.role || "USER",
      accountType: u.accountType || "FREE",
      isFamilyMember: !!u.isFamilyMember,
      genId: u.genId || "",
      profilePicture: u.profilePicture || "",
      createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : "",
      lastLogin: u.lastLogin ? new Date(u.lastLogin).toISOString() : "",
      familyRequests: requestsByEmail.get(u.email?.toLowerCase().trim()) || [],
    }));

    return NextResponse.json({
      success: true,
      users,
      totalCount: users.length,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("GET /api/admin/users error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "ইউজার ডাটা আনতে ব্যর্থ হয়েছে।" },
      { status: 500 }
    );
  }
}
