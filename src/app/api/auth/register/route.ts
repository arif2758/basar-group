import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";

// Ensure Mongoose connects
async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
  return mongoose.connect(process.env.MONGODB_URI);
}

export async function POST(req: Request) {
  try {
    const { fullname, email, password } = await req.json();

    if (!fullname || !email || !password) {
      return NextResponse.json(
        { message: "Fullname, email, and password are required" },
        { status: 400 }
      );
    }

    await connectToDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      if (!existingUser.password) {
        // User registered via OAuth, let's link the credentials by setting a password
        existingUser.password = hashedPassword;
        // Generate userId if missing
        if (!existingUser.userId) {
          existingUser.userId = new mongoose.Types.ObjectId().toString();
        }
        // Optionally update fullname if they provided a new one, but usually keep existing
        await existingUser.save();
        return NextResponse.json(
          { message: "Account linked successfully. You can now login with password." },
          { status: 201 }
        );
      } else {
        // User already has a credentials account
        return NextResponse.json(
          { message: "Email is already registered" },
          { status: 400 }
        );
      }
    }

    // Create the user
    const newUser = new User({
      userId: new mongoose.Types.ObjectId().toString(),
      fullname,
      email,
      password: hashedPassword,
      // role defaults to "USER" as defined in the Schema's UserRole enum
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
