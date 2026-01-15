"use client";

import SubTitle from "../ui/Subtitle";
import { useTranslations } from "next-intl";

type ValueItem = {
  number: string;
  title: string;
  description: string;
};

export default function OurValues() {
  const t = useTranslations("AboutPage.values");

  // 👇 raw() for arrays / objects
  const values = t.raw("items") as ValueItem[];

  return (
    <section className="bg-values">
      <div className="pt-[32px] pb-[32px] md:pt-[50px] md:pb-[50px] lg:pt-[80px] lg:pb-[125px]">
        <div className="container">
          <div className="mb-[8px] flex items-center justify-center">
            <SubTitle
              text={t("title")}
              css="bg-[#A2060233] text-[#C15855] font-bold"
            />
          </div>

          <h2 className="text-white text-center mb-[32px] md:mb-[48px]">
            {t("title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {values.map((feature) => (
              <div
                key={feature.number}
                className="w-full bg-gray-50 rounded-lg p-6 md:p-8 lg:p-10"
              >
                <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
                  {/* Number */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#A20602] font-bold leading-none flex-shrink-0">
                    {feature.number}
                  </h3>

                  {/* Text */}
                  <div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#010418] font-semibold leading-tight mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
