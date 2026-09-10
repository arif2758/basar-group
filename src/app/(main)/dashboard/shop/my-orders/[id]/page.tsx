import { redirect } from "next/navigation";

export default async function MyOrderDetailsRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/dashboard/shop/orders/${id}`);
}
