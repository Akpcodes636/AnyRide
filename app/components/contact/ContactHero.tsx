"use client";
import Link from "next/link";
import Button from "../ui/Button";
import { useTranslations } from "next-intl";

const ContactHero =()=>{
  const t = useTranslations("ContactPage.hero");
  return (
    <section className="bg-contact pt-[280px] pb-[80px] md:pt-[330px] md:pb-[120px]">
      <div className="container">
        <div>
          <h2 className="text-white text-center w-full max-w-[250px] md:max-w-full lg:max-w-full mx-auto mb-[16px]">
            {t("title")}
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#E6E6EB] tracking-[-2%] font-normal w-full max-w-[337px] mx-auto text-center md:max-w-full lg:max-w-full mb-[40px]">
            {t("description")}
          </p>
          <div className="flex items-center justify-center">
            <Link href="/waitlist">
            <Button type="button" css="min-w-[150px] h-auto px-4 py-3 md:h-[62px] md:px-6 md:py-9" style="danger">
              {t("cta")}
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactHero;
