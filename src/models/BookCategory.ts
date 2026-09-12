// src/models/BookCategory.ts
import mongoose, { Schema, Document } from "mongoose";
import type { IBookCategory } from "@/data/granthagar/types";

const BookCategorySchema = new Schema<IBookCategory & Document>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    icon: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const BookCategory =
  mongoose.models.BookCategory ||
  mongoose.model<IBookCategory & Document>("BookCategory", BookCategorySchema);

export default BookCategory;
