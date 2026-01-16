"use client";

import { useTranslations } from "next-intl";

export default function CookiesHero() {
    const t = useTranslations("CookiesPage.hero");

    return (
        <section
            className="min-h-[400px] flex items-center justify-center text-center px-4"
            style={{
                background: "linear-gradient(340.53deg, #010418 34.88%, #48050E 58.35%, #980400 82.94%)",
            }}
        >
            <div className="container pt-[80px]">
                <h1 className="text-white text-[40px] md:text-[64px] font-bold mb-6">
                    {t("title")}
                </h1>
                <p className="text-[#E6E6EB] text-[20px] md:text-[24px] font-medium max-w-[800px] mx-auto">
                    {t("subtitle")}
                </p>
            </div>
        </section>
    );
}
