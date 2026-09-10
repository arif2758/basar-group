import type { Types } from "mongoose";
import type { IOrder } from "@/types/order";

type OrderInput = Omit<IOrder, "_id"> & { _id: Types.ObjectId };

type InvoiceOptions = {
  customerName?: string;
};

const padR = (s: string, len: number) =>
  s.length >= len ? s.slice(0, len) : s + " ".repeat(len - s.length);

const padL = (s: string, len: number) =>
  s.length >= len ? s.slice(0, len) : " ".repeat(len - s.length) + s;

export function buildInvoiceText(
  order: OrderInput,
  options: InvoiceOptions = {}
): string {
  const dateStr = new Date(order.createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const totalItems = order.items.reduce(
    (sum, item) => sum + item.itemQuantity,
    0
  );

  const paymentLabel =
    order.paymentMethod === "cod"
      ? "Cash on Delivery (COD)"
      : `${order.paymentProvider?.toUpperCase() || "Manual/Mobile"} (${order.paymentStatus.toUpperCase()})`;

  const isGiftOrder = order.customerPhone !== order.shipping.phone;

  const header =
    `          BASAR SUPER SHOP\n` +
    `         বাছার গ্রুপ সমাজকল্যাণ\n` +
    `        শ্রীনগর, মুন্সীগঞ্জ, বাংলাদেশ\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  const orderInfo =
    `ORDER INFO\n` +
    `Order ID      : ${order.orderNumber}\n` +
    `Placed        : ${dateStr}\n` +
    `Payment Method: ${paymentLabel}\n` +
    `Total Products: ${order.items.length}\n` +
    `Total Items   : ${totalItems}`;

  const customerBlock = isGiftOrder
    ? `ORDER PLACED BY (CUSTOMER)\n` +
      `Name          : ${options.customerName || "N/A"}\n` +
      `Phone         : ${order.customerPhone}\n\n` +
      `DELIVERY TO (RECIPIENT)\n` +
      `Name          : ${order.shipping.name}\n` +
      `Phone         : ${order.shipping.phone}\n` +
      `Address       : ${order.shipping.addressLine1}${order.shipping.addressLine2 ? ", " + order.shipping.addressLine2 : ""}\n` +
      `Area          : ${order.shipping.deliveryZone || order.shipping.city || ""}`
    : `CUSTOMER & SHIPPING\n` +
      `Name          : ${order.shipping.name}\n` +
      `Phone         : ${order.shipping.phone}\n` +
      `Address       : ${order.shipping.addressLine1}${order.shipping.addressLine2 ? ", " + order.shipping.addressLine2 : ""}\n` +
      `Area          : ${order.shipping.deliveryZone || order.shipping.city || ""}`;

  const itemLines = order.items
    .map((item, index) => {
      const num = String(index + 1).padStart(2, " ");
      const title = item.productTitle.slice(0, 26);
      const variant = [item.color, item.size].filter(Boolean).join("/");
      const qtyPrice = `${item.itemQuantity}x ৳${item.unitPrice} = ৳${item.itemQuantity * item.unitPrice}`;

      return (
        `${num}. ${title}\n` +
        (variant ? `    Option: ${variant}\n` : "") +
        `    ${qtyPrice}`
      );
    })
    .join("\n");

  const itemsBlock =
    `ITEMS\n` +
    `----------------------------------------\n` +
    itemLines +
    `\n----------------------------------------`;

  const subtotal = `Subtotal      : ${padL("৳" + order.subtotal, 16)}`;
  const shipping = `Delivery Fee  : ${padL("৳" + order.shippingCost, 16)}`;
  const discount = order.discount > 0 ? `Discount      : ${padL("-৳" + order.discount, 16)}\n` : "";
  const total = `TOTAL PAYABLE : ${padL("৳" + order.total, 16)}`;

  const financialBlock =
    `PAYMENT BREAKDOWN\n` +
    subtotal + "\n" +
    shipping + "\n" +
    discount +
    `----------------------------------------\n` +
    total;

  const notesBlock = order.customerNotes
    ? `\n\nCUSTOMER NOTE:\n${order.customerNotes}`
    : "";

  return (
    `${header}\n\n` +
    `${orderInfo}\n\n` +
    `${customerBlock}\n\n` +
    `${itemsBlock}\n\n` +
    `${financialBlock}` +
    notesBlock +
    `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
  );
}
