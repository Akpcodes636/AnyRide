// "use client";

// import React from "react";
// import Link from "next/link";
// import { useTranslations } from "next-intl";
// import Logo from "./ui/Logo";

// interface FooterLink {
//   label: string;
//   href: string;
// }

// interface FooterSection {
//   title: string;
//   links: FooterLink[];
// }

// interface FooterData {
//   description: string;
//   sections: {
//     company: FooterSection;
//     help: FooterSection;
//     legal: FooterSection;
//   };
//   copyright: string;
// }

// const Footer = () => {
//   const t = useTranslations("Footer");
//   const sections = t("sections", { returnObjects: true }) as FooterData["sections"];
//   console.log(sections);

//   return (
//     <footer className="w-full bg-[#F5F5F7]">
//       {/* Main Footer Content */}
//       <div className="container py-7.25 lg:py-18">
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
//           {/* Brand Section */}
//           <div className="space-y-4 max-w-full">
//             <div className="mb-7">
//               <Logo />
//             </div>
//             <p className="text-[16px] text-[#333333] leading-[160%] tracking-[-2%] w-full max-w-full md:max-w-118.75 lg:max-w-125 xl:max-w-102.5">
//               {t("description")}
//             </p>
//           </div>

//           {/* Footer Links */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 xl:gap-x-12 gap-y-6">
//             {/* Company */}
//             <div>
//               <h3 className="text-[#111111] font-semibold mb-4 text-[20px] sm:text-[24px]">
//                 {sections.company.title}
//               </h3>
//               <ul className="space-y-3">
//                 {sections.company.links.map((link) => (
//                   <li key={link.href}>
//                     <Link
//                       href={link.href}
//                       className="text-[#333333] hover:text-[#A20602] transition-colors text-[16px]"
//                     >
//                       {link.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Help */}
//             <div>
//               <h3 className="text-[#111111] font-semibold mb-4 text-[20px] sm:text-[24px]">
//                 {sections.help.title}
//               </h3>
//               <ul className="space-y-3">
//                 {sections.help.links.map((link) => (
//                   <li key={link.href}>
//                     <Link
//                       href={link.href}
//                       className="text-[#333333] hover:text-[#A20602] transition-colors text-[16px]"
//                     >
//                       {link.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Legal */}
//             <div>
//               <h3 className="text-[#111111] font-semibold mb-4 text-[20px] sm:text-[24px]">
//                 {sections.legal.title}
//               </h3>
//               <ul className="space-y-3">
//                 {sections.legal.links.map((link) => (
//                   <li key={link.href}>
//                     <Link
//                       href={link.href}
//                       className="text-[#333333] hover:text-[#A20602] transition-colors text-[16px]"
//                     >
//                       {link.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-gray-300">
//         <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-center gap-4">
//           <p className="text-[16px] text-gray-600 text-center">
//             {t("copyright")}{" "}
//             <Link
//               href="https://techenex.com"
//               className="text-[#333333] leading-[160%] text-[16px] tracking-[-2%] font-bold"
//             >
//               Techenex
//             </Link>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// "use client";

// import React from "react";
// import Link from "next/link";
// import { useTranslations, useLocale } from "next-intl";
// import Logo from "./ui/Logo";

// interface FooterLink {
//   label: string;
//   href: string;
// }

// interface FooterSection {
//   title: string;
//   links: FooterLink[];
// }

// interface FooterData {
//   description: string;
//   sections: {
//     company: FooterSection;
//     help: FooterSection;
//     legal: FooterSection;
//   };
//   copyright: string;
// }

// const Footer = () => {
//   const t = useTranslations("Footer");
//   const locale = useLocale();

//   // Get sections directly from translation data
//   let sections = t.raw("sections") as FooterData["sections"];

//   // Filter out unwanted links
//   // const unwantedLabels = ["Support", "Safety", "Pricing", "Cities", "Cookies", "Sécurité", "Tarification", "Villes", "Usalama", "Bei", "Miji", "Vidakuzi"];

//   sections = {
//     company: {
//       ...sections.company,
//       links: sections.company.links.map(link => 
//         link.label === "Blog" ? { ...link, href: `/${locale}` } : link
//       ).filter(link => !unwantedLabels.includes(link.label))
//     },
//     help: {
//       ...sections.help,
//       links: sections.help.links.filter(link => !unwantedLabels.includes(link.label))
//     },
//     legal: {
//       ...sections.legal,
//       links: sections.legal.links.filter(link => !unwantedLabels.includes(link.label))
//     }
//   };

//   return (
//     <footer className="w-full bg-[#F5F5F7]">
//       {/* Main Footer Content */}
//       <div className="container py-7.25 lg:py-18">
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
//           {/* Brand Section */}
//           <div className="space-y-4 max-w-full">
//             <div className="mb-7">
//               <Logo />
//             </div>
//             <p className="text-[16px] text-[#333333] leading-[160%] tracking-[-2%] w-full max-w-full md:max-w-118.75 lg:max-w-125 xl:max-w-102.5">
//               {t("description")}
//             </p>
//           </div>

//           {/* Footer Links */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 xl:gap-x-12 gap-y-6">
//             {Object.values(sections)
//               .filter(section => section.title !== "Help")
//               .map((section) => (
//               <div key={section.title}>
//                 <h3 className="text-[#111111] font-semibold mb-4 text-[20px] sm:text-[24px]">
//                   {section.title}
//                 </h3>
//                 <ul className="space-y-3">
//                   {section.links.map((link) => (
//                     <li key={link.href}>
//                       <Link
//                         href={link.href}
//                         className="text-[#333333] hover:text-[#A20602] transition-colors text-[16px]"
//                       >
//                         {link.label}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-gray-300">
//         <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-center gap-4">
//           <p className="text-[16px] text-gray-600 text-center">
//             {t("copyright")}{" "}
//             <Link
//               href="https://techenex.com"
//               className="text-[#333333] leading-[160%] text-[16px] tracking-[-2%] font-bold"
//             >
//               Techenex
//             </Link>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Logo from "./ui/Logo";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterData {
  description: string;
  sections: {
    company: FooterSection;
    help: FooterSection;
    legal: FooterSection;
  };
  copyright: string;
}

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();

  const sections = t.raw("sections") as FooterData["sections"];

  // Optional: Make Blog route locale-aware
  const normalizedSections = {
    ...sections,
    company: {
      ...sections.company,
      links: sections.company.links.map(link =>
        link.label === "Blog"
          ? { ...link, href: `/${locale}` }
          : link
      ),
    },
  };

  return (
    <footer className="w-full bg-[#F5F5F7]">
      {/* Main Footer Content */}
      <div className="container py-7.25 lg:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">

          {/* Brand Section */}
          <div className="space-y-4">
            <div className="mb-7">
              <Logo />
            </div>
            <p className="text-[16px] text-[#333333] leading-[160%] tracking-[-2%] max-w-[520px]">
              {t("description")}
            </p>
            <div className="pt-2">
              Email:  <a
                href={`mailto:${t("contactEmail")}`}
                className="text-[16px] text-[#A20602] font-semibold hover:underline"
              >
                {t("contactEmail")}
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 xl:gap-x-12">
            {Object.values(normalizedSections).map(section => (
              <div key={section.title}>
                <h3 className="text-[#111111] font-semibold mb-4 text-[20px] sm:text-[24px]">
                  {section.title}
                </h3>

                <ul className="space-y-3">
                  {section.links.map(link => (
                    <li key={`${section.title}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-[#333333] hover:text-[#A20602] transition-colors text-[16px]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300">
        <div className="px-4 sm:px-6 lg:px-8 py-6 flex justify-center">
          <p className="text-[16px] text-gray-600 text-center">
            © {new Date().getFullYear()} {t("copyright")}{" "}
            <Link
              href="https://techenex.com"
              className="font-bold text-[#333333] cursor-pointer"
            >
              Techenex
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
