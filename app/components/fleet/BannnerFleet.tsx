"use client";

import Button from "../ui/Button";
import { useTranslations } from "next-intl";

export default function BannerFleet() {
  const t = useTranslations("fleetOwner.cta");

  return (
    <section className="h-[100vh] bg-banners">
      <div className="container mx-auto py-[200px]">
        <div className="flex items-center justify-center flex-col">
          <h2 className="text-center text-white">
            {t("title")}
          </h2>
          <div className="flex items-center justify-center mt-6">
            <Button style="danger" type="button">
              {t("button")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
