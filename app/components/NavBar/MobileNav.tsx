"use client";

import { useState } from "react";
import Logo from "../ui/Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { navLinks } from "@/app/utils/Content";
import { X, ChevronDown } from "lucide-react";
import Button from "../ui/Button";

const serviceLinks = [
  { title: "Driver", href: "/services/driver" },
  { title: "Rider", href: "/services/rider" },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  return (
    <div className="xl:hidden">
      {/* TOP BAR */}
      <div className="max-w-full container-sm px-2">
        <div className="flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <GiHamburgerMenu
              size={24}
              color="#02093A"
              onClick={() => setOpen(true)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full bg-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        <div className="relative z-50 flex flex-col h-full">
          <div className="flex justify-end mb-6">
            <X
              size={24}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          <ul className="flex flex-col gap-10 items-center">
            {navLinks.map((l, i) => (
              <li key={i} className="w-full text-center">
                {l.hasDropdown ? (
                  <div className="w-full">
                    <button
                      onClick={() => setOpenServices((prev) => !prev)}
                      className="w-full text-[18px] font-medium text-text-black hover:text-[#A20602] transition-colors flex justify-center items-center gap-2"
                    >
                      {l.title}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          openServices ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openServices && (
                      <ul className="flex flex-col gap-2 mt-2">
                        {serviceLinks.map((s) => (
                          <li key={s.title}>
                            <Link
                              href={s.href}
                              onClick={() => setOpen(false)}
                              className="text-[16px] text-text-black hover:text-[#A20602] transition-colors"
                            >
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={l.router}
                    onClick={() => setOpen(false)}
                    className="text-[18px] font-medium text-text-black tracking-[-2%] hover:text-[#A20602] transition-colors"
                  >
                    {l.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* LOGIN / SIGN UP BUTTONS */}
          <div className="flex flex-col gap-4 mt-auto items-center">
            <Button type="button" style="nobg" css="w-[117px] h-[62px]">
              Login
            </Button>
            <Button type="button" style="danger" css="w-[161px] h-[62px]">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
