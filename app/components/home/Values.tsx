"use client";
import Image from "next/image";
import SubTitle from "../ui/Subtitle";
import { useTranslations } from "next-intl";

const Values = () => {
  const t = useTranslations("HomePage.values");

  // Get the values items from translations
  const features = t.raw("items") as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="bg-[#010418] bg-values">
      <div className="py-8 container">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8 md:mb-12.5 lg:mb-18">
          <div className="mb-2">
            <SubTitle text={t("subtitle")} bg="bg-[#A2060233]" />
          </div>
          <h2 className="text-white w-full max-w-[66.75rem] mx-auto text-center md:max-w-full">
            {t("title")}
          </h2>
          <p className="text-gray-300 text-center text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] w-full max-w-[66.75rem] md:max-w-[143rem] mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Left: Features */}
          <div className="flex flex-col gap-6 lg:gap-6 items-start">
            {features.map((feature, index) => (
              <div
                key={index}
                className="w-full max-w-full bg-gray-50 rounded-lg p-6 md:p-8 lg:p-10"
              >
                <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
                  {/* Number */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#A20602] font-bold leading-none flex-shrink-0">
                    {feature.number}
                  </h3>
                  {/* Text */}
                  <div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#010418] font-semibold leading-tight mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image */}
          <div className="w-full h-full items-center justify-center hidden md:hidden lg:flex">
            <Image
              src="/images/Phone.png"
              width={500}
              height={500}
              className="w-full h-auto object-contain"
              alt={t("title")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;