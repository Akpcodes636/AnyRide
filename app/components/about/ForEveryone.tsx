"use client";

import { useTranslations } from "next-intl";
import SubTitle from "../ui/Subtitle";
import WhereWeOperateCard from "../ui/WhereWeOperateCard";

export default function ForEveryone() {
  const t = useTranslations("AboutPage.forEveryone");

  // Get the raw categories array
  const categories = t.raw("categories") as {
    type: string;
    description: string;
    icon:string;
    subtitle:string;
  }[];

  return (
    <section className="py-[32px] md:py-[50px] lg:py-[72px]">
      <div className="container">
        <div>
          <div className="flex items-center justify-center mb-[24px]">
            <SubTitle
              text={t.raw("title") as string}
              css="font-bold text-[16px] leading-[160%] tracking-[-2%] text-[#C15855]"
            />
          </div>

          <h2 className="text-center mb-[16px] w-full max-w-[335px] mx-auto md:max-w-full lg:max-w-full">
            {t.raw("subtitle") as string}
          </h2>

          <p className="text-center font-normal text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] text-[#545454] max-w-[335px] w-full mx-auto md:max-w-full lg:max-w-full">
            {t.raw("description") as string}
          </p>

          <div className="flex flex-col gap-4 md:flex-col lg:flex-row md:gap-6 pt-[32px] md:pt-[48px]">
            {categories.map((item) => (
              <WhereWeOperateCard
              subtitle={item.subtitle}
                icon={item.icon}
                key={item.type}
                title={item.type}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
