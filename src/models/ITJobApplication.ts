import mongoose, { Schema, Document, Model } from "mongoose";

export type ApplicationStatus = "applied" | "shortlisted" | "interviewed" | "hired" | "rejected";

export interface IITJobApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  jobTitle: string;
  applicantName: string;
  phone: string;
  email: string;
  portfolioUrl?: string;
  githubUrl?: string;
  resumeUrl?: string;
  coverLetter?: string;
  status: ApplicationStatus;
  adminFeedback?: string;
  reviewedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ITJobApplicationSchema = new Schema<IITJobApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "ITJob", required: true },
    jobTitle: { type: String, required: true },
    applicantName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    portfolioUrl: { type: String, trim: true },
    githubUrl: { type: String, trim: true },
    resumeUrl: { type: String, trim: true },
    coverLetter: { type: String, trim: true },
    status: {
      type: String,
      required: true,
      enum: ["applied", "shortlisted", "interviewed", "hired", "rejected"],
      default: "applied",
    },
    adminFeedback: { type: String, trim: true },
    reviewedBy: { type: String, trim: true },
  },
  { timestamps: true }
);

export const ITJobApplication: Model<IITJobApplication> =
  mongoose.models.ITJobApplication ||
  mongoose.model<IITJobApplication>("ITJobApplication", ITJobApplicationSchema);

export default ITJobApplication;
