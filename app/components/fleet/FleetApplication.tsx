"use client";
import FleetContactForm from "../forms/FleetContactForm";
import { useTranslations } from "next-intl";

export default function FleetApplication() {
 const t = useTranslations("fleetOwner.forms")

  return (
    <section className="py-[40px] md:py-[50px] lg:py-[72px] bg-[#010418]" id="fleet">
      <div className="container mx-auto">
        {/* Localized title */}
        <h2 className="text-center text-white">{t("title")}</h2>

        {/* Localized header text */}
        <p className="text-center text-white text-[16px] md:text-[18px] font-normal leading-[160%] tracking-[-2%]">
          {t("header")}
        </p>

        <FleetContactForm />
      </div>
    </section>
  );
}
