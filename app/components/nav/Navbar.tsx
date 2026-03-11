"use client";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { navLinks } from "@/app/utils/Content";
import LanguageSwitcher from "./LanguageSwitcher";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useAuth } from "@/providers/AuthProvider";
import {
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
  ChevronDown,
} from "lucide-react";

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition">
      <span className="w-5 h-5 text-gray-600">{icon}</span>
      <span className="text-gray-700">{label}</span>
    </button>
  );
}

const Navbar = () => {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated, userName, logout } = useAuth();
  const pathname = usePathname();

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
                    <Link
                      href={l.router}
                      className={`text-[18px] font-medium leading-[120%] whitespace-nowrap transition-colors
                        ${
                          isActive
                            ? "text-[#A20602]"
                            : "text-text-black hover:text-[#A20602]"
                        }
                      `}
                    >
                      {t(l.key)}
                    </Link>

                    <span
                      className={`absolute -bottom-2 left-0 h-[2px] w-full bg-[#A20602] transition-all duration-300
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
            <div className="flex items-end justify-end gap-3">
              <LanguageSwitcher />
              <div className="relative group">
                <Button
                  style="danger"
                  type="button"
                  css="w-[188px] flex items-center justify-between px-3"
                >
                  <span className="truncate">{displayName}</span>
                  <ChevronDown className="text-sm" />
                </Button>

                <div className="absolute right-0 mt-2 w-[280px] hidden group-hover:block bg-white shadow-xl rounded-lg overflow-hidden z-50">
                  {/* Profile Header */}
                  <div className="p-6 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {displayName}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-3 gap-4 p-4 border-b">
                    <button className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition">
                      <Wallet className="w-5 h-5 text-gray-600" />
                      <Link href="/wallet">
                        <span className="text-xs text-gray-700">Wallet</span>
                      </Link>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition">
                      <Link href="/saved">
                        <Bookmark className="w-5 h-5 text-gray-600" />
                        <span className="text-xs text-gray-700">Saved</span>
                      </Link>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition">
                      <Link href="/support">
                        <HelpCircle className="w-5 h-5 text-gray-600" />
                        <span className="text-xs text-gray-700">Support</span>
                      </Link>
                    </button>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                     <Link href="/manage">
                    <MenuItem icon={<User />} label="Manage account" />
                     </Link>
                    <Link href="/request-ride">
                      <MenuItem icon={<Route />} label="Book a ride" />
                    </Link>
                    <Link href="/my-rides">
                      <MenuItem icon={<Car />} label="My Rides" />
                    </Link>
                    <Link href="/drive-and-earn">
                      <MenuItem icon={<Car />} label="Drive & Earn" />
                    </Link>
                    <Link href="/notifications">
                      <MenuItem icon={<Bell />} label="Notifications" />
                    </Link>
                    <Link href="/safety">
                      <MenuItem icon={<Shield />} label="Safety" />
                    </Link>
                    <Link href="/about">
                      <MenuItem icon={<Info />} label="About" />
                    </Link>
                  </div>

                  {/* Sign Out */}
                  <div className="border-t p-2">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Sign out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
