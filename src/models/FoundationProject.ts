import mongoose, { Schema, Document, Model } from "mongoose";

export type ProjectStatus = "active" | "upcoming" | "completed";
export type ProjectCategory = "education" | "healthcare" | "winter_relief" | "water_sanitation" | "livelihood" | "emergency";

export interface IFoundationProject extends Document {
  title: string;
  category: ProjectCategory;
  targetAmount: number;
  raisedAmount: number;
  beneficiaryCount: number;
  status: ProjectStatus;
  district: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  impactSummary?: string;
  isFeatured: boolean;
  coordinatorName?: string;
  coordinatorPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FoundationProjectSchema = new Schema<IFoundationProject>(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["education", "healthcare", "winter_relief", "water_sanitation", "livelihood", "emergency"],
      default: "education",
    },
    targetAmount: { type: Number, required: true, min: 0 },
    raisedAmount: { type: Number, default: 0, min: 0 },
    beneficiaryCount: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      required: true,
      enum: ["active", "upcoming", "completed"],
      default: "active",
    },
    district: { type: String, required: true, trim: true, default: "ফরিদপুর" },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date },
    description: { type: String, required: true, trim: true },
    impactSummary: { type: String, trim: true },
    isFeatured: { type: Boolean, default: false },
    coordinatorName: { type: String, trim: true },
    coordinatorPhone: { type: String, trim: true },
  },
  { timestamps: true }
);

export const FoundationProject: Model<IFoundationProject> =
  mongoose.models.FoundationProject ||
  mongoose.model<IFoundationProject>("FoundationProject", FoundationProjectSchema);

export default FoundationProject;
