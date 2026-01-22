"use client";

import { partnerFeatures } from "@/app/utils/Content";
import SubTitle from "../ui/Subtitle";
import PartnerCard from "./PartnerCard";

export default function WhyPartners() {
  return (
    <section className="py-[40px] md:py-[64px]">
      <div className="container mx-auto h-full">
        <div>
          <div className="flex items-center justify-center mb-[24px]">
            <SubTitle
              text="Why us?"
              css="text-[#A20602] font-bold text-[16px]"
            />
          </div>
          <h2 className="text-center mb-[32px]">Why Partner With AnyRide</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-[16px]">
  {partnerFeatures.map((item, index) => (
    <PartnerCard
      key={index}
      img={item.img}
      title={item.title}
      description={item.description}
    />
  ))}
</div>

        </div>
      </div>
    </section>
  );
}
