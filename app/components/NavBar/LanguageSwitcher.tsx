// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { Globe, ChevronDown } from "lucide-react";
// import { useRouter, usePathname } from "next/navigation";

// const languages = [
//   {
//     code: "en",
//     label: "English",
//     flag: "/icons/Uk.svg",
//   },
//   {
//     code: "fr",
//     label: "French",
//     flag: "/icons/fr.svg",
//   },
//   {
//     code: "sw",
//     label: "Swahili",
//     flag: "/icons/kenya.svg",
//   },
// ];

// const LanguageSwitcher = () => {
//   const [open, setOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();

//   // close on outside click
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const changeLanguage = (locale: string) => {
//     router.push(`/${locale}${pathname}`);
//     setOpen(false);
//   };

//   return (
//     <div ref={ref} className="relative">
//       {/* Trigger */}
//       <button
//         onClick={() => setOpen((p) => !p)}
//         className="
//           flex items-center gap-2
//           bg-[#F5F5F7]
//           h-[56px]
//           px-4
//           rounded-full cursor-pointer
//         "
//       >
//         <Globe size={16} />
//         <span
//           className="
//             font-sora
//             text-[16px]
//             font-normal
//             leading-[160%]
//             tracking-[-2%]
//             text-text-accent
//           "
//         >
//           EN
//         </span>
//         <ChevronDown
//           size={14}
//           className={`transition-transform ${
//             open ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {/* Dropdown */}
//       {open && (
//         <div
//           className="
//             absolute top-full right-0 mt-3
//             w-[190px]
//             rounded-[16px]
//             bg-white
//             p-[24px]
//             z-50
//           "
//           style={{
//             boxShadow: "0px 4px 33.9px 0px #0000003D",
//           }}
//         >
//           <div className="flex flex-col gap-4">
//             {languages.map((lang) => (
//               <button
//                 key={lang.code}
//                 onClick={() => changeLanguage(lang.code)}
//                 className="
//                   flex items-center gap-3
//                   text-left
//                   hover:opacity-80
//                 "
//               >
//                 <Image
//                   src={lang.flag}
//                   alt={lang.label}
//                   width={32}
//                   height={32}
//                 />

//                 <span
//                   className="
//                     font-sora
//                     text-[18px]
//                     font-normal
//                     leading-[160%]
//                     tracking-[-2%]
//                     text-[#02093A]
//                   "
//                 >
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
import Image from "next/image";
import { Globe, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "en", label: "English", flag: "/en/uk.svg" },
  { code: "fr", label: "French", flag: "/en/fr.svg" },
  { code: "sw", label: "Swahili", flag: "/en/kenya.svg" },
];

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLanguage = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 bg-[#F5F5F7] h-[56px] px-4 rounded-full"
      >
        <Globe size={16} />
        <span className="font-sora text-[16px]">
          {currentLocale?.toUpperCase()}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="
            absolute top-full right-0 mt-3
            w-[190px]
            rounded-[16px]
            bg-white
            p-[24px]
            z-50
          "
          style={{ boxShadow: "0px 4px 33.9px 0px #0000003D" }}
        >
          <div className="flex flex-col gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className="flex items-center gap-3 text-left"
              >
                <Image src={lang.flag} alt={lang.label} width={32} height={32} />
                <span className="font-sora text-[18px]">
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
