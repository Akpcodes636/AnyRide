"use client";

import SubTitle from "../../ui/Subtitle";
import HeroSearch from "./HeroSearch";
import { useTranslations } from "next-intl"; // use next-intl, NOT next-i18next

const Hero = () => {
  const t = useTranslations("HomePage.hero"); // points to hero inside HomePage in your JSON

  const iconSvg = (
    <svg width="16" height="16" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="heavyBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>
        <filter id="mediumBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
        </filter>
        <filter id="lightBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
        </filter>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#3d0000" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="(#000000)" />
      <g stroke="#aa0000" strokeWidth="12" strokeLinecap="round" filter="url(#heavyBlur)" opacity="0.8">
        <line x1="50" y1="20" x2="50" y2="80" />
        <line x1="24" y1="35" x2="76" y2="65" />
        <line x1="76" y1="35" x2="24" y2="65" />
      </g>
      <g stroke="#ff0000" strokeWidth="6" strokeLinecap="round" filter="url(#mediumBlur)">
        <line x1="50" y1="25" x2="50" y2="75" />
        <line x1="28" y1="38" x2="72" y2="62" />
        <line x1="72" y1="38" x2="28" y2="62" />
      </g>
      <g stroke="#ffcccc" strokeWidth="2.5" strokeLinecap="round" filter="url(#lightBlur)">
        <line x1="50" y1="35" x2="50" y2="65" />
        <line x1="37" y1="42" x2="63" y2="58" />
        <line x1="63" y1="42" x2="37" y2="58" />
      </g>
      <circle cx="50" cy="50" r="3" fill="#ffffff" filter="url(#lightBlur)" />
    </svg>
  );

  return (
    <div className="">
      <section className="w-full bg-hero h-[700px] md:h-[800px] lg:h-[850px] xl:h-[950px] 2xl:h-[1200px]">
        <div className="pt-27.5 md:pt-30 lg:pt-55 pb-20">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6">
              <SubTitle
                svg={iconSvg}
                text={t("tagline")} // notice: no "hero." here
                css="rounded-[40px] font-normal"
              />
            </div>
            <h1 className="text-text-white text-[40px] md:text-[50px] lg:text-[64px] font-bold leading-[120%] tracking-[-5%] text-center w-full max-w-74 md:max-w-74 lg:max-w-[596px] xl:max-w-[696px] mx-auto mb-[17.14px] md:mb-6">
              {t("title")}
            </h1>
            <p className="text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] text-text w-full max-w-75 md:max-w-101.25 lg:max-w-126.25 xl:max-w-157 mx-auto text-center text-gray-300 mb-7 md:mb-10 lg:mb-10">
              {t("description")}
            </p>
             <div className="w-full">
            <HeroSearch />

             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
