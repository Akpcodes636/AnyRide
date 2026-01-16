"use client";

import SubTitle from "../ui/Subtitle";
import WaitForm from "./WaitForm";
import WaitlistStats from "./WaitlistStats";
import { useTranslations } from "next-intl";

export default function HeroWaitList() {
  const t = useTranslations("WaitlistPage.hero");

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
    <section
      className="min-h-screen w-full"
      style={{
        background:
          "linear-gradient(340.53deg, #010418 34.88%, #48050E 58.35%, #980400 82.94%)",
      }}
    >
      <div className="container pt-[200px]">
        <div className="flex items-center justify-center mb-[24px]">
          <SubTitle svg={iconSvg} text={t("subtitle")} />
        </div>

        <WaitlistStats />
        <WaitForm />
      </div>
    </section>
  );
}
