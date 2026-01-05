"use client";
import { featureContent } from "@/app/utils/Content";
import SubTitle from "../ui/Subtitle";
import { Check } from "lucide-react";
import Image from "next/image";

export default function Tracking() {
  return (
    <section className="py-[32px] md:py-[50px] lg;py-[73px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-y-[30px]">
          <div className="w-full h-full">
            <div className="mb-[24px]">
              <SubTitle
                text="Tracking"
                css="font-bold text-[16px] leading-[160%] tracking-[-2%] "
              />
            </div>
            <h2 className="w-full max-w-[415px] mb-[24px]">
              Earnings & performance overview
            </h2>
            <p className="w-full max-w-[426px] mb-[40px]">
              Track your income, trips, and performance directly from your
              driver dashboard.
            </p>

            {/* Features List */}
            <ul className="space-y-[16px] bg-[#F9EEEE] w-full max-w-full md:max-w-full lg:max-w-[360px] rounded-[6px] p-[16px]">
              {featureContent.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-red-600 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-red-600" strokeWidth={3} />
                  </div>
                  <span className="text-[16px] leading-[160%] text-[#555A7B] tracking-[-2%]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full max-w-full md:max-w-full lg:max-w-[512px] h-[675px] bg-[#F5F5F7]">
            <div className="flex items-center justify-center md:items-center md:justify-center lg:items-center lg:justify-center">

          <div className=" w-[284px] h-[581px]">
            <Image
              src="/images/Ride-Recoveres.png"
              width={500}
              height={500}
              alt="image of a phone"
              className="w-full h-full object-cover"
            />
          </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
