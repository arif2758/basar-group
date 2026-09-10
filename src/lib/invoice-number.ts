import mongoose from "mongoose";
import { ChannelSource, CHANNEL_PREFIXES } from "@/types/order";

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence: { type: Number, default: 0 },
});

const Counter =
  mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

/**
 * Generates: [BRAND]-[CHANNEL]-[YYMMDD]-[SEQ]
 * Example: BG-WEB-260731-0001
 */
export async function generateInvoiceNumber(
  channelSource: ChannelSource = "web",
  brandCode: string = "BG"
): Promise<string> {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);

  const channelPrefix = CHANNEL_PREFIXES[channelSource] || "WEB";
  const counterKey = "global_invoice_seq";

  let counter = await Counter.findById(counterKey);

  if (!counter) {
    const Order = mongoose.models.Order;
    let lastSeq = 0;

    if (Order) {
      const latestOrder = await Order.findOne().sort({ createdAt: -1 });
      if (latestOrder && latestOrder.orderNumber) {
        const matches = latestOrder.orderNumber.match(/\d+$/);
        if (matches && matches[0]) {
          lastSeq = parseInt(matches[0], 10);
        }
      }
    }

    await Counter.create({ _id: counterKey, sequence: lastSeq });
  }

  counter = await Counter.findByIdAndUpdate(
    counterKey,
    { $inc: { sequence: 1 } },
    { returnDocument: 'after', upsert: true }
  );

  const seq = String(counter!.sequence).padStart(4, "0");

  return `${brandCode}-${channelPrefix}-${yy}${mm}${dd}-${seq}`;
}
