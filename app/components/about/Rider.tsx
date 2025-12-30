"use client";

import Image from "next/image";
import SubTitle from "../ui/Subtitle";

export default function Rider() {
  return (
    <section className="py-[32px] md:py-[50px] lg:py-[72px] ">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-x-[24px] gap-y-[24px]">
          <div className="w-full max-w-full md:max-w-full lg:max-w-full  h-[335px] md:h-[335px] lg:h-[645px] rounded-[8px] mx-auto ">
            <Image
              src="/images/About.png"
              width={500}
              height={500}
              className="w-full h-full object-cover object-top rounded-[8px]"
              alt="about ride image"
            />
          </div>
          <div className="flex items-center justify-center flex-col">
            <div className="mb-[24px] md:mb-[40px]">
              <div className="mb-[24px]">
                <SubTitle
                  text="Riders"
                  css="text-[#C15855] font-bold text-[14px]"
                />
              </div>
              <h3 className="font-bold text-[32px] md:text-[48px] leading-[120%] tracking-[-5%] text-[#02093A] mb-[16px] md:mb-[32px]">
                Your city is just a few taps away
              </h3>
              <p className="text-[16px] md:text-[18px] font-normal leading-[160%] tracking-[-2%] text-[#333333]">
                AnyRide gives you control over how you move — from quick errands to long trips. See your fare upfront, track your driver live, and enjoy peace of mind knowing you&apos;re in safe hands. No surprises. No stress.
              </p>
            </div>

            <div>
              <div className="mb-[24px]">
                <SubTitle
                  text="Drivers"
                  css="text-[#C15855] font-bold text-[14px]"
                />
              </div>
              <h3 className="font-bold text-[32px] md:text-[48px] leading-[120%] tracking-[-5%] text-[#02093A mb-[16px] md:mb-[32px]">
               We see the drivers as partners, not just users
              </h3>
              <p className="text-[16px] md:text-[18px] font-normal leading-[160%] tracking-[-2%] text-[#333333]">
                With AnyRide, you choose when to drive, how you earn, and what vehicle you use. Switch cars easily, cash out instantly, and grow your income without the usual pressure. Our system is built to support you — every step, every ride.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
