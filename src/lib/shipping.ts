export type DeliveryZone = "dhaka" | "suburbs" | "outside";

export interface ZoneDetail {
  key: DeliveryZone;
  label: string;
  badgeLabel: string;
  subtitle: string;
}

export const DELIVERY_ZONES: Record<DeliveryZone, ZoneDetail> = {
  dhaka: {
    key: "dhaka",
    label: "ISD (Inside Dhaka)",
    badgeLabel: "ISD (Inside Dhaka)",
    subtitle: "ঢাকার শহর ও মূল এলাকা",
  },
  suburbs: {
    key: "suburbs",
    label: "SUB (Suburbs)",
    badgeLabel: "SUB (Suburbs)",
    subtitle: "গাজীপুর, সাভার, নারায়নগঞ্জ, কেরানীগঞ্জ",
  },
  outside: {
    key: "outside",
    label: "OSD (Outside Dhaka)",
    badgeLabel: "OSD (Outside Dhaka)",
    subtitle: "ঢাকার বাইরে সকল জেলা ও উপজেলা",
  },
};

export const DEFAULT_PRODUCT_WEIGHT_GRAMS = 500;

export function calculateShippingCost(
  zone: DeliveryZone = "dhaka",
  totalWeightGrams: number = DEFAULT_PRODUCT_WEIGHT_GRAMS,
): number {
  const weight = Math.max(1, totalWeightGrams);

  if (zone === "dhaka") {
    if (weight <= 500) return 60;
    if (weight <= 1000) return 70;
    if (weight <= 2000) return 90;
    const extraKg = Math.ceil((weight - 2000) / 1000);
    return 90 + extraKg * 20;
  }

  if (zone === "suburbs") {
    if (weight <= 500) return 80;
    if (weight <= 1000) return 100;
    if (weight <= 2000) return 130;
    const extraKg = Math.ceil((weight - 2000) / 1000);
    return 130 + extraKg * 30;
  }

  // Outside Dhaka
  if (weight <= 500) return 110;
  if (weight <= 1000) return 130;
  if (weight <= 2000) return 170;
  const extraKg = Math.ceil((weight - 2000) / 1000);
  return 170 + extraKg * 30;
}

export function getWeightTierLabel(totalWeightGrams: number): string {
  if (totalWeightGrams <= 500) return "0-500g";
  if (totalWeightGrams <= 1000) return "500g-1kg";
  if (totalWeightGrams <= 2000) return "1kg-2kg";
  return `${(totalWeightGrams / 1000).toFixed(1)}kg`;
}

export function getZoneBadgeInfo(
  shipping?: { deliveryArea?: string | DeliveryZone },
  shippingCost?: number
): { label: string; color: string } {
  const area = shipping?.deliveryArea as DeliveryZone | undefined;
  if (area === "suburbs") return { label: "SUB (Suburbs)", color: "purple" };
  if (area === "outside") return { label: "OSD (Outside Dhaka)", color: "orange" };
  if (area === "dhaka") return { label: "ISD (Inside Dhaka)", color: "geekblue" };

  if (shippingCost === 80 || shippingCost === 100)
    return { label: "SUB (Suburbs)", color: "purple" };
  if (shippingCost && shippingCost > 100)
    return { label: "OSD (Outside Dhaka)", color: "orange" };
  return { label: "ISD (Inside Dhaka)", color: "geekblue" };
}

