"use client";
import { fleetFeatures } from "@/app/utils/Content";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function FleetTool() {
  const t = useTranslations("fleetOwner.tools");
  return (
    <section className="py-[40px] md:py-[72px]">
      <div className="container mx-auto">
        <h2 className="text-center w-full max-w-[589px] mx-auto">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-3 items-center justify-center gap-[20px] mb-[50px]">
          {fleetFeatures.map((item, index) => (
            <div
              key={index}
              className="w-full max-w-full md:max-w-full  lg:max-w-[405px] xl:max-w-full h-full min-h-[156px] bg-[#F9EEEE] rounded-[6px]"
            >
              <div className="py-[20px] md:py-[34px] px-[16px]">
                <div>
                  <div className="flex items-center gap-[16px] mb-[17px]">
                    <div className="min-w-[40px] h-[40px]">
                      <Image
                        src={item.img}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                        alt={item.title}
                      />
                    </div>
                    <h3 className="font-bold text-[20px]  md:text-[24px] leading-[160%] tracking-[-2%] text-[#02093A]">
                      {" "}
                      {t(`feature${index + 1}Title`)}
                    </h3>
                  </div>
                  <p className="text-[#555A7B] font-normal leading-[160%]">
                    {t(`feature${index + 1}Description`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Image
            width={500}
            height={500}
            alt="picture of image"
            className="w-full h-full object-cover"
            src="/images/User.webp"
          />
        </div>
      </div>
    </section>
  );
}
