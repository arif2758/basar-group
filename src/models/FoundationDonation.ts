import mongoose, { Schema, Document, Model } from "mongoose";

export type DonationStatus = "verified" | "pending" | "rejected";
export type FundCategory = "education" | "medical" | "winter_relief" | "general" | "food_pack" | "orphan_care";
export type PaymentMethod = "bkash" | "nagad" | "rocket" | "bank" | "cash";

export interface IFoundationDonation extends Document {
  donorName: string;
  donorPhone: string;
  donorEmail?: string;
  amount: number;
  fundCategory: FundCategory;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  receiptNumber: string;
  status: DonationStatus;
  isAnonymous: boolean;
  notes?: string;
  verifiedBy?: string;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const FoundationDonationSchema = new Schema<IFoundationDonation>(
  {
    donorName: { type: String, required: true, trim: true },
    donorPhone: { type: String, required: true, trim: true },
    donorEmail: { type: String, trim: true },
    amount: { type: Number, required: true, min: 1 },
    fundCategory: {
      type: String,
      required: true,
      enum: ["education", "medical", "winter_relief", "general", "food_pack", "orphan_care"],
      default: "general",
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["bkash", "nagad", "rocket", "bank", "cash"],
      default: "bkash",
    },
    transactionId: { type: String, trim: true },
    receiptNumber: { type: String, required: true, unique: true, trim: true },
    status: {
      type: String,
      required: true,
      enum: ["verified", "pending", "rejected"],
      default: "pending",
    },
    isAnonymous: { type: Boolean, default: false },
    notes: { type: String, trim: true },
    verifiedBy: { type: String, trim: true },
    verifiedAt: { type: Date },
  },
  { timestamps: true }
);

export const FoundationDonation: Model<IFoundationDonation> =
  mongoose.models.FoundationDonation ||
  mongoose.model<IFoundationDonation>("FoundationDonation", FoundationDonationSchema);

export default FoundationDonation;
