import mongoose, { Schema, Document, Model } from "mongoose";

export type AidType = "medical" | "scholarship" | "winter_clothes" | "emergency_food" | "livelihood" | "other";
export type AidStatus = "pending" | "under_review" | "approved" | "disbursed" | "rejected";

export interface IFoundationAidRequest extends Document {
  applicantName: string;
  phone: string;
  nidOrBirthCert?: string;
  aidType: AidType;
  requestedAmount: number;
  approvedAmount?: number;
  status: AidStatus;
  district: string;
  villageOrArea: string;
  description: string;
  hospitalOrSchool?: string;
  adminNotes?: string;
  reviewedBy?: string;
  disbursedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const FoundationAidRequestSchema = new Schema<IFoundationAidRequest>(
  {
    applicantName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    nidOrBirthCert: { type: String, trim: true },
    aidType: {
      type: String,
      required: true,
      enum: ["medical", "scholarship", "winter_clothes", "emergency_food", "livelihood", "other"],
      default: "medical",
    },
    requestedAmount: { type: Number, required: true, min: 1 },
    approvedAmount: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      required: true,
      enum: ["pending", "under_review", "approved", "disbursed", "rejected"],
      default: "pending",
    },
    district: { type: String, required: true, trim: true, default: "ফরিদপুর" },
    villageOrArea: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    hospitalOrSchool: { type: String, trim: true },
    adminNotes: { type: String, trim: true },
    reviewedBy: { type: String, trim: true },
    disbursedDate: { type: Date },
  },
  { timestamps: true }
);

export const FoundationAidRequest: Model<IFoundationAidRequest> =
  mongoose.models.FoundationAidRequest ||
  mongoose.model<IFoundationAidRequest>("FoundationAidRequest", FoundationAidRequestSchema);

export default FoundationAidRequest;
