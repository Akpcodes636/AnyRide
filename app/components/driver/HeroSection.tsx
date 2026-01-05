"use client";

import Button from "../ui/Button";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("DriversPage.hero");
  const router = useRouter();
  const { locale } = useParams();

  const gotoWaitlist = () => {
    router.push(`/${locale}/waitlist`);
  };

  return (
    <section className="bg-driver h-screen">
      <div className="container">
        <div className="pt-[148px] md:pt-[250px] lg:pt-[200px]">
          <h1 className="text-[40px] text-text-white font-bold tracking-[-5%] text-center w-full max-w-[337px] mx-auto md:max-w-[500px] lg:max-w-[450px] mb-[8px]">
            {t("title")}
          </h1>

          <p className="text-[#E6E6EB] font-normal text-center w-full max-w-[337px] md:max-w-[500px] lg:max-w-[673px] mx-auto mb-[8px] md:mb-[40px]">
            {t("description")}
          </p>

          <div className="flex items-center justify-center">
            <Button
              style="danger"
              css="w-[200px] h-[62px]"
              type="button"
              fn={gotoWaitlist}
            >
              {t("cta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
