import { NextRequest, NextResponse } from "next/server";
import { createMemberRequest } from "@/lib/treeStorage";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || !body.parentKey) {
      return NextResponse.json(
        {
          success: false,
          error: "সদস্যের নাম এবং পিতা/অভিভাবক নির্বাচন আবশ্যক।",
        },
        { status: 400 }
      );
    }

    const result = await createMemberRequest({
      title: body.title.trim(),
      gender: body.gender || "male",
      parentKey: body.parentKey,
      parentName: body.parentName || "",
      suggestedKey: body.suggestedKey || "",
      birthYear: body.birthYear || "",
      deathYear: body.deathYear || "",
      isAlive: body.isAlive ?? true,
      phone: body.phone || "",
      address: body.address || "",
      profession: body.profession || "",
      spouse: body.spouse || "",
      bio: body.bio || "",
      submitterName: body.submitterName || "",
      submitterPhone: body.submitterPhone || "",
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "আবেদন সংরক্ষণ করতে ব্যর্থ হয়েছে।" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: result.id,
      message: "আপনার তথ্য সফলভাবে জমা হয়েছে! অ্যাডমিনের পর্যালোচনার পর এটি পরিবারবৃক্ষে সংযুক্ত হবে।",
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || "Failed to submit request." },
      { status: 500 }
    );
  }
}
