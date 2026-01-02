// "use client";

// import Image from "next/image";
// import SubTitle from "../ui/Subtitle";

// export default function Trust() {
//   return (
//     <section className="py-[32px] md:py-[50px] lg:py-[72px]">
//       <div className="container">
//         <div className="mb-[24px] md:mb-[52px] lg:mb-[76px]">
//           <div className="flex items-center justify-center mb-[24px]">
//             <SubTitle
//               text="Trust & safety"
//               css="text-[#C15855] font-bold text-[14px] leading-[160%] tracking-[-2%]"
//             />
//           </div>
//           <h2 className="w-full max-w-[325px] md:max-w-full lg:max-w-full mx-auto text-center mb-[16px]">
//             Accountability is built in
//           </h2>
//           <p className="text-[16px] md:text-[18px] font-normal tracking-[-2%] leading-[160%] text-center text-[#545454]">
//             Verification, ratings, and clear status signals — designed to build
//             confidence.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[20px]">
//           <div>
//             <Image
//               src="/icons/Rating.svg"
//               alt="rating"
//               width={500}
//               height={500}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div>
//             <div>
//             <Image
//               src="/icons/Verfication.svg"
//               alt="rating"
//               width={500}
//               height={500}
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

import SubTitle from "../ui/Subtitle";
import { useTranslations } from "next-intl";

export default function Trust() {
  const t = useTranslations("AboutPage.trustSafety");

  return (
    <section className="py-[32px] md:py-[50px] lg:py-[72px]">
      <div className="container">
        <div className="mb-[24px] md:mb-[52px] lg:mb-[76px]">
          <div className="flex items-center justify-center mb-[24px]">
            <SubTitle
              text={t("title")}
              css="text-[#C15855] font-bold text-[14px] leading-[160%] tracking-[-2%]"
            />
          </div>

          <h2 className="w-full max-w-[325px] md:max-w-full lg:max-w-full mx-auto text-center mb-[16px]">
            {t("subtitle")}
          </h2>

          <p className="text-[16px] md:text-[18px] font-normal tracking-[-2%] leading-[160%] text-center text-[#545454]">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[20px]">
          <div>
            <img
              src="/icons/Rating.svg"
              alt="rating"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <img
              src="/icons/Verfication.svg"
              alt="verification"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
