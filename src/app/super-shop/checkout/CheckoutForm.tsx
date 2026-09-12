"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/actions/order";
import {
  calculateShippingCost,
  getWeightTierLabel,
  DeliveryZone,
} from "@/lib/shipping";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Loader2,
  ShieldCheck,
  Truck,
  ArrowRight,
  Check,
  PackageCheck,
  User,
  CreditCard,
  Copy,
} from "lucide-react";
import { formatPrice } from "@/lib/priceUtils";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { IPopulatedCartItem } from "@/types/cart";
import Link from "next/link";

const CheckoutSchema = z
  .object({
    name: z.string().min(3, "নাম কমপক্ষে ৩ অক্ষর হওয়া উচিত"),
    phone: z.string().regex(/^01[3-9]\d{8}$/, "সঠিক ফোন নম্বর দিন"),
    isGift: z.boolean().optional(),
    receiverName: z.string().optional(),
    receiverPhone: z.string().optional(),
    addressLine1: z.string().min(5, "বিস্তারিত ঠিকানা দিন"),
    deliveryArea: z.enum(["dhaka", "suburbs", "outside"] as const),
    paymentMethod: z.enum(["cod", "mobile"] as const),
    paymentProvider: z.enum(["bkash", "nagad", "rocket"] as const).optional(),
    senderNumber: z.string().optional(),
    transactionId: z.string().optional(),
    customerNotes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "mobile") {
        return (
          !!data.paymentProvider && !!data.senderNumber && !!data.transactionId
        );
      }
      return true;
    },
    {
      message: "মোবাইল পেমেন্টের জন্য সব তথ্য দিন",
      path: ["transactionId"],
    },
  );

type CheckoutValues = z.infer<typeof CheckoutSchema>;

interface CheckoutFormProps {
  cart: {
    items: IPopulatedCartItem[];
    total: number;
  };
  user?: {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
  };
}

const PAYMENT_ACCOUNTS = {
  bkash: {
    name: "bKash",
    number: "01742413416",
    logo: "/payment-method-logo/bkash.svg",
    color: "text-[#D12053]",
    bg: "bg-[#fef0f3] dark:bg-[#3d0a14]",
    border: "border-[#f9a8bb] dark:border-[#6b1628]",
  },
  nagad: {
    name: "Nagad",
    number: "01742413416",
    logo: "/payment-method-logo/nagad.svg",
    color: "text-[#EF4136]",
    bg: "bg-[#fef3f1] dark:bg-[#3d1008]",
    border: "border-[#fbb3a9] dark:border-[#6b1c0e]",
  },
  rocket: {
    name: "Rocket",
    number: "01742413416",
    logo: "/payment-method-logo/rocket.png",
    color: "text-[#8C3494]",
    bg: "bg-[#f8f0fa] dark:bg-[#2d0e36]",
    border: "border-[#d5a8e0] dark:border-[#53185e]",
  },
} as const;

type ProviderKey = keyof typeof PAYMENT_ACCOUNTS;

export function CheckoutForm({ cart, user }: CheckoutFormProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      isGift: false,
      receiverName: "",
      receiverPhone: "",
      deliveryArea: "dhaka",
      paymentMethod: "cod",
      paymentProvider: "bkash",
    },
  });

  // Restore saved data
  useEffect(() => {
    const savedData = sessionStorage.getItem("checkout_form_data");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        Object.keys(parsed).forEach((key) => {
          setValue(key as keyof CheckoutValues, parsed[key]);
        });
        toast.success("আপনার আগের তথ্যগুলো রিস্টোর করা হয়েছে।");
      } catch (e) {
        console.error("Failed to restore checkout data", e);
      } finally {
        sessionStorage.removeItem("checkout_form_data");
      }
    }
  }, [setValue]);

  const isGift = useWatch({ control, name: "isGift" });
  const deliveryArea = useWatch({ control, name: "deliveryArea" });
  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const paymentProvider = useWatch({
    control,
    name: "paymentProvider",
  }) as ProviderKey;

  // Total cart weight
  const totalWeightGrams = cart.items.reduce((sum, item) => {
    const w = (item.product as { weight?: number })?.weight || 500;
    return sum + w * item.itemQuantity;
  }, 0);

  // Delivery Charge Calculation
  const deliveryCharge = calculateShippingCost(
    deliveryArea as DeliveryZone,
    totalWeightGrams,
  );
  const grandTotal = cart.total + deliveryCharge;

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (data: CheckoutValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      (Object.keys(data) as Array<keyof CheckoutValues>).forEach((key) => {
        const value = data[key];
        if (typeof value === "boolean") {
          if (value) formData.append(key, "true");
        } else if (value !== undefined && value !== null && value !== "") {
          formData.append(key, String(value));
        }
      });

      const result = await createOrder(formData);
      if (result && "orderNumber" in result) {
        queryClient.invalidateQueries({ queryKey: ["cart-count"] });
        queryClient.invalidateQueries({ queryKey: ["cart-details"] });
        router.push(`/super-shop/checkout/success?order=${result.orderNumber}`);
      } else if (result && result.error) {
        toast.error(typeof result.error === "string" ? result.error : "কিছু ভুল হয়েছে, দয়া করে আবার চেষ্টা করুন।");
      }
    } catch {
      toast.error("কিছু ভুল হয়েছে।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-2">
      {!session && (
        <div className="mb-6 p-4 sm:p-4.5 bg-[#e6f4ff]/50 dark:bg-[#111a2c]/60 border border-[#91caff]/60 dark:border-[#15325b]/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">অর্ডারটি দ্রুত করতে চান?</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Google দিয়ে লগিন করলে আপনার নাম ও ইমেইল অটো-ফিলাপ হয়ে যাবে।
            </p>
          </div>
          <Link href={`/login?callbackUrl=${encodeURIComponent("/super-shop/checkout")}`}>
            <Button
              type="button"
              variant="outline"
              className="shrink-0 gap-2 font-bold text-xs sm:text-sm bg-white dark:bg-[#1f1f1f] text-[#1677ff] dark:text-[#3c89e8] border-[#91caff] dark:border-[#15325b] hover:bg-[#e6f4ff] dark:hover:bg-[#111a2c] shadow-xs cursor-pointer"
            >
              <User className="size-4" />
              লগিন করুন
            </Button>
          </Link>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid lg:grid-cols-12 gap-6 lg:gap-8"
      >
        {/* Left Side: Information */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-7">
          {/* Section 1: Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-[#e6f4ff] dark:bg-[#111a2c] border border-[#91caff]/60 dark:border-[#15325b]/60 flex items-center justify-center text-[#1677ff] dark:text-[#3c89e8]">
                <User className="size-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                কন্টাক্ট ইনফরমেশন
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 bg-white dark:bg-[#1f1f1f] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 ml-0.5">
                  নাম
                </Label>
                <Input
                  {...register("name")}
                  placeholder="আপনার পুরো নাম"
                  className="h-11 rounded-xl bg-slate-50 dark:bg-[#141414] border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#141414] focus:border-[#1677ff] dark:focus:border-[#1668dc] focus:ring-2 focus:ring-[#1677ff]/15 text-sm"
                />
                {errors.name && (
                  <p className="text-xs text-[#cf1322] dark:text-[#ff7875] font-semibold mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 ml-0.5">
                  আপনার মোবাইল নম্বর (অর্ডার কনফার্ম করার জন্য)
                </Label>
                <Input
                  {...register("phone")}
                  placeholder="01XXXXXXXXX"
                  className="h-11 rounded-xl bg-slate-50 dark:bg-[#141414] border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#141414] focus:border-[#1677ff] dark:focus:border-[#1668dc] focus:ring-2 focus:ring-[#1677ff]/15 text-sm"
                />
                {errors.phone && (
                  <p className="text-xs text-[#cf1322] dark:text-[#ff7875] font-semibold mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 p-3.5 border border-slate-200 dark:border-[#303030] rounded-xl cursor-pointer bg-slate-50/70 dark:bg-[#141414]/70 hover:bg-[#e6f4ff]/30 dark:hover:bg-[#111a2c]/40 transition-colors">
                  <input
                    type="checkbox"
                    {...register("isGift")}
                    className="size-4.5 rounded border-slate-300 dark:border-slate-600 text-[#1677ff] focus:ring-[#1677ff] cursor-pointer"
                  />
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                      পার্সেলটি অন্য কেউ রিসিভ করবেন?
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      ডেলিভারি রিসিভারের নাম ও নম্বর আলাদা দিন
                    </p>
                  </div>
                </label>
              </div>
              {isGift && (
                <>
                  <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 ml-0.5">
                      রিসিভারের নাম
                    </Label>
                    <Input
                      {...register("receiverName")}
                      placeholder="যিনি পার্সেল রিসিভ করবেন"
                      className="h-11 rounded-xl bg-slate-50 dark:bg-[#141414] border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#141414] focus:border-[#1677ff] dark:focus:border-[#1668dc] focus:ring-2 focus:ring-[#1677ff]/15 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 ml-0.5">
                      রিসিভারের মোবাইল নম্বর
                    </Label>
                    <Input
                      {...register("receiverPhone")}
                      placeholder="ডেলিভারিম্যান এই নাম্বারে কল করবে"
                      className="h-11 rounded-xl bg-slate-50 dark:bg-[#141414] border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#141414] focus:border-[#1677ff] dark:focus:border-[#1668dc] focus:ring-2 focus:ring-[#1677ff]/15 text-sm"
                    />
                  </div>
                </>
              )}
              <div className="md:col-span-2 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 ml-0.5">
                    বিস্তারিত ঠিকানা (Full Address)
                  </Label>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    (গ্রাম/এরিয়া, থানা, জেলা)
                  </span>
                </div>
                <Textarea
                  {...register("addressLine1")}
                  placeholder="গ্রাম/এরিয়া, থানা, জেলা..."
                  className="min-h-22 rounded-xl bg-slate-50 dark:bg-[#141414] border-slate-200 dark:border-[#303030] resize-none text-sm p-3.5 leading-relaxed text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#141414] focus:border-[#1677ff] dark:focus:border-[#1668dc] focus:ring-2 focus:ring-[#1677ff]/15"
                />
                {errors.addressLine1 ? (
                  <p className="text-xs text-[#cf1322] dark:text-[#ff7875] font-semibold mt-1">
                    {errors.addressLine1.message}
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 ml-0.5">
                    দয়া করে আপনার পূর্ণাঙ্গ ঠিকানা দিন যাতে ডেলিভারিম্যান সহজেই পার্সেল পৌঁছাতে পারে।
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-[#e6f4ff] dark:bg-[#111a2c] border border-[#91caff]/60 dark:border-[#15325b]/60 flex items-center justify-center text-[#1677ff] dark:text-[#3c89e8] shrink-0">
                  <Truck className="size-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  ডেলিভারি এরিয়া
                </h2>
              </div>
              <div className="bg-[#f6ffed] dark:bg-[#162312] border border-[#b7eb8f] dark:border-[#274916] text-[#389e0d] dark:text-[#49aa19] px-2.5 py-1 rounded-full text-xs font-bold shrink-0">
                <span>ওজন: {totalWeightGrams}g ({getWeightTierLabel(totalWeightGrams)})</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
              {[
                {
                  id: "dhaka" as const,
                  label: "ঢাকার ভেতর (ISD)",
                  sub: "Inside Dhaka City",
                  price: calculateShippingCost("dhaka", totalWeightGrams),
                },
                {
                  id: "suburbs" as const,
                  label: "উপ-শহর (SUB)",
                  sub: "গাজীপুর, সাভার, নারায়নগঞ্জ, কেরানীগঞ্জ",
                  price: calculateShippingCost("suburbs", totalWeightGrams),
                },
                {
                  id: "outside" as const,
                  label: "ঢাকার বাইরে (OSD)",
                  sub: "Outside Dhaka (All Districts)",
                  price: calculateShippingCost("outside", totalWeightGrams),
                },
              ].map((area) => {
                const isSelected = deliveryArea === area.id;
                return (
                  <div
                    key={area.id}
                    onClick={() => setValue("deliveryArea", area.id)}
                    className={cn(
                      "relative flex flex-col justify-between p-4 rounded-xl transition-all cursor-pointer overflow-hidden",
                      isSelected
                        ? "border-2 border-[#1677ff] dark:border-[#1668dc] bg-[#e6f4ff]/50 dark:bg-[#111a2c]/80 shadow-[0_2px_8px_rgba(22,119,255,0.12)]"
                        : "border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] hover:border-[#91caff] dark:hover:border-[#15325b] hover:bg-[#e6f4ff]/20 dark:hover:bg-[#111a2c]/20 shadow-xs",
                    )}
                  >
                    {/* Top right checkmark badge */}
                    {isSelected && (
                      <div className="absolute top-0 right-0 bg-[#1677ff] dark:bg-[#1668dc] text-white px-1.5 py-0.5 rounded-bl-lg shadow-xs flex items-center justify-center animate-in fade-in zoom-in duration-200">
                        <Check className="size-3.5 stroke-[3.5]" />
                      </div>
                    )}

                    {/* Header with Ant Design filled radio */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={cn(
                            "size-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                            isSelected
                              ? "border-[#1677ff] dark:border-[#1668dc] bg-white dark:bg-[#141414]"
                              : "border-slate-300 dark:border-slate-600 bg-transparent",
                          )}
                        >
                          {isSelected && (
                            <div className="size-2.5 rounded-full bg-[#1677ff] dark:bg-[#1668dc] transition-all" />
                          )}
                        </div>
                        <p className={cn(
                          "text-sm leading-tight truncate",
                          isSelected ? "font-bold text-[#1677ff] dark:text-[#3c89e8]" : "font-semibold text-slate-800 dark:text-slate-200"
                        )}>
                          {area.label}
                        </p>
                      </div>
                      <span className={cn(
                        "text-base shrink-0 font-black",
                        isSelected ? "text-[#1677ff] dark:text-[#3c89e8]" : "text-slate-700 dark:text-slate-300"
                      )}>
                        ৳{area.price}
                      </span>
                    </div>

                    {/* Subtitle */}
                    <div className={cn(
                      "mt-3 pt-2.5 text-[11px] leading-snug text-center border-t",
                      isSelected
                        ? "border-[#91caff]/40 dark:border-[#15325b]/60 text-slate-700 dark:text-slate-300 font-medium"
                        : "border-slate-100 dark:border-[#303030] text-slate-500 dark:text-slate-400"
                    )}>
                      {area.sub}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Payment */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-[#262626] pb-3">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#1677ff] text-white text-xs font-bold">
                3
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  পেমেন্ট পদ্ধতি
                </h2>
                <p className="text-[11px] text-slate-500">
                  আপনার সুবিধাজনক পেমেন্ট মেথড নির্বাচন করুন
                </p>
              </div>
            </div>

            <div className="grid gap-2.5">
              {/* COD */}
              <div
                onClick={() => setValue("paymentMethod", "cod")}
                className={cn(
                  "relative flex items-center justify-between px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-xl border transition-all cursor-pointer overflow-hidden",
                  paymentMethod === "cod"
                    ? "border-2 border-[#1677ff] bg-blue-50/40 dark:bg-blue-950/20 shadow-xs"
                    : "border-slate-200 dark:border-[#303030] bg-slate-50/40 dark:bg-[#191919] hover:border-slate-300"
                )}
              >
                {paymentMethod === "cod" && (
                  <div className="absolute top-0 right-0 bg-[#1677ff] text-white px-1.5 py-0.5 rounded-bl-lg flex items-center justify-center">
                    <Check className="size-3 stroke-[3]" />
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "size-5 rounded-full border-2 flex items-center justify-center shrink-0",
                      paymentMethod === "cod"
                        ? "border-[#1677ff] bg-white dark:bg-[#141414]"
                        : "border-slate-300 dark:border-slate-600"
                    )}
                  >
                    {paymentMethod === "cod" && (
                      <div className="size-2.5 rounded-full bg-[#1677ff]" />
                    )}
                  </div>
                  <div className="leading-tight">
                    <p
                      className={cn(
                        "text-xs sm:text-sm font-bold",
                        paymentMethod === "cod"
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-800 dark:text-slate-200"
                      )}
                    >
                      ক্যাশ অন ডেলিভারি (COD)
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      পণ্য হাতে পেয়ে টাকা দিন
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Banking */}
              <div
                onClick={() => setValue("paymentMethod", "mobile")}
                className={cn(
                  "relative flex items-center justify-between px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-xl border transition-all cursor-pointer overflow-hidden group",
                  paymentMethod === "mobile"
                    ? "border-2 border-[#1677ff] bg-blue-50/40 dark:bg-blue-950/20 shadow-xs"
                    : "border-slate-200 dark:border-[#303030] bg-slate-50/40 dark:bg-[#191919] hover:border-slate-300"
                )}
              >
                {paymentMethod === "mobile" && (
                  <div className="absolute top-0 right-0 bg-[#1677ff] text-white px-1.5 py-0.5 rounded-bl-lg flex items-center justify-center z-10">
                    <Check className="size-3 stroke-[3]" />
                  </div>
                )}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={cn(
                      "size-5 rounded-full border-2 flex items-center justify-center shrink-0",
                      paymentMethod === "mobile"
                        ? "border-[#1677ff] bg-white dark:bg-[#141414]"
                        : "border-slate-300 dark:border-slate-600"
                    )}
                  >
                    {paymentMethod === "mobile" && (
                      <div className="size-2.5 rounded-full bg-[#1677ff]" />
                    )}
                  </div>
                  <div className="leading-tight min-w-0">
                    <p
                      className={cn(
                        "text-xs sm:text-sm font-bold",
                        paymentMethod === "mobile"
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-800 dark:text-slate-200"
                      )}
                    >
                      মোবাইল ব্যাংকিং
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                      বিকাশ, নগদ বা রকেটে অগ্রিম পেমেন্ট
                    </p>
                  </div>
                </div>

                {/* Overlapping Logos on the right */}
                <div className="flex items-center -space-x-1.5 shrink-0 pl-2">
                  {(["bkash", "nagad", "rocket"] as const).map((p, i) => (
                    <div
                      key={p}
                      className="size-7 rounded-full bg-white dark:bg-[#262626] border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center p-1 transition-transform group-hover:scale-105"
                      style={{ zIndex: 30 - i * 10, position: "relative" }}
                    >
                      <Image
                        src={PAYMENT_ACCOUNTS[p].logo}
                        alt={PAYMENT_ACCOUNTS[p].name}
                        width={18}
                        height={18}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Banking Details */}
            {paymentMethod === "mobile" && (
              <div className="space-y-3.5 pt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Provider selector */}
                <div className="grid grid-cols-3 gap-2 w-full">
                  {(["bkash", "nagad", "rocket"] as const).map((p) => {
                    const acc = PAYMENT_ACCOUNTS[p];
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setValue("paymentProvider", p)}
                        className={cn(
                          "py-2 px-1.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs w-full",
                          paymentProvider === p
                            ? `${acc.bg} ${acc.border} ${acc.color} ring-1 ring-current/30`
                            : "bg-white dark:bg-[#1f1f1f] border-slate-200 dark:border-[#303030] text-slate-600 dark:text-slate-300 hover:border-slate-300"
                        )}
                      >
                        <Image
                          src={acc.logo}
                          alt={acc.name}
                          width={16}
                          height={16}
                          className="object-contain shrink-0"
                        />
                        <span className="truncate">{acc.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Account number with copy */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {PAYMENT_ACCOUNTS[paymentProvider || "bkash"].name} নম্বর (Send Money)
                    </p>
                    <p
                      className={cn(
                        "text-base sm:text-lg font-black font-mono mt-0.5",
                        PAYMENT_ACCOUNTS[paymentProvider || "bkash"].color
                      )}
                    >
                      {PAYMENT_ACCOUNTS[paymentProvider || "bkash"].number}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      পরিমাণ: ৳{grandTotal}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(PAYMENT_ACCOUNTS[paymentProvider || "bkash"].number)
                    }
                    className="shrink-0 p-2 rounded-lg bg-white dark:bg-[#262626] border border-slate-200 dark:border-[#303030] hover:bg-slate-100 dark:hover:bg-[#303030] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <Check className="size-4 text-emerald-500" />
                    ) : (
                      <Copy className="size-4 text-slate-500" />
                    )}
                  </button>
                </div>

                {/* Sender + TrxID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 ml-0.5">
                      আপনার মোবাইল নম্বর *
                    </Label>
                    <Input
                      {...register("senderNumber")}
                      placeholder="01XXXXXXXXX"
                      className="h-11 rounded-xl bg-slate-50 dark:bg-[#141414] border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#141414] focus:border-[#1677ff] dark:focus:border-[#1668dc] focus:ring-2 focus:ring-[#1677ff]/15 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 ml-0.5">
                      Transaction ID (TrxID) *
                    </Label>
                    <Input
                      {...register("transactionId")}
                      placeholder="উদা: 8N7X2W..."
                      className="h-11 rounded-xl bg-slate-50 dark:bg-[#141414] border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#141414] focus:border-[#1677ff] dark:focus:border-[#1668dc] focus:ring-2 focus:ring-[#1677ff]/15 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Customer Notes */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-[#262626]">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 ml-0.5">
                অতিরিক্ত নোট <span className="normal-case font-normal text-slate-400">(ঐচ্ছিক)</span>
              </Label>
              <Textarea
                {...register("customerNotes")}
                placeholder="ডেলিভারি সম্পর্কে বিশেষ কোনো নির্দেশনা..."
                className="min-h-20 rounded-xl bg-slate-50 dark:bg-[#141414] border-slate-200 dark:border-[#303030] resize-none text-sm p-3.5 leading-relaxed text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#141414] focus:border-[#1677ff] dark:focus:border-[#1668dc] focus:ring-2 focus:ring-[#1677ff]/15"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-24 rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-[#303030] pb-3.5">
              <div className="size-8 rounded-lg bg-[#e6f4ff] dark:bg-[#111a2c] border border-[#91caff]/60 dark:border-[#15325b]/60 flex items-center justify-center text-[#1677ff] dark:text-[#3c89e8]">
                <PackageCheck className="size-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                অর্ডার সামারি
              </h2>
            </div>

            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
              {cart.items.map((item) => (
                <div
                  key={`${item.product._id}-${item.color || ''}-${item.size || ''}`}
                  className="flex gap-3.5 items-center"
                >
                  <div className="relative size-13 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] aspect-square">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      fill
                      sizes="52px"
                      className="object-cover"
                    />
                    <span className="absolute top-0 right-0 bg-[#1677ff] dark:bg-[#1668dc] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-bl-md">
                      ×{item.itemQuantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold leading-snug line-clamp-1 text-slate-900 dark:text-white">
                      {item.product.title}
                    </h4>
                    {(item.color || item.size) && (
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {[item.color && `কালার: ${item.color}`, item.size && `সাইজ: ${item.size}`].filter(Boolean).join(" | ")}
                      </p>
                    )}
                    <p className="text-xs font-bold text-[#1677ff] dark:text-[#3c89e8] mt-0.5">
                      {formatPrice(item.product.salePrice || item.product.regularPrice)}
                    </p>
                  </div>
                  <p className="text-xs font-black text-slate-900 dark:text-white shrink-0">
                    {formatPrice(item.subtotal)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-[#262626] text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                <span>সাবটোটাল</span>
                <span className="text-slate-900 dark:text-white font-bold">
                  {formatPrice(cart.total)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                <span>ডেলিভারি চার্জ</span>
                <span className="text-[#1677ff] dark:text-[#3c89e8] font-bold">
                  + {formatPrice(deliveryCharge)}
                </span>
              </div>
              <div className="border-t border-slate-200 dark:border-[#262626] pt-3 flex justify-between items-baseline">
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  সর্বমোট
                </span>
                <span className="text-2xl font-black text-[#cf1322] dark:text-[#ff7875]">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full h-13 rounded-xl text-base font-bold tracking-tight text-white bg-[#1677ff] hover:bg-[#4096ff] active:bg-[#0958d9] dark:bg-[#1668dc] dark:hover:bg-[#3c89e8] dark:active:bg-[#1554ad] shadow-[0_4px_14px_0_rgba(22,119,255,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin size-5" />
              ) : (
                <div className="flex items-center gap-2">
                  <span>অর্ডার কনফার্ম করুন</span>
                  <ArrowRight className="size-4.5" />
                </div>
              )}
            </Button>

            <div className="pt-2 border-t border-slate-100 dark:border-[#303030] grid grid-cols-2 gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#52c41a] shrink-0" />
                <span>নিরাপদ চেকআউট</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="size-4 text-[#1677ff] shrink-0" />
                <span>দ্রুত ডেলিভারি</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
