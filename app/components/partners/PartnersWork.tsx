"use client";
import SubTitle from "../ui/Subtitle";
import { useTranslations } from "next-intl";

export default function PartnersWork() {
  const t = useTranslations("partnershipwork");

  // Define steps array manually since we know the structure
  const steps = [
    {
      step: 1,
      title: t("steps.0.title"),
      description: t("steps.0.description"),
    },
    {
      step: 2,
      title: t("steps.1.title"),
      description: t("steps.1.description"),
    },
    {
      step: 3,
      title: t("steps.2.title"),
      description: t("steps.2.description"),
    },
  ];

  return (
    <section className="py-[40px] md:py-[64px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[1.8fr_2fr]">
          <div>
            <div className="flex items-center justify-center md:items-start lg:justify-start mb-[32px]">
              <SubTitle text={t("label")} css="text-[#C15855] font-bold" />
            </div>
            <h2 className="text-center lg:text-start w-full max-w-[500px]">
              {t("title")}
            </h2>
            <p className="text-center lg:text-start leading-[160%] tracking-[-2%] text-[#545454] text-[14px] md:text-[18px] mb-[16px]">
              {t("subtitle")}
            </p>
          </div>
          <div className="bg-[#F6E6E680] rounded-[16px]">
            <div className="p-[40px] flex flex-col gap-y-[64px]">
              {steps.map((step) => (
                <div
                  key={step.step}
                  className="flex flex-col sm:flex-row items-start gap-x-[24px] gap-y-[12px]"
                >
                  <div>
                    <h3 className="text-[#A20602] font-bold text-[28px] whitespace-nowrap">
                      Step {step.step}
                    </h3>
                  </div>
                  <div className="flex flex-col w-full xl:max-w-[456px]">
                    <h3 className="font-bold text-[28px] mb-[16px]">
                      {step.title}
                    </h3>
                    <p className="text-[#333333] text-[16px] leading-[160%]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
