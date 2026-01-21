"use client";

import { useTranslations } from "next-intl";

export default function FleetWhy() {
  const t = useTranslations("fleetOwner.benefits");

  const features = [1, 2, 3, 4, 5, 6].map((num) => ({
    number: num,
    title: t(`item${num}Title`),
    description: t(`item${num}Description`)
  }));

  return (
    <section>
      <div className="container mx-auto py-[40px] md:py-[72px]">
        <h2 className="max-w-[467px] w-full mx-auto text-center mb-[64px]">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 justify-center">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="w-full max-w-full md:max-w-full lg:max-w-[618px] h-[279px] bg-[#E6E6EB] rounded-lg flex duration-300"
            >
              <div className="flex items-center gap-6 p-[30px] md:p-[20px] lg:p-[40px]">
                {/* Number */}
                <h3 className="text-[40px] md:text-[64px] text-[#A20602] font-bold leading-none shrink-0">
                  {feature.number}
                </h3>

                {/* Text */}
                <div>
                  <h4 className="text-[25px] md:text-[35px] lg:text-[40px] text-[#333333] font-semibold leading-[120%] tracking-[-5%] mb-[15px]">
                    {feature.title}
                  </h4>

                  <p className="text-base text-[#333333] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
