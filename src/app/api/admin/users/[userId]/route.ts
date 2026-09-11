import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import mongoose from "mongoose";
import { User } from "@/models/User";
import { syncUserFamilyMemberStatus } from "@/lib/treeStorage";

export const dynamic = "force-dynamic";

async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
  return mongoose.connect(process.env.MONGODB_URI);
}

// PUT: ইউজারের রোল, একাউন্ট টাইপ, ফ্যামিলি মেম্বারশিপ বা প্রজন্ম আপডেট
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await auth();
    const userRole = (session?.user as any)?.role;
    const isAdmin =
      userRole === "ADMIN" ||
      userRole === "admin" ||
      userRole === "SUPER_ADMIN" ||
      userRole === "super_admin";
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "অননুমোদিত অ্যাক্সেস।" },
        { status: 403 }
      );
    }

    const { userId } = await params;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "ইউজার আইডি আবশ্যক।" },
        { status: 400 }
      );
    }

    await connectToDB();

    const body = await req.json();
    const {
      role,
      accountType,
      isFamilyMember,
      genId,
      fullname,
      mobile,
      gender,
      dob,
      address,
      educationType,
      schoolName,
      studentClass,
      section,
      rollNumber,
      parentContact,
      emergencyContact,
    } = body;

    const updateDoc: Record<string, any> = {};

    if (role !== undefined) updateDoc.role = role;
    if (accountType !== undefined) updateDoc.accountType = accountType;
    if (isFamilyMember !== undefined) updateDoc.isFamilyMember = !!isFamilyMember;
    if (genId !== undefined) updateDoc.genId = genId;
    if (fullname !== undefined) updateDoc.fullname = fullname.trim();
    if (mobile !== undefined) updateDoc.mobile = mobile.trim();
    if (gender !== undefined) updateDoc.gender = gender;
    if (dob !== undefined) updateDoc.dob = dob ? new Date(dob) : null;
    if (address !== undefined) updateDoc.address = address.trim();
    if (educationType !== undefined) updateDoc.educationType = educationType;
    if (schoolName !== undefined) updateDoc.schoolName = schoolName.trim();
    if (studentClass !== undefined) updateDoc.studentClass = studentClass.trim();
    if (section !== undefined) updateDoc.section = section.trim();
    if (rollNumber !== undefined) updateDoc.rollNumber = rollNumber.trim();
    if (parentContact !== undefined) updateDoc.parentContact = parentContact.trim();
    if (emergencyContact !== undefined) updateDoc.emergencyContact = emergencyContact.trim();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateDoc },
      { new: true }
    ).select(
      "fullname email mobile dob gender address studentClass schoolName educationType section rollNumber parentContact emergencyContact genId isFamilyMember role accountType createdAt lastLogin"
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "ইউজার পাওয়া যায়নি।" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "ইউজার তথ্য সফলভাবে আপডেট হয়েছে!",
      user: updatedUser,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("PUT /api/admin/users/[userId] error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "ইউজার আপডেট করতে ব্যর্থ হয়েছে।" },
      { status: 500 }
    );
  }
}

// DELETE: ইউজার মুছে ফেলা
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await auth();
    const userRole = (session?.user as any)?.role;
    const isAdmin =
      userRole === "ADMIN" ||
      userRole === "admin" ||
      userRole === "SUPER_ADMIN" ||
      userRole === "super_admin";
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "অননুমোদিত অ্যাক্সেস।" },
        { status: 403 }
      );
    }

    const { userId } = await params;
    const sessionUserId = (session?.user as any)?.id;

    if (sessionUserId && sessionUserId === userId) {
      return NextResponse.json(
        { success: false, error: "আপনি নিজের অ্যাডমিন অ্যাকাউন্ট ডিলিট করতে পারবেন না।" },
        { status: 400 }
      );
    }

    await connectToDB();

    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "ইউজার পাওয়া যায়নি।" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "ইউজার সফলভাবে ডিলিট করা হয়েছে!",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("DELETE /api/admin/users/[userId] error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "ইউজার ডিলিট করতে ব্যর্থ হয়েছে।" },
      { status: 500 }
    );
  }
}
