import { NextRequest, NextResponse } from "next/server";
import { getCompleteFamilyTree, getAllFlatMembers } from "@/lib/treeStorage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { tree, source, totalMembers } = await getCompleteFamilyTree();
    const { members } = await getAllFlatMembers();

    return NextResponse.json({
      success: true,
      tree,
      members,
      source,
      totalMembers,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("GET /api/family-tree failed:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to load family tree.",
      },
      { status: 500 }
    );
  }
}
