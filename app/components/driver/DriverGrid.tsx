// import { CheckCircleIcon } from "lucide-react";
// import Image from "next/image";
// import { useTranslations } from "next-intl";
// import { driverContent, rider } from "@/app/utils/Content";
// import SubTitle from "../ui/Subtitle";

// export default function DiverGrid() {
//   return (
//     <section className="w-full bg-white">
//       <div className="container py-[32px] md:py-[50px] lg:py-[72px]">
//         <div className="flex items-center justify-center flex-col mb-[58px]">
//           <div className="mb-[24px]">
//             <SubTitle text="Guides" css="rounded-[40px] font-normal" />
//           </div>
//           <h2>How riding with AnyRide works</h2>
//           <p className="max-w-[569px] w-full text-center mx-auto text-[18px] leading-[160%] tracking-[-2%] text-[#333333]">
//             Book safe, affordable rides with verified drivers using cars or
//             motorcycles — all from one simple app.
//           </p>
//         </div>
//         <div className="space-y-20">
//           {driverContent.map((category, index) => (
//             <div
//               key={index}
//               className={`grid items-center gap-10 md:grid-cols-1 lg:grid-cols-2 ${
//                 index % 2 === 0 ? "" : ""
//               }`}
//             >
//               {/* Image */}
//               <div
//                 className={`relative order-1 min-h-[240px] w-full max-w-full overflow-hidden rounded-lg ${
//                   index % 2 === 0 ? "md:order-1 lg:order-2" : ""
//                 } md:h-[280px]`}
//               >
//                 <Image
//                   src={`/images/Driver-${index + 1}.png`}
//                   alt={category.img}
//                   fill
//                   className="object-cover h-full w-full"
//                 />
//               </div>

//               {/* Text */}
//               <div
//                 className={`${
//                   index % 2 === 0 ? "order-2 md:order-1" : "order-2"
//                 }`}
//               >
//                 <h3 className="mb-4 text-[32px] font-semibold text-[#0A0A23]">
//                   {category.title}
//                 </h3>

//                 <p className="text-[16px] font-normal tracking-[-2%] leading-[160%] text-[#333333]">{category.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import SubTitle from "../ui/Subtitle";

interface DriverStep {
  title: string;
  description: string;
  image: string;
}

const getDriverSteps = (t: ReturnType<typeof useTranslations>): DriverStep[] => [
  {
    title: t("guides.steps.step1.title"),
    description: t("guides.steps.step1.description"),
    image: "/images/Driver-1.png",
  },
  {
    title: t("guides.steps.step2.title"),
    description: t("guides.steps.step2.description"),
    image: "/images/Driver-2.png",
  },
  {
    title: t("guides.steps.step3.title"),
    description: t("guides.steps.step3.description"),
    image: "/images/Driver-3.png",
  },
  {
    title: t("guides.steps.step4.title"),
    description: t("guides.steps.step4.description"),
    image: "/images/Driver-4.png",
  },
];

export default function DriverGrid() {
  const t = useTranslations("DriversPage");
  const driverSteps: DriverStep[] = getDriverSteps(t);

  return (
    <section className="w-full bg-white">
      <div className="container py-[32px] md:py-[50px] lg:py-[72px]">
        <div className="flex items-center justify-center flex-col mb-[58px]">
          <div className="mb-[24px]">
            <SubTitle text={t("guides.subtitle")} css="rounded-[40px] font-bold" />
          </div>
          <h2>{t("guides.title")}</h2>
          <p className="max-w-[569px] w-full text-center mx-auto text-[18px] leading-[160%] tracking-[-2%] text-[#333333]">
            {t("guides.description")}
          </p>
        </div>

        <div className="space-y-20">
          {driverSteps.map((step: DriverStep, index: number) => (
            <div
              key={index}
              className={`grid items-center gap-10 md:grid-cols-1 lg:grid-cols-2`}
            >
              {/* Image */}
              <div
                className={`relative order-1 min-h-[240px] w-full max-w-full overflow-hidden rounded-lg md:h-[280px] ${
                  index % 2 === 0 ? "md:order-1 lg:order-2" : ""
                }`}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover h-full w-full"
                />
              </div>

              {/* Text */}
              <div
                className={`${index % 2 === 0 ? "order-2 md:order-1" : "order-2"}`}
              >
                <h3 className="mb-4 text-[32px] font-semibold text-[#0A0A23]">
                  {step.title}
                </h3>
                <p className="text-[16px] font-normal tracking-[-2%] leading-[160%] text-[#333333]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
