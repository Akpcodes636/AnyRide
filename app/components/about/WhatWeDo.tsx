"use client";

import { useTranslations } from "next-intl";
import SubTitle from "../ui/Subtitle";

export default function WhatWeDo() {
  const t = useTranslations("AboutPage.whatWeDo");

  return (
    <section className="bg-[#010418]">
      <div className="container">
        <div className="flex flex-col items-center justify-center py-[32px]">
          <div className="mb-[8px]">
            <SubTitle
              text={t("title")}
              css="font-bold text-[16px] text-[#C15855] bg-[#A2060233]"
            />
          </div>
          <h2 className="text-white text-center mb-[32px]">{t("title")}</h2>
          <p className="text-center text-[#E6E6E6] text-[18px] leading-[160%] tracking-[-2%] font-normal">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}
