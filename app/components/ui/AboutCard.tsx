// import { aboutContent } from "@/app/utils/Content";
// import Image from "next/image";
// // import { aboutContent } from "@/data/aboutContent";

// export default function AboutCards() {
//   return (
//     <div className="w-full max-w-full mb-[28px]">
//     <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row gap-4">
//       {aboutContent.map((item, index) => (
//         <div
//           key={index}
//           className="flex flex-1 items-center gap-2.5 p-4 rounded-md"
//           style={{ backgroundColor: item.color }}
//         >
//           <div className="w-[40px] h-[40px] rounded-[5px]">
//             <Image
//               src={item.img}
//               width={40}
//               height={40}
//               className="w-full h-full object-cover"
//               alt={item.title}
//             />
//           </div>

//           <div>
//             <h3 className="text-[16px] md:text-[18px] text-text-accent font-bold leading-[160%] tracking-[-2%]">
//               {item.title}
//             </h3>
//             <p className="font-normal text-[12px] md:text-[14px] leading-[160%] tracking-[-2%] text-[#8B8EA4]">
//               {item.text}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//     </div>
//   );
// }


// "use client";

// import Image from "next/image";
// import { useTranslations } from "next-intl";

// export default function AboutCards() {
//   const t = useTranslations("AboutPage.services"); // points to services array in JSON
  

//   return (
//     <div className="w-full max-w-full mb-[28px]">
//       <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row gap-4">
//         {t("", { returnObjects: true }).map((item: { type: string; title: string }, index: number) => (
//           <div
//             key={index}
//             className="flex flex-1 items-center gap-2.5 p-4 rounded-md"
//             style={{ backgroundColor: "#F5F5F7" }} // optional, or you can store color in JSON
//           >
//             <div className="w-[40px] h-[40px] rounded-[5px]">
//               <Image
//                 src={`/images/${item.type.replace(/\s+/g, "")}.png`} // optional: dynamic image based on type
//                 width={40}
//                 height={40}
//                 className="w-full h-full object-cover"
//                 alt={item.title}
//               />
//             </div>

//             <div>
//               <h3 className="text-[16px] md:text-[18px] text-text-accent font-bold leading-[160%] tracking-[-2%]">
//                 {item.type} {/* localized type */}
//               </h3>
//               <p className="font-normal text-[12px] md:text-[14px] leading-[160%] tracking-[-2%] text-[#8B8EA4]">
//                 {item.title} {/* localized title/description */}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface AboutService {
  type: string;
  title: string;
}

export default function AboutCards() {
  const t = useTranslations("AboutPage");
  
  // Get services array from translations
  const services = t.raw("services") as AboutService[];

  // Define colors for each card
  const colors = ["#F9EEEE", "#F2F7FE", "#F0FBF4"];

  // Define images for each card
  const images = [
    "/icons/box.svg",      // or whatever your car icon path is
    "/icons/box-1.svg", // or whatever your motorcycle icon path is
    "/icons/box-2.svg"   // or whatever your verified icon path is
  ];

  return (
    <div className="w-full max-w-full mb-[28px]">
      <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row gap-4">
        {services.map((item, index) => (
          <div
            key={index}
            className="flex flex-1 items-center gap-2.5 p-4 rounded-md"
            style={{ backgroundColor: colors[index] }}
          >
            <div className="w-[40px] h-[40px] rounded-[5px]">
              <Image
                src={images[index]}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                alt={item.type}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] md:text-[18px] text-text-accent font-bold leading-[160%] tracking-[-2%]">
                {item.type}
              </h3>
              <p className="font-normal text-[12px] md:text-[14px] leading-[160%] tracking-[-2%] text-[#8B8EA4]">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}