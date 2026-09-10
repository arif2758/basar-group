import { redirect } from "next/navigation";

export default function MyOrdersRedirectPage() {
  redirect("/dashboard/shop/orders");
}
