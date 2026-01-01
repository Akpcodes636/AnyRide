"use client";
import Image from "next/image";
import SubTitle from "../../ui/Subtitle";
import PricingForm from "./PricingForm";
import { useTranslations } from "next-intl";

const Pricing = () => {
  const t = useTranslations("HomePage.pricing");

  return (
    <section className="py-6 md:py-10 lg:py-15 xl:py-17">
      <div className="container">
        <div className="flex items-center justify-center flex-col mb-[24px] md:mb-[38px] lg:mb-[58px]">
          <div className="mb-6">
            <SubTitle text={t("subtitle")} css="rounded-[40px] font-normal" />
          </div>
          <h2 className="text-center">
            {t("title")}
          </h2>
          <p className="text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] text-center text-[#333333] font-normal">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-[30px]">
          {/* Text + Form */}
          <div className="h-full w-full order-2 md:order-1 mb-[10px]">
            <div>
              <h2 className="mt-7.5 hidden md:hidden lg:block xl:block">
                {t("description")}
              </h2>
              <PricingForm />
            </div>
          </div>

          {/* Image */}
          <div className="h-full w-full max-w-[450px] md:max-w-[618px] h-[272px] mx-auto order-1 md:order-2">
            <Image
              src="/en/Rectangle.svg"
              alt={t("title")}
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;