import mongoose, { Schema, Document, Model } from "mongoose";

export interface IITEvent extends Document {
  title: string;
  eventType: "hackathon" | "seminar" | "workshop" | "bootcamp_demo" | "networking";
  eventDate: Date;
  timeSchedule: string;
  venue: string;
  ticketPrice: number;
  totalSeats: number;
  registeredCount: number;
  speakerName: string;
  speakerRole: string;
  description: string;
  status: "upcoming" | "live" | "completed";
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ITEventSchema = new Schema<IITEvent>(
  {
    title: { type: String, required: true, trim: true },
    eventType: {
      type: String,
      required: true,
      enum: ["hackathon", "seminar", "workshop", "bootcamp_demo", "networking"],
      default: "seminar",
    },
    eventDate: { type: Date, required: true },
    timeSchedule: { type: String, required: true, default: "বিকাল ৩:০০ - ৫:০০" },
    venue: { type: String, required: true, default: "বাছার আইটি পার্ক অডিটোরিয়াম / অনলাইন" },
    ticketPrice: { type: Number, default: 0 },
    totalSeats: { type: Number, required: true, default: 100 },
    registeredCount: { type: Number, default: 0 },
    speakerName: { type: String, required: true, trim: true },
    speakerRole: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      required: true,
      enum: ["upcoming", "live", "completed"],
      default: "upcoming",
    },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ITEvent: Model<IITEvent> =
  mongoose.models.ITEvent || mongoose.model<IITEvent>("ITEvent", ITEventSchema);

export default ITEvent;
