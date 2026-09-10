import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "@/models/User";
import { auth } from "@/auth";

// Ensure Mongoose connects
async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
  return mongoose.connect(process.env.MONGODB_URI);
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const dbUser = await User.findOne({ email: session.user.email }).select("-password");

    if (!dbUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: dbUser }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch Profile Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const updates = await req.json();

    // Prevent users from updating restricted fields
    const restrictedFields = [
      "role", 
      "accountType", 
      "isFamilyMember", 
      "isSubscribed", 
      "paymentHistory", 
      "email",
      "userId"
    ];
    
    restrictedFields.forEach(field => {
      if (field in updates) {
        delete updates[field];
      }
    });

    await connectToDB();

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: updates },
      { returnDocument: 'after', runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update Profile Error:", error);
    return NextResponse.json({ message: "Failed to update profile", error: error.message }, { status: 500 });
  }
}
