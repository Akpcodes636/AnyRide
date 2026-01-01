"use client";

import { useTranslations } from "next-intl";
import HeroSearchDesktop from "../home/hero/HeroSearchDesktop";
import HeroSearchMobile from "../home/hero/HeroSearchMobile";
import SubTitle from "../ui/Subtitle";
import WhereWeOperateCard from "../ui/WhereWeOperateCard";

export default function WhereWeOperate() {
  const t = useTranslations("AboutPage.whereWeOperate");

  return (
    <section className="bg-[#010418] py-[32px] md:py-[50px] lg:py-[72px]">
      <div className="container">
        <div>
          <div className="flex items-center justify-center mb-[24px]">
            <SubTitle
              text={t("title")}
              css="bg-[#A206021A] text-[#C15855] font-bold leading-[160%] tracking-[-2%] text-[#C15855]"
            />
          </div>

          <h2 className="text-white text-center mb-[16px] w-full max-w-[335px] mx-auto md:max-w-full lg:max-w-full">
            {t("subtitle")}
          </h2>

          <p className="text-[#B5B5B5] text-[16px] text-center w-full max-w-[335px] mx-auto md:max-w-full lg:max-w-full mb-[32px]">
            {t("description")}
          </p>

          {/* Hero Search for mobile */}
          <div className="block md:hidden lg:hidden mb-[32px]">
            <HeroSearchMobile />
          </div>

          {/* Hero Search for desktop */}
          <div className="hidden md:block lg:block mb-[32px]">
            <HeroSearchDesktop />
          </div>

          {/* Optional WhereWeOperate Cards */}
          {/* <div>
            <WhereWeOperateCard />
          </div> */}
        </div>
      </div>
    </section>
  );
}
