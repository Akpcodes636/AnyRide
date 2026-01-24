"use client";
import PartnerAccordion from "./PartnerAccordion";
import { useTranslations } from "next-intl";

export default function PartnerCatergories(){
    const t = useTranslations("PartnerCategories");

    return (
        <section className="py-[40px] md:py-[50px] lg:py-[64px]">
            <div className="container mx-auto">
                <div>
                    <h3 className="font-bold text-[30px] md:text-[40px] lg:text-[48pxpx] text-center">{t('title')}</h3>
                    <p className="text-[#545454] font-normal tracking-[-2%] leading-[160%] text-center w-full max-w-[676px] mx-auto">{t('description')}</p>
                </div>
                <div>
                    <PartnerAccordion />
                </div>
            </div>
        </section>
    )
}