// src/components/granthagar/WhatsAppBorrowButton.tsx
"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { IBook } from "@/data/granthagar/types";

interface WhatsAppBorrowButtonProps {
  book: IBook;
  quantity?: number;
}

function WhatsAppSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="size-[22px] fill-white shrink-0"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppBorrowButton({
  book,
  quantity = 1,
}: WhatsAppBorrowButtonProps) {
  // Library admin WhatsApp contact
  const phoneNumber = "8801568390014";

  const message =
    `*বাছার গ্রন্থাগার — বই ধার নেওয়ার রিকোয়েস্ট* 📖\n\n` +
    `📚 বইয়ের নাম: ${book.title}\n` +
    `✍️ লেখক: ${book.author}\n` +
    `🔢 কপি সংখ্যা: ${quantity} Copy\n` +
    `📍 ক্যাটাগরি: ${book.categoryName || book.category}\n\n` +
    `আমি বাছার গ্রন্থাগার থেকে এই বইটি পড়ার জন্য ধার নিতে চাই। বইটি সংগ্রহের উপায় ও সময় জানালে উপকৃত হতাম।`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex w-full items-center gap-3 h-14 px-4 rounded-2xl overflow-hidden text-white select-none
                 transition-all duration-300
                 hover:scale-[1.01] hover:-translate-y-px
                 active:scale-[0.98] active:translate-y-0 shadow-md"
      style={{
        background:
          "linear-gradient(135deg, #064e3b 0%, #065f46 25%, #047857 60%, #059669 100%)",
        boxShadow:
          "0 4px 20px rgba(5,150,105,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
      }}
    >
      {/* Shimmer sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
        }}
      />

      {/* WhatsApp Icon */}
      <span
        className="relative flex items-center justify-center size-10 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.15)",
          border: "1.5px solid rgba(255,255,255,0.3)",
        }}
      >
        <WhatsAppSVG />
      </span>

      {/* Center text */}
      <div className="relative flex-1 min-w-0">
        <p className="text-xs sm:text-[13px] font-bold leading-tight tracking-tight truncate">
          WhatsApp এ বই রিকোয়েস্ট করুন
        </p>
        <p className="text-[10px] mt-0.5 font-medium text-white/75 truncate">
          সরাসরি লাইব্রেরিয়ানের সাথে যোগাযোগ
        </p>
      </div>

      {/* Right Action: Clean message arrow like Super Shop */}
      <div
        className="relative flex items-center gap-1 shrink-0 px-2.5 py-1.5 rounded-xl transition-all duration-300 group-hover:bg-white/20"
        style={{
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <span className="text-[11px] font-bold hidden xs:inline">
          মেসেজ দিন
        </span>
        <ArrowRight className="size-3.5 opacity-90 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}
