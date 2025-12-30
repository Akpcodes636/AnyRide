"use client";
import Image from "next/image";
import SubTitle from "../ui/Subtitle";

export default function Vision() {
  return (
    <section className="py-[32px] md:py-[50px] lg:py-[72px] ">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-x-[24px] gap-y-[24px]">
          <div className="w-full max-w-full md:max-w-full lg:max-w-full  h-[335px] md:h-[335px] lg:h-[645px] rounded-[8px] mx-auto ">
            <Image
              src="/images/About-Image.png"
              width={500}
              height={500}
              className="w-full h-full object-cover object-top"
              alt="about ride image"
            />
          </div>
          <div className="flex items-center justify-center flex-col">
            <div className="mb-[24px] md:mb-[40px]">
              <div className="mb-[24px]">
                <SubTitle
                  text="Our Vision"
                  css="text-[#C15855] font-bold text-[14px]"
                />
              </div>
              <h3 className="font-bold text-[32px] md:text-[48px] leading-[120%] tracking-[-5%] text-[#02093A]">
                The vision is to go global
              </h3>
              <p className="text-[16px] md:text-[18px] font-normal leading-[160%] tracking-[-2%] text-[#333333]">
                To build Africa&apos;s most trusted local mobility network — one
                that puts people, not just technology, at the center. We&apos;re
                not just creating rides; we&apos;re building bridges between
                people, opportunities, and safer streets.
              </p>
            </div>

            <div>
              <div className="mb-[24px]">
                <SubTitle text="Our Mission"   css="text-[#C15855] font-bold text-[14px]" />
              </div>
              <h3 className="font-bold text-[32px] md:text-[48px] leading-[120%] tracking-[-5%] text-[#02093A">
                We are here just for you
              </h3>
              <p className="text-[16px] md:text-[18px] font-normal leading-[160%] tracking-[-2%] text-[#333333]">
                To redefine local transportation by making every trip
                effortless, affordable, and empowering — for both riders and
                drivers. We believe that movement should never be stressful,
                unsafe, or overpriced. Everyone deserves a ride that&apos;s
                fair, transparent, and easy to trust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
