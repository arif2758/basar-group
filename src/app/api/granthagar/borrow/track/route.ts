// src/app/api/granthagar/borrow/track/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { BookBorrow } from "@/models/BookBorrow";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || searchParams.get("borrowCode") || searchParams.get("id");

    if (!query?.trim()) {
      return NextResponse.json(
        { success: false, error: "বুক ট্র্যাকিং আইডি বা ফোন নম্বর প্রবেশ করান।" },
        { status: 400 }
      );
    }

    await dbConnect();

    const rawInput = query.trim();

    // 1. Phone number lookup
    const inputDigits = rawInput.replace(/\D/g, "");
    let phone11Digits = "";
    if (inputDigits.length === 11 && inputDigits.startsWith("01")) {
      phone11Digits = inputDigits;
    } else if (inputDigits.length === 13 && inputDigits.startsWith("8801")) {
      phone11Digits = inputDigits.slice(2);
    }

    if (phone11Digits) {
      const phoneBorrow = await BookBorrow.findOne({
        $or: [
          { "user.phone": phone11Digits },
          { "shippingAddress.phone": phone11Digits },
          { "shippingAddress.altPhone": phone11Digits },
        ],
      })
        .sort({ createdAt: -1 })
        .lean();

      if (phoneBorrow) {
        return NextResponse.json({ success: true, borrow: phoneBorrow });
      }
    }

    // 2. Normalize and check borrowCode
    const cleanCode = rawInput
      .replace(/^#+\s*/, "")
      .replace(/[\s_]+/g, "-")
      .toUpperCase();

    let matchedBorrow = await BookBorrow.findOne({
      borrowCode: { $regex: new RegExp(`^${cleanCode.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}$`, "i") },
    }).lean();

    if (matchedBorrow) {
      return NextResponse.json({ success: true, borrow: matchedBorrow });
    }

    // 3. Shorthand if user types without "BG-LIB-" (e.g. "260912-0001")
    if (/^\d{6}-\d{1,4}$/.test(cleanCode)) {
      const parts = cleanCode.split("-");
      const fullCode = `BG-LIB-${parts[0]}-${parts[1].padStart(4, "0")}`;
      matchedBorrow = await BookBorrow.findOne({
        borrowCode: { $regex: new RegExp(`^${fullCode}$`, "i") },
      }).lean();

      if (matchedBorrow) {
        return NextResponse.json({ success: true, borrow: matchedBorrow });
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "বই ধার নেওয়ার রেকর্ড পাওয়া যায়নি। সঠিক ট্র্যাকিং কোড (যেমন: BG-LIB-260912-0001) বা ফোন নম্বর দিন।",
      },
      { status: 404 }
    );
  } catch (error: any) {
    console.error("Library Borrow Tracking Error:", error);
    return NextResponse.json(
      { success: false, error: "সার্ভার এরর। কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
