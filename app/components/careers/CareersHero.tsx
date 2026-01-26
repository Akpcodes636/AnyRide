"use client";
import Link from "next/link";
import Button from "../ui/Button";
import { useTranslations } from "next-intl";

export default function CareersHero() {
  const t = useTranslations("CareersPage.hero");

  return (
    <section className="h-screen bg-career pt-[250px]  md:pt-[280px] lg:pt-[200px]">
      <div className="container mx-auto">
        <div className="flex items-center justify-center flex-col">
          <div className="">
            <h1 className="text-[40px] md:text-[50px] lg:text-[64px] text-white font-bold leading-[120%] tracking-[-5%] text-center w-full max-w-[735px]">
              {t("title")}
            </h1>
            <p className="w-full max-w-[700px] tracking-[-2%] leading-[160%] mx-auto text-center text-white text-[16px] md:text-[18px]">
              {t("description")}
            </p>
          </div>
          <div className="pt-[20px] md:pt-[40px]">
            <Link href="#contact">
            <Button style="danger" type="button" css="w-[187px] h-[62px]">
              {t("button")}
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
