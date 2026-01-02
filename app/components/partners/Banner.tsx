"use client";
import React from 'react';
import Button from '../ui/Button';
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Banner() {
  const t = useTranslations("FleetPartnersPage");
  const router = useRouter();
  const gotoWaitlist = () => {
    router.push("/waitlist");
  };

  return (
    <div className="py-[78px] bg-black flex items-center justify-center p-4">
      <div className="container  text-center space-y-8">
        {/* Main Headline */}
        <h2 className="text-center text-white">
          Ready to scale your transport business?
        </h2>
        
        {/* Subheading */}
        <p className="text-lg md:text-xl text-[#E6E6E6] max-w-2xl mx-auto">
         Our team will guide you through every step.

        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button type="button" style="danger"  css="min-w-[200px] sm:min-w-[256px] h-auto sm:h-[62px] px-6 py-3 sm:py-9" fn={gotoWaitlist}>
            {t("hero.joinCTA")}
          </Button>
          
          <Button type="button" style="tertiary"  css="min-w-[200px] sm:min-w-[256px] h-auto sm:h-[62px] px-6 py-3 sm:py-9" fn={gotoWaitlist}>
            {t("hero.roadmapCTA")}
          </Button>
        </div>
        
      
      </div>
    </div>
  );
}