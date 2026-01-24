"use client";
import { useTranslations } from "next-intl";

export default function PartnerBanner() {
  const t = useTranslations("partnerBanner"); // namespace for translations

  return (
    <section className="bg-partners h-screen">
      <div className="container mx-auto h-full flex items-center justify-center flex-col">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-[32px] md:text-[62px] text-white font-bold tracking-[-5%] leading-[120%] text-center mb-[16px]">
            {t("title")} {/* localized headline */}
          </h1>
          <p className="w-full max-w-[620px] mx-auto text-[#E6E6EB] text-center text-[16px] md:text-[18px]">
            {t("subtitle")} {/* localized subtitle */}
          </p>
        </div>
      </div>
    </section>
  );
}
