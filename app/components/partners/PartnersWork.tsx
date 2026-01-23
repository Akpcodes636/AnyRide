"use client";

import { partnershipSteps } from "@/app/utils/Content";
import SubTitle from "../ui/Subtitle";

export default function PartnersWork() {
  return (
    <section className="py-[40px] md:py-[64px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-[1.5fr_2fr]">
          <div className="">
            <div className="flex items-center justify-center md:items-start lg:justify-start mb-[32px]">
              <SubTitle
                text="HOW PARTNERSHIPS WORK"
                css="text-[#C15855] font-bold"
              />
            </div>
            <h2 className="text-center md:text-center lg:text-start">
              How Partnership with AnyRide works
            </h2>
            <p className="text-center md:text-center lg:text-start leading-[160%] tracking-[-2%] text-[#545454] text-[14px]  md:text-[18px] mb-[16px] ">
              Here&apos;s is simple steps to partner with us
            </p>
          </div>
         <div className="bg-[#F6E6E680] rounded-[16px]">
  <div className="p-[40px] flex flex-col space-y-8 md:space-y-0 gap-y-[64px]">
    {partnershipSteps.map((step) => (
      <div
        key={step.step}
        className="flex flex-col md:flex-col lg:flex-col xl:flex-row items-start gap-x-[20px]"
      >
        {/* Step Number */}
        <div>
          <h3 className="text-[#A20602] font-bold w-full text-[32px] leading-[120%] tracking-[-5%]">
            Step {step.step}:
          </h3>
        </div>

        {/* Step Content */}
        <div className="flex flex-col itms-start w-full max-w-full xl:max-w-[456px]">
          <h3 className="font-bold text-[28px] md:text-[32px] leading-[120%] tracking-[-5%] mb-[16px]">
            {step.title}
          </h3>
          <p className="text-[#333333] leading-[160%] tracking-[-2%] text-[16px]">
            {step.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

        </div>
      </div>
    </section>
  );
}
