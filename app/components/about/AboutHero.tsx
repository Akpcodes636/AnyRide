"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import SubTitle from "../ui/Subtitle";
import AboutCards from "../ui/AboutCard";

export default function AboutHero() {
  const t = useTranslations("AboutPage.hero"); // points to AboutPage.hero in your JSON

  return (
    <section>
      <div className="container">
        <div className="py-[131px] md:pt-[150px] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-x-[39px]">
          <div className="flex items-start justify-center flex-col">
            <div className="mb-[8px]">
              <SubTitle
                text={t("title")} // localized title
                css="text-[#C15855] font-bold leading-[160%] tracking-[-2%]"
              />
            </div>
            <h1 className="text-[40px] text-text-accent leading-[120%] tracking-[-5%] font-bold mb-[16px]">
              {t("subtitle")} {/* localized subtitle */}
            </h1>
            <p className="text-[#8B8EA4] text-[16px] font-normal leading-[160%] tracking-[-2%] mb-[32px] md:mb-[32px] lg:mb-[72px]">
              {t("description")} {/* localized description */}
            </p>

            {/* AboutCards component can also be localized internally if it has text */}
            <AboutCards />
          </div>

          <div className="h-[377px] md:h-[377px] lg:h-[778px] xl:h-[578px]">
            <Image
              src="/images/AboutHero.png"
              width={500}
              height={500}
              alt={t("title")} // localized alt
              className="w-full h-full object-cover rounded-[8px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
