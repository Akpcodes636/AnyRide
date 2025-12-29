"use client";

import Image from "next/image";
import SubTitle from "../ui/Subtitle";
import { SafetyFeatures } from "@/app/utils/Content";

const Safety = () => {
  return (
    <section className="container">
      {/* Header */}
      <div className="flex items-center justify-center flex-col mt-6 md:mt-10 lg:mt-14 xl:mt-18">
        <div className="mb-6">
          <SubTitle text="Safety & Trust" css="rounded-[40px] font-normal" />
        </div>

        <h2 className="text-center">
          Your safety comes <br /> first. Always.
        </h2>

        <p className="text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] text-center text-[#333333] font-normal w-full max-w-[299px] md:max-w-[643px] mx-auto">
          Strict driver & vehicle verification, live GPS tracking, trip sharing,
          and an in-app SOS button.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-x-10 mt-12">
        {/* Phone Image */}
        <div className="w-full max-w-[220px] md:max-w-[360px] mx-auto flex items-center justify-center">
          <Image
            src="/images/Phone-1.png"
            width={500}
            height={500}
            className="w-full h-auto object-contain"
            alt="Safety Image"
          />
        </div>

        {/* Mobile Safety Cards */}
        <div className="mt-6 xl:mt-0 space-y-6 xl:hidden">
          {/* Card 1 */}
          <div className="w-full max-w-full md:max-w-full lg:max-w-full mx-auto bg-[#F6E6E6] rounded-[8px] p-6">
            <h3 className="text-[#010418] font-semibold leading-[120%] tracking-[-5%] text-[24px] md:text-[28px] mb-4">
              Verified Drivers
            </h3>
            <p className="text-[14px] leading-[153%] tracking-[-2%] text-[#333]">
              Every driver and vehicle is thoroughly screened before going live.
              We verify identity documents, driving licenses, and background
              checks to ensure you&apos;re riding with someone reliable and
              professional. You&apos;ll always see your driver&apos;s name,
              photo, and car details before the trip begins.
            </p>
          </div>

          {/* Card 2 */}
          <div className="w-full max-w-full md:max-w-full lg:max-w-full mx-auto bg-[#EBF3FE] rounded-[8px] p-6">
            <h3 className="text-[#010418] font-semibold leading-[120%] tracking-[-5%] text-[24px] md:text-[28px] mb-4">
              Live Tracking
            </h3>
            <p className="text-[14px] leading-[153%] tracking-[-2%] text-[#333]">
              From pickup to drop-off, you can track your ride in real time and
              share your trip link with friends or family for extra peace of
              mind. You&apos;ll always know exactly where you are, who&apos;s
              driving, and how long until you arrive — no guesswork, no worries.
            </p>
          </div>

          {/* Card 3 */}
          <div className="w-full max-w-full md:max-w-full lg:max-w-full mx-auto bg-[#E9F9EE] rounded-[8px] p-6">
            <h3 className="text-[#010418] font-semibold leading-[120%] tracking-[-5%] text-[24px] md:text-[28px] mb-4">
              SOS & 24/7 Support
            </h3>
            <p className="text-[14px] leading-[153%] tracking-[-2%] text-[#333]">
              Safety doesn&apos;t stop once the ride starts. If anything feels off,
              our in-app SOS button instantly connects you to emergency support.
              And whether it&apos;s day or night, our team is always available to
              assist you, resolve issues, and make sure every ride ends well.
            </p>
          </div>
        </div>

        {/* Desktop Safety Cards */}
        <div>
          <div className="space-y-6 hidden md:hidden lg:hidden xl:block">
            {SafetyFeatures.map((feature, index) => (
              <div key={index} className="w-full">
                <div className="max-w-[736px] h-[279px] w-full bg-[#E6E6EB] rounded-[8px] mx-auto">
                  <div className="p-[60px]">
                    <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
                      {/* Number */}
                      <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#A20602] font-bold leading-none flex-shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </h3>

                      {/* Text */}
                      <div>
                        <h3 className="text-[40px] text-[#010418] font-semibold leading-[120%] mb-2">
                          {feature.title}
                        </h3>

                        <p className="text-base text-gray-600 leading-relaxed">
                          {feature.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Safety;
