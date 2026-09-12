// src/models/Book.ts
import mongoose, { Schema, Document } from "mongoose";
import type { IBook } from "@/data/granthagar/types";

const BookDescriptionItemSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    subDescription: [{ type: String }],
  },
  { _id: false }
);

const BookDescriptionSectionSchema = new Schema(
  {
    id: { type: String, required: true },
    description1: [BookDescriptionItemSchema],
    description2: [BookDescriptionItemSchema],
    description3: [BookDescriptionItemSchema],
    description4: [BookDescriptionItemSchema],
  },
  { _id: false }
);

const CurrentBorrowerSchema = new Schema(
  {
    userId: { type: String },
    name: { type: String, required: true },
    addressZone: { type: String },
    phone: { type: String },
    borrowedAt: { type: Date, default: Date.now },
    returnExpectedAt: { type: Date, required: true },
    status: { type: String, enum: ["reading", "returned"], default: "reading" },
  },
  { _id: false }
);

const BookDonorSchema = new Schema(
  {
    name: { type: String, required: true },
    zone: { type: String },
    note: { type: String },
    donatedAt: { type: String },
  },
  { _id: false }
);

const BookSchema = new Schema<IBook & Document>(
  {
    productId: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true },
    categoryName: { type: String },
    tags: [{ type: String }],
    thumbnail: { type: String, required: true },
    extraImages: [{ type: String }],
    shortDesc: { type: String, required: true },
    description: [BookDescriptionSectionSchema],
    publisher: { type: String },
    publishYear: { type: Number },
    pages: { type: Number },
    language: { type: String, default: "বাংলা" },
    edition: { type: String },
    totalQuantity: { type: Number, default: 1, min: 0 },
    availableQuantity: { type: Number, default: 1, min: 0 },
    donor: BookDonorSchema,
    currentBorrower: CurrentBorrowerSchema,
    status: {
      type: String,
      enum: ["available", "borrowed", "maintenance"],
      default: "available",
    },
  },
  { timestamps: true }
);

BookSchema.index({ title: "text", author: "text", tags: "text" });

export const Book =
  mongoose.models.Book ||
  mongoose.model<IBook & Document>("Book", BookSchema);

export default Book;
