"use client";

import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { navLinks } from "@/app/utils/Content";
import LanguageSwitcher from "./LanguageSwitcher";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const locale = useLocale();

  const pathname = usePathname();

  const gotoWaitlist = () => {
    router.push("/waitlist");
  };

  // Determine gap based on locale
  const navGap =
    locale === "fr" || locale === "sw" || locale === "ln"
      ? "gap-2"
      : "gap-8";

  return (
    <nav className="hidden xl:block px-4 py-4">
      <div className="flex items-center justify-between gap-6 mx-auto">
        {/* Logo */}
        <Logo />

        {/* Nav links */}
        <ul className={`flex items-center ${navGap} 2xl:gap-10`}>
          {navLinks.map((l, i) => {
            const isActive =
              pathname === l.router ||
              pathname.startsWith(`${l.router}/`);

            return (
              <li key={i} className="relative flex items-center">
                <Link
                  href={l.router}
                  className={`text-[18px] font-medium leading-[120%] whitespace-nowrap transition-colors
                    ${isActive
                      ? "text-[#A20602]"
                      : "text-text-black hover:text-[#A20602]"
                    }
                  `}
                >
                  {t(l.key)}
                </Link>

                {/* underline */}
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
        <div className="flex items-center gap-2 flex-shrink-0">
          <LanguageSwitcher />

          <Button
            type="button"
            style="danger"
            css="!text-[14px] lg:!text-[16px] px-3 lg:px-4 whitespace-nowrap"
            fn={gotoWaitlist}
          >
            {t("waitlistButton")}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
