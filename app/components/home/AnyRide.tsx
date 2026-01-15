"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

const AnyRide = () => {
  const t = useTranslations();

  return (
    <section className="">
      <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {/* Left Side Image */}
        <div className="h-full">
          <Image
            src="/icons/Anyride.svg"
            alt={t("HomePage.appDownload.title")}
            className="w-full h-full object-cover"
            loading="eager"
            width={500}
            height={500}
            priority
          />
        </div>

        {/* Right Side Content */}
        <div className="h-full pt-8.25 md:pt-49.25  container pb-10">
          <h2 className="mb-6">{t("HomePage.appDownload.title")}</h2>
          <p className="text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] text-gray-400 mb-8">
            {t("HomePage.appDownload.description")}
          </p>

          {/* App Store Buttons */}
          <div className="flex items-start justify-start gap-4 mb-6">
            <div className="w-33.75 h-10 rounded-[5px]">
              {/* <Image
                src="/icons/apple.svg"
                width={135}
                height={40}
                className="w-full h-full object-cover"
                alt={t("HomePage.appDownload.platforms.apple")}
              /> */}
              <img
                src="/icons/apple.svg"
                className="w-full h-full object-cover"
                alt={t("HomePage.appDownload.platforms.apple")}
              />
            </div>
            <div className="w-33.75 h-10 rounded-[5px]">
              {/* <Image
                src="/icons/google.svg"
                width={135}
                height={40}
                className="w-full h-full object-cover"
                alt={t("HomePage.appDownload.platforms.google")}
              /> */}
              <Image
                width={135}
                height={40}
                priority
                src="/icons/google.svg"
                className="w-full h-full object-cover"
                alt={t("HomePage.appDownload.platforms.apple")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnyRide;
