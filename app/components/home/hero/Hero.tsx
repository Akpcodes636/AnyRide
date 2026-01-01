"use client";

import SubTitle from "../../ui/Subtitle";
import HeroSearch from "./HeroSearch";
import { useTranslations } from "next-intl"; // use next-intl, NOT next-i18next

const Hero = () => {
  const t = useTranslations("HomePage.hero"); // points to hero inside HomePage in your JSON

  return (
    <div>
      <section className="w-full bg-hero">
        <div className="pt-27.5 md:pt-30 lg:pt-55 pb-20">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6">
              <SubTitle
                img="/icons/SVG.png"
                text={t("tagline")} // notice: no "hero." here
                css="rounded-[40px] font-normal"
              />
            </div>
            <h1 className="text-text-white text-[40px] md:text-[50px] lg:text-[64px] font-bold leading-[120%] tracking-[-5%] text-center w-full max-w-74 md:max-w-74 lg:max-w-[596px] xl:max-w-[696px] mx-auto mb-[17.14px] md:mb-6">
              {t("title")}
            </h1>
            <p className="text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] text-text w-full max-w-75 md:max-w-101.25 lg:max-w-126.25 xl:max-w-157 mx-auto text-center text-gray-300 mb-7 md:mb-10 lg:mb-10">
              {t("description")}
            </p>

            <HeroSearch />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
