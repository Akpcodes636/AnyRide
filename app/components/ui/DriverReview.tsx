"use client";

import Image from "next/image";

export default function DriverReview() {
  return (
    <div>
      {/* Title */}
      <h3 className="font-semibold text-[14px] leading-[140%]">
        Reviews{" "}
        <span className="font-light text-[10px] leading-[120%] text-[#02093A]">
          (56)
        </span>
      </h3>

      {/* Card */}
      <div className="bg-[#F5F5F7] rounded-[12px]">
        <div className="pt-[12px] pb-[40px] px-[16px]">

          {/* Header */}
          <div className="flex items-start gap-[12px]">
            
            {/* Avatar */}
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden shrink-0">
              <Image
                src="/images/driverReview.png"
                alt="profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-[16px] font-normal leading-[160%] tracking-[-0.02em]">
                Annette Black
              </h3>

              <div className="flex items-center gap-[8px]">
                <p className="text-[10px] leading-[120%] text-[#353A61]">
                  Sambridge, London
                </p>

                <p className="text-[12px] text-yellow-500 font-medium">
                  ★ 5.0
                </p>
              </div>
            </div>
          </div>

          {/* Review text */}
          <p className="mt-[12px] text-[10px] text-[#555A7B] leading-[140%] font-light">
            Driver was punctual, polite, and the car was very clean. Smooth and safe
            driving the whole way. Really appreciated the professionalism and friendly
            conversation. Would definitely ride again.
          </p>

        </div>
      </div>
    </div>
  );
}