// "use client";

// import Image from "next/image";
// import SubTitle from "../ui/Subtitle";
// import { benefits } from "@/app/utils/Content";

// export default function Benefits() {
//   return (
//     <section className="py-[32px] md:py-[50px]  lg:py-[88px]">
//       <div className="container">
//         <div className="grid grid-col-1 md:grid-cols-1 lg:grid-cols-2 gap-[18px]">
//           <div className="w-full h-full">
//             <div className="w-full max-w-full max-w-full lg:max-w-[512px] h-[830px] bg-[#F5F5F7] flex items-center justify-center">
//               <div className="w-[358px] h-[712px]">
//                 <Image
//                   src="/images/Ridegh.png"
//                   width={500}
//                   height={500}
//                   alt="an image of mobile phones"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="w-full h-full">
//             <div className="mb-[16px]">
//               <SubTitle text="Benefits" />
//             </div>
//             <h2 className="w-full max-w-[620px] mb-[40px]">
//               Why Riders <br /> Choose AnyRide
//             </h2>
//             <div>
//               <div className="">
//                 {/* Left: Features */}
//                 <div className="flex flex-col gap-6 lg:gap-6 items-start">
//                   {benefits.map((feature, index) => (
//                     <div
//                       key={index}
//                       className="w-full h-[138px] max-w-full rounded-lg py-[26px] md:py-[15.5px] lg:py-[25.5px] px-[30px] md:px-[40px] lg:px-[50px]"
//                       style={{backgroundColor:feature.color}}
//                     >
//                       <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
//                         {/* Number */}
//                         <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#A20602] font-bold leading-none flex-shrink-0">
//                           {feature.number}
//                         </h3>
//                         {/* Text */}
//                         <div>
//                           <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#010418] font-semibold leading-tight mb-2">
//                             {feature.title}
//                           </h3>
//                           <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
//                             {feature.description}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import SubTitle from "../ui/Subtitle";
import { benefits } from "@/app/utils/Content";
import { useTranslations } from "next-intl";

export default function Benefits() {
  const t = useTranslations("RiderPage.benefits"); // scoped to benefits

  return (
    <section className="py-[32px] md:py-[50px] lg:py-[88px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[18px]">
          {/* Image */}
          <div className="w-full h-full">
            <div className="w-full max-w-full lg:max-w-[512px] h-[830px] bg-[#F5F5F7] flex items-center justify-center">
              <div className="w-[358px] h-[712px]">
                <img
                  src="/icons/Ridegh.svg"
                  width={500}
                  height={500}
                  alt={t("title")}
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="w-full h-full">
            <div className="mb-[16px]">
              <SubTitle text={t("subtitle")} />
            </div>
            <h2 className="w-full max-w-[620px] mb-[40px]">
              {t("title")}
            </h2>

            <div className="flex flex-col gap-6 lg:gap-6 items-start">
              {benefits.map((feature) => (
                <div
                  key={feature.key}
                  className="w-full min-h-[138px] max-w-full rounded-lg py-[26px] md:py-[15.5px] lg:py-[25.5px] px-[30px] md:px-[40px] lg:px-[50px]"
                  style={{ backgroundColor: feature.color }}
                >
                  <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
                    {/* Number */}
                    <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#A20602] font-bold leading-none flex-shrink-0">
                      {feature.number}
                    </h3>

                    {/* Text */}
                    <div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#010418] font-semibold leading-tight mb-2">
                        {t(`items.${feature.key}.title`)}
                      </h3>
                      <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                        {t(`items.${feature.key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
