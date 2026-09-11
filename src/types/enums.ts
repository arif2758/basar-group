export enum CourseStatus {
  ENROLLED = "ENROLLED",
  COMPLETED = "COMPLETED",
}

export enum DeviceType {
  DESKTOP = "DESKTOP",
  MOBILE = "MOBILE",
  TABLET = "TABLET",
}

export enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
} 

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  MANAGER = "MANAGER",
  OPERATOR = "OPERATOR",
  MODERATOR = "MODERATOR",
  VOLUNTEER = "VOLUNTEER",
  LIBRARIAN = "LIBRARIAN",
  INSTRUCTOR = "INSTRUCTOR",
}

export enum AccountType {
  FREE = "FREE",
  TRIAL = "TRIAL",
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
  DIAMOND = "DIAMOND",
  EMERALD = "EMERALD",
  PREMIUM = "PREMIUM",
  LIFETIME = "LIFETIME",
  STUDENT = "STUDENT",
  CORPORATE = "CORPORATE",
  ROYAL = "ROYAL",
}

export enum EducationType {
  GENERAL = "general",
  MADRASAH = "madrasah",
  HIGHER = "higher",
  OTHER = "other",
}

export const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
] as const;

export type BloodGroup = (typeof BLOOD_GROUPS)[number];

export const GENERAL_CLASSES = [
  "প্লে",
  "নার্সারি",
  "কেজি",
  "১ম শ্রেণী",
  "২য় শ্রেণী",
  "৩য় শ্রেণী",
  "৪র্থ শ্রেণী",
  "৫ম শ্রেণী",
  "৬ষ্ঠ শ্রেণী",
  "৭ম শ্রেণী",
  "৮ম শ্রেণী",
  "৯ম শ্রেণী",
  "১০ম শ্রেণী (এসএসসি)",
  "একাদশ শ্রেণী (এইচএসসি ১ম বর্ষ)",
  "দ্বাদশ শ্রেণী (এইচএসসি ২য় বর্ষ)",
];

export const MADRASAH_CLASSES = [
  "নূরানী / মক্তব / শিশু শ্রেণী",
  "নাজেরা / হিফজুল কুরআন",
  "ইবতেদায়ী ১ম শ্রেণী",
  "ইবতেদায়ী ২য় শ্রেণী",
  "ইবতেদায়ী ৩য় শ্রেণী",
  "ইবতেদায়ী ৪র্থ শ্রেণী",
  "ইবতেদায়ী ৫ম শ্রেণী",
  "দাখিল ৬ষ্ঠ শ্রেণী",
  "দাখিল ৭ম শ্রেণী",
  "দাখিল ৮ম শ্রেণী",
  "দাখিল ৯ম শ্রেণী",
  "দাখিল ১০ম শ্রেণী",
  "আলিম ১ম বর্ষ (একাদশ)",
  "আলিম ২য় বর্ষ (দ্বাদশ)",
  "ফাজিল (স্নাতক)",
  "কামিল (স্নাতকোত্তর)",
  "দাওরায়ে হাদীস (তাকমীল)",
];

export const HIGHER_CLASSES = [
  "স্নাতক (অনার্স / ডিগ্রী)",
  "স্নাতকোত্তর (মাস্টার্স)",
  "ডক্টরেট / পিএইচডি",
  "ডিপ্লোমা / অন্যান্য",
];