// src\components\layout\Footer.tsx

import LinkNext from "next/link";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
  YouTubeIcon,
  TikTokIcon,
  DiscordIcon,
} from "@/socialCustomSVGIcon/SocialCustomSVGIcon";

const FOOTER_DATA = {
  shop: [
    { label: "সকল প্রোডাক্ট", href: "/super-shop/products" },
    { label: "অফারসমূহ", href: "/super-shop/products?sale=true" },
    { label: "নতুন কালেকশন", href: "/super-shop/products?sort=newest" },
    { label: "বেস্টসেলার", href: "/super-shop/products?sort=bestseller" },
  ],
  support: [
    { label: "অর্ডার ট্র্যাক করুন", href: "/super-shop/track-order" },
    { label: "যোগাযোগ করুন", href: "/super-shop/contact" },
    { label: "রিটার্ন পলিসি", href: "/super-shop/return-policy" },
    { label: "ডেলিভারি চার্জ", href: "/super-shop/shipping-info" },
  ],
  account: [
    { label: "আমার প্রোফাইল", href: "/dashboard" },
    { label: "অর্ডার হিস্টোরি", href: "/dashboard/shop/my-orders" },
    { label: "উইশলিস্ট", href: "/super-shop/wishlist" },
    { label: "লগইন", href: "/login" },
  ],
  socials: [
    {
      label: "Facebook",
      Icon: FacebookIcon,
      href: "https://www.facebook.com/gadgeterhub",
      brandColor: "#1877F2",
    },
    {
      label: "Instagram",
      Icon: InstagramIcon,
      href: "https://www.instagram.com/gadgeterhub/",
      brandColor: "#E4405F",
    },
    {
      label: "WhatsApp",
      Icon: WhatsAppIcon,
      href: "https://wa.me/8801568390014",
      brandColor: "#25D366",
    },
    {
      label: "Discord",
      Icon: DiscordIcon,
      href: "https://discord.gg/Fvyt5a4Y",
      brandColor: "#5865F2",
    },
    {
      label: "YouTube",
      Icon: YouTubeIcon,
      href: "https://www.youtube.com/@gadgeterhub",
      brandColor: "#FF0000",
    },
    
    {
      label: "TikTok",
      Icon: TikTokIcon,
      href: "https://www.tiktok.com/@gadgeterhub",
      brandColor: "#000000",
    },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] mt-20 transition-colors duration-200">
      <div className="container sm:max-w-6xl sm:mx-auto px-4 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand & Dynamic Socials */}
          <div className="col-span-2 lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <LinkNext href="/super-shop" className="inline-block group">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                  BASAR Super Shop
                </span>
              </LinkNext>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                কোয়ালিটি ও বিশ্বস্ততার মেলবন্ধন। আপনার দৈনন্দিন নিত্যপ্রয়োজনীয় সকল পণ্য সহজ ও দ্রুত ডেলিভারিতে পৌঁছে দিতে আমরা প্রতিশ্রুতিবদ্ধ।
              </p>
            </div>

            {/* Social Icons Container */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-2">
                {FOOTER_DATA.socials.map(
                  ({ label, Icon, href, brandColor }) => (
                    <LinkNext
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="group/icon flex size-10 items-center justify-center rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#1f1f1f] hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 shadow-xs relative overflow-hidden"
                      style={
                        {
                          "--brand-color": brandColor,
                        } as React.CSSProperties
                      }
                    >
                      {/* Background Layer */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover/icon:opacity-10 transition-opacity duration-300"
                        style={{ backgroundColor: brandColor }}
                      />

                      {/* Icon */}
                      <div
                        className="relative z-10 transition-colors duration-300"
                        style={{
                          color: `var(--brand-color)`,
                        }}
                      >
                        <Icon className="size-5" />
                      </div>
                    </LinkNext>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Quick Links Group */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_DATA.shop.map((link) => (
                <li key={link.href}>
                  <LinkNext
                    href={link.href}
                    className="text-[13px] text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="size-1 rounded-full bg-blue-600 dark:bg-blue-400 scale-0 group-hover:scale-100 transition-transform" />
                    {link.label}
                  </LinkNext>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white">
              Support
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_DATA.support.map((link) => (
                <li key={link.href}>
                  <LinkNext
                    href={link.href}
                    className="text-[13px] text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="size-1 rounded-full bg-blue-600 dark:bg-blue-400 scale-0 group-hover:scale-100 transition-transform" />
                    {link.label}
                  </LinkNext>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white">
              Account
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_DATA.account.map((link) => (
                <li key={link.href}>
                  <LinkNext
                    href={link.href}
                    className="text-[13px] text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="size-1 rounded-full bg-blue-600 dark:bg-blue-400 scale-0 group-hover:scale-100 transition-transform" />
                    {link.label}
                  </LinkNext>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 💳 Trust Badges & Payment */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-[#303030] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Payment Partners
            </p>
            <div className="flex items-center gap-5 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="relative w-[45px] h-[25px]">
                <Image
                  src="/payment-method-logo/bkash.svg"
                  alt="bkash"
                  fill
                  className="object-contain"
                  sizes="45px"
                />
              </div>
              <div className="relative w-[45px] h-[25px]">
                <Image
                  src="/payment-method-logo/nagad.svg"
                  alt="nagad"
                  fill
                  className="object-contain"
                  sizes="45px"
                />
              </div>
              <div className="relative w-[45px] h-[25px]">
                <Image
                  src="/payment-method-logo/rocket.png"
                  alt="rocket"
                  fill
                  className="object-contain"
                  sizes="45px"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Certified Secure
              </p>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-300 text-[10px] font-bold border border-slate-200 dark:border-[#303030]">
                  SSL SECURED
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-300 text-[10px] font-bold border border-slate-200 dark:border-[#303030]">
                  100% ORIGINAL
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-[#303030] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          <p className="text-center">
            © {new Date().getFullYear()}{" "}
            Basar Group Super Shop. All rights reserved.
          </p>
          <div className="flex gap-8">
            <LinkNext
              href="/super-shop/privacy"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy
            </LinkNext>
            <LinkNext
              href="/super-shop/terms"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Terms
            </LinkNext>
          </div>
        </div>
      </div>
    </footer>
  );
}
