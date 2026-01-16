// "use client";

// import { useState } from "react";
// import Logo from "../ui/Logo";
// import LanguageSwitcher from "./LanguageSwitcher";
// import { GiHamburgerMenu } from "react-icons/gi";
// import Link from "next/link";
// import { navLinks } from "@/app/utils/Content";
// import { X, ChevronDown } from "lucide-react";
// import Button from "../ui/Button";

// const serviceLinks = [
//   { title: "Driver", href: "/services/driver" },
//   { title: "Rider", href: "/services/rider" },
// ];

// const MobileNav = () => {
//   const [open, setOpen] = useState(false);
//   const [openServices, setOpenServices] = useState(false);

//   return (
//     <div className="xl:hidden">
//       {/* TOP BAR */}
//       <div className="max-w-full container-sm px-2">
//         <div className="flex items-center justify-between">
//           <Logo />

//           <div className="flex items-center gap-2">
//             <LanguageSwitcher />
//             <GiHamburgerMenu
//               size={24}
//               color="#02093A"
//               onClick={() => setOpen(true)}
//               className="cursor-pointer"
//             />
//           </div>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       <div
//         className={`fixed top-0 right-0 z-50 h-full w-full bg-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out
//         ${open ? "translate-x-0" : "translate-x-full"}`}
//       >
//         {/* Overlay */}
//         <div
//           onClick={() => setOpen(false)}
//           className={`fixed inset-0 transition-opacity duration-300 ${
//             open ? "opacity-100" : "opacity-0 pointer-events-none"
//           }`}
//         />

//         <div className="relative z-50 flex flex-col h-full">
//           <div className="flex justify-end mb-6">
//             <X
//               size={24}
//               className="cursor-pointer"
//               onClick={() => setOpen(false)}
//             />
//           </div>

//           <ul className="flex flex-col gap-10 items-center">
//             {navLinks.map((l, i) => (
//               <li key={i} className="w-full text-center">
//                 {/* {l.hasDropdown ? (
//                   <div className="w-full">
//                     <button
//                       onClick={() => setOpenServices((prev) => !prev)}
//                       className="w-full text-[18px] font-medium text-text-black hover:text-[#A20602] transition-colors flex justify-center items-center gap-2"
//                     >
//                       {l.title}
//                       <ChevronDown
//                         size={16}
//                         className={`transition-transform duration-200 ${
//                           openServices ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>
//                     {openServices && (
//                       <ul className="flex flex-col gap-2 mt-2">
//                         {serviceLinks.map((s) => (
//                           <li key={s.title}>
//                             <Link
//                               href={s.href}
//                               onClick={() => setOpen(false)}
//                               className="text-[16px] text-text-black hover:text-[#A20602] transition-colors"
//                             >
//                               {s.title}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 ) : ( */}
//                   <Link
//                     href={l.router}
//                     onClick={() => setOpen(false)}
//                     className="text-[18px] font-medium text-text-black tracking-[-2%] hover:text-[#A20602] transition-colors"
//                   >
//                     {l.key}
//                   </Link>
//               </li>
//             ))}
//           </ul>

//           {/* LOGIN / SIGN UP BUTTONS */}
//           <div className="flex flex-col gap-4 mt-auto items-center">
//             <Button type="button" style="nobg" css="w-[117px] h-[62px]">
//               Login
//             </Button>
//             <Button type="button" style="danger" css="w-[161px] h-[62px]">
//               Sign up
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileNav;


// "use client";

// import { useState } from "react";
// import Logo from "../ui/Logo";
// import LanguageSwitcher from "./LanguageSwitcher";
// import { GiHamburgerMenu } from "react-icons/gi";
// import Link from "next/link";
// import { navLinks } from "@/app/utils/Content";
// import { X, ChevronDown } from "lucide-react";
// import Button from "../ui/Button";
// import { useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";

// const serviceLinks = [
//   { title: "Driver", href: "/services/driver" },
//   { title: "Rider", href: "/services/rider" },
// ];

// const MobileNav = () => {
//   const t = useTranslations("Navbar"); // <- localize the Navbar translations
//   const [open, setOpen] = useState(false);
//   const [openServices, setOpenServices] = useState(false);
//     const router = useRouter();
//       const gotoWaitlist = () => {
//       router.push("/waitlist");
//     };

//   return (
//     <div className="xl:hidden">
//       {/* TOP BAR */}
//       <div className="max-w-full container-sm px-2">
//         <div className="flex items-center justify-between">
//           <Logo />

//           <div className="flex items-center gap-2">
//             <LanguageSwitcher />
//             <GiHamburgerMenu
//               size={24}
//               color="#02093A"
//               onClick={() => setOpen(true)}
//               className="cursor-pointer"
//             />
//           </div>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       <div
//         className={`fixed top-18 right-0 z-50 h-[503px] w-full bg-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out
//         ${open ? "translate-x-0" : "translate-x-full"}`}
//       >
//         {/* Overlay */}
//         <div
//           onClick={() => setOpen(false)}
//           className={`fixed inset-0 transition-opacity duration-300 ${
//             open ? "opacity-100" : "opacity-0 pointer-events-none"
//           }`}
//         />

//         <div className="relative z-50 flex flex-col h-full">
//           <div className="flex justify-end mb-6">
//             <X
//               size={24}
//               className="cursor-pointer"
//               onClick={() => setOpen(false)}
//             />
//           </div>

//           <ul className="flex flex-col gap-10 items-center">
//             {navLinks.map((l, i) => (
//               <li key={i} className="w-full text-cente">
//                 <Link
//                   href={l.router}
//                   onClick={() => setOpen(false)}
//                   className="text-[20px] font-normal text-text-black tracking-[-2%] hover:text-[#A20602] transition-colors"
//                 >
//                   {t(l.key)} {/* <- Use translation here */}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* LOGIN / SIGN UP BUTTONS */}
//           <div className="flex flex-col gap-4 mt-auto items-center">
//             <Button type="button" style="nobg" css="w-[227px] h-[62px]" fn={gotoWaitlist}>
//               {t("waitlistButton") || "Login"}
//             </Button>
//             {/* <Button type="button" style="danger" css="w-[161px] h-[62px]">
//               {t("driver") || "Sign up"}
//             </Button> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileNav;
// "use client";

// import { useState } from "react";
// import Logo from "../ui/Logo";
// import LanguageSwitcher from "./LanguageSwitcher";
// import { GiHamburgerMenu } from "react-icons/gi";
// import Link from "next/link";
// import { navLinks } from "@/app/utils/Content";
// import { X } from "lucide-react";
// import Button from "../ui/Button";
// import { useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";

// const MobileNav = () => {
//   const t = useTranslations("Navbar");
//   const [open, setOpen] = useState(false);
//   const router = useRouter();

//   const gotoWaitlist = () => {
//     setOpen(false);
//     router.push("/waitlist");
//   };

//   return (
//     <div className="xl:hidden relative">
//       {/* TOP BAR */}
//       <div className="px-4">
//         <div className="flex items-center justify-between">
//           <Logo />

//           <div className="flex items-center gap-3">
//             <LanguageSwitcher />
//             <button
//               aria-label="Open menu"
//               onClick={() => setOpen(true)}
//               className="cursor-pointer"
//             >
//               <GiHamburgerMenu size={24} color="#02093A" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* OVERLAY */}
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
//         />
//       )}

//       {/* MOBILE MENU */}
//       <div
//         className={`fixed top-0 right-0 z-50 h-full w-full max-w-[420px] bg-white p-6 shadow-xl
//         transform transition-transform duration-300 ease-in-out
//         ${open ? "translate-x-0" : "translate-x-full"}`}
//       >
//         <div className="flex flex-col h-full">
//           {/* CLOSE */}
//           <div className="flex justify-end mb-8">
//             <button
//               aria-label="Close menu"
//               onClick={() => setOpen(false)}
//             >
//               <X size={26} />
//             </button>
//           </div>

//           {/* LINKS */}
//           <ul className="flex flex-col gap-8 items-center">
//             {navLinks.map((l, i) => (
//               <li key={i} className="w-full text-center">
//                 <Link
//                   href={l.router}
//                   onClick={() => setOpen(false)}
//                   className="text-[20px] font-normal text-text-black tracking-tight
//                   hover:text-[#A20602] transition-colors"
//                 >
//                   {t(l.key)}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* CTA */}
//           <div className="mt-auto flex flex-col items-center gap-4">
//             <Button
//               type="button"
//               style="nobg"
//               css="w-[227px] h-[62px]"
//               fn={gotoWaitlist}
//             >
//               {t("waitlistButton") || "Join Waitlist"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileNav;

"use client";

import { useState } from "react";
import Logo from "../ui/Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { navLinks } from "@/app/utils/Content";
import { X } from "lucide-react";
import Button from "../ui/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const MobileNav = () => {
  const t = useTranslations("Navbar");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const gotoWaitlist = () => {
    setOpen(false);
    router.push("/waitlist");
  };

  const gotoLogin = () => {
    setOpen(false);
    router.push("/login");
  };

  return (
    <div className="xl:hidden relative">
      {/* TOP BAR */}
      <div className="px-4">
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
        <div className="flex flex-col h-full px-6 pt-6 pb-8">
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
          <div className="mt-10 flex flex-col g items-center">
            {/* Sign up */}
            <Button type="button" style="nobg" css="min-w-[227px] h-[62px]" fn={gotoWaitlist}>
               {t("waitlistButton") || "Login"}
            </Button>

            {/* Login
            <Button
              type="button"
              style="nobg"
              css="w-full h-[52px] rounded-full border border-[#010418]"
              fn={gotoLogin}
            >
              {t("login") || "Login"}
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
