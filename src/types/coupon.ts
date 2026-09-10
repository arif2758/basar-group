import type { Price, DiscountType } from "./index";

export interface ICoupon {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minAmount?: Price;
  maxDiscount?: Price;
  usageLimit?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
