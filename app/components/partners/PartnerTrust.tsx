"use client";
import { useTranslations } from "next-intl";
import PartnerTrustCard from "../ui/PartnerTrustCard";
import SubTitle from "../ui/Subtitle";

export default function PartnerTrust() {
  const t = useTranslations("partnerTrust");
  
  // Use .raw() to get the cards array from translations
  const cards = t.raw("cards") as {
    title: string;
    description: string;
    icon: string;
  }[];

  return (
    <section className="py-[40px] md:py-[62px]">
      <div className="container mx-auto">
        <div>
          {/* Subtitle */}
          <div className="flex items-center justify-center mb-[24px]">
            <SubTitle text={t("subtitle")} css="text-[#C15855] font-bold leading-[160%] tracking-[-2%]" />
          </div>

          {/* Headline & Description */}
          <div className="mb-[40px]">
            <h2 className="text-center w-full max-w-[676px] mx-auto mb-[24px]">
              {t("headline")}
            </h2>
            <p className="text-center w-full max-w-[676px] mx-auto">
              {t("subtext")}
            </p>
          </div>

          {/* Trust Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center">
            {cards.map((card, idx) => (
              <PartnerTrustCard
                key={idx}
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}