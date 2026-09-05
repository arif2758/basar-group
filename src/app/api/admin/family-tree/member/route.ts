import { NextRequest, NextResponse } from "next/server";
import {
  insertFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
} from "@/lib/treeStorage";

export const dynamic = "force-dynamic";

// POST: নতুন সদস্য সরাসরি যোগ করা
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { parentKey, memberData } = body;

    if (!parentKey || !memberData || !memberData.title) {
      return NextResponse.json(
        { success: false, error: "সদস্যের নাম এবং পিতা/অভিভাবক আবশ্যক।" },
        { status: 400 }
      );
    }

    const result = await insertFamilyMember(parentKey, memberData);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "সদস্য যুক্ত করতে ব্যর্থ হয়েছে।" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "নতুন সদস্য সফলভাবে পরিবারবৃক্ষে যুক্ত হয়েছে!",
      member: result.member,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || "Failed to add member." },
      { status: 500 }
    );
  }
}

// PUT: বিদ্যমান সদস্যের তথ্য সম্পাদনা (Edit/Update)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { key, updateData } = body;

    if (!key || !updateData) {
      return NextResponse.json(
        { success: false, error: "সদস্যের আইডি এবং সংশোধিত তথ্য আবশ্যক।" },
        { status: 400 }
      );
    }

    const result = await updateFamilyMember(key, updateData);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "সদস্য আপডেট করতে ব্যর্থ হয়েছে।" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "সদস্যের তথ্য সফলভাবে হালনাগাদ করা হয়েছে!",
      member: result.member,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update member." },
      { status: 500 }
    );
  }
}

// DELETE: সদস্য ও বংশধরদের মুছে ফেলা
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json(
        { success: false, error: "মুছে ফেলার জন্য সদস্যের আইডি প্রদান করুন।" },
        { status: 400 }
      );
    }

    const result = await deleteFamilyMember(key);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "সদস্য মুছে ফেলতে ব্যর্থ হয়েছে।" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `সদস্য ও তার সংশ্লিষ্ট ${result.deletedKeys.length}টি রেকর্ড মুছে ফেলা হয়েছে।`,
      deletedKeys: result.deletedKeys,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete member." },
      { status: 500 }
    );
  }
}
