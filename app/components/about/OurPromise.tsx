
"use client";

import SubTitle from "../ui/Subtitle";
import { useTranslations } from "next-intl";

export default function OurPromise() {
  const t = useTranslations("AboutPage.ourPromise");

  return (
    <section className="py-[32px] md:py-[50px] lg:py-[72px]">
      <div className="container">
        <div>
          <div className="flex items-center justify-center mb-[24px]">
            <SubTitle
              text={t("title")}
              css="text-[#C15855] font-bold"
            />
          </div>

          <h2 className="text-center mb-[16px]">
            {t("title")}
          </h2>

          <p className="text-center text-[#545454] text-[18px] leading-[160%] tracking-[-2%]">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}
