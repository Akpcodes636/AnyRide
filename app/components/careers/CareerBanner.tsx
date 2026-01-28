"use client";

import { Link } from "@/i18n/navigation";
import Button from "../ui/Button";
import { useTranslations } from "next-intl";

export default function CareerBanner() {
  const t = useTranslations("CareersPage.banner");

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <section className="bg-careers py-[66px]">
      <div className="container mx-auto">
        <div className="flex items-center justify-center flex-col">
          <h2 className="text-center text-white">
            {t("title")}
          </h2>
          <Link href="#contact">
            <Button style="danger" type="button" fn={scrollToContact}>
              {t("button")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
