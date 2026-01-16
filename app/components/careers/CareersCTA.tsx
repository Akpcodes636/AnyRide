"use client";

import { useTranslations } from "next-intl";
import Button from "../ui/Button";

export default function CareersCTA() {
    const t = useTranslations("CareersPage.cta");
    const contactT = useTranslations("Footer"); // To get the contact email

    const handleApply = () => {
        window.location.href = `mailto:${contactT("contactEmail")}?subject=Job Application: AnyRide Team`;
    };

    return (
        <section className="py-20 bg-[#F9F9F9]">
            <div className="container">
                <div className="max-w-[800px] mx-auto bg-white rounded-[40px] p-10 md:p-16 text-center shadow-sm border border-[#F0F0F0]">
                    <h2 className="text-[#111111] text-3xl md:text-4xl font-bold mb-6">
                        {t("title")}
                    </h2>
                    <p className="text-[#545454] text-[18px] mb-10 max-w-[600px] mx-auto leading-relaxed">
                        {t("description")}
                    </p>
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            style="danger"
                            css="!h-[64px] px-12 text-[18px] font-bold"
                            fn={handleApply}
                        >
                            {t("button")}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
