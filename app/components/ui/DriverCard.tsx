"use client";

import Image from "next/image";

export default function DriverCard() {
  return (
    <div>
      <div className="flex items-center gap-[17px]">
        <div className="w-1/5">
          <div className="w-[72px] h-[87px]">
            <Image
              src="/images/driverprofile.png"
              alt="profile picture of a driver"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-[#02093A] font-bold text-[20px] leading-[120%] tracking-[-2%] mb-[8px]">
            Jameel Abdullahi
          </h3>
          <p className="text-[10px] mb-[8px] font-medium">
            <span className="font-light text-[#02093A]">Location:</span> United
            state <span className="font-light text-[#E6E6E6]">|</span> Ratings:
            4.8 ⭐
          </p>
          <p className="text-[10px] ">
            {" "}
            <span className="font-light text-[#02093A]">Experience:</span> 6 yrs
            |{" "}
            <span className="font-light text-[#02093A]">
              Est. time of arrival:
            </span>{" "}
            5mins
          </p>
        </div>
      </div>
    </div>
  );
}
