import React from "react";
import AdminLayoutClient from "./AdminLayoutClient";

export const metadata = {
  title: "অ্যাডমিন প্যানেল | BASAR Group",
  description: "বাছার গ্রুপ সেন্ট্রাল অ্যাডমিন কন্ট্রোল প্যানেল",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
