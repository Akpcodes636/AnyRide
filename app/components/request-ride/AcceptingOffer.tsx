"use client";

import Image from "next/image";
import Button from "../ui/Button";
import LoadingBar from "../LoadingBar";
import DriverCard from "../ui/DriverCard";
import DriverCar from "../ui/DriverCar";
import DriverReview from "../ui/DriverReview";
import Dots from "../ui/Dot";
import { useRideStore } from "@/store/rideStore";

export default function AcceptingOffer() {
  const next = useRideStore((s) => s.next);

  const handleContinue = () => {
    console.log("Continue to next step");
    next();
  };

  return (
    <div>
      <div className="bg-[#E6E6EB] w-full max-w-[512px] h-[339px] rounded-[25px] px-[20px] py-[25px]">
        <h1 className="text-[16px] md:text-[25px] font-bold leading-[120%] tracking-[-4%] text-[#333333] mb-[16px]">
          Accepting an offer...
        </h1>
        <div className="bg-[#F5F5F7] p-[16px] mb-[24px] rounded-[8px]">
          <p className="text-[14px] text-[#02093A] leading-[140%] text-center font-normal mb-[16px]">
            00: 28
          </p>
          <div className="mb-[16px]">
            <LoadingBar />
          </div>
        </div>
        {/* Drivers viewing our requests */}
        <div className="bg-white h-[48px] rounded-[8px] px-4 py-2 flex items-center justify-between shadow-sm">
          <h3 className="text-[#02093A] text-[12px] leading-[120%]">
            5 drivers are viewing your request...
          </h3>

          {/* Driver avatars */}
          <div className="flex p-4">
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
          css="w-full h-[18px] button rounded-[8px] mt-6"
          // fn={handleContinue }
        >
          Cancel request
        </Button>
      </div>

      <div>
        <div className="w-[511px] h-full bg-white shadow-sm rounded-[25px] mt-[24px]">
          <div className="py-[16px] px-[18px]">
            <DriverCard />
            <div className="py-[16px]">
              <DriverCar />
            </div>

            <div>
              <DriverReview />
            </div>
            <div className="flex items-center justify-center pt-[8px]">
              <Dots total={3} />
            </div>

            <Button
              style="tertiary"
              type="button"
              css="w-full h-[48px] rounded-[8px] font-semibold text-[16px] mt-[24px]"
              fn={handleContinue}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
