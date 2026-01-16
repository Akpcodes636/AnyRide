"use client";

import { useTranslations } from "next-intl";

export default function CookiesContent() {
    const t = useTranslations("CookiesPage.content");
    const items = [0, 1, 2, 3]; // We'll have 4 sections

    return (
        <section className="py-20 bg-white">
            <div className="container max-w-[900px]">
                <div className="prose prose-lg max-w-none">
                    {items.map((index) => (
                        <div key={index} className="mb-12">
                            <h2 className="text-[#111111] text-2xl md:text-3xl font-bold mb-4">
                                {t(`sections.${index}.title`)}
                            </h2>
                            <p className="text-[#545454] text-[18px] leading-relaxed">
                                {t(`sections.${index}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
