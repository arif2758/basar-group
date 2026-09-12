// src/app/api/granthagar/borrow/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { BookBorrow } from "@/models/BookBorrow";
import { generateBorrowCode } from "@/lib/granthagar/borrow-code";
import { sendDiscordBookBorrow } from "@/lib/discord";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    const {
      items,
      recipientName,
      phone,
      altPhone,
      villageOrArea,
      fullAddress,
      notes,
      durationDays = 3,
      deliveryMethod = "self_pickup",
      deliveryFee = 0,
      bookBorrowFee = 0,
      totalAmount = 0,
      pledgeAgreed = true,
      paymentMethod = "none",
      paymentProvider,
      senderNumber,
      transactionId,
    } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "ধার নেওয়ার জন্য অন্তত একটি বই নির্বাচন করুন।" },
        { status: 400 }
      );
    }

    if (!recipientName?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { success: false, error: "নাম ও মোবাইল নম্বর আবশ্যক।" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Generate unique standard Borrow Code: BG-LIB-YYMMDD-XXXX
    const borrowCode = await generateBorrowCode();

    // Calculate expected return date
    const borrowDate = new Date();
    const expectedReturnDate = new Date(borrowDate);
    expectedReturnDate.setDate(expectedReturnDate.getDate() + Number(durationDays));

    const borrowRecord = await BookBorrow.create({
      borrowCode,
      user: {
        userId: session?.user?.id || undefined,
        name: session?.user?.name || (session?.user as any)?.fullname || recipientName.trim(),
        phone: phone.trim(),
        email: session?.user?.email || undefined,
      },
      items: items.map((item: any) => ({
        bookId: String(item.bookId || item.id || item.productId),
        productId: String(item.productId || item.bookId || item.id),
        title: item.title,
        author: item.author || "অজানা লেখক",
        thumbnail: item.thumbnail || item.coverImage || "/placeholder-book.png",
        quantity: Number(item.quantity) || 1,
      })),
      durationDays: Number(durationDays),
      borrowDate,
      expectedReturnDate,
      deliveryMethod,
      deliveryFee: Number(deliveryFee) || 0,
      bookBorrowFee: Number(bookBorrowFee) || 0,
      totalAmount: Number(totalAmount) || 0,
      shippingAddress: {
        recipientName: recipientName.trim(),
        phone: phone.trim(),
        altPhone: altPhone?.trim() || undefined,
        villageOrArea: villageOrArea?.trim() || undefined,
        fullAddress: fullAddress?.trim() || "ঠিকানা দেওয়া হয়নি",
        notes: notes?.trim() || undefined,
      },
      pledgeAgreed: Boolean(pledgeAgreed),
      paymentMethod: paymentMethod || (deliveryFee > 0 ? "cod" : "none"),
      paymentProvider: paymentProvider || undefined,
      senderNumber: senderNumber?.trim() || undefined,
      transactionId: transactionId?.trim() || undefined,
      paymentStatus:
        deliveryFee <= 0
          ? "not_required"
          : paymentMethod === "mobile" && transactionId
          ? "paid"
          : "pending",
      status: "pending",
    });

    // Send Discord Webhook Notification (Non-blocking)
    sendDiscordBookBorrow(borrowRecord).catch((err) =>
      console.error("Failed to send Discord book borrow webhook:", err)
    );

    return NextResponse.json(
      {
        success: true,
        message: "বই ধার নেওয়ার আবেদন সফলভাবে গৃহীত হয়েছে।",
        borrow: borrowRecord,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating book borrow:", error);
    return NextResponse.json(
      { success: false, error: error.message || "সার্ভার এরর। কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "লগইন করা আবশ্যক।" },
        { status: 401 }
      );
    }

    await dbConnect();

    const query: any = {
      $or: [
        ...(session.user.id ? [{ "user.userId": session.user.id }] : []),
        ...(session.user.email ? [{ "user.email": session.user.email }] : []),
      ],
    };

    const borrows = await BookBorrow.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, borrows });
  } catch (error: any) {
    console.error("Error fetching user book borrows:", error);
    return NextResponse.json(
      { success: false, error: "ধার করা বইয়ের তালিকা লোড করা যায়নি।" },
      { status: 500 }
    );
  }
}
