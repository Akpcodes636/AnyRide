"use client";
import { ourMission } from "@/app/utils/Content";
import OurMissionCard from "../ui/OurMissonCard";
import SubTitle from "../ui/Subtitle";

export default function OurMission() {
  return (
    <section className="py-[40px] md:py-[64px]">
      <div className="container mx-auto">
        <div>
          <div className="flex items-center justify-center mb-[24px]">
            <SubTitle
              text="Our Mission"
              css="text-[#A20602] font-bold text-[16px] tracking-[-2%]"
            />
          </div>
          <h2 className="text-center mb-[31px] md:mb-[51px]">Why we&apos;re Building AnyRide</h2>
        </div>
         
         <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-[16px] gap-y-[16px]">
         {ourMission.map((item, index) => (
        <OurMissionCard
          key={index}
          img={item.img}
          title={item.title}
          text={item.text}
        />
      ))}
         </div>
      </div>
    </section>
  );
}
