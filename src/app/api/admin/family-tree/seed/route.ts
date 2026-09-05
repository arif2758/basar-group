import { NextResponse } from "next/server";
import { seedDefaultFamilyTree } from "@/lib/treeStorage";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const result = await seedDefaultFamilyTree();
    return NextResponse.json({
      success: true,
      count: result.count,
      source: result.source,
      message: `পরিবারবৃক্ষের প্রাথমিক ${result.count} জন সদস্য ডাটাবেজে সফলভাবে সিড/রিসেট করা হয়েছে!`,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || "Failed to seed default tree." },
      { status: 500 }
    );
  }
}
