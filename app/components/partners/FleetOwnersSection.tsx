import React from 'react';
import { Car, DollarSign, TrendingUp, Wrench } from 'lucide-react';
import SubTitle from '../ui/Subtitle';
import Button from '../ui/Button';
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function FleetOwnersSection() {
  const t = useTranslations("FleetPartnersPage");
  const router = useRouter();
        const gotoWaitlist = () => {
        router.push("/waitlist");
  };

  const features = [
    {
      icon: Car,
      title: t("benefits.vehicleUtilization"),
      description: t("benefits.vehicleUtilization"),
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    {
      icon: DollarSign,
      title: t("benefits.revenueSharing"),
      description: t("benefits.revenueSharing"),
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: TrendingUp,
      title: t("benefits.scalableGrowth"),
      description: t("benefits.scalableGrowth"),
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Wrench,
      title: t("benefits.maintenanceSupport"),
      description: t("benefits.maintenanceSupport"),
      color: "text-gray-700",
      bgColor: "bg-gray-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container  py-8 lg:py-16">
        <div className='flex items-center justify-center flex-col'>
            <div className='mb-[8px]'>
            <SubTitle text={t("startingNow.title")} />
            </div>
            <h2 className='text-center'>{t("startingNow.subtitle")}</h2>
            <p className='text-[#545454] text-center text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] max-w-[676px] mx-auto mb-[80px]'>{t("startingNow.description")}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/en/fleet-1.png"
                alt="Busy street with vehicles and motorcycles"
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            {/* Features List */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className={`${feature.bgColor} p-3 rounded-lg flex-shrink-0`}>
                      <Icon className={`w-[99px] h-[80px] ${feature.color}`} />
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

        <div className='flex items-center justify-center mt-[20px]'>
            {/* CTA Button */}
            <Button style='danger' type='button'  fn={gotoWaitlist}>
              {t("hero.joinCTA")}
            </Button>
        </div>
      </div>
    </div>
  );
}