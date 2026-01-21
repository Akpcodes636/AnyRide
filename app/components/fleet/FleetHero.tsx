"use client";

import Button from "../ui/Button";
import { useTranslations } from "next-intl";

export default function FleetHero() {
  const t = useTranslations("fleetOwner.hero");

  return (
    <section className="h-screen bg-fleet">
      <div className="container py-[250px]">
        <div>
          <div className="flex items-center justify-center flex-col mb-[20px] md:mb-[38px] lg:mb-[58px]">
            <h2 className="text-[#FFFFFF] text-center w-full max-w-[500px]">
              {t("title")}
            </h2>
            <p className="text-center leading-[160%] tracking-[-2%] text-[#E6E6EB] text-[16px] md:text-[18px] w-full max-w-[500px]">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Button css="" style="danger" type="button">
              {t("cta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
