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

export function buildBookBorrowInvoiceText(borrow: any): string {
  const dateStr = new Date(borrow.createdAt || new Date()).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const returnDateStr = borrow.expectedReturnDate
    ? new Date(borrow.expectedReturnDate).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : `${borrow.durationDays || 3} Days`;

  const totalBooks = (borrow.items || []).reduce(
    (sum: number, item: any) => sum + (Number(item.quantity) || 1),
    0
  );

  const deliveryMethodLabel =
    borrow.deliveryMethod === "self_pickup"
      ? "পাঠক নিজে এসে নিয়ে যাবে (Self-Pickup)"
      : "স্ট্যান্ডার্ড ডেলিভারি (Standard Delivery)";

  const paymentLabel =
    (borrow.deliveryFee || 0) <= 0
      ? "বিনামূল্যে / Free"
      : borrow.paymentMethod === "cod"
      ? "ক্যাশ অন ডেলিভারি (COD)"
      : `${borrow.paymentProvider?.toUpperCase() || "MOBILE"} (${(borrow.paymentStatus || "PENDING").toUpperCase()})`;

  const header =
    `          BASAR GRANTHAGAR\n` +
    `         বাছার গ্রুপ সমাজকল্যাণ\n` +
    `        শ্রীনগর, মুন্সীগঞ্জ, বাংলাদেশ\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  const borrowInfo =
    `BORROW REQUEST INFO\n` +
    `Borrow Code   : ${borrow.borrowCode}\n` +
    `Placed At     : ${dateStr}\n` +
    `Duration      : ${borrow.durationDays} Days (ফেরত: ${returnDateStr})\n` +
    `Delivery Method: ${deliveryMethodLabel}\n` +
    `Payment Method: ${paymentLabel}\n` +
    `Total Titles  : ${borrow.items?.length || 0}\n` +
    `Total Quantity: ${totalBooks}`;

  const recipientName = borrow.shippingAddress?.recipientName || borrow.user?.name || "N/A";
  const recipientPhone = borrow.shippingAddress?.phone || borrow.user?.phone || "N/A";
  const recipientAddress = borrow.shippingAddress?.fullAddress || "কাউন্টার থেকে সংগ্রহ (Self-Pickup)";

  const readerBlock =
    `READER & SHIPPING INFO\n` +
    `Name          : ${recipientName}\n` +
    `Phone         : ${recipientPhone}\n` +
    `Address       : ${recipientAddress}`;

  const itemLines = (borrow.items || [])
    .map((item: any, index: number) => {
      const num = String(index + 1).padStart(2, " ");
      const title = (item.title || "Unknown Book").slice(0, 30);
      const author = item.author ? `    Author: ${item.author}\n` : "";
      const qty = `    Quantity: ${item.quantity || 1} কপি (ধার ফি: ৳0)`;
      return `${num}. ${title}\n${author}${qty}`;
    })
    .join("\n");

  const itemsBlock =
    `BORROWED BOOKS\n` +
    `----------------------------------------\n` +
    itemLines +
    `\n----------------------------------------`;

  const serviceFee = `Book Service  : ${padL("বিনামূল্যে (৳0)", 16)}`;
  const shippingFee = `Delivery Fee  : ${padL(borrow.deliveryFee > 0 ? "৳" + borrow.deliveryFee : "বিনামূল্যে (৳0)", 16)}`;
  const total = `TOTAL PAYABLE : ${padL("৳" + (borrow.totalAmount || borrow.deliveryFee || 0), 16)}`;

  const mobilePaymentLines =
    borrow.paymentMethod === "mobile" && borrow.senderNumber
      ? `\nSender Number : ${borrow.senderNumber}\nTrxID         : ${borrow.transactionId || "N/A"}`
      : "";

  const financialBlock =
    `PAYMENT BREAKDOWN\n` +
    serviceFee + "\n" +
    shippingFee + "\n" +
    `----------------------------------------\n` +
    total +
    mobilePaymentLines;

  const notesBlock = borrow.shippingAddress?.notes
    ? `\n\nREADER NOTE:\n${borrow.shippingAddress.notes}`
    : "";

  return (
    `${header}\n\n` +
    `${borrowInfo}\n\n` +
    `${readerBlock}\n\n` +
    `${itemsBlock}\n\n` +
    `${financialBlock}` +
    notesBlock +
    `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
  );
}
