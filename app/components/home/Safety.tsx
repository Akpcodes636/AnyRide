"use client";

import Image from "next/image";
import SubTitle from "../ui/Subtitle";
import { useTranslations } from "next-intl";

type SafetyItem = {
  title: string;
  description: string;
};

const Safety = () => {
  const t = useTranslations("HomePage.safety");

  // Get safety items from translations
  const items = t.raw("items") as SafetyItem[];

  return (
    <section className="container">
      {/* Header */}
      <div className="flex items-center justify-center flex-col mt-6 md:mt-10 lg:mt-14 xl:mt-18">
        <div className="mb-6">
          <SubTitle text="Safety & Trust" css="rounded-[40px] font-normal" />
        </div>

        <h2 className="text-center">
          {t("title")}
        </h2>

        <p className="text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] text-center text-[#333333] font-normal w-full max-w-[299px] md:max-w-[643px] mx-auto">
          {t("description")}
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-x-10 mt-12">
        {/* Phone Image */}
        <div className="w-full max-w-[220px] md:max-w-[360px] mx-auto flex items-center justify-center">
          <Image
            src="/images/Phone-1.png"
            width={360}
            height={720}
            className="w-full h-auto object-contain"
            alt={t("title")}
          />
        </div>

        {/* Safety Cards */}
        <div className="space-y-6 mt-6 xl:mt-0">
          {items.map((item, index) => (
            <div
              key={index}
              className={`
                w-full max-w-[736px] mx-auto rounded-[8px]
                ${index === 0 ? "bg-[#E6E6EB]" : ""}
                ${index === 1 ? "bg-[#E6E6EB]" : ""}
                ${index === 2 ? "bg-[#E6E6EB]" : ""}
              `}
            >
              <div className="p-6 xl:p-[60px]">
                <div className="flex items-start gap-4 md:gap-6 lg:gap-8">
                  
                  {/* Number (DESKTOP ONLY) */}
                  <h3 className="hidden xl:block text-6xl text-[#A20602] font-bold leading-none flex-shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </h3>

                  {/* Text */}
                  <div>
                    <h3 className="text-[24px] md:text-[28px] xl:text-[40px] text-[#010418] font-semibold leading-[120%] mb-2">
                      {item.title}
                    </h3>

                    <p className="text-[14px] xl:text-base text-[#333] xl:text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Safety;
