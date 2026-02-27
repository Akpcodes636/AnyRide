"use client";

import Image from "next/image";

export default function DriverCar() {
  return (
    <div className="bg-[#F5F5F7] w-[476px] h-[70px]">
      <div className="py-[7px] px-[16px]">
        <div className="flex items-center gap-[17px]">
          <div className="w-1/4">
            <Image
              src="/images/driverCar.png"
              alt="image of the car"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full">
            <h3 className="text-[16px] leading-[160%] tracking-[-2%] text-[#02093A]">Annette Black</h3>
            <p className="text-[#555A7B] text-[10px] leading-[120%] font-light">5 seats | 4.8⭐</p>
          </div>
        </div>
      </div>
    </div>
  );
}
