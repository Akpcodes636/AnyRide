"use client";

import Image from "next/image";
import DriverLocation from "./DriverLocation";


export default function TrackingUi() {
  return (
    <>
      <div className="w-[511px] h-[461px] bg-red-900 rounded-[25px] shadow-sm">
        <div className="p-[16px]">
          <h1 className="text-[#333333] text-[25px] font-bold leading-[-4%] tracking-[120%]">
            Jameel assigned to you, keep track.!
          </h1>
          <p className="text-[#555A7B] leading-[-2%] font-normal leading-[160%] mb-[16px]">
            Arriving pickup in <span className="!text-[#188C3B]">5mins</span>
          </p>
          <div className="">
            <div className="py-[12px] px-[16px] bg-[#F5F5F7]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-[16px]">

                {/* Avatar */}
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                  <Image
                    src="/images/jacob.png"
                    alt="Jacob Jones"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col">
                  <h3 className="font-semibold text-sm">Jacob Jones</h3>

                  <div className="flex gap-2 text-xs text-gray-500">
                    <p className="text-[10px] font-light text-[10px] leading-[120%] text-[#02093A]">
                      110 min
                    </p>
                    <p className="text-[#E6E6E6]">|</p>
                    <p>5 seats</p>
                    <p className="text-[#E6E6E6]">|</p>
                    <p>4.8 ⭐</p>
                  </div>
                </div>
                </div>

                <div className="w-[87px] h-[46.84615707397461px]">
                  <Image
                    src="/images/_jeep.png"
                    width={500}
                    height={500}
                    alt="cars"
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>

            </div>
              <div>
                <DriverLocation />
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
