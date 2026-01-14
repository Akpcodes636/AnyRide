"use client";
import Image from "next/image";
import { Star } from "lucide-react";
// import { useTranslation } from "react-i18next";
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
            width={600}
            height={800}
            alt={t("HomePage.appDownload.title")}
            className="w-full h-full object-cover"
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
               <img
                src="/icons/google.svg"
                className="w-full h-full object-cover"
                alt={t("HomePage.appDownload.platforms.apple")}
              />
            </div>
          </div>

          {/* Reviews */}
          {/* <div className="flex items-center gap-3">
            <div className="w-19 h-8">
              <Image
                src="/images/pictures.png"
                width={76}
                height={32}
                className="w-full h-full object-cover"
                alt={t("HomePage.appDownload.title")}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]"
                    />
                  ))}
                </div>
                <p className="font-sora font-medium text-[14px] leading-5 tracking-[0.14px] text-black">
                  {t("HomePage.appDownload.reviews.rating")} reviews
                </p>
              </div>
              <p className="font-sora font-normal text-[13px] leading-[20.8px] tracking-[0.13px] text-black">
               {t("HomePage.appDownload.reviews.trustedBy")}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default AnyRide;
