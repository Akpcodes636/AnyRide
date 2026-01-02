"use client";

import { useTranslations } from "next-intl";
import FaqListItem from "../ui/FaqListItem";
import SubTitle from "../ui/Subtitle";

const WaitlistFaq = () => {
  const t = useTranslations("WaitlistPage.FAQ");
  
  const items =
    (t.raw("items") as { question: string; answer: string }[]) ?? [];

  return (
    <section className="py-[24px] md:py-[40px] lg:py-[96px]">
      <div className="container-sm">
        <div className="flex items-center justify-center flex-col">
          <div className="mb-[24px]">
            <SubTitle text="FAQ" />
          </div>

          <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-[120%] text-[#02093A] tracking-[-5%] text-center w-full max-w-[335px] md:max-w-[500px] lg:max-w-full mb-[16px]">
            {t("title")}
          </h1>

          <p className="text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] text-center text-[#545454] w-full max-w-[335px] md:max-w-[500px] lg:max-w-[473px] mx-auto mb-[32px]">
            {t("description")}
          </p>
        </div>

        <div className="w-full max-w-[335px] mx-auto md:max-w-[608px]">
          {items.map((item, i) => (
            <FaqListItem
              key={i}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WaitlistFaq;
