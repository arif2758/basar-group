import mongoose, { Schema, Document, Model } from "mongoose";

export type EnrollmentStatus = "pending" | "confirmed" | "cancelled";
export type ITEnrollPayment = "bkash" | "nagad" | "rocket" | "bank" | "cash";

export interface IITCourseEnrollment extends Document {
  studentName: string;
  phone: string;
  email?: string;
  courseId: mongoose.Types.ObjectId;
  courseTitle: string;
  batchNumber: string;
  paidAmount: number;
  paymentMethod: ITEnrollPayment;
  transactionId?: string;
  admissionRoll: string;
  status: EnrollmentStatus;
  educationBackground?: string;
  district: string;
  notes?: string;
  confirmedBy?: string;
  confirmedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ITCourseEnrollmentSchema = new Schema<IITCourseEnrollment>(
  {
    studentName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    courseId: { type: Schema.Types.ObjectId, ref: "ITCourse" },
    courseTitle: { type: String, required: true, trim: true },
    batchNumber: { type: String, required: true, default: "Batch-01" },
    paidAmount: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["bkash", "nagad", "rocket", "bank", "cash"],
      default: "bkash",
    },
    transactionId: { type: String, trim: true },
    admissionRoll: { type: String, required: true, unique: true, trim: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    educationBackground: { type: String, trim: true },
    district: { type: String, required: true, default: "ফরিদপুর" },
    notes: { type: String, trim: true },
    confirmedBy: { type: String, trim: true },
    confirmedAt: { type: Date },
  },
  { timestamps: true }
);

export const ITCourseEnrollment: Model<IITCourseEnrollment> =
  mongoose.models.ITCourseEnrollment ||
  mongoose.model<IITCourseEnrollment>("ITCourseEnrollment", ITCourseEnrollmentSchema);

export default ITCourseEnrollment;
