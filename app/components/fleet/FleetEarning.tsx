"use client";
import { useTranslations } from "next-intl";

export default function FleetEarning() {
  const t = useTranslations("fleetOwner.earnings"); // note plural 'earnings' matches your JSON

  return (
    <section
      style={{
        background:
          "linear-gradient(340.53deg, #010418 34.88%, #48050E 58.35%, #980400 82.94%)",
      }}
      className="py-[72px]"
    >
      <div className="container mx-auto">
        <h2 className="text-center text-white mb-4">{t("title")}</h2>
        <p className="text-center text-white text-[16px] md:text-[18px] font-normal leading-[160%] tracking-[-2%]">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
