// src/app/family-tree/page.tsx
import FamilyTree from "@/components/family-tree/FamilyTree";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";

export default async function DescendantPage() {
  const session = await auth();

  if (!session) {
    redirect("/login?callbackUrl=/family-tree");
  }

  // Check if they have access
  if (session.user.role !== "ADMIN" && !session.user.isFamilyMember) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="w-full max-w-[420px] bg-[#141414] border border-[#2a2a2a] rounded-xl p-8 sm:p-10 shadow-2xl relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-6 border border-rose-500/20">
            <Lock className="w-8 h-8 text-rose-500" />
          </div>
          <h1 className="text-2xl font-semibold text-white mb-3">Access Denied</h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            এই পেজটি শুধুমাত্র বাছার বংশের সদস্যদের জন্য সীমাবদ্ধ। আপনি পরিবারের সদস্য হলে অ্যাডমিনের সাথে যোগাযোগ করে আপনার অ্যাকাউন্ট ভেরিফাই করে নিন।
          </p>
          <a href="/" className="w-full py-3 rounded-lg bg-[#303030] hover:bg-[#3f3f3f] text-white font-medium text-[15px] transition-colors block text-center">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return <FamilyTree isAdmin={session.user.role === "ADMIN"} />;
}