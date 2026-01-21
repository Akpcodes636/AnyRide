"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function EligibleFleet() {
 const t = useTranslations("fleetOwner.whoCanJoin");

const items = [
  { title: t("item1Title"), description: t("item1Description"), icon: "/images/icons.png" },
  { title: t("item2Title"), description: t("item2Description"), icon: "/images/icons.png" },
  { title: t("item3Title"), description: t("item3Description"), icon: "/images/icons.png" },
  { title: t("item4Title"), description: t("item4Description"), icon: "/images/icons.png" },
  { title: t("item5Title"), description: t("item5Description"), icon: "/images/icons.png" },
  { title: t("item6Title"), description: t("item6Description"), icon: "/images/icons.png" }
];

  return (
    <section className="container">
      <div className="py-[50px] md:py-[72px]">
        <div>
          <h2 className="text-center w-full max-w-[589px] mx-auto mb-[32px]">
            {t("title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-center justify-center gap-[20px]">
            {items.map((item, index) => (
              <div
                key={index}
                className="w-full max-w-full md:max-w-full lg:max-w-[405px] h-full min-h-[156px] bg-[#F9EEEE] rounded-[6px]"
              >
                <div className="py-[20px] md:py-[34px] px-[16px]">
                  <div className="flex items-center gap-[16px] mb-[17px]">
                    <div className="min-w-[40px] h-[40px]">
                      <Image
                        src={item.icon}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                        alt={item.title}
                      />
                    </div>
                    <h3 className="font-bold text-[20px] md:text-[24px] leading-[160%] tracking-[-2%] text-[#02093A]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[#555A7B] font-normal leading-[160%]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
