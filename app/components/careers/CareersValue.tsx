"use client";
import React from "react";
import { CheckCircle2 } from "lucide-react"; // optional, can use different icons
import SubTitle from "../ui/Subtitle";
import { useTranslations } from "next-intl";

export default function CareersValue() {
  const t = useTranslations("CareersPage.values");

  const values = t.raw("items") as Array<{ title: string; description: string }>;

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <SubTitle text={t("subtitle")} />
          </div>

          <h2 className="font-bold text-3xl md:text-4xl mb-4">
            {t("title")}
          </h2>
          <p className="text-[#545454] text-lg max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="value-card bg-[#F9EEEE] rounded-[6px] p-[16px]  transition-transform duration-300"
            >
              <div className="flex items-center gap-4 flex-col">
                {/* Icon */}
                <div className="flex items-center justify-center gap-[16px] w-full">
                <div
                  className={`bg-[#DC2626] min-w-[40px] min-h-[40px] rounded-lg flex items-center justify-center transform transition-transform duration-300 `}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                  <h3 className="text-[24px] leading-[140%] font-bold text-[#02093A] mb-[16px] w-full max-w-282px]">
                    {value.title}
                  </h3>

                </div>

                {/* Text next to icon */}
                <div>
                  <p className="text-[#555A7B] text-[16px] leading-[160%]">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}