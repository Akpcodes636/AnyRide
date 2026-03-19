"use client";
import React, { useState } from "react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { navLinks } from "@/app/utils/Content";
import LanguageSwitcher from "./LanguageSwitcher";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useAuth } from "@/providers/AuthProvider";
import {
  ChevronDown,
} from "lucide-react";
import ProfilePopover from "./ProfilePopover";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated, userName } = useAuth();
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navGap =
    locale === "fr" || locale === "sw" || locale === "ln" ? "gap-2" : "gap-8";

  // Truncate long names
  const displayName =
    userName.length > 12 ? userName.slice(0, 12) + "..." : userName;

  return (
    <nav className="hidden xl:block px-4 py-4">
      <div className="flex items-center justify-between gap-6 mx-auto">
        {/* Logo */}
        <Logo />

        {/* Only show nav links and right section if NOT authenticated */}
        {!isAuthenticated && (
          <>
            {/* Nav links */}
            <ul className={`flex items-center ${navGap} 2xl:gap-10`}>
              {navLinks.map((l, i) => {
                const isActive =
                  pathname === l.router || pathname.startsWith(`${l.router}/`);

                return (
                  <li key={i} className="relative flex items-center">
                    <button
                      onClick={() => router.push(l.router)}
                      className={`text-[18px] font-medium leading-[120%] whitespace-nowrap transition-colors cursor-pointer
                        ${isActive
                          ? "text-[#A20602]"
                          : "text-text-black hover:text-[#A20602]"
                        }
                      `}
                    >
                      {t(l.key)}
                    </button>

                    <span
                      className={`absolute -bottom-2 left-0 h-[2px] w-full bg-[#A20602] transition-all duration-300
                        ${isActive
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0"
                        }
                      `}
                    />
                  </li>
                );
              })}
            </ul>

            {/* Right section */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <LanguageSwitcher />

              <Button
                type="button"
                style="danger"
                css="px-4 whitespace-nowrap"
                fn={() => router.push("/waitlist")}
              >
                {t("waitlistButton")}
              </Button>
            </div>
          </>
        )}

        {/* If authenticated, show Profile button with real user name */}
        {isAuthenticated && (
          <>
            <div className="flex items-center justify-end gap-3">
              <LanguageSwitcher />
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-[188px] flex items-center justify-between px-4 py-2 bg-[#A20602] text-white rounded-full font-bold text-[14px] transition-colors hover:bg-[#8e0502] cursor-pointer"
                >
                  <span className="truncate">{displayName}</span>
                  <ChevronDown size={16} />
                </button>

                {/* Profile Dialog Dropdown */}
                <ProfilePopover
                  isOpen={isProfileOpen}
                  onClose={() => setIsProfileOpen(false)}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
