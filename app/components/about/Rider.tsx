"use client";

import Image from "next/image";
import SubTitle from "../ui/Subtitle";
import { useTranslations } from "next-intl";

export default function Rider() {
  const tRiders = useTranslations("AboutPage.riders");
  const tDrivers = useTranslations("AboutPage.drivers");

  return (
    <section className="py-[32px] md:py-[50px] lg:py-[72px]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-x-[24px] gap-y-[24px]">
          
          {/* Image */}
          <div className="h-[335px] md:h-[335px] lg:h-[645px] rounded-[8px]">
            <Image
              src="/images/about-12.webp"
              width={500}
              height={500}
              priority
              className="w-full h-full object-cover object-[center_30%] rounded-[8px] aspect-square"
              alt="about ride image"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">

            {/* Riders */}
            <div className="mb-[24px] md:mb-[40px]">
              <div className="mb-[24px]">
                <SubTitle
                  text={tRiders("title")}
                  css="text-[#C15855] font-bold text-[14px]"
                />
              </div>

              <h3 className="font-bold text-[32px] md:text-[48px] leading-[120%] tracking-[-5%] text-[#02093A] mb-[16px] md:mb-[32px]">
                {tRiders("title")}
              </h3>

              <p className="text-[16px] md:text-[18px] font-normal leading-[160%] tracking-[-2%] text-[#333333]">
                {tRiders("description")}
              </p>
            </div>

            {/* Drivers */}
            <div>
              <div className="mb-[24px]">
                <SubTitle
                  text={tDrivers("title")}
                  css="text-[#C15855] font-bold text-[14px]"
                />
              </div>

              <h3 className="font-bold text-[32px] md:text-[48px] leading-[120%] tracking-[-5%] text-[#02093A] mb-[16px] md:mb-[32px]">
                {tDrivers("title")}
              </h3>

              <p className="text-[16px] md:text-[18px] font-normal leading-[160%] tracking-[-2%] text-[#333333]">
                {tDrivers("description")}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
