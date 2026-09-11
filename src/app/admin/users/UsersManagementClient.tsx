"use client";

import React, { useState, useEffect, useCallback } from "react";
import { App, Card, Breadcrumb } from "antd";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  TreePine,
  GitPullRequestDraft,
  Sparkles,
  ArrowLeft,
  UserCheck,
} from "lucide-react";
import AdminUsersDoubleLayerTable, {
  IAdminUserItem,
} from "@/components/admin/users/AdminUsersDoubleLayerTable";

interface UsersManagementClientProps {
  initialUsers: IAdminUserItem[];
}

export default function UsersManagementClient({
  initialUsers,
}: UsersManagementClientProps) {
  const { message } = App.useApp();
  const [users, setUsers] = useState<IAdminUserItem[]>(initialUsers);
  const [isLoading, setIsLoading] = useState(false);

  // ── Fetch Users ──
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        message.error(data.error || "ইউজার ডাটা আনতে ব্যর্থ হয়েছে।");
      }
    } catch {
      message.error("সার্ভার থেকে ডাটা লোড করা যায়নি।");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Toggle Family Status ──
  const handleToggleFamilyStatus = async (
    userId: string,
    nextStatus: boolean,
    genId?: string
  ) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFamilyMember: nextStatus, genId }),
      });
      const data = await res.json();
      if (data.success) {
        message.success(
          `ইউজারের ফ্যামিলি মেম্বারশিপ সফলভাবে ${nextStatus ? "সক্রিয়" : "নিষ্ক্রিয়"} করা হয়েছে!`
        );
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId
              ? { ...u, isFamilyMember: nextStatus, ...(genId ? { genId } : {}) }
              : u
          )
        );
      } else {
        message.error(data.error || "আপডেট ব্যর্থ হয়েছে।");
      }
    } catch {
      message.error("অনুরোধ প্রক্রিয়াকরণ ব্যর্থ হয়েছে।");
    }
  };

  // ── Update Generation ID ──
  const handleUpdateGenId = async (userId: string, newGenId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genId: newGenId }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, genId: newGenId } : u))
        );
      } else {
        throw new Error(data.error || "আপডেট ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      const error = err as Error;
      throw error;
    }
  };

  // ── Update Role ──
  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        throw new Error(data.error || "আপডেট ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      const error = err as Error;
      throw error;
    }
  };

  // ── Update Account Type ──
  const handleUpdateAccountType = async (userId: string, newType: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountType: newType }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, accountType: newType } : u))
        );
      } else {
        throw new Error(data.error || "আপডেট ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      const error = err as Error;
      throw error;
    }
  };

  // ── Delete User ──
  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      } else {
        throw new Error(data.error || "ইউজার ডিলিট ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      const error = err as Error;
      throw error;
    }
  };

  // ── KPI Metrics ──
  const totalUsers = users.length;
  const familyMembersCount = users.filter((u) => u.isFamilyMember).length;
  const adminStaffCount = users.filter(
    (u) => u.role === "ADMIN" || u.role === "MODERATOR"
  ).length;
  const totalRequestsCount = users.reduce(
    (acc, u) => acc + (u.familyRequests ? u.familyRequests.length : 0),
    0
  );

  return (
    <div className="space-y-6 pb-12">
      {/* ── Clean & Minimal Premium Header ── */}
      <div className="space-y-2.5">
        <Breadcrumb
          items={[
            { title: <Link href="/admin" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">অ্যাডমিন কন্ট্রোল</Link> },
            { title: <span className="text-slate-800 dark:text-slate-200 font-medium">ইউজার ম্যানেজমেন্ট</span> },
          ]}
          className="text-xs"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-1">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  ইউজার ম্যানেজমেন্ট
                </h1>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 shrink-0">
                  মোট {totalUsers} জন
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate sm:whitespace-normal">
                নিবন্ধিত সদস্য ডিরেক্টরি, ভূমিকা (Role) ও অ্যাক্সেস কন্ট্রোল
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <Link
              href="/admin/family-tree"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-[#2e2e2e] bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-[#1f1f1f] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-2xs"
            >
              <TreePine className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>ফ্যামিলি ট্রি অ্যাডমিন</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── KPI Metrics Strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-[#141414] rounded-2xl border border-slate-200/80 dark:border-[#2a2a2a] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              মোট ইউজার
            </span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <Users className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {totalUsers}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">ডাটাবেজে নিবন্ধিত</p>
        </div>

        <div className="bg-white dark:bg-[#141414] rounded-2xl border border-slate-200/80 dark:border-[#2a2a2a] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              ফ্যামিলি মেম্বার
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <TreePine className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {familyMembersCount}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">বংশলতিকায় অ্যাক্টিভ</p>
        </div>

        <div className="bg-white dark:bg-[#141414] rounded-2xl border border-slate-200/80 dark:border-[#2a2a2a] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              অ্যাডমিন ও স্টাফ
            </span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
              <ShieldCheck className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-purple-600 dark:text-purple-400">
            {adminStaffCount}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">মডারেশন দায়িত্বে</p>
        </div>

        <div className="bg-white dark:bg-[#141414] rounded-2xl border border-slate-200/80 dark:border-[#2a2a2a] p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              জমাকৃত আবেদন
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <GitPullRequestDraft className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400">
            {totalRequestsCount}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">নতুন সদস্য যোগের</p>
        </div>
      </div>

      {/* ── Reusable Ant Design Double-Layer Table ── */}
      <AdminUsersDoubleLayerTable
        users={users}
        isLoading={isLoading}
        onRefresh={fetchUsers}
        onToggleFamilyStatus={handleToggleFamilyStatus}
        onUpdateGenId={handleUpdateGenId}
        onUpdateRole={handleUpdateRole}
        onUpdateAccountType={handleUpdateAccountType}
        onDeleteUser={handleDeleteUser}
        mode="general-users"
      />
    </div>
  );
}
