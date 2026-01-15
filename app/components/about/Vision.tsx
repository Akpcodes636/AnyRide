"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import SubTitle from "../ui/Subtitle";

export default function Vision() {
  const t = useTranslations("AboutPage.visionMission");

  return (
    <section className="py-[32px] md:py-[50px] lg:py-[72px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-x-[24px] gap-y-[24px]">
          
          {/* Image Section */}
          <div className="w-full max-w-full md:max-w-full lg:max-w-full h-[335px] md:h-[335px] lg:h-[645px] rounded-[8px] mx-auto">
            <Image
              src="/icons/About.svg"
              width={500}
              height={500}
              priority
              className="w-full h-full object-cover aspect-square object-top"
              alt="about ride image"
            />
          </div>

          {/* Vision & Mission Text */}
          <div className="flex flex-col items-center justify-center">
            
            {/* Vision */}
            <div className="mb-[24px] md:mb-[40px]">
              <SubTitle text={t("vision.title")} css="text-[#C15855] font-bold text-[14px]" />
              <h3 className="font-bold text-[32px] md:text-[48px] leading-[120%] tracking-[-5%] text-[#02093A]">
                {t("vision.subtitle")}
              </h3>
              <p className="text-[16px] md:text-[18px] font-normal leading-[160%] tracking-[-2%] text-[#333333]">
                {t("vision.description")}
              </p>
            </div>

            {/* Mission */}
            <div>
              <SubTitle text={t("mission.title")} css="text-[#C15855] font-bold text-[14px]" />
              <h3 className="font-bold text-[32px] md:text-[48px] leading-[120%] tracking-[-5%] text-[#02093A]">
                {t("mission.subtitle")}
              </h3>
              <p className="text-[16px] md:text-[18px] font-normal leading-[160%] tracking-[-2%] text-[#333333]">
                {t("mission.description")}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
