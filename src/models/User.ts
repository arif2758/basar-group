import mongoose, { Schema, Model } from "mongoose";
import { AccountType, CourseStatus, DeviceType, GenderType, UserRole } from "@/types/enums";
import { IEnrolledCourse, IUser } from "@/types/interfaces";

const enrolledCourseSchema: Schema<IEnrolledCourse> = new Schema({
  courseId: { type: String, required: true },
  courseName: { type: String, required: true },
  batchName: { type: String },
  status: {
    type: String,
    enum: Object.values(CourseStatus),
    default: CourseStatus.ENROLLED,
  },
  enrolledAt: { type: Date, default: Date.now },
  validUntil: { type: Date },
  completedTopics: { type: [String], default: [] },
});

const userSchema: Schema<IUser> = new Schema(
  {
    userId: { type: String, unique: true, sparse: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    mobile: { type: String, unique: true, sparse: true },
    dob: { type: Date },
    gender: { type: String, enum: Object.values(GenderType) },

    address: { type: String },
    profilePicture: { type: String },
    studentClass: { type: String },
    schoolName: { type: String },
    parentContact: { type: String },
    lastLogin: { type: Date },
    addressDetails: {
      upazila: { type: String },
      district: { type: String },
    },
    emergencyContact: { type: String },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    genId: { type: String, required: false },
    isFamilyMember: { type: Boolean, default: false },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    accountType: {
      type: String,
      enum: Object.values(AccountType),
      default: AccountType.FREE,
    },
    isSubscribed: { type: Boolean, default: false },
    subscriptionExpiry: { type: Date },

    enrolledCourses: [enrolledCourseSchema],
    paymentHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderCollection",
      },
    ],
    location: {
      type: { type: String, enum: ["Point"], required: false },
      coordinates: { type: [Number], required: false },
    },
    deviceInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeviceInfo",
    },
  },
  { timestamps: true, collection: "users" }
);

userSchema.index({ location: "2dsphere" });

export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
