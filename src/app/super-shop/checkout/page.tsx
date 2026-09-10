import { auth } from "@/auth";
import { cookies } from "next/headers";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import { dbConnect } from "@/lib/db";
import { CheckoutForm } from "./CheckoutForm";
import { redirect } from "next/navigation";
import { PackageCheck } from "lucide-react";
import { IPopulatedCartItem, ICart } from "@/types/cart";
import { Document } from "mongoose";

type PopulatedCartDoc = Document &
  Omit<ICart, "items"> & { items: IPopulatedCartItem[] };

export const metadata = {
  title: "চেকআউট | বাসার সুপার শপ",
  description: "আপনার অর্ডার কনফার্ম করুন",
};

export default async function CheckoutPage() {
  await dbConnect();

  if (!Product) throw new Error("Product model missing");

  const session = await auth();
  const cookieStore = await cookies();
  const guestSessionId = cookieStore.get("cart_session_id")?.value;

  let cartDoc: PopulatedCartDoc | null = null;

  if (session?.user?.id) {
    cartDoc = (await Cart.findOne({ user: session.user.id })
      .populate("items.product")
      .lean()) as unknown as PopulatedCartDoc;
  } else if (guestSessionId) {
    cartDoc = (await Cart.findOne({ sessionId: guestSessionId })
      .populate("items.product")
      .lean()) as unknown as PopulatedCartDoc;
  }

  if (!cartDoc || !cartDoc.items || cartDoc.items.length === 0) {
    redirect("/super-shop/cart");
  }

  const items: IPopulatedCartItem[] = cartDoc.items.map((item) => {
    const product = item.product;
    const price = product.salePrice || product.regularPrice;
    return {
      ...item,
      subtotal: price * item.itemQuantity,
    };
  });

  const total = items.reduce(
    (sum: number, item: IPopulatedCartItem) => sum + item.subtotal,
    0,
  );

  const serializableItems = JSON.parse(JSON.stringify(items));

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 max-w-6xl mx-auto mb-6">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-[#e6f4ff] dark:bg-[#111a2c] border border-[#91caff]/60 dark:border-[#15325b]/60 flex items-center justify-center text-[#1677ff] dark:text-[#3c89e8]">
              <PackageCheck className="size-5.5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">চেকআউট</h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            আপনার পছন্দের পণ্যগুলো পেতে নিচের ডেলিভারি ও পেমেন্ট তথ্যগুলো পূরণ করুন।
          </p>
        </div>

        <CheckoutForm
          cart={{ items: serializableItems, total }}
          user={{
            name: session?.user?.name || null,
            email: session?.user?.email || null,
          }}
        />
      </div>
    </div>
  );
}
