"use client";
import Image from "next/image";
import SubTitle from "../ui/Subtitle";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CareersPartner() {
  const t = useTranslations("CareersPage.partner");
  const items = t.raw("section1.items") as string[];
  const items2 = t.raw("section2.items") as string[];
  return (
    <section className="py-[50px] md:py-[72px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr_2fr] lg:grid-cols-[1.8fr_2fr] gap-[16px]">
          <div className=" h-full w-full">
            <Image
              src="/images/robots.png"
              width={500}
              height={500}
              alt="two robot holding hands"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-start justify-center flex-col">
            <div className="mb-[32px]">
              <div className="mb-[24px]">
                <SubTitle text={t("section1.subtitle")} />
              </div>
              <h3 className="text-[32px] font-bold leading-[120%] tracking-[-2%] mb-[32px]">
                {t("section1.title")}
              </h3>
              <div>
                <ul className="space-y-3">
                  {items.map((text, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#EF4444] shrink-0 mt-[2px]" />

                      <span className="text-[16px] text-[#555A7B] tracking-[-2%] leading-[160%]">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>


            <div className="mb-[32px]">
              <div className="mb-[24px]">
                <SubTitle text={t("section2.subtitle")} />
              </div>
              <h3 className="text-[32px] font-bold leading-[120%] tracking-[-2%] mb-[32px]">
               {t("section2.title")}
              </h3>
              <div>
                <ul className="space-y-3">
                  {items2.map((text, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#EF4444] shrink-0 mt-[2px]" />

                      <span className="text-[16px] text-[#555A7B] tracking-[-2%] leading-[160%]">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
