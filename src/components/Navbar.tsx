"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Menu, Drawer, Button, Typography, Switch } from "antd";
import type { MenuProps } from "antd";
import {
  BookOutlined,
  FileTextOutlined,
  BookFilled,
  UserOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  SearchOutlined,
  BuildOutlined,
  AimOutlined,
  RiseOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  TrophyOutlined,
  ShopOutlined,
  ShoppingOutlined,
  MessageOutlined,
  LaptopOutlined,
  BulbOutlined,
  CarryOutOutlined,
  SafetyOutlined,
  EnvironmentOutlined,
  AppleOutlined,
  CoffeeOutlined,
  HomeOutlined,
  SmileOutlined,
  DropboxOutlined,
  ThunderboltOutlined,
  FireOutlined,
  StarOutlined,
  InfoCircleOutlined,
  GlobalOutlined,
  PhoneOutlined,
  ReadOutlined,
  MenuFoldOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

// Categories data for nested submenu
const categories = [
  {
    key: "vegetables",
    label: "Vegetables",
    icon: <EnvironmentOutlined />,
    href: "/super-shop/shop?category=vegetables",
  },
  {
    key: "fruits",
    label: "Fruits",
    icon: <AppleOutlined />,
    href: "/super-shop/shop?category=fruits",
  },
  {
    key: "dairy",
    label: "Dairy",
    icon: <DropboxOutlined />,
    href: "/super-shop/shop?category=dairy",
  },
  {
    key: "meat-fish",
    label: "Meat & Fish",
    icon: <FireOutlined />,
    href: "/super-shop/shop?category=meat-fish",
  },
  {
    key: "rice-grains",
    label: "Rice & Grains",
    icon: <ThunderboltOutlined />,
    href: "/super-shop/shop?category=rice-grains",
  },
  {
    key: "snacks",
    label: "Snacks",
    icon: <SmileOutlined />,
    href: "/super-shop/shop?category=snacks",
  },
  {
    key: "beverages",
    label: "Beverages",
    icon: <CoffeeOutlined />,
    href: "/super-shop/shop?category=beverages",
  },
  {
    key: "personal-care",
    label: "Personal Care",
    icon: <StarOutlined />,
    href: "/super-shop/shop?category=personal-care",
  },
  {
    key: "household",
    label: "Household",
    icon: <HomeOutlined />,
    href: "/super-shop/shop?category=household",
  },
];

const items: MenuItem[] = [
  {
    key: "home",
    label: <Link href="/">Home</Link>,
    icon: <HomeOutlined />,
  },

  {
    key: "library",
    label: "Library",
    icon: <ReadOutlined />,
    children: [
      {
        key: "library-home",
        icon: <ExportOutlined />,
        label: <Link href="/granthagar"> Visit Library Home</Link>,
        style: { fontWeight: 600, backgroundColor: "#f8fafc" },
      },
      { type: "divider" },
      {
        key: "books",
        label: <Link href="/granthagar/books-catalog">Books</Link>,
        icon: <BookOutlined />,
      },
      {
        key: "request-book",
        label: <Link href="/granthagar/request-book">Request Book</Link>,
        icon: <FileTextOutlined />,
      },
      {
        key: "my-reading",
        label: <Link href="/granthagar/reading-tracker">My Reading</Link>,
        icon: <BookFilled />,
      },
      {
        key: "donors",
        label: <Link href="/granthagar/donors">Donors</Link>,
        icon: <UserOutlined />,
      },
      {
        key: "events",
        label: <Link href="/granthagar/events">Events</Link>,
        icon: <CalendarOutlined />,
      },
      {
        key: "membership",
        label: <Link href="/granthagar/membership">Membership</Link>,
        icon: <CreditCardOutlined />,
      },
      {
        key: "book-details",
        label: <Link href="/granthagar/book-detail">Book Details</Link>,
        icon: <SearchOutlined />,
      },
    ],
  },
  {
    key: "foundation",
    label: "Foundation",
    icon: <BuildOutlined />,
    children: [
      {
        key: "foundation-home",
        icon: <ExportOutlined />,
        label: <Link href="/foundation">Visit Foundation Home</Link>,
        style: { fontWeight: 600, backgroundColor: "#fef2f2" },
      },
      { type: "divider" },
      {
        key: "about-foundation",
        label: <Link href="/foundation#about">About Foundation</Link>,
        icon: <BuildOutlined />,
      },
      {
        key: "programs",
        label: <Link href="/foundation#programs">Programs</Link>,
        icon: <AimOutlined />,
      },
      {
        key: "impact",
        label: <Link href="/foundation#impact">Impact</Link>,
        icon: <RiseOutlined />,
      },
      {
        key: "stories",
        label: <Link href="/foundation#contact">Stories</Link>,
        icon: <HeartOutlined />,
      },
    ],
  },
  {
    key: "shop",
    label: "Super Shop",
    icon: <ShoppingCartOutlined />,
    children: [
      {
        key: "shop-home",
        icon: <ExportOutlined />,
        label: <Link href="/super-shop">Visit Super Shop Home</Link>,
        style: { fontWeight: 600, backgroundColor: "#fdf4ff" },
      },
      { type: "divider" },
      {
        key: "shop-main",
        label: <Link href="/super-shop/shop">Shop</Link>,
        icon: <ShoppingCartOutlined />,
      },
      {
        key: "categories",
        label: "Categories",
        icon: <AppstoreOutlined />,
        children: [
          {
            key: "all-categories",
            label: <Link href="/super-shop/categories">All Categories</Link>,
            icon: <AppstoreOutlined />,
          },
          { type: "divider" },
          ...categories.map((cat) => ({
            key: cat.key,
            label: <Link href={cat.href}>{cat.label}</Link>,
            icon: cat.icon,
          })),
        ],
      },
      {
        key: "rewards",
        label: <Link href="/super-shop/rewards">Rewards</Link>,
        icon: <TrophyOutlined />,
      },
      {
        key: "about-shop",
        label: <Link href="/super-shop/about">About Shop</Link>,
        icon: <ShopOutlined />,
      },
      {
        key: "account",
        label: <Link href="/super-shop/account">Account</Link>,
        icon: <UserOutlined />,
      },
      {
        key: "cart",
        label: <Link href="/super-shop/cart">Cart</Link>,
        icon: <ShoppingOutlined />,
      },
      {
        key: "contact-shop",
        label: <Link href="/super-shop/contact">Contact</Link>,
        icon: <MessageOutlined />,
      },
    ],
  },
  {
    key: "itpark",
    label: "IT Park",
    icon: <LaptopOutlined />,
    children: [
      {
        key: "itpark-home",
        icon: <ExportOutlined />,
        label: <Link href="/it-park">Visit IT Park Home</Link>,
        style: { fontWeight: 600, backgroundColor: "#f0f9ff" },
      },
      { type: "divider" },
      {
        key: "about-itpark",
        label: <Link href="/it-park#about">About IT Park</Link>,
        icon: <LaptopOutlined />,
      },
      {
        key: "skills",
        label: <Link href="/it-park#skills">Skills</Link>,
        icon: <BulbOutlined />,
      },
      {
        key: "jobs",
        label: <Link href="/it-park#jobs">Jobs</Link>,
        icon: <CarryOutOutlined />,
      },
      {
        key: "events-itpark",
        label: <Link href="/it-park#events">Events</Link>,
        icon: <CalendarOutlined />,
      },
      {
        key: "guardian",
        label: <Link href="/it-park#guardian">Guardian</Link>,
        icon: <SafetyOutlined />,
      },
    ],
  },
  { type: "divider" },
  {
    key: "about",
    label: <Link href="/about">About Us</Link>,
    icon: <InfoCircleOutlined />,
  },
  {
    key: "contact",
    label: <Link href="/contact">Contact</Link>,
    icon: <PhoneOutlined />,
  },
];

const SuperNavbar: React.FC = () => {
  const [current, setCurrent] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState<"bn" | "en">("bn");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    setMobileOpen(false);
  };

  // Handle logo click - set home as active
  const handleLogoClick = () => {
    setCurrent("home");
  };

  const toggleLanguage = (checked: boolean) => {
    setLanguage(checked ? "en" : "bn");
  };

  return (
    <>
      {/* Desktop & Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/70 ">
        <div className="w-full px-4 sm:px-6 lg:px-8 ">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={handleLogoClick}
            >
              {/* Corporate B Logo */}
              <div className="relative h-10 w-10 rounded-xl bg-white shadow-lg ring-1 ring-slate-200 flex items-center justify-center group-hover:shadow-xl group-hover:ring-slate-300 transition-all duration-300">
                <span
                  className="bg-gradient-to-br from-indigo-600 to-cyan-600 bg-clip-text text-transparent font-black text-xl select-none"
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  B
                </span>
              </div>

              {/* Brand Text */}
              <div className="leading-tight">
                <div className="text-base font-semibold tracking-tight text-slate-900 group-hover:text-slate-950 transition-colors">
                  BASAR Group
                </div>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Learn. Earn. Empower.
                </Text>
              </div>
            </Link>

            {/* Desktop Menu */}
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center justify-end flex-1 gap-6">
              <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
                overflowedIndicator={null}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  flex: 1,
                  justifyContent: "flex-end",
                }}
              />

              {/* Language Toggle */}
              {/* <div className="flex items-center gap-2 mr-8">
                <GlobalOutlined />
                <Switch
                  checkedChildren="EN"
                  unCheckedChildren="বাং"
                  checked={language === "en"}
                  onChange={toggleLanguage}
                  size="small"
                />
              </div> */}
            </div>

            {/* Mobile Menu Button */}
            <Button
              type="text"
              icon={<MenuFoldOutlined />}
              className="lg:hidden "
              onClick={() => setMobileOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <Link href={"/"}  onClick={handleLogoClick}>
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 shadow-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg select-none">
                  B
                </span>
              </div>
              <div>
                <div className="font-semibold">BASAR Group</div>
                <Text type="secondary" style={{ fontSize: "11px" }}>
                  Learn. Earn. Empower.
                </Text>
              </div>
            </div>{" "}
          </Link>
        }
        placement="right"
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        width={320}
        styles={{ body: { padding: 0 } }}
      >
        {/* Mobile Menu */}
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          defaultOpenKeys={["home"]}
          mode="inline"
          items={items}
          style={{ border: "none" }}
        />

        {/* Language Toggle in Drawer */}
        {/* <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <Text>Language</Text>
            <Switch
              checkedChildren="EN"
              unCheckedChildren="বাং"
              checked={language === "en"}
              onChange={toggleLanguage}
              size="small"
            />
          </div>
        </div> */}
      </Drawer>
    </>
  );
};

export default SuperNavbar;
