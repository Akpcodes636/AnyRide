"use client";

import SubTitle from "../ui/Subtitle";
import WaitForm from "./WaitForm";

export default function HeroWaitList() {
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
          <SubTitle img="/icons/SVG.png" text="Launching in 2026" />
        </div>
        <h2 className="text-white text-center mb-[16px]">Join AnyRide Waitlist <br /> Today.</h2>
        <p className="text-[16px] md:text-[18px] text-white font-normal tracking-[-2%] leading-[160%] text-center">Join AnyRide Waitlist Today.</p>

        <WaitForm />
      </div>
    </section>
  );
}
