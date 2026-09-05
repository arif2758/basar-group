import { NextRequest, NextResponse } from "next/server";
import {
  getAllMemberRequests,
  approveMemberRequest,
  rejectMemberRequest,
} from "@/lib/treeStorage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const requests = await getAllMemberRequests();
    return NextResponse.json({
      success: true,
      requests,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch requests" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, requestId, reason } = body;

    if (!requestId || !action) {
      return NextResponse.json(
        { success: false, error: "আবেদন আইডি এবং অ্যাকশন আবশ্যক।" },
        { status: 400 }
      );
    }

    if (action === "approve") {
      const result = await approveMemberRequest(requestId);
      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error || "অনুমোদন ব্যর্থ হয়েছে।" },
          { status: 400 }
        );
      }
      return NextResponse.json({
        success: true,
        message: "সদস্য সফলভাবে পরিবারবৃক্ষে যুক্ত হয়েছে!",
        member: result.member,
      });
    }

    if (action === "reject") {
      const result = await rejectMemberRequest(requestId, reason);
      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error || "প্রত্যাখ্যান ব্যর্থ হয়েছে।" },
          { status: 400 }
        );
      }
      return NextResponse.json({
        success: true,
        message: "আবেদনটি বাতিল হিসেবে চিহ্নিত করা হয়েছে।",
      });
    }

    return NextResponse.json(
      { success: false, error: "অবৈধ অ্যাকশন।" },
      { status: 400 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process request." },
      { status: 500 }
    );
  }
}
