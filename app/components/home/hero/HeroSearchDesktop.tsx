"use client";

import Button from "../../ui/Button";
import { useTranslations } from "next-intl";

const HeroSearchDesktop = () => {
  // const t = useTranslations("HomePage.hero"); // load the hero namespace
  const t = useTranslations("HomePage.hero");

  return (
    <div className="w-full max-w-174 mx-auto">
      <div className="flex items-center bg-white rounded-full p-2">
        {/* Input */}
        <input
          type="search"
          placeholder={t("placeholderPickup")}
          className="
            flex-1 h-14
            px-6
            outline-none
            text-sm
            bg-transparent
          "
        />

        {/* CTA */}
        <Button
          style="danger"
          type="button"
          css="h-[56px] w-[216px] px-8 rounded-full whitespace-nowrap font-semibold"
        >
          {t("buttonCheckAvailability")}
        </Button>
      </div>

      {/* Info text */}
      <div className="flex justify-center mt-4">
        <div className="inline-block bg-[#E9F9EE] rounded-[50px] px-6 py-3">
          <p className="text-center text-[18px] text-[#22C553]">
            {t("desktopInfo")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSearchDesktop;
