"use client";
import React from "react";
import Button from "../ui/Button";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Banner() {
  const t = useTranslations("partnerBanner1"); // points to the JSON key
  const router = useRouter();

  const gotoWaitlist = () => {
    router.push("/waitlist");
  };

  return (
    <div className="py-[78px] bg-black flex items-center justify-center p-4">
      <div className="container text-center space-y-8">
        {/* Main Headline */}
        <h2 className="text-center text-white text-3xl sm:text-5xl font-bold">
          {t("title")} {/* localized headline */}
        </h2>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            type="button"
            style="danger"
            css="min-w-[200px] sm:min-w-[256px] h-auto sm:h-[62px] px-6 py-3 sm:py-9"
            fn={gotoWaitlist}
          >
            {t("cta")} {/* localized button text */}
          </Button>
        </div>
      </div>
    </div>
  );
}
