"use client";
import { forEveryoneData } from "@/app/utils/Content";
import SubTitle from "../ui/Subtitle";
import WhereWeOperateCard from "../ui/WhereWeOperateCard";


export default function ForEveryone() {
  return (
    <section className="py-[32px] md:py-[50px] lg:py-[72px]">
      <div className="container">
        <div className="">
          <div className="flex items-center justify-center mb-[24px]">
            <SubTitle text="For everyone" css="font-bold text-[16px] leading-[160%] tracking-[-2%] text-[#C15855]" />
          </div>
          <h2 className="text-center mb-[16px] w-full max-w-[335px] mx-auto md:max-w-full lg:max-w-full">
            Built for riders, drivers, and partners
          </h2>
          <p className="text-center font-normal text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] text-[#545454] max-w-[335px] w-full mx-auto md:max-w-full lg:max-w-full">
            One platform — different needs. Equal focus.
          </p>
          <div className="flex flex-col gap-4 md:flex-col lg:flex-row md:gap-6 pt-[32px] md:pt-[48px]">
            {forEveryoneData.map((item) => (
              <WhereWeOperateCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
