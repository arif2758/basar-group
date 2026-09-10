"use client";

import React, { useEffect, useState } from "react";
import { 
  GitPullRequestDraft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Loader2,
  CalendarDays,
  User,
  ShieldAlert
} from "lucide-react";
import { IFamilyRequestDocument } from "@/models/FamilyRequest";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<IFamilyRequestDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/user/requests");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setRequests(data.requests);
          }
        }
      } catch (error) {
        console.error("Failed to load requests:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20";
      case "rejected": return "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20";
      case "pending":
      default: return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle2 className="w-4 h-4" />;
      case "rejected": return <XCircle className="w-4 h-4" />;
      case "pending":
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-[#303030] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <GitPullRequestDraft className="w-6 h-6 text-[#1677ff]" />
            আবেদন ও স্ট্যাটাস (My Requests)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            ফ্যামিলি ট্রিতে সদস্য যোগ করার আবেদনের বর্তমান অবস্থা ট্র্যাক করুন।
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#262626] border border-slate-200 dark:border-[#303030] text-sm font-semibold text-slate-700 dark:text-slate-300">
          মোট আবেদন: {requests.length} টি
        </div>
      </div>

      {/* Requests List */}
      {requests.length === 0 ? (
        <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-slate-50 dark:bg-[#262626] rounded-full flex items-center justify-center mb-4">
            <GitPullRequestDraft className="w-8 h-8 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">কোনো আবেদন পাওয়া যায়নি</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md">
            আপনি এখনো ফ্যামিলি ট্রিতে নতুন সদস্য যোগ করার কোনো আবেদন করেননি। ফ্যামিলি ট্রি থেকে নতুন সদস্যের রিকোয়েস্ট পাঠালে এখানে তার লাইভ স্ট্যাটাস দেখতে পাবেন।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((req) => (
            <div 
              key={String(req._id)} 
              className="bg-white dark:bg-[#1f1f1f] rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-5 hover:shadow-md transition-all relative overflow-hidden"
            >
              {/* Status Badge */}
              <div className={`absolute top-5 right-5 px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 capitalize shadow-sm ${getStatusColor(req.status)}`}>
                {getStatusIcon(req.status)}
                {req.status}
              </div>

              <div className="pr-24">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-slate-400" />
                  {req.title}
                </h3>
                
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Parent:</span> 
                    {req.parentName || req.parentKey}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Gender:</span> 
                    <span className="capitalize">{req.gender}</span>
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4 text-slate-400" />
                    {new Date(req.createdAt).toLocaleDateString('bn-BD', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                {req.status === "rejected" && req.rejectionReason && (
                  <div className="mt-4 p-3 bg-rose-50/50 dark:bg-rose-500/5 rounded-xl border border-rose-100 dark:border-rose-500/10 flex gap-3">
                    <ShieldAlert className="w-5 h-5 text-rose-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider mb-0.5">Rejection Reason</p>
                      <p className="text-sm text-rose-600 dark:text-rose-300">{req.rejectionReason}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
