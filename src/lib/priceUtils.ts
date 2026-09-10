export function calculateDiscount(
  regularPrice: number,
  salePrice?: number,
): number {
  if (!regularPrice || !salePrice || regularPrice <= salePrice) return 0;
  return Math.floor(((regularPrice - salePrice) / regularPrice) * 100);
}

export function formatPrice(price: number): string {
  return (
    "৳" +
    new Intl.NumberFormat("en-BD", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(price)
  );
}
