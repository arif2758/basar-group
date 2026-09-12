// src/models/BookBorrow.ts
import mongoose, { Schema, Document } from "mongoose";
import type { IBookBorrow } from "@/data/granthagar/types";

const BorrowItemSchema = new Schema(
  {
    bookId: { type: String, required: true },
    productId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    thumbnail: { type: String, required: true },
    quantity: { type: Number, default: 1, min: 1 },
  },
  { _id: false }
);

const ShippingAddressSchema = new Schema(
  {
    recipientName: { type: String, required: true },
    phone: { type: String, required: true },
    altPhone: { type: String },
    villageOrArea: { type: String },
    fullAddress: { type: String, required: true },
    notes: { type: String },
  },
  { _id: false }
);

const BookBorrowSchema = new Schema<IBookBorrow & Document>(
  {
    borrowCode: { type: String, required: true, unique: true },
    user: {
      userId: { type: String },
      name: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    items: [BorrowItemSchema],
    durationDays: { type: Number, enum: [1, 3, 5, 7], default: 3 },
    borrowDate: { type: Date, default: Date.now },
    expectedReturnDate: { type: Date, required: true },
    actualReturnDate: { type: Date },
    deliveryMethod: {
      type: String,
      enum: ["self_pickup", "standard_delivery", "electric_bike", "drone"],
      default: "self_pickup",
    },
    deliveryFee: { type: Number, default: 0 },
    bookBorrowFee: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    shippingAddress: ShippingAddressSchema,
    pledgeAgreed: { type: Boolean, default: true },
    paymentMethod: {
      type: String,
      enum: ["cod", "mobile", "none"],
      default: "none",
    },
    paymentProvider: {
      type: String,
      enum: ["bkash", "nagad", "rocket"],
    },
    senderNumber: { type: String, trim: true },
    transactionId: { type: String, trim: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "not_required"],
      default: "not_required",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "accepted",
        "dispatched",
        "in_transit",
        "delivered",
        "in_return",
        "returned",
        "overdue",
        "cancelled",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const BookBorrow =
  mongoose.models.BookBorrow ||
  mongoose.model<IBookBorrow & Document>("BookBorrow", BookBorrowSchema);

export default BookBorrow;
