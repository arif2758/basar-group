import { Document } from "mongoose";
import { CourseStatus, DeviceType, GenderType, UserRole, AccountType } from "./enums";

export interface IEnrolledCourse {
  courseId: string;
  courseName: string;
  batchName?: string;
  status: CourseStatus;
  enrolledAt: Date;
  validUntil?: Date;
  completedTopics: string[];
}

export interface IDeviceInfo extends Document {
  deviceType: DeviceType;
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
  ip: string;
  screenWidth: number;
  screenHeight: number;
  isTouchDevice: boolean;
  deviceModel?: string;
  isMobile: boolean;
  loginStats: {
    loginCount: number;
    lastLogin: Date;
    lastLoginIP: string;
  };
  siteVisitStats: {
    totalVisits: number;
    lastVisit: Date;
  };
}

export interface IUser extends Document {
  userId: string;
  fullname: string;
  email: string;
  password?: string;
  mobile?: string;
  dob?: Date;
  gender?: GenderType;
  address?: string;
  profilePicture?: string;
  studentClass?: string;
  schoolName?: string;
  parentContact?: string;
  lastLogin?: Date;
  addressDetails?: {
    upazila?: string;
    district?: string;
  };
  emergencyContact?: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
  genId?: string; // Generation ID from Family Tree
  isFamilyMember: boolean;
  role: UserRole;
  accountType: AccountType;
  isSubscribed: boolean;
  subscriptionExpiry?: Date;
  enrolledCourses: IEnrolledCourse[];
  paymentHistory: any[]; // References OrderCollection
  location?: {
    type: string;
    coordinates: number[];
  };
  deviceInfo?: any; // References DeviceInfo
  createdAt: Date;
  updatedAt: Date;
}
