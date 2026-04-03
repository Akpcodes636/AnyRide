"use client";

import { useState } from "react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { navLinks } from "@/app/utils/Content";
import LanguageSwitcher from "./LanguageSwitcher";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useAuth } from "@/providers/AuthProvider";
import { ChevronDown } from "lucide-react";
import ProfilePopover from "./ProfilePopover";
import DriverProfilePopover from "./DriverProfilePopover";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const { isAuthenticated, userName } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navGap =
    locale === "fr" || locale === "sw" || locale === "ln"
      ? "gap-2"
      : "gap-8";

  const isDriver = pathname?.startsWith("/drivers") || false;

  const displayName =
    userName && userName.length > 12
      ? userName.slice(0, 12) + "..."
      : userName || "User";

  return (
    <nav className="hidden xl:block px-4 py-4">
      <div className="flex items-center justify-between gap-6 mx-auto">
        {/* Logo */}
        <Logo />

        {/* ================= NOT AUTHENTICATED ================= */}
        {!isAuthenticated && (
          <>
            {/* Nav Links */}
            <ul className={`flex items-center  ${navGap} 2xl:gap-10`}>
              {navLinks.map((link, i) => {
                const isActive =
                  pathname === link.router ||
                  pathname.startsWith(`${link.router}/`);

                return (
                  <li key={i} className="relative flex items-center">
                    <button
                      onClick={() => router.push(link.router)}
                      className={`text-[18px] font-medium transition-colors cursor-pointer
                        ${
                          isActive
                            ? "text-[#A20602]"
                            : "text-text-black hover:text-[#A20602]"
                        }
                      `}
                    >
                      {t(link.key)}
                    </button>

                    <span
                      className={`absolute -bottom-2 left-0 h-[2px] w-full bg-[#A20602] transition-all
                        ${
                          isActive
                            ? "opacity-100 scale-x-100"
                            : "opacity-0 scale-x-0"
                        }
                      `}
                    />
                  </li>
                );
              })}
            </ul>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />

              <Button
                type="button"
                style="danger"
                css="px-4"
                fn={() => router.push("/waitlist")}
              >
                {t("waitlistButton")}
              </Button>
            </div>
          </>
        )}

        {/* ================= AUTHENTICATED ================= */}
        {isAuthenticated && (
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <div className="relative">
              {/* Profile Button */}
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="w-[188px] h-[64px]  flex items-center justify-center px-4 py-4 bg-[#A20602] text-white rounded-full font-bold text-[16px] hover:bg-[#8e0502]"
              >
                <span className="truncate">{displayName}</span>
                <ChevronDown size={16} />
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <>
                 {isDriver ? (
                          <DriverProfilePopover isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
                        ) : (
                          <ProfilePopover isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
                        )}
                </>
                // <div className="absolute right-0 mt-4 w-[280px] bg-white shadow-lg rounded-lg z-50 p-4">
                //   {/* User Info */}
                //   {/* <p className="font-semibold text-[16px] mb-3">{displayName}</p> */}

                //   {/* Menu */}
                //   <div className="flex flex-col gap-2">
                //     {/* {isDriver ? (
                //       <>
                //         <NavItem
                //           label="Verifications"
                //           onClick={() =>
                //             router.push("/drivers/verifications")
                //           }
                //         />
                //         <NavItem
                //           label="Drive & Earn"
                //           onClick={() =>
                //             router.push("/drivers/main/drive-and-earn")
                //           }
                //         />
                //         <NavItem
                //           label="Book a Ride"
                //           onClick={() => router.push("/request-ride")}
                //         />
                //         <NavItem
                //           label="Reviews"
                //           onClick={() =>
                //             router.push("/drivers/main/reviews")
                //           }
                //         />
                //         <NavItem
                //           label="My Vehicles"
                //           onClick={() =>
                //             router.push("/drivers/main/my-vehicles")
                //           }
                //         />
                //       </>
                //     ) : (
                //       <> */}
                //         {/* <NavItem
                //           label="Manage Account"
                //           onClick={() => router.push("/account")}
                //         />
                //         <NavItem
                //           label="Book a Ride"
                //           onClick={() => router.push("/request-ride")}
                //         />
                //         <NavItem
                //           label="My Rides"
                //           onClick={() => router.push("/my-rides")}
                //         />
                //         <NavItem
                //           label="Drive & Earn"
                //           onClick={() =>
                //             router.push("/drivers/sign-up")
                //           }
                //         /> */}
                       
                //       {/* </> */}
                //     {/* )} */}

                //     {/* Shared Items */}
                //     {/* <NavItem
                //       label="Notifications"
                //       onClick={() => router.push("/notifications")}
                //     />
                //     <NavItem
                //       label="About"
                //       onClick={() => router.push("/about")}
                //     />

                //     {/* Logout */}
                //     {/* <button
                //       onClick={() => console.log("logout")}
                //       className="text-left text-red-500 mt-2"
                //     >
                //       Sign out
                //     </button>  */}
                    
                //   </div>
                // </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

/* ================= REUSABLE ITEM ================= */
const NavItem = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="text-left py-2 hover:text-[#A20602] transition"
  >
    {label}
  </button>
);

export default Navbar;