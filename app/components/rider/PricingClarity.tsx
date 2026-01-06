// "use client";
// import { pricingClarity } from "@/app/utils/Content";
// import Image from "next/image";

// const PricingClient = () => {
//   return (
//     <section className="py-[32px] md:py-[50px] lg:py-[80px]">
//       <div className="container">
//         <div>
//           <h2 className="text-center">Pricing Clarity</h2>
//           <p className="text-center text-[#545454] text-[16px] md:text-[18px] font-normal leading-[160%] tracking-[-2%]">
//             Simple breakdown for trust (example values).
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 pt-[80px]">
//             {pricingClarity.map((i, l) => (
//               <div
//                 key={l}
//                 className="bg-[#F9EEEE] w-full max-w-full md:max-w-full lg:max-w-[405px] h-[150px] rounded-[6px]"
//               >
//                 <div className="p-4">
//                   <div className="flex items-center gap-[16px] mb-[16px]">
//                     <div className="w-[40px] h-[40px]">
//                       <Image
//                         src={i.img}
//                         width={40}
//                         height={40}
//                         className="w-full h-full object-cover"
//                         alt="icon"
//                       />
//                     </div>

//                     <div>
//                       <h3 className="text-[#02093A] text-[24px] leading-[160%] tracking-[-2%] font-bold">
//                         {i.title}
//                       </h3>
//                       <p className="text-[#555A7B] text-[16px] leading-[160%] tracking-[-2%]">
//                         {i.text}
//                       </p>
//                     </div>
//                   </div>

//                   <p className="text-[#02093A] text-[32px] leading-[120%] font-bold">
//                     {i.amount}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PricingClient;


// import { pricingClarity } from "@/app/utils/Content";
// import Image from "next/image";
// import { useTranslations } from "next-intl";

// const PricingClient = () => {
//   const t = useTranslations("RiderPage.pricing"); // assuming translations nested here

//   return (
//     <section className="py-8 md:py-12 lg:py-20">
//       <div className="container mx-auto">
//         <h2 className="text-center text-3xl font-bold">{t("title")}</h2>
//         <p className="text-center text-[#545454] text-base md:text-lg leading-relaxed mt-2">
//           {t("description")}
//         </p>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-16">
//           {pricingClarity.map((i) => (
//             <div
//               key={i.key}
//               className="bg-[#F9EEEE] w-full rounded-lg min-h-[150px]"
//             >
//               <div className="p-4 flex flex-col h-full justify-between">
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="w-10 h-10">
//                     <Image
//                       src={i.img}
//                       width={40}
//                       height={40}
//                       className="w-full h-full object-cover"
//                       alt={`${t(`plans.${i.key}.title`)} icon`}
//                     />
//                   </div>

//                   <div>
//                     <h3 className="text-[#02093A] text-xl font-bold">
//                       {t(`plans.${i.key}.title`)}
//                     </h3>
//                     <p className="text-[#555A7B] text-sm">
//                       {t(`plans.${i.key}.text`)}
//                     </p>
//                   </div>
//                 </div>

//                 <p className="text-[#02093A] text-2xl font-bold">
//                   {t(`plans.${i.key}.amount`)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PricingClient;

import { pricingClarity } from "@/app/utils/Content";
import Image from "next/image";
import { useTranslations } from "next-intl";

const PricingClient = () => {
  const t = useTranslations("RiderPage.pricing"); // scoped to RiderPage.pricing

  return (
    <section className="py-8 md:py-12 lg:py-20">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold">{t("title")}</h2>
        <p className="text-center text-[#545454] text-base md:text-lg leading-relaxed mt-2">
          {t("description")}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-16">
          {pricingClarity.map((i) => (
            <div
              key={i.key}
              className="bg-[#F9EEEE] w-full rounded-lg min-h-[150px]"
            >
              <div className="p-4 flex flex-col h-full justify-between">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10">
                    <Image
                      src={i.img}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                      alt={`${t(`plans.${i.key}.title`)} icon`} // fully localized alt
                    />
                  </div>

                  <div>
                    <h3 className="text-[#02093A] text-[24px] font-bold">
                      {t(`plans.${i.key}.title`)}  {/* fully localized */}
                    </h3>
                    <p className="text-[#555A7B] text-[16px]">
                      {t(`plans.${i.key}.text`)}  {/* fully localized */}
                    </p>
                  </div>
                </div>

                <p className="text-[#02093A] text-[32px] font-bold">
                  {t(`plans.${i.key}.amount`)} {/* fully localized */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingClient;
