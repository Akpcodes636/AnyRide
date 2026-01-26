"use client";

import CareerForm from "./CareerForm";
import { useTranslations } from "next-intl";

export default function CareersContact() {
  const t = useTranslations("CareersPage.contact");
  return (
    <section className="bg-black py-[64px]" id="contact">
      <div className="container mx-auto">
        <h1 className="text-[20px] md:text-[38px] lg:text-[64px] text-center text-white font-bold leading-[120%] tracking-[-5%]">{t("title")}</h1>
        <p className="text-[#E6E6EB] text-center text-[18px]">{t("description")}</p>
        <CareerForm />
      </div>
    </section>
  );
}
