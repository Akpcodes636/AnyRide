"use client";
import OurMissionCard from "../ui/OurMissonCard";
import SubTitle from "../ui/Subtitle";
import { useTranslations } from "next-intl";

export default function OurMission() {
  const t = useTranslations("CareersPage.ourMission");
  const items = t.raw("items") as Array<{ img: string; title: string; text: string }>;

  return (
    <section className="py-[40px] md:py-[64px]">
      <div className="container mx-auto">
        <div>
          <div className="flex items-center justify-center mb-[24px]">
            <SubTitle
              text={t("subtitle")}
              css="text-[#A20602] font-bold text-[16px] tracking-[-2%]"
            />
          </div>
          <h2 className="text-center mb-[31px] md:mb-[51px]">{t("title")}</h2>
        </div>
         
         <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-[16px] gap-y-[16px]">
         {items.map((item, index) => (
        <OurMissionCard
          key={index}
          img={item.img}
          title={item.title}
          text={item.text}
        />
      ))}
         </div>
      </div>
    </section>
  );
}
