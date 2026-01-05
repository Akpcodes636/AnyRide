"use client";
import { useTranslations } from "next-intl";

export default function Stats() {
  const t = useTranslations("FleetPartnersPage.hero");

  return (
    <section className="w-full bg-[#050A1A] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3 lg:gap-0">

          {/* Item 1 */}
          <div className="flex flex-col items-center text-center lg:border-r lg:border-white px-6">
            <p className="text-[20px] md:text-[35px] lg:text-[56px] font-semibold tracking-[-5%] text-[#E8E8E8] leading-[120%] mb-4">{t("focus")}</p>
            <h3 className="text-[18px] font-normal text-white leading-[160%] tracking-[-2%] text-center">{t("currentFocus")}</h3>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center lg:border-r lg:border-white px-6">
            <p className="text-[20px] md:text-[35px] lg:text-[56px] font-semibold tracking-[-5%] text-[#E8E8E8] leading-[120%] mb-4">{t("preSeedFunding")}</p>
            <h3 className="text-[18px] font-normal text-white leading-[160%] tracking-[-2%] text-center">{t("current")}</h3>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center px-6">
            <p className="text-[20px] md:text-[35px] lg:text-[56px] font-semibold tracking-[-5%] text-[#E8E8E8] leading-[120%] mb-4">{t("futureCategories")}</p>
            <h3 className="text-[18px] font-normal text-white leading-[160%] tracking-[-2%] text-center">{t("safetyTrust")}</h3>
          </div>

        </div>
      </div>
    </section>
  );
}
