import mongoose, { Schema, Document, Model } from "mongoose";

export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseCategory = "web_dev" | "graphics_ui" | "digital_marketing" | "python_ai" | "freelancing" | "cyber_security";

export interface IITCourse extends Document {
  title: string;
  slug: string;
  category: CourseCategory;
  level: CourseLevel;
  durationWeeks: number;
  totalClasses: number;
  courseFee: number;
  discountFee?: number;
  instructorName: string;
  instructorTitle: string;
  maxSeats: number;
  enrolledCount: number;
  batchNumber: string;
  startDate: Date;
  classSchedule: string;
  description: string;
  topics: string[];
  status: "upcoming" | "ongoing" | "completed";
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ITCourseSchema = new Schema<IITCourse>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["web_dev", "graphics_ui", "digital_marketing", "python_ai", "freelancing", "cyber_security"],
      default: "web_dev",
    },
    level: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    durationWeeks: { type: Number, required: true, default: 12 },
    totalClasses: { type: Number, required: true, default: 24 },
    courseFee: { type: Number, required: true, min: 0 },
    discountFee: { type: Number, min: 0 },
    instructorName: { type: String, required: true, trim: true },
    instructorTitle: { type: String, required: true, trim: true },
    maxSeats: { type: Number, required: true, default: 30 },
    enrolledCount: { type: Number, default: 0 },
    batchNumber: { type: String, required: true, default: "Batch-01" },
    startDate: { type: Date, required: true, default: Date.now },
    classSchedule: { type: String, default: "শনি ও সোম, রাত ৮:০০ - ১০:০০" },
    description: { type: String, required: true, trim: true },
    topics: [{ type: String, trim: true }],
    status: {
      type: String,
      required: true,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ITCourse: Model<IITCourse> =
  mongoose.models.ITCourse || mongoose.model<IITCourse>("ITCourse", ITCourseSchema);

export default ITCourse;
