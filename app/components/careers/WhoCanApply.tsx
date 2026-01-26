"use client";

import SubTitle from "../ui/Subtitle";
import { useTranslations } from "next-intl";

export default function WhoCanApply() {
 const t = useTranslations("WhoCanApply");

  return (
    <section className="bg-[#010418]">
      <div className="container mx-auto">
        <div className="pt-[32px] pb-[60px]">
          <div className="flex items-center justify-center mb-[8px]">
            <SubTitle text={t("subtitle")} bg="#A2060233" css="text-[#C15855] font-bold"  />
          </div>
          <h2 className="text-white text-center mb-[32px]">{t("title")}</h2>
          <p className="text-[#E6E6E6] text-[16px] md:text-[18px] text-center font-normal tracking-[-2%] leading-[160%] w-full max-w-[800px] mx-auto">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}
