"use client";

import Button from "../ui/Button";
import { useTranslations } from "next-intl";

export default function BannerFleet() {
  const t = useTranslations("fleetOwner.cta");

  const scrollToFleet = () => {
    const fleetSection = document.getElementById("fleet");
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-banners">
      <div className="container mx-auto h-screen">
        <div className="flex items-center justify-center flex-col h-full">
          <h2 className="text-center text-white">
            {t("title")}
          </h2>
          <div className="flex items-center justify-center mt-6">
            <Button
              style="danger"
              type="button"
              fn={scrollToFleet}
            >
              {t("button")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
