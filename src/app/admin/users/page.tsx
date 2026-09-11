import React from "react";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User } from "@/models/User";
import { FamilyRequestModel } from "@/models/FamilyRequest";
import UsersManagementClient from "./UsersManagementClient";
import { IAdminUserItem } from "@/components/admin/users/AdminUsersDoubleLayerTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "ইউজার ম্যানেজমেন্ট | বাছার গ্রুপ অ্যাডমিন",
  description: "সেন্ট্রাল ইউজার ডিরেক্টরি, রোল এবং ফ্যামিলি ট্রি পারমিশন নিয়ন্ত্রণ",
};

async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
  return mongoose.connect(process.env.MONGODB_URI);
}

export default async function AdminUsersPage() {
  const session = await auth();
  const userRole = (session?.user as any)?.role;
  const isAdmin =
    userRole === "ADMIN" ||
    userRole === "admin" ||
    userRole === "SUPER_ADMIN" ||
    userRole === "super_admin";

  if (!isAdmin) {
    redirect("/admin");
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

  // Map requests by submitter email
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

  const initialUsers: IAdminUserItem[] = usersRaw.map((u: any) => ({
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

  return <UsersManagementClient initialUsers={initialUsers} />;
}
