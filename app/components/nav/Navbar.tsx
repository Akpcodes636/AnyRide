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
    <nav className="hidden xl:block px-4">
      <div className="flex items-center justify-between">
        <Logo />

        <ul className="flex items-center gap-12">
          {navLinks.map((l, i) => (
            <li key={i} className="flex items-center gap-1 cursor-pointer">
              <Link
                href={l.router}
                className="text-[18px] text-text-black font-medium leading-[120%] tracking-[-2%] hover:text-[#A20602] transition-colors mx-w-[100px]"
              >
                {t(l.key)}
              </Link>
            </li>
          ))}

          <LanguageSwitcher />
        </ul>

        <div className="flex gap-2">
          <Button type="button" style="danger" css="w-[157px] h-[62px]" fn={gotoWaitlist}>
           {t("waitlistButton")}
          </Button>
          {/* <Button type="button" style="danger" css="w-[161px] h-[62px]">
            Sign up
          </Button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




// "use client";

// import { useState, useRef, useEffect } from "react";
// import Logo from "../ui/Logo";
// import { ChevronDown } from "lucide-react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import LanguageSwitcher from "./LanguageSwitcher";
// import Button from "../ui/Button";
// import { navLinks } from "@/app/utils/Content";
// import * as Icons from "lucide-react";

// /* ---------------- Service Item ---------------- */

// interface ServiceNavigationItemProps {
//   icon: keyof typeof Icons;
//   title: string;
//   href: string;
//   css?: string;
// }

// const ServiceNavigationItem: React.FC<ServiceNavigationItemProps> = ({
//   icon,
//   title,
//   href,
//   css = "",
// }) => {
//   const router = useRouter();
//   const Icon = Icons[icon] as React.ComponentType<{
//     size?: number;
//     className?: string;
//   }>;

//   return (
//     <div
//       onClick={() => router.push(href)}
//       className="
//         flex cursor-pointer items-center gap-3
//         px-4 py-3
//         duration-150
//         hover:mx-2 hover:rounded-lg
//         hover:bg-[#0000000F]
//       "
//     >
//       <Icon size={22} className="text-[#02093A]" />
//       <span className={`text-[18px] font-normal ${css}`}>{title}</span>
//     </div>
//   );
// };

// /* ---------------- Services Data ---------------- */

// const serviceLinks = [
//   {
//     title: "Rider",
//     href: "/services/rider",
//     icon: "User",
//   },
//   {
//     title: "Driver",
//     href: "/services/driver",
//     icon: "Car",
//   },
// ];

// /* ---------------- Nav Links for Different Pages ---------------- */

// type NavLink = {
//   title: string;
//   router: string;
//   hasDropdown?: boolean;
// };

// const riderNavLinks: NavLink[] = [
//   { title: "Home", router: "/" },
//   { title: "Drivers", router: "/services/driver" },
//   { title: "Riders", router: "/services/rider" },
//   { title: "About", router: "/about" },
// ];

// const driverNavLinks: NavLink[] = [
//   { title: "Home", router: "/" },
//   { title: "Drivers", router: "/services/driver" },
//   { title: "Riders", router: "/services/rider" },
//   { title: "About", router: "/about" },
// ];

// /* ---------------- Navbar ---------------- */

// const Navbar = () => {
//   const [openServices, setOpenServices] = useState(false);
//   const servicesRef = useRef<HTMLLIElement>(null);
//   const pathname = usePathname();

//   // Determine which nav links to show based on current page
//   const isRidersPage = pathname === "/services/rider";
//   const isDriversPage = pathname === "/services/driver";
//   // const currentNavLinks = isRidersPage 
//   //   ? riderNavLinks 
//   //   : isDriversPage 
//   //   ? driverNavLinks 
//   //   : navLinks;

//   const currentNavLinks = navLinks;

//   // close dropdown on outside click
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (
//         servicesRef.current &&
//         !servicesRef.current.contains(e.target as Node)
//       ) {
//         setOpenServices(false);
//       }
//     };

//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // Determine CTA buttons based on page
//   const renderCtaButtons = () => {
//     // if (isRidersPage || isDriversPage) {
//     //   return (
//     //     <div className="flex gap-2">
//     //       <Button type="button" style="nobg" css="w-[200px] h-[62px]">
//     //         Become a driver
//     //       </Button>
//     //       <Button type="button" style="danger" css="w-[162px] h-[62px]">
//     //         Book a ride
//     //       </Button>
//     //     </div>
//     //   );
//     // }

//     // Default homepage buttons
//     return (
//       <div className="flex gap-2">
//         <Button type="button" style="danger" css="w-[257px] h-[62px]">
//           Join Our Waitlist
//         </Button>
//         {/* <Button type="button" style="danger" css="w-[161px] h-[62px]">
//           Sign up
//         </Button> */}
//       </div>
//     );
//   };

//   return (
//     <nav className="hidden xl:block px-4">
//       <div className="flex items-center justify-between">
//         <Logo />

//         <ul className="flex items-center gap-12">
//           {currentNavLinks.map((l, i) => {
//             // 🔥 SERVICES WITH DROPDOWN
//             // if (l.hasDropdown) {
//             //   return (
//             //     <li
//             //       key={i}
//             //       ref={servicesRef}
//             //       className="relative flex items-center gap-1 cursor-pointer"
//             //       onClick={() => setOpenServices((p) => !p)}
//             //     >
//             //       <span className="text-[18px] font-normal text-text-black hover:text-[#A20602] transition-colors">
//             //         {l.title}
//             //       </span>

//             //       <ChevronDown
//             //         size={16}
//             //         className={`mt-0.5 transition-transform ${
//             //           openServices ? "rotate-180 text-[#A20602]" : ""
//             //         }`}
//             //       />

//             //       {openServices && (
//             //         <div
//             //           className="
//             //             absolute top-full left-0 mt-3
//             //             w-[220px]
//             //             rounded-xl
//             //             bg-white
//             //             border border-[#0000000F]
//             //             shadow-lg
//             //             py-2
//             //             z-50
//             //           "
//             //         >
//             //           {serviceLinks.map((s) => (
//             //             <ServiceNavigationItem
//             //               key={s.title}
//             //               icon={s.icon as keyof typeof Icons}
//             //               title={s.title}
//             //               href={s.href}
//             //             />
//             //           ))}
//             //         </div>
//             //       )}
//             //     </li>
//             //   );
//             // }

//             // NORMAL LINKS
//             return (
//               <li key={i} className="flex items-center gap-1 cursor-pointer">
//                 <Link
//                   href={l.router}
//                   className={`text-[18px] font-normal leading-[120%] tracking-[-2%] transition-colors ${
//                     pathname === l.router
//                       ? "text-[#A20602]"
//                       : "text-text-black hover:text-[#A20602]"
//                   }`}
//                 >
//                   {l.title}
//                 </Link>
//               </li>
//             );
//           })}

//           <LanguageSwitcher />
//         </ul>

//         {renderCtaButtons()}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;