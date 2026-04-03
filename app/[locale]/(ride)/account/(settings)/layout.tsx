"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Shield, Bell, Globe } from "lucide-react";
import { GoKey } from "react-icons/go";
import { GiGearHammer } from "react-icons/gi";
import Header from "@/app/components/Header";

const NAV_ITEMS = [
  {
    label: "Personal info",
    icon: User,
    href: "/account/personal-info",
    title: "Personal info",
  },
  {
    label: "Login & Security",
    icon: GoKey,
    href: "/account/login",
    title: "Login & Security",
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "/account/notifications",
    title: "Notifications",
  },
  {
    label: "Safety & Privacy",
    icon: Shield,
    href: "/account/safety",
    title: "Safety & Privacy",
  },
  {
    label: "Language",
    icon: Globe,
    href: "/account/language",
    title: "Language",
  },
  {
    label: "Terms and conditions",
    icon: GiGearHammer,
    href: "/account/terms",
    title: "Terms and conditions",
  },
];

export default function AccountSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Remove locale prefix (like /en, /fr, etc.)
  const cleanPath = pathname.replace(/^\/[a-z]{2}/, "");

  const activeItem = NAV_ITEMS.find((item) =>
    cleanPath.startsWith(item.href)
  );

  // console.log("PATH:", pathname);
  // console.log("isBaseRoute:");

  return (
    <>
      <Header />
      <div className="min-h-screen pt-[120px]">
        {children}
      </div>
    </>
  );
}
