"use client";
import Image from "next/image";
import { useState } from "react";
import Button from "../ui/Button";
import SubTitle from "../ui/Subtitle";
import { useTranslations } from "next-intl";

export interface GuideItem {
  title: string;
  text: string;
  color: string;
}

// Keep colors separate since they're styling, not content
const colors = {
  Rider: ["bg-[#F6E6E6]", "bg-[#EBF3FE]", "bg-[#E9F9EE]"],
  Driver: ["bg-[#FFF4E6]", "bg-[#E6F7FF]", "bg-[#E9F9F3]"]
};



const About = () => {
  const t = useTranslations("HomePage.guides");
  const [activeTab, setActiveTab] = useState<"Rider" | "Driver">("Rider");

  // Get translations as array and add colors
  const getGuideContent = (tab: "Rider" | "Driver"): GuideItem[] => {
    const tabKey = tab.toLowerCase() as "rider" | "driver";
    const items = t.raw(tabKey) as Array<{ title: string; text: string }>;
    
    return items.map((item, index) => ({
      ...item,
      color: colors[tab][index]
    }));
  };

  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-[2fr_1fr] h-full gap-16">
        {/* LEFT SIDE */}
        <div className="container h-full w-full flex flex-col items-center md:items-start justify-center py-6 md:py-16.5">
          <div className="mb-6">
            <SubTitle text={t("subtitle")} css="rounded-[40px] font-bold" />
          </div>

          <h2>{t("title")}</h2>
          <p className="text-center md:text-start text-[16px] font-normal text-gray-400 mb-10">
            {t("description")}
          </p>

          {/* TABS */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              style={activeTab === "Rider" ? "danger" : "nobg"}
              css="min-w-[104px] h-[60px]"
              type="button"
              fn={() => setActiveTab("Rider")}
            >
              {t("tabs.rider")}
            </Button>
            <Button
              style={activeTab === "Driver" ? "danger" : "nobg"}
              css="min-w-[104px] h-[60px]"
              type="button"
              fn={() => setActiveTab("Driver")}
            >
              {t("tabs.driver")}
            </Button>
          </div>

          {/* GUIDE CONTENT */}
          <div className="w-full rounded-lg">
            {getGuideContent(activeTab).map((item, i) => (
              <div
                key={i}
                className={`${item.color} p-6 md:p-15 rounded-lg mb-4`}
              >
                <h3 className="text-[28px] md:text-[35px] lg:text-[40px] font-semibold text-[#010418] mb-3.75 leading-[120%]">
                  {item.title}
                </h3>
                <p className="text-[14px] md:text-[16px] text-[#333333] leading-[153%] tracking-[-2%]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="w-full h-full hidden md:hidden lg:hidden xl:block">
          <Image
            src="/images/About-img.png"
            width={400}
            height={600}
            alt={t("title")}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;