import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFamilyMemberDocument extends Document {
  key: string;
  title: string;
  gender?: "male" | "female";
  generation: number;
  parentKey?: string | null;
  birthYear?: string;
  deathYear?: string;
  isAlive?: boolean;
  phone?: string;
  address?: string;
  profession?: string;
  spouse?: string;
  bio?: string;
  educationType?: string;
  institution?: string;
  academicClass?: string;
  section?: string;
  rollNumber?: string;
  bloodGroup?: string;
  nidOrBirthCert?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FamilyMemberSchema = new Schema<IFamilyMemberDocument>(
  {
    key: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    generation: { type: Number, required: true, index: true },
    parentKey: { type: String, default: null, index: true },
    birthYear: { type: String, default: "" },
    deathYear: { type: String, default: "" },
    isAlive: { type: Boolean, default: true },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    profession: { type: String, default: "" },
    spouse: { type: String, default: "" },
    bio: { type: String, default: "" },
    educationType: { type: String, default: "" },
    institution: { type: String, default: "" },
    academicClass: { type: String, default: "" },
    section: { type: String, default: "" },
    rollNumber: { type: String, default: "" },
    bloodGroup: { type: String, default: "" },
    nidOrBirthCert: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose model overwrite error during Next.js hot reload
export const FamilyMemberModel: Model<IFamilyMemberDocument> =
  mongoose.models.FamilyMember ||
  mongoose.model<IFamilyMemberDocument>("FamilyMember", FamilyMemberSchema);
