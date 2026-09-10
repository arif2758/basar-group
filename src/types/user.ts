import type { UserRole } from "./enums";
import type { Types } from "mongoose";

export interface IAddress {
  label: string; // 'Home', 'Office'
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  postalCode: string;
  isDefault: boolean;
}

export interface IAddressDoc extends IAddress {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddressSerializable extends IAddress {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IShopUser {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: UserRole | string;
  phone?: string;
  emailVerified?: Date;
  addresses: IAddressDoc[];
  wishlist?: string[];
  emergencyContact?: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type IUser = IShopUser;

