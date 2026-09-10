import type { Types } from "mongoose";
import { UserRole as EnumUserRole } from "./enums";

// Common Primitive Types
export type ID = string | Types.ObjectId;
export type Slug = string;
export type Email = string;
export type Phone = string;
export type Price = number;
export type StockQuantity = number;
export type ItemQuantity = number;

// Payment
export type PaymentMethod = "cod" | "mobile" | "manual"; // bkash/nagad/rocket/cod/manual
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

// Order
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "ready"
  | "assigned"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned"
  | "in_return";

// User Role - Supports both legacy uppercase enum and gadgeter-hub strings
export type UserRoleType = "user" | "admin" | "USER" | "ADMIN" | "VOLUNTEER" | "MODERATOR";
export { EnumUserRole as UserRole };

// Product
export type ProductStatus = "published" | "draft" | "archived";

// Coupon
export type DiscountType = "percentage" | "fixed";
