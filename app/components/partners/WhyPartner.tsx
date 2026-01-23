"use client";
import { useTranslations } from 'next-intl'; // or your i18n library
import SubTitle from "../ui/Subtitle";
import PartnerCard from "./PartnerCard";

export default function WhyPartners() {
  const t = useTranslations('FleetPartnersPage.whyUs');
  
  // Get the items array from translations
  const items = t.raw('items');

  return (
    <section className="py-[40px] md:py-[64px]">
      <div className="container mx-auto h-full">
        <div>
          <div className="flex items-center justify-center mb-[24px]">
            <SubTitle
              text={t('eyebrow')}
              css="text-[#A20602] font-bold text-[16px]"
            />
          </div>
          <h2 className="text-center mb-[32px]">{t('title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-[16px]">
            {items.map((item: any, index: number) => (
              <PartnerCard
                key={index}
                img={item.img}
                title={item.title}
                description={item.description}
                alt={item.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}