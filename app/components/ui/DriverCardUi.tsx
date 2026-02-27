"use client";

import Image from "next/image";

export default function DriverCardUi() {
  return (
    <div className="bg-[#F5F5F7] rounded-xl px-4 py-3 flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-[40px] h-[40px] rounded-full bg-[#F5F5F7] flex items-center justify-center text-xl flex-shrink-0">
          <Image
            src="/images/driverprofile.png"
            alt=""
            width={500}
            height={500}
            className="w-full h-full object-cover"
            />
        </div>
        <div>
          <p className="font-bold text-sm text-gray-900">Jacob Jones</p>
          <p className="text-xs text-gray-400 mt-0.5 flex gap-2">
            <span>110min</span>
            <span>5 seats</span>
            <span>⭐ 4.8</span>
          </p>
        </div>
      </div>
      <div className="w-[87px] h-[46px]">
        <Image
          src="/images/driverCar.png"
          width={500}
          height={500}
          alt="car"
          className="w-full h-full object-cover"
          />
      </div>
    </div>
  );
}
