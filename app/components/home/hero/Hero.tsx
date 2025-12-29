"use client";
import SubTitle from "../../ui/Subtitle";
import HeroSearch from "./HeroSearch";

const Hero = () => {
  return (
    <div className="">
    <section className="w-full bg-hero">
      <div className=" pt-27.5 md:pt-30 lg:pt-55 pb-20 ">
        <div className="flex items-center justify-center flex-col">
            <div className="mb-6">
          <SubTitle img="/icons/SVG.png" text="Local, Friendly, Fast" css="rounded-[40px] font-normal" />
            </div>
          <h1 className="text-text-white text-[40px] md:text-[50px] lg:text-[64px] font-bold leading-[120%] tracking-[-5%] text-center w-full  max-w-74 md:max-w-74 lg:max-w-[596px] xl:max-w-[696px] mx-auto mb-[17.14px] md:mb-6 ">Get a ride. Make a living. All on AnyRide.</h1>
          <p className="text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] text-text w-full max-w-75 md:max-w-101.25 lg:max-w-126.25 xl:max-w-157 mx-auto text-center text-gray-300 mb-7 md:mb-10 lg:mb-10">
            Fast, safe, and affordable rides across your city. Whether you&apos;re
            heading somewhere or helping others get there — AnyRide gets you
            moving.
          </p>

          <HeroSearch />
        </div>
      </div>
    </section>

    </div>
  );
};

export default Hero;
