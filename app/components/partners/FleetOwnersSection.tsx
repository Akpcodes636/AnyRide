"use client";
import React from "react";
import SubTitle from "../ui/Subtitle";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const ICON_MAP: Record<string, string> = {
  vehicleUtilization: "/icons/car.svg",
  revenueSharing: "/icons/revenue.svg",
  scalableGrowth: "/icons/growth.svg",
  maintenanceSupport: "/icons/maintainance.svg"
};

const STYLE_MAP: Record<string, { color: string; bgColor: string }> = {
  vehicleUtilization: {
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  revenueSharing: {
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  scalableGrowth: {
    color: "text-green-500",
    bgColor: "bg-green-50"
  },
  maintenanceSupport: {
    color: "text-gray-700",
    bgColor: "bg-[#F5F5F7]"
  }
};

export default function FleetOwnersSection() {
  const t = useTranslations("FleetPartnersPage");

  // Get benefits object
  const benefits = t.raw("benefits") as Record<string, string>;
  const benefitKeys = Object.keys(benefits);

  const router = useRouter();
  const gotoWaitlist = () => {
    router.push("/waitlist");
  };

  // Helper function to convert camelCase to Title Case
  const camelToTitle = (str: string) => {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (s) => s.toUpperCase())
      .trim();
  };

  // Build features purely from KEYS
  const features = benefitKeys.map((key) => {
    const iconSrc = ICON_MAP[key];
    return {
      key,
      icon: iconSrc,
      title: camelToTitle(key),
      description: benefits[key],
      ...STYLE_MAP[key]
    };
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="container py-8 lg:py-16">
        {/* Header */}
        <div className="flex items-center justify-center flex-col">
          <div className="mb-[8px]">
            <SubTitle text={t("startingNow.title")} />
          </div>

          <h2 className="text-center w-full max-w-[424px] mx-auto">
            {t("startingNow.subtitle")}
          </h2>

          <p className="text-[#545454] text-center text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] max-w-[676px] mx-auto mb-[80px]">
            {t("startingNow.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-[22px] md:gap-x-[22px] lg:gap-x-[22px] gap-y-[56px]">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/en/fleet-1.png"
                alt="Busy street with vehicles and motorcycles"
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
              />
            </div>
          </div>

          {/* Features */}
          <div className="order-1 lg:order-2">
            <div className="space-y-[56px] mb-8">
              {features.map((feature) => {
                return (
                  <div key={feature.key} className="flex gap-4 items-start">
                    <div
                      className={`${feature.bgColor} p-3 rounded-lg flex-shrink-0 w-[99px] h-[80px] flex items-center justify-center`}
                    >
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="w-[40px] h-[40px]"
                      />
                    </div>

                    <div>
                      <h3 className="text-[32px] font-bold text-gray-900 mb-1">
                        {feature.title}
                      </h3>

                      <p className="text-gray-600 text-[16px] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center mt-[20px] md:mt-[50px] lg:mt-[80px]">
          <Button style="danger" type="button" fn={gotoWaitlist}>
            {t("hero.joinCTA")}
          </Button>
        </div>
      </div>
    </div>
  );
}