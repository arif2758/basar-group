// src/lib/granthagar/borrow-code.ts
import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence: { type: Number, default: 0 },
});

const Counter =
  mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

/**
 * Generates Library Borrow Order ID:
 * Format: BG-LIB-[YYMMDD]-[SEQ]
 * Example: BG-LIB-260912-0001
 */
export async function generateBorrowCode(): Promise<string> {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);

  const counterKey = "library_borrow_seq";

  let counter = await Counter.findById(counterKey);

  if (!counter) {
    const BookBorrow = mongoose.models.BookBorrow;
    let lastSeq = 0;

    if (BookBorrow) {
      const latestBorrow = await BookBorrow.findOne().sort({ createdAt: -1 });
      if (latestBorrow && latestBorrow.borrowCode) {
        const matches = latestBorrow.borrowCode.match(/\d+$/);
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
    { returnDocument: "after", upsert: true }
  );

  const seq = String(counter!.sequence).padStart(4, "0");

  return `BG-LIB-${yy}${mm}${dd}-${seq}`;
}
