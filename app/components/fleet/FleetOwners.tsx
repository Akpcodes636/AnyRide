"use client";

import SubTitle from "../ui/Subtitle";
import { useTranslations } from "next-intl";

export default function FleetOwner() {
  const t = useTranslations("fleetOwner.definition");

  return (
    <section className="bg-[#010418]">
      <div className="container py-[20px] md:py-[44px] lg:py-[50px]">
        <div>
          <div className="flex items-center justify-center mb-[16px]">
            <SubTitle
              text={t("label")}
              css="rounded-[40px] font-normal text-[#C15855]"
              bg="bg-[#A2060233]"
            />
          </div>

          <h2 className="text-white text-center font-bold">
            {t("title")}
          </h2>

          <p className="text-white font-normal text-[16px] md:text-[18px] text-center leading-[160%] tracking-[-2%]">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}
