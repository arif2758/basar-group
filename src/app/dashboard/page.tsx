import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  User, 
  ShieldCheck, 
  Crown, 
  Star, 
  TreePine, 
  ArrowRight,
  Clock,
  Activity,
  GitPullRequestDraft
} from "lucide-react";
import mongoose from "mongoose";
import { User as UserModel } from "@/models/User";
import { FamilyRequestModel } from "@/models/FamilyRequest";
import { FamilyMemberModel } from "@/models/FamilyMember";

// Ensure Mongoose is connected
async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
  return mongoose.connect(process.env.MONGODB_URI);
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  await connectToDB();

  // Fetch full user data to check genId and other stats
  const dbUser = await UserModel.findOne({ email: session.user.email }).lean();
  const isAdmin = session.user.role === "ADMIN";
  const isLinked = !!dbUser?.genId;

  // Admin stats
  let pendingRequests = 0;
  let totalMembers = 0;
  if (isAdmin) {
    pendingRequests = await FamilyRequestModel.countDocuments({ status: "pending" });
    totalMembers = await FamilyMemberModel.countDocuments({});
  }

  // Determine Account Tier Icon
  let TierIcon = User;
  let tierColor = "text-slate-500";
  let tierBg = "bg-slate-100 dark:bg-slate-800";
  
  if (dbUser?.accountType === "LIFETIME") {
    TierIcon = Crown;
    tierColor = "text-amber-500";
    tierBg = "bg-amber-50 dark:bg-amber-500/10";
  } else if (dbUser?.accountType === "PREMIUM") {
    TierIcon = Star;
    tierColor = "text-blue-500";
    tierBg = "bg-blue-50 dark:bg-blue-500/10";
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-[#1f1f1f]">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Welcome back, {session.user.fullname?.split(" ")[0] || "User"}! 👋
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your profile and explore the Basar Family Network.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Account Status Card */}
        <div className="bg-white dark:bg-[#141414] rounded-2xl p-5 border border-slate-200 dark:border-[#1f1f1f] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tierBg}`}>
                <TierIcon className={`w-5 h-5 ${tierColor}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Type</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                  {dbUser?.accountType?.toLowerCase() || "Free"}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Your account role is <span className="font-bold text-slate-900 dark:text-white">{session.user.role}</span>.
            </p>
          </div>
          <Link 
            href="/dashboard/profile" 
            className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            Upgrade Plan <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Family Tree Linkage Card */}
        <div className="bg-white dark:bg-[#141414] rounded-2xl p-5 border border-slate-200 dark:border-[#1f1f1f] shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-slate-100 dark:text-[#1a1a1a] opacity-50 z-0">
            <TreePine className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isLinked ? "bg-emerald-50 dark:bg-emerald-500/10" : "bg-rose-50 dark:bg-rose-500/10"}`}>
                <ShieldCheck className={`w-5 h-5 ${isLinked ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verification</p>
                <p className={`text-lg font-bold ${isLinked ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  {isLinked ? "Verified Member" : "Not Linked"}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {isLinked 
                ? `You are connected to the Family Tree (Gen ID: ${dbUser.genId}).` 
                : "Your profile is not yet linked to the Family Tree."}
            </p>
          </div>
          <Link 
            href={isLinked ? "/family-tree" : "/dashboard/profile"} 
            className="relative z-10 mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            {isLinked ? "View Family Tree" : "Link Profile"} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Admin Overview (Conditional) */}
        {isAdmin && (
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 border border-blue-500/30 shadow-md text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Admin Stats</p>
                  <p className="text-lg font-bold text-white">System Health</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs text-blue-200">Pending Requests</p>
                  <p className="text-xl font-black">{pendingRequests}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-200">Total Members</p>
                  <p className="text-xl font-black">{totalMembers}</p>
                </div>
              </div>
            </div>
            <Link 
              href="/admin/family-tree" 
              className="mt-4 text-sm font-medium text-blue-100 hover:text-white hover:underline flex items-center gap-1"
            >
              Go to Admin Panel <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions & Recent Activity Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {/* Quick Actions (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/dashboard/profile" className="group flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#1f1f1f] hover:border-blue-400 dark:hover:border-blue-500/50 transition-all shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Edit Profile</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Update your personal details, contact info, and profile picture.</p>
              </div>
            </Link>
            <Link href="/family-tree" className="group flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#1f1f1f] hover:border-emerald-400 dark:hover:border-emerald-500/50 transition-all shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors">
                <TreePine className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Family Tree</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Explore our heritage and browse the interactive family tree.</p>
              </div>
            </Link>
            <Link href="/dashboard/requests" className="group flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#1f1f1f] hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">
                <GitPullRequestDraft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">My Requests</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Track the status of your family tree addition requests.</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity / System Notifs (1/3 width) */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">System Alerts</h2>
          <div className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#1f1f1f] shadow-sm p-1">
            <div className="flex flex-col">
              {/* Example static notification */}
              <div className="p-3 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors">
                <div className="mt-0.5 text-emerald-500">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Account Created</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> Welcome to Basar Group!
                  </p>
                </div>
              </div>

              {!isLinked && (
                <div className="p-3 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors border-t border-slate-100 dark:border-[#1f1f1f]">
                  <div className="mt-0.5 text-rose-500">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Profile Incomplete</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 leading-relaxed">
                      Please link your account to the family tree to access exclusive features.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
