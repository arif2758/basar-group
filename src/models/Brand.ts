import mongoose, { Schema, Document } from "mongoose";
import type { IBrand } from "@/types/brand";

const BrandSchema = new Schema<IBrand & Document>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    logo: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export const Brand =
  mongoose.models.Brand || mongoose.model<IBrand & Document>("Brand", BrandSchema);

export default Brand;
