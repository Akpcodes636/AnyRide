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

console.log("PATH:", pathname);
console.log("isBaseRoute:");

  return (
    <>
      <Header />
      <div className="min-h-screen pt-[120px] container mx-auto">
         <h1 className="text-[40px] font-bold text-[#02093A] mb-6 tracking-tight">
         {activeItem?.title}
         </h1>
        <div className="flex flex-col md:flex-row lg:flex-row gap-x-[127px] gap-y-[20px] items-start">
          {/* ── Sidebar ── */}
          <aside className="w-full  max-w-[298px] flex-shrink-0">
            <nav className="bg-[#F5F5F7] rounded-2xl overflow-hidden divide-y divide-[#E6E6EB]">
              {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      flex items-center justify-between px-4 py-3.5 transition-colors
                      ${
                        isActive
                          ? "bg-white text-[#02093A] font-semibold"
                          : "text-[#444] hover:bg-white/60"
                      }
                    `}
                  >
                    <span className="flex items-center gap-3 text-[13.5px]">
                      <Icon
                        size={16}
                        className={
                          isActive ? "text-[#02093A]" : "text-gray-400"
                        }
                      />
                      {label}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke={isActive ? "#02093A" : "#C0C0CC"}
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* ── Right content ── */}
          <main className="flex-1 max-w-[839px] md:max-w-full w-full">
            {/* Title updates automatically based on active route */}

            {children}
          </main>
        </div>
      </div>
    </>
  );
}
