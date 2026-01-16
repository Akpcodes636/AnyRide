"use client";

import { useTranslations } from "next-intl";

export default function CareersHero() {
    const t = useTranslations("CareersPage.hero");

    return (
        <section
            className="min-h-[500px] flex items-center justify-center text-center px-4"
            style={{
                background: "linear-gradient(340.53deg, #010418 34.88%, #48050E 58.35%, #980400 82.94%)",
            }}
        >
            <div className="container pt-[100px]">
                <h1 className="text-white text-[40px] md:text-[64px] font-bold mb-6">
                    {t("title")}
                </h1>
                <p className="text-[#E6E6EB] text-[20px] md:text-[24px] font-medium mb-4 max-w-[800px] mx-auto">
                    {t("subtitle")}
                </p>
                <p className="text-white/70 text-[16px] md:text-[18px] max-w-[700px] mx-auto leading-relaxed">
                    {t("description")}
                </p>
            </div>
        </section>
    );
}
