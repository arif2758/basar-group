import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import mongoose from "mongoose";
import { User } from "@/models/User";
import { FamilyRequestModel } from "@/models/FamilyRequest";
import { syncUserFamilyMemberStatus } from "@/lib/treeStorage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
  return mongoose.connect(process.env.MONGODB_URI);
}

// GET: সকল রেজিস্টার্ড ইউজার ও তাদের ফ্যামিলি স্ট্যাটাস দেখা
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const userRole = (session?.user as any)?.role;
    const isAdmin =
      userRole === "ADMIN" ||
      userRole === "admin" ||
      userRole === "SUPER_ADMIN" ||
      userRole === "super_admin";
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: "অননুমোদিত অ্যাক্সেস।" }, { status: 403 });
    }

    await connectToDB();

    const { searchParams } = new URL(req.url);
    const familyOnly = searchParams.get("familyOnly") === "true";
    const userFilter = familyOnly ? { isFamilyMember: true } : {};

    const [usersRaw, requestsRaw] = await Promise.all([
      User.find(userFilter)
        .select(
          "fullname email mobile dob gender address addressDetails studentClass schoolName educationType section rollNumber parentContact emergencyContact genId isFamilyMember role accountType profilePicture createdAt lastLogin"
        )
        .sort({ createdAt: -1 })
        .lean(),
      FamilyRequestModel.find({}).sort({ createdAt: -1 }).lean(),
    ]);

    // Map requests by submitter email for fast lookup in double-layer table
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
      fullname: u.fullname || "নামবিহীন",
      email: u.email || "",
      mobile: u.mobile || "",
      dob: u.dob ? new Date(u.dob).toISOString() : "",
      gender: u.gender || "",
      address: u.address || "",
      addressDetails: u.addressDetails || {},
      studentClass: u.studentClass || "",
      schoolName: u.schoolName || "",
      educationType: u.educationType || "",
      section: u.section || "",
      rollNumber: u.rollNumber || "",
      parentContact: u.parentContact || "",
      emergencyContact: u.emergencyContact || "",
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
    console.error("GET /api/admin/family-tree/users error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "ইউজার ডাটা আনতে ব্যর্থ হয়েছে।" },
      { status: 500 }
    );
  }
}

// POST: ইউজারের ফ্যামিলি মেম্বারশিপ টগল বা আপডেট করা
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userRole = (session?.user as any)?.role;
    const isAdmin =
      userRole === "ADMIN" ||
      userRole === "admin" ||
      userRole === "SUPER_ADMIN" ||
      userRole === "super_admin";
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: "অননুমোদিত অ্যাক্সেস।" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, isFamilyMember, genId } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "ইউজার আইডি আবশ্যক।" },
        { status: 400 }
      );
    }

    const result = await syncUserFamilyMemberStatus(
      userId,
      !!isFamilyMember,
      genId !== undefined ? String(genId) : undefined
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "আপডেট ব্যর্থ হয়েছে।" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `ইউজারের ফ্যামিলি মেম্বারশিপ সফলভাবে ${isFamilyMember ? "সক্রিয়" : "নিষ্ক্রিয়"} করা হয়েছে!`,
      user: result.user,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("POST /api/admin/family-tree/users error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update user family status." },
      { status: 500 }
    );
  }
}
