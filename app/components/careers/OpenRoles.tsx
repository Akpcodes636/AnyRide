"use client";

import { useTranslations } from "next-intl";
import SubTitle from "../ui/Subtitle";

export default function OpenRoles() {
    const t = useTranslations("CareersPage.roles");

    // Since we can't easily iterate over translated arrays in next-intl if not structured correctly, 
    // and my en.json has it as an array of objects, I'll use a fixed loop or index-based approach if needed,
    // but next-intl supports returning arrays if config allows or we can just access them.
    // Actually, I'll structure it to iterate over the items.

    const items = [0, 1, 2, 3]; // We know there are 4 items

    return (
        <section className="py-20 bg-white">
            <div className="container">
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-4">
                        <SubTitle text={t("subtitle")} css="text-[#A20602] font-bold" />
                    </div>
                    <h2 className="text-[#111111] text-3xl md:text-5xl font-bold">
                        {t("title")}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {items.map((index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl border border-[#F0F0F0] hover:border-[#A20602]/20 hover:bg-[#F9F9F9] transition-all duration-300"
                        >
                            <h3 className="text-[24px] font-bold text-[#111111] mb-4">
                                {t(`items.${index}.title`)}
                            </h3>
                            <p className="text-[#545454] text-[16px] leading-relaxed">
                                {t(`items.${index}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
