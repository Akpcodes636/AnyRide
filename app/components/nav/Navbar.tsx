"use client";

import Logo from "../ui/Logo";
import Link from "next/link";
// import LanguageSwitcher from "./LanguageSwitcher";
import Button from "../ui/Button";
import { navLinks } from "@/app/utils/Content";
import LanguageSwitcher from "./LanguageSwitcher";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
// import LanguageSwitcher from "../navbar/LanguageSwitcher";


const Navbar = () => {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const gotoWaitlist = () => {
    router.push("/waitlist");
  };
  return (
      <nav className="hidden xl:block px-4 py-4"> {/* Added py-4 */}
  <div className="flex items-center justify-between gap-6  mx-auto"> {/* Added max-width */}
    <div className="flex-shrink-0">
      <Logo />
    </div>
    
    <ul className="flex items-center gap-6 lg:gap-8 xl:gap-6"> {/* Responsive gaps */}
      {navLinks.map((l, i) => (
        <li key={i} className="flex items-center">
          <Link
            href={l.router}
            className="text-[16px] lg:text-[18px] text-text-black font-medium leading-[120%] hover:text-[#A20602] transition-colors whitespace-nowrap"
          >
            {t(l.key)}
          </Link>
        </li>
      ))}
    </ul>
    
    <div className="flex items-center gap-x-3 lg:gap-x-4 flex-shrink-0">
      <LanguageSwitcher />
      <Button 
        type="button" 
        style="danger" 
        css="!text-[14px] lg:!text-[16px] px-3 lg:px-4 h-[56px] lg:h-[60px] whitespace-nowrap min-w-fit"
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



