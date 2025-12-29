"use client";
import React from "react";
import Logo from "./ui/Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#F5F5F7]">
      {/* Main Footer Content */}
      <div className="container  py-7.25  lg:py-18">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4 max-w-full">
            <div className="mb-7">
              <Logo />
            </div>
            <p className="text-[16px] text-[#333333] leading-[160%] tracking-[-2%] w-full max-w-full md:max-w-118.75 lg:max-w-125 xl:max-w-102.5">
              We're building the most trusted local ride network — designed for
              passengers and real people. Affordable, safe, and always there
              when you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 w-full max-w-full xl:gap-x-12 gap-y-6">
            {/* Company Links */}
            <div>
              <h3 className="text-text-black font-semibold mb-4 text-[20px] md:text-[24px]">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-[#333333] hover:text-[#A20602] transition-colors text-[16px]"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#333333] hover:text-[#A20602] transition-colors text-[16px]"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#333333] hover:text-[#A20602] transition-colors text-[16px]"
                  >
                    Cities
                  </a>
                </li>
              </ul>
            </div>

            {/* Help Links */}
            <div>
             <h3 className="text-text-black font-semibold mb-4 text-[20px] md:text-[24px]">Help</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                   className="text-[#333333] hover:text-[#A20602] transition-colors text-[16px]"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                   className="text-[#333333] hover:text-[#A20602] transition-colors text-[16px]"
                  >
                    Safety
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                 className="text-[#333333] hover:text-[#A20602] transition-colors text-[16px]"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
               <h3 className="text-text-black font-semibold mb-4 text-[20px] md:text-[24px]">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-[#333333] hover:text-[#A20602] transition-colors text-[16px]"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                   className="text-[#333333] hover:text-[#A20602] transition-colors text-[16px]"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                  className="text-[#333333] hover:text-[#A20602] transition-colors text-[16px]"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-[16px] text-gray-600 text-center">
              © 2025 AnyRide. Made for everyone on the move.
              <Link
                href="techenex.com "
                className=" text-[#333333] leading-[160%] text-[16px] tracking-[-2%] font-bold"
              >
                Techenex
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
