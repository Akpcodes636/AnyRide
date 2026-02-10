"use client";

import { useTranslations, useLocale } from "next-intl";
import Button from "../ui/Button";

const HeroRider = () => {
  const t = useTranslations("RiderPage.hero");
  const locale = useLocale();

  return (
   <section className="bg-cover h-screen bg-center bg-no-repeat bg-red-600"style={{ backgroundImage: "url('/images/rider-1.jpg')" }}>
      <div className="flex items-center justify-center min-h-screen container">
        <div className="">
          <div>
            <h1 className="text-[32px] md:text-[50px] lg:text-[64px] text-white font-bold text-center leading-[120%] tracking-[-5%] max-w-[750px] mx-auto mb-[16px]">
              {t("title")}
              {t("subtitle")}
            </h1>

            <p className="text-[#E6E6EB] text-[18px] leading-[160%] tracking-[-2%] text-center max-w-[673px] mx-auto mb-[32px]">
              {t("description")}
            </p>

            <div className="flex items-center justify-center">
              <Button style="danger" type="button">
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroRider;
