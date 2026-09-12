// src/app/granthagar/checkout/page.tsx
import { auth } from "@/auth";
import CheckoutPageClient from "./CheckoutPageClient";

export const metadata = {
  title: "চেকআউট | বাছার গ্রন্থাগার",
  description: "বই ধার নেওয়ার আবেদন সম্পন্ন করুন",
};

export default async function BookCheckoutPage() {
  const session = await auth();

  const user = session?.user
    ? {
        name: (session.user as any).fullname || session.user.name || null,
        email: session.user.email || null,
        phone: (session.user as any).mobile || (session.user as any).phone || null,
        id: session.user.id || null,
      }
    : null;

  return <CheckoutPageClient user={user} />;
}
