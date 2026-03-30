// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Globe, ChevronDown } from "lucide-react";
// import { usePathname, useRouter } from "next/navigation";

// const languages = [
//   { code: "en", label: "English", flag: "/en/Uk.svg" },
//   { code: "fr", label: "French", flag: "/en/fr.svg" },
//   { code: "sw", label: "Swahili", flag: "/en/kenya.svg" },
//   { code: "ln", label: "Lingala", flag: "/en/congo.svg" },
// ];

// const LanguageSwitcher = () => {
//   const [open, setOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();

//   const currentLocale = pathname.split("/")[1];

//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const switchLanguage = (locale: string) => {
//     const segments = pathname.split("/");
//     segments[1] = locale;
//     router.push(segments.join("/"));
//     setOpen(false);
//   };

//   const currentLang = languages.find((l) => l.code === currentLocale) || languages[0];

//   return (
//     <div ref={ref} className="relative">
//       <button
//         onClick={() => setOpen((p) => !p)}
//         className="flex items-center gap-1.5 md:gap-2 bg-[#F5F5F7] h-[42px] md:h-[56px] px-3 md:px-4 rounded-full transition-all active:scale-95 shadow-sm"
//       >
//         <img
//           src={currentLang.flag}
//           alt={currentLang.label}
//           className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover border border-gray-200"
//         />
//         <span className="font-sora text-[14px] md:text-[16px] font-semibold text-gray-800">
//           {currentLocale?.toUpperCase() || "EN"}
//         </span>
//         <ChevronDown
//           size={14}
//           className={`transition-transform text-gray-400 ${open ? "rotate-180" : ""}`}
//         />
//       </button>

//       {open && (
//         <div
//           className="
//             absolute top-full right-0 mt-2 md:mt-3
//             w-[160px] md:w-[190px]
//             rounded-[12px] md:rounded-[16px]
//             bg-white
//             p-4 md:p-6
//             z-50
//           "
//           style={{ boxShadow: "0px 4px 33.9px 0px #0000003D" }}
//         >
//           <div className="flex flex-col gap-3 md:gap-4">
//             {languages.map((lang) => (
//               <button
//                 key={lang.code}
//                 onClick={() => switchLanguage(lang.code)}
//                 className="flex items-center gap-2.5 md:gap-3 text-left hover:bg-gray-50 p-1 md:p-0 rounded-lg transition-colors"
//               >
//                 <img src={lang.flag} alt={lang.label} className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover" />
//                 <span className="font-sora text-[15px] md:text-[18px] text-gray-700">
//                   {lang.label}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LanguageSwitcher;



"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const languages = [
  { code: "en", label: "English", flag: "/en/us.webp" },
  { code: "fr", label: "French", flag: "/en/fr.svg" },
  { code: "sw", label: "Swahili", flag: "/en/kenya.svg" },
  { code: "ln", label: "Lingala", flag: "/en/congo.svg" },
];

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale(); // ✅ correct source of truth

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLanguage = (nextLocale: string) => {
    router.push(pathname, { locale: nextLocale });
    setOpen(false);
  };

  const currentLang =
    languages.find((l) => l.code === locale) || languages[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 bg-[#F5F5F7] h-[42px] md:h-[56px] px-4 rounded-full shadow-sm"
      >
        <img
          src={currentLang.flag}
          alt={currentLang.label}
          className="w-6 h-6 rounded-full object-cover border"
        />
        <span className="font-sora font-semibold text-gray-800">
          {locale.toUpperCase()}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-3 w-[190px] rounded-[16px] bg-white p-6 z-50"
          style={{ boxShadow: "0px 4px 33.9px 0px #0000003D" }}
        >
          <div className="flex flex-col gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1 transition"
              >
                <img
                  src={lang.flag}
                  alt={lang.label}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-sora text-[18px] text-gray-700">
                  {lang.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;


