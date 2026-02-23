"use client";

import Image from "next/image";
import LoadingBar from "../LoadingBar";
import Button from "../ui/Button";
import RideAcceptanceCard from "../RideAcceptanceCard";

const FindingRide = () => {
  return (
    <div>
      <div className="bg-[#E6E6EB] w-full max-w-[512px] h-[378px] rounded-[25px] px-[20px] py-[25px]">
        <h1 className="text-[16px] md:text-[25px] font-bold leading-[120%] tracking-[-4%] text-[#333333] mb-[16px]">
          Finding nearby drivers...
        </h1>
        <div className="bg-[#F5F5F7] p-[16px] mb-[24px] rounded-[8px]">
          <p className="text-[14px] text-[#02093A] leading-[140%] text-center font-normal ">
            01: 46
          </p>
          <div className="mb-[16px]">
            <LoadingBar />
          </div>

          <div className="border-b text-[#E6E6E6] border-1 mb-[16px]"></div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              {/* Left circle */}
              <div className="flex items-center justify-center bg-[#E6E6EB] h-[30px] w-[30px] rounded-full">
                <p className="text-[10px] text-[#8B8EA4] font-normal leading-[140%] p-2">
                  -5
                </p>
              </div>

              {/* Center text */}
              <h3 className="text-[18px] md:text-[25px] font-bold tracking-[-0.04em] leading-[120%] text-[#02093A]">
                CF 1024
              </h3>

              {/* Right circle */}
              <div className="flex items-center justify-center bg-[#A20602] h-[30px] w-[30px] rounded-full">
                <p className="text-[10px] text-white font-normal leading-[140%] p-2">
                  +5
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Drivers viewing our requests */}
        <div className="bg-white h-[48px] rounded-[8px] px-4 py-2 flex items-center justify-between shadow-sm">
          <h3 className="text-[#02093A] text-[12px] leading-[120%]">
            5 drivers are viewing your request...
          </h3>

          {/* Driver avatars */}
          <div className="flex">
            {[
              "/images/img.png",
              "/images/img-1.png",
              "/images/img-2.png",
              "/images/img-3.png",
            ].map((src, index) => (
              <div
                key={index}
                className="w-6 h-6 relative rounded-full overflow-hidden -mr-10"
              >
                <Image
                  src={src}
                  alt={`driver ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* button */}
        <Button
          style="disabled"
          type="button"
          css="w-full h-[18px]  button rounded-[8px] mt-6"
        >
          Add to price
        </Button>
      </div>

      <RideAcceptanceCard
        driverName="Jameel Abdullahi"
        car="Xiaomi car 56"
        rideCode="CF 1084"
        eta="5 min"
        rides={563}
        distance="400m"
        rating={4.8}
        image="/images/img-1.png"
      />

      <RideAcceptanceCard
        driverName="Aisha Bello"
        car="Toyota Corolla 12"
        rideCode="CF 1099"
        eta="3 min"
        rides={420}
        distance="350m"
        rating={4.9}
        image="/images/img-2.png"
      />
    </div>
  );
};

export default FindingRide;
