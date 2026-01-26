"use client";

import SubTitle from "../ui/Subtitle";

export default function WhoCanApply() {
  return (
    <section className="bg-[#010418]">
      <div className="container mx-auto">
        <div className="pt-[32px] pb-[60px]">
          <div className="flex items-center justify-center mb-[8px]">
            <SubTitle text="Who We're Looking For" bg="#A2060233" css="text-[#C15855] font-bold"  />
          </div>
          <h2 className="text-white text-center mb-[32px]">Who Should Apply?</h2>
          <p className="text-[#E6E6E6] text-[16px] md:text-[18px] text-center font-normal tracking-[-2%] leading-[160%] w-full max-w-[800px] mx-auto">
            AnyRide is seeking individuals who bring skills, judgment, and
            real-world understanding—especially in industries that intersect
            with transportation and operations.
          </p>
        </div>
      </div>
    </section>
  );
}
