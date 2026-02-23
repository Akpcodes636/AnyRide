"use client";
import { useState } from "react";
import Logo from "../ui/Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { GiHamburgerMenu } from "react-icons/gi";
import { navLinks } from "@/app/utils/Content";
import {
  X,
  User,
  Wallet,
  Bookmark,
  HelpCircle,
  Car,
  Route,
  Bell,
  Shield,
  Info,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Button from "../ui/Button";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { useAuth } from "@/providers/AuthProvider";

const MobileNav = () => {
  const t = useTranslations("Navbar");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, userName, logout } = useAuth();

  const gotoWaitlist = () => {
    setOpen(false);
    router.push("/waitlist");
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  // Truncate long names
  const displayName =
    userName.length > 16 ? userName.slice(0, 16) + "..." : userName;

  return (
    <div className="xl:hidden relative">
      {/* TOP BAR */}
      <div className="px-4 py-6 md:py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <GiHamburgerMenu size={24} color="#02093A" />
            </button>
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-[420px] bg-white
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full px-6 pt-6 pb-8 overflow-y-auto">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-10">
            <Logo />
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={26} />
              </button>
            </div>
          </div>

          {/* If NOT authenticated - show nav links and waitlist button */}
          {!isAuthenticated && (
            <>
              {/* NAV LINKS */}
              <ul className="flex flex-col gap-6">
                {navLinks.map((l, i) => (
                  <li key={i}>
                    <Link
                      href={l.router}
                      onClick={() => setOpen(false)}
                      className="text-[18px] font-normal text-[#010418]
                        hover:text-[#A20602] transition-colors"
                    >
                      {t(l.key)}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA BUTTONS */}
              <div className="mt-10 flex flex-col items-center w-full">
                <Button
                  type="button"
                  style="danger"
                  css="w-full max-w-[280px] h-[56px] !text-[14px] px-8"
                  fn={gotoWaitlist}
                >
                  {t("waitlistButton")}
                </Button>
              </div>
            </>
          )}

          {/* If authenticated - show profile menu */}
          {isAuthenticated && (
            <div className="flex flex-col gap-6">
              {/* Profile Header */}
              <div className="flex items-center gap-3 pb-6 border-b">
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {displayName}
                  </h3>
                  <p className="text-sm text-gray-500">View profile</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3 pb-6 border-b">
                <button
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
                >
                  <Wallet className="w-6 h-6 text-gray-700" />
                  <span className="text-xs font-medium text-gray-700">Wallet</span>
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
                >
                  <Bookmark className="w-6 h-6 text-gray-700" />
                  <span className="text-xs font-medium text-gray-700">Saved</span>
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
                >
                  <HelpCircle className="w-6 h-6 text-gray-700" />
                  <span className="text-xs font-medium text-gray-700">Support</span>
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col gap-1">
                <MobileMenuItem
                  icon={<User className="w-5 h-5" />}
                  label="Manage account"
                  onClick={() => setOpen(false)}
                />
                <MobileMenuItem
                  icon={<Route className="w-5 h-5" />}
                  label="Book a ride"
                  onClick={() => setOpen(false)}
                />
                <MobileMenuItem
                  icon={<Car className="w-5 h-5" />}
                  label="My Rides"
                  onClick={() => setOpen(false)}
                />
                <MobileMenuItem
                  icon={<Car className="w-5 h-5" />}
                  label="Drive & Earn"
                  onClick={() => setOpen(false)}
                />
                <MobileMenuItem
                  icon={<Bell className="w-5 h-5" />}
                  label="Notifications"
                  onClick={() => setOpen(false)}
                />
                <MobileMenuItem
                  icon={<Shield className="w-5 h-5" />}
                  label="Safety"
                  onClick={() => setOpen(false)}
                />
                <MobileMenuItem
                  icon={<Info className="w-5 h-5" />}
                  label="About"
                  onClick={() => setOpen(false)}
                />
              </div>

              {/* Sign Out */}
              <div className="mt-auto pt-6 border-t">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-4 py-4 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-5 h-5" />
                    <span className="font-semibold">Sign out</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Mobile Menu Item Component
function MobileMenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 rounded-xl transition group"
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-600 group-hover:text-gray-900">
          {icon}
        </span>
        <span className="text-gray-700 group-hover:text-gray-900 font-medium">
          {label}
        </span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
    </button>
  );
}

export default MobileNav;