"use client";

import { useTranslations } from "next-intl";
import SubTitle from "../ui/Subtitle";

export default function RiderGrid() {
  const t = useTranslations("RiderPage.guides");
  const rider = t.raw("steps") as {
    steps: string;
    title: string;
    description: string;
  }[];

  return (
    <section className="w-full bg-white">
      <div className="container py-[62px] md:py-[50px] lg:py-[72px]">
        <div className="flex items-center justify-center flex-col mb-[58px]">
          <div className="mb-[24px]">
            <SubTitle
              text={t("subtitle")}
              css="rounded-[40px] font-normal"
            />
          </div>

          <h2 className="text-center">{t("title")}</h2>

          <p className="max-w-[569px] w-full text-center mx-auto text-[18px] leading-[160%] tracking-[-2%] text-[#333333]">
            {t("description")}
          </p>
        </div>

        <div className="">
          {rider.map((category, index) => (
            <div
              key={index}
              className={`grid items-center gap-10 md:grid-cols-1 lg:grid-cols-2 ${index % 2 === 0 ? "" : ""
                }`}
            >
              {/* Image */}
              <div
                className={`relative order-1 min-h-[240px] w-full max-w-full rounded-lg flex items-center justify-center p-4 ${index % 2 === 0 ? "md:order-1 lg:order-2" : ""
                  } md:h-[280px] md:p-6`}
              >
                <img
                  src={`/icons/rider-${index + 1}.svg`}
                  alt={category.title}
                  className="object-contain h-full w-full max-h-[240px] md:max-h-[280px]"
                />
              </div>

              {/* Text */}
              <div
                className={`${index % 2 === 0 ? "order-2 md:order-1" : "order-2"
                  }`}
              >
                <h3 className="mb-4 text-[32px] font-semibold text-[#0A0A23]">
                 {category.steps} {category.title}
                </h3>

                <p className="text-[16px] font-normal tracking-[-2%] leading-[160%] text-[#333333]">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
