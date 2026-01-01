"use client";

import Button from "../../ui/Button";
import { useTranslations } from "next-intl";

const HeroSearchMobile = () => {
  const t = useTranslations("HomePage.hero"); // load the hero namespace

  return (
    <div className="w-full max-w-83.75 mx-auto flex flex-col items-center gap-3 px-4">
      {/* Input */}
      <div className="w-full h-15.5 bg-white rounded-full px-4 flex items-center">
        <input
          type="search"
          placeholder={t("placeholderPickup")}
          className="w-full h-full outline-none text-[16px] bg-transparent text-gray-300"
        />
      </div>

      {/* Primary CTA */}
      <Button
        style="danger"
        type="button"
        css="w-full h-[52px] rounded-full font-semibold text-[16px] tracking-[-2%]"
      >
        {t("buttonCheckAvailability")}
      </Button>

      {/* Secondary info pill */}
      <div className="w-64.5 px-6 h-15.25 rounded-full bg-[#FFECEC] flex items-center justify-center">
        <span className="text-xs font-medium text-[#FF4D4F]">
          {t("mobileInfo")}
        </span>
      </div>
    </div>
  );
};

export default HeroSearchMobile;
