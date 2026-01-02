"use client";

import SubTitle from "../ui/Subtitle";
import WaitForm from "./WaitForm";
import { useTranslations } from "next-intl";

export default function HeroWaitList() {
  const t = useTranslations("WaitlistPage.hero");
  return (
    <section
      className="min-h-screen w-full"
      style={{
        background:
          "linear-gradient(340.53deg, #010418 34.88%, #48050E 58.35%, #980400 82.94%)",
      }}
    >
      <div className="container pt-[200px]">
        <div className="flex items-center justify-center mb-[24px]">
          <SubTitle img="/icons/SVG.png" text={t("subtitle")} />
        </div>
        <h2 className="text-white text-center mb-[16px]">{t("title")}</h2>
        <p className="text-[16px] md:text-[18px] text-white font-normal tracking-[-2%] leading-[160%] text-center">{t("description")}</p>

        <WaitForm />
      </div>
    </section>
  );
}
