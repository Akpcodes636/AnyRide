"use client";
import Image from "next/image";
import SubTitle from "../ui/Subtitle";
import AboutCards from "../ui/AboutCard";

export default function AboutHero() {
  return (
    <section>
      <div className="container">
        <div className="py-[131px] md:py-[150px] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-x-[39px]">
          <div className="flex items-start justify-center flex-col">
            <div className="mb-[8px]">
              <SubTitle
                text="About AnyRide"
                css="text-[#C15855] font-bold leading-[160%] tracking-[-2%]"
              />
            </div>
            <h1 className="text-[40px] text-text-accent leading-[120%] tracking-[-5%] font-bold mb-[8px]">
              Moving people and livelihoods safely, locally, reliably.
            </h1>
            <p className="text-[#8B8EA4] text-[16px] font-normal leading-[160%] tracking-[-2%] mb-[32px]">
              AnyRide connects riders with verified drivers using both cars and
              motorcycles. Built for everyday movement commuting, errands, short
              trips with a focus on safety, fairness, and local realities.
            </p>
            {/* boxes */}
           
            <AboutCards />
            

          </div>
          <div className="">
            <Image
              src="/images/AboutHero.png"
              width={500}
              height={500}
              alt="about image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
