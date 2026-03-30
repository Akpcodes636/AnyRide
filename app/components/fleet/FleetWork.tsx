"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function FleetWork() {
  const t = useTranslations("fleetOwner.benefits");

  // Build the items manually because Next-Intl does not support arrays
  const items = [
    { title: t("item1Title"), description: t("item1Description") },
    { title: t("item2Title"), description: t("item2Description") },
    { title: t("item3Title"), description: t("item3Description") },
    { title: t("item4Title"), description: t("item4Description") },
    { title: t("item5Title"), description: t("item5Description") },
    { title: t("item6Title"), description: t("item6Description") },
  ];

  return (
    <section className="py-[72px]">
      <div className="container mx-auto">
        <div>
          <h2 className="text-center w-full max-w-[424px] mx-auto mb-[48px]">
            {t("title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[22px]">
            <div className="w-full h-full">
              <Image
                src="/images/fleet.webp"
                width={500}
                height={500}
                alt="Fleet operations illustration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-full">
              <div className="flex flex-col py-[30px]">
                {items.map((item, index) => {
                  const isLast = index === items.length - 1;
                  return (
                    <div key={index} className="flex gap-6 items-start b-6">
                      {/* Number + Line */}
                      <div className="relative flex flex-col items-center shrink-0">
                        <div className="w-[90px] h-[90px] rounded-full bg-[#F9EEEE] text-[#A20602] flex items-center justify-center font-bold text-[40px]">
                          {index + 1}
                        </div>
                        {!isLast && (
                          <div className="w-[2px] h-[56px] bg-[#A20602]" />
                        )}
                      </div>
                      {/* Text */}
                      <div>
                        <h3 className="text-[20px] md:text-[32px] font-semibold text-[#010418] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[#333333] text-[13px] md:text-[16px] lg:text-[16px] leading-[160%] tracking-[-2%] max-w-[496px]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
