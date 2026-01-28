"use client";

import Link from "next/link";
import Button from "../ui/Button";
import { useTranslations } from "next-intl";

export default function FleetHero() {
  const t = useTranslations("fleetOwner.hero");

  return (
    <section className="bg-fleet">
      <div className="container">
        <div className="">
          <div className="h-screen flex items-center justify-center flex-col">
            <h2 className="text-[#FFFFFF] text-center w-full max-w-[500px]">
              {t("title")}
            </h2>
            <p className="text-center leading-[160%] tracking-[-2%] text-[#E6E6EB] text-[16px] md:text-[18px] w-full max-w-[500px]">
              {t("subtitle")}
            </p>
          <div className="flex items-center justify-center mt-[20px]">
            <Link href="#fleet">
            <Button css="" style="danger" type="button">
              {t("cta")}
            </Button>
            </Link>
          </div>
          </div>

        </div>
      </div>
    </section>
  );
}
