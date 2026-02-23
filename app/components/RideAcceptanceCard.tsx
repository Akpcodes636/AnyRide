"use client";

import Image from "next/image";
import { RideAcceptanceCardProps } from "@/types";

const RideAcceptanceCard: React.FC<RideAcceptanceCardProps> = ({
  driverName,
  car,
  rideCode,
  eta,
  rides,
  distance,
  rating,
  image,
}) => {
  return (
    <div className="bg-white w-full max-w-[512px] rounded-[25px] shadow-lg p-[16px] mt-6">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-[12px] flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-[8px]">
          {/* driver image — FIXED */}
          <div className="w-[32px] h-[32px] rounded-full overflow-hidden">
            <Image
              src={image}
              className="w-full h-full object-cover"
              width={32}
              height={32}
              alt="Driver"
            />
          </div>

          <div>
            <h3 className="text-[#02093A] font-semibold leading-[120%] text-[14px]">
              {driverName}
            </h3>
            <p className="text-[#555A7B] font-light leading-[120%] text-[12px]">
              {car}
            </p>
          </div>
        </div>

        <p className="text-[#02093A] font-bold leading-[120%] text-[18px] mt-2 sm:mt-0">
          {rideCode}
        </p>
      </div>

      {/* Stats */}
      <div className="text-[#555A7B] font-light mb-[12px] flex flex-wrap gap-[6px] text-[12px]">
        <span>{eta}</span>
        <span className="text-[#E6E6E6]">|</span>
        <span>{rides} rides</span>
        <span className="text-[#E6E6E6]">|</span>
        <span>{distance}</span>
        <span className="text-[#E6E6E6]">|</span>
        <span>⭐ {rating}</span>
      </div>

      {/* Buttons — 36px height, 17px gap */}
      <div className="flex flex-row gap-[17px]">
        <button className="w-full h-[36px] rounded-[24px] bg-[#F5F5F7] rounded-[8px] cursor-pointer">
          Accept
        </button>

        <button className="w-full h-[36px] rounded-[24px] bg-[#010C4A] rounded-[8px] text-white cursor-pointer">
          Decline
        </button>
      </div>

      {/* Loading bar */}
      <div className="mt-[12px] w-full h-[6px] bg-[#F6E6E6] rounded-full overflow-hidden">
        <div className="h-full bg-[#A20602] w-[60%] rounded-full" />
      </div>
    </div>
  );
};

export default RideAcceptanceCard;
