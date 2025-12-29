"use client";
import Image from "next/image";
import SubTitle from "../ui/Subtitle";
import { AnyRideFeatures } from "@/app/utils/Content";

const Values = () => {
  return (
    <section className="bg-[#010418] bg-values">
      <div className="py-8 container">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8 md:mb-12.5 lg:mb-18">
          <div className="mb-2">
            <SubTitle text="Our Values" bg="bg-[#A2060233]" />
          </div>

          <h2 className="text-white w-full max-w-[66.75rem] mx-auto text-center md:max-w-full">
            Why Choose AnyRide
          </h2>

          <p className="text-gray-300 text-center text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] w-full max-w-[66.75rem] md:max-w-[143rem] mx-auto">
            AnyRide is designed for local streets and real people. We keep rides
            affordable, drivers verified, and payments simple — so you can ride
            or drive without worries.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Left: Features */}
          {/* Content */}
          <div className=" flex flex-col gap-6 lg:gap-6 items-start">
            {AnyRideFeatures.map((feature, index) => (
              <div
                key={index}
                className="w-full max-w-full bg-gray-50 rounded-lg p-6 md:p-8 lg:p-10"
              >
                <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
                  {/* Number */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#A20602] font-bold leading-none flex-shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </h3>

                  {/* Text */}
                  <div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#010418] font-semibold leading-tight mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image */}
          <div className="w-full h-full  items-center justify-center hidden md:hidden lg:flex">
            <Image
              src="/images/Phone.png"
              width={500}
              height={500}
              className="w-full h-auto object-contain"
              alt="AnyRide mobile app preview"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
