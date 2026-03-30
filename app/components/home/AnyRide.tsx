"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ComingSoonModal from "../ui/ComingSoonModal";

const AnyRide = () => {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {/* Left Side Image */}
        <div className="">
         <Image
            src="/images/Anyride-1.webp"
            alt={t("HomePage.appDownload.title")}
            className="w-full h-auto object-contain"
            width={412}
            height={424}  // match actual display
            priority
            sizes="(max-width: 640px) 300px, 412px"
          />
        </div>

        {/* Right Side Content */}
        <div className="flex items-start justify-center flex-col container pt-10 pb-10">
          <h2 className="mb-6">{t("HomePage.appDownload.title")}</h2>
          <p className="text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] text-gray-400 mb-8">
            {t("HomePage.appDownload.description")}
          </p>

          {/* App Store Buttons */}
          <div className="flex items-start justify-start gap-4 mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-33.75 h-10 rounded-[5px] transition-transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
            >
              <Image
                width={135}
                height={40}
                priority
                src="/icons/apple.webp"
                className="w-full h-full object-cover"
                alt={t("HomePage.appDownload.platforms.apple")}
              />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-33.75 h-10 rounded-[5px] transition-transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
            >
              <Image
                width={135}
                height={40}
                priority
                src="/icons/google.webp"
                className="w-full h-full object-cover"
                alt={t("HomePage.appDownload.platforms.google")}
              />
            </button>
          </div>
        </div>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default AnyRide;
