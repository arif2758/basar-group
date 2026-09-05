import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFamilyRequestDocument extends Document {
  title: string;
  gender: "male" | "female";
  parentKey: string;
  parentName?: string;
  suggestedKey?: string;
  birthYear?: string;
  deathYear?: string;
  isAlive?: boolean;
  phone?: string;
  address?: string;
  profession?: string;
  spouse?: string;
  bio?: string;
  submitterName?: string;
  submitterPhone?: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FamilyRequestSchema = new Schema<IFamilyRequestDocument>(
  {
    title: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    parentKey: { type: String, required: true, index: true },
    parentName: { type: String, default: "" },
    suggestedKey: { type: String, default: "" },
    birthYear: { type: String, default: "" },
    deathYear: { type: String, default: "" },
    isAlive: { type: Boolean, default: true },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    profession: { type: String, default: "" },
    spouse: { type: String, default: "" },
    bio: { type: String, default: "" },
    submitterName: { type: String, default: "" },
    submitterPhone: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    rejectionReason: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const FamilyRequestModel: Model<IFamilyRequestDocument> =
  mongoose.models.FamilyRequest ||
  mongoose.model<IFamilyRequestDocument>("FamilyRequest", FamilyRequestSchema);
