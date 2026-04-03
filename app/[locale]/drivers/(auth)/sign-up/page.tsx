"use client";

import { signupContent } from "@/app/utils/Content";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter();
  return (
    <section>
      <div className="">
        <div className="container mx-auto py-[100px]">
          <div className="mb-[74px]">
            <h1 className="text-[#02093A] font-bold text-[25px] md:text-[32px] lg:text-[48px] text-center w-full max-w-[387px] mx-auto leading-[120%] tracking-[-4%] mb-[8px]">
              Drive and Earn on AnyRide
            </h1>
            <p className="text-[#02093A] text-[18px] leading-[160%] tracking-[-2%] font-normal w-full max-w-[517px] mx-auto text-center">
              Earn on your own schedule by driving people in your city. Use your
              car or motorcycle and start making money when it works for you.
            </p>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between  w-full max-w-[797px] mx-auto gap-x-[16px] md:gap-x-[24px] gap-y-[16px] md:gap-y-[24px] mb-[74px]">
            {signupContent.map((item, index) => (
              <div
                key={index}
                className={`w-full h-full flex items-center justify-center p-2 ${
                  index === 0
                    ? "bg-[#F9EEEE]"
                    : index === 1
                      ? "bg-[#F2F7FE]"
                      : "bg-[#F0FBF4]"
                }`}
              >
                <div className="w-full max-w-full lg:max-w-[221px] h-[82px] flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-between gap-[10px] md:gap-[8px] lg:gap-[16px]">
                    <div className="w-full max-w-[20px] lg:max-w-[40px] h-[40px]">
                      <Image
                        src={item.img}
                        alt={item.text}
                        className="h-full w-full object-contain"
                        width={500}
                        height={500}
                      />
                    </div>
                    <p className="text-[#02093A] font-semibold text-[18px] leading-[140%] tracking-[-2%]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-[#010C4A] w-[518.5px] h-[57px] rounded-[12px] font-semibold text-[18px] leading-[160%] tracking-[-2%] text-center text-white cursor-pointer"
              onClick={() => router.push("/drivers/choose-location")}
            >
              Continue as Driver
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

