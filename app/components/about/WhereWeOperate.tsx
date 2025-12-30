"use client";

import HeroSearchDesktop from "../home/hero/HeroSearchDesktop";
import HeroSearchMobile from "../home/hero/HeroSearchMobile";
import SubTitle from "../ui/Subtitle";
import WhereWeOperateCard from "../ui/WhereWeOperateCard";

export default function WhereWeOperate() {
  return (
    <section className="bg-[#010418] py-[32px] md:py-[50px] lg:py-[72px]">
      <div className="container">
        <div>
            <div className="flex items-center justify-center mb-[24px]">
          <SubTitle text="Where we operate" css="bg-[#A206021A] text-[#C15855] font-bold leading-[160%] tracking-[-2%] text-[#C15855]" />
            </div>
          <h2 className="text-white text-center mb-[16px] w-full max-w-[335px] mx-auto md:max-w-full lg:max-w-full">Active today. Expanding thoughtfully.</h2>
          <p className="text-[#B5B5B5] text-[16px] text-center w-full max-w-[335px]  mx-auto md:max-w-full lg:max-w-full mb-[32px]">
            We only list regions we can support — to keep trust high and
            expectations clear.
          </p>
          <div>
            <div className="block md:hidden lg:hidden">
              <HeroSearchMobile />
            </div>

            <div className="hidden md:block lg:block">
              <HeroSearchDesktop />
            </div>
          </div>

          {/* <div>
            <WhereWeOperateCard />
          </div> */}
        </div>
      </div>
    </section>
  );
}
