// "use client";

// import Image from "next/image";
// import SubTitle from "../ui/Subtitle";
// import { benefitsDriver } from "@/app/utils/Content";

// export default function BenefitDriver() {
//   return (
//     <section className="py-[32px] md:py-[50px] lg:py-[96px]">
//       <div className="container">
//         <div className="flex items-center justify-center">
//           <SubTitle
//             text="Benefits"
//             css="font-bold text-[16px] leading-[160%] tracking-[-2%]"
//           />
//         </div>
//         <h2 className="text-center">Why Drive with AnyRide</h2>
//         <p className="text-[#545454] text-[18px] tracking-[-2%] leading-[160%] font-normal text-center mb-[40px]">
//           Built for drivers like you
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-y-[50px]">
//           <div className="flex flex-col gap-6 lg:gap-6 items-start">
//             {benefitsDriver.map((feature, index) => (
//               <div
//                 key={index}
//                 className="w-full h-[138px] max-w-full rounded-lg py-[26px] md:py-[15.5px] lg:py-[25.5px] px-[30px] md:px-[40px] lg:px-[50px]"
//                 style={{ backgroundColor: feature.color }}
//               >
//                 <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
//                   {/* Number */}
//                   <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#A20602] font-bold leading-none flex-shrink-0">
//                     {feature.number}
//                   </h3>
//                   {/* Text */}
//                   <div>
//                     <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#010418] font-semibold leading-tight mb-2">
//                       {feature.title}
//                     </h3>
//                     <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
//                       {feature.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex items-center justify-center">

//           <div className="h-[567px] w-[276px]">
//             <Image
//               src="/images/Ride-1.png"
//               width={500}
//               height={500}
//               alt="phone showing price"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { useTranslations } from "next-intl"; // import for localization
import SubTitle from "../ui/Subtitle";
import { benefitsDriver } from "@/app/utils/Content";

export default function BenefitDriver() {
  const t = useTranslations("DriversPage.benefits"); // translate under "DriversPage.benefits"

  return (
    <section className="py-[32px] md:py-[50px] lg:py-[96px]">
      <div className="container">
        {/* Subtitle */}
        <div className="flex items-center justify-center">
          <SubTitle
            text={t("subtitle")}
            css="font-bold text-[16px] leading-[160%] tracking-[-2%]"
          />
        </div>

        {/* Title */}
        <h2 className="text-center">{t("title")}</h2>

        {/* Description */}
        <p className="text-[#545454] text-[18px] tracking-[-2%] leading-[160%] font-normal text-center mb-[40px]">
          {t("description")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-y-[50px]">
          {/* Features */}
          <div className="flex flex-col gap-6 lg:gap-6 items-start">
            {benefitsDriver.map((feature, index) => (
              <div
                key={index}
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
                      {t(`items.${index}.title`)}
                    </h3>
                    <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                      {t(`items.${index}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Phone Image */}
          <div className="flex items-center justify-center">
            <div className="h-[567px] w-[276px]">
              <Image
                src="/images/Ride-1.png"
                width={500}
                height={500}
                alt="picture of phone with the location"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
