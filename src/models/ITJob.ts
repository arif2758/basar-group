import mongoose, { Schema, Document, Model } from "mongoose";

export type JobType = "full_time" | "part_time" | "internship" | "remote" | "contract";
export type JobCategory = "software_dev" | "ui_ux_design" | "digital_marketing" | "content_writing" | "sqa_testing" | "tech_support";

export interface IITJob extends Document {
  title: string;
  companyName: string;
  category: JobCategory;
  jobType: JobType;
  location: string;
  salaryRange: string;
  experienceLevel: string;
  deadline: Date;
  description: string;
  responsibilities: string[];
  requirements: string[];
  applicantCount: number;
  status: "active" | "closed";
  isFeatured: boolean;
  contactEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

const ITJobSchema = new Schema<IITJob>(
  {
    title: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["software_dev", "ui_ux_design", "digital_marketing", "content_writing", "sqa_testing", "tech_support"],
      default: "software_dev",
    },
    jobType: {
      type: String,
      required: true,
      enum: ["full_time", "part_time", "internship", "remote", "contract"],
      default: "full_time",
    },
    location: { type: String, required: true, default: "রিমোট / ফরিদপুর" },
    salaryRange: { type: String, required: true, default: "আলোচনা সাপেক্ষে" },
    experienceLevel: { type: String, default: "১-২ বছর / ফ্রেশার" },
    deadline: { type: Date, required: true },
    description: { type: String, required: true, trim: true },
    responsibilities: [{ type: String, trim: true }],
    requirements: [{ type: String, trim: true }],
    applicantCount: { type: Number, default: 0 },
    status: {
      type: String,
      required: true,
      enum: ["active", "closed"],
      default: "active",
    },
    isFeatured: { type: Boolean, default: false },
    contactEmail: { type: String, required: true, default: "career@basargroup.org" },
  },
  { timestamps: true }
);

export const ITJob: Model<IITJob> =
  mongoose.models.ITJob || mongoose.model<IITJob>("ITJob", ITJobSchema);

export default ITJob;
