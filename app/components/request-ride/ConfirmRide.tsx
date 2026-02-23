"use client";
import Button from "@/app/components/ui/Button";
import LocationSearchInput from "@/app/components/ui/LocationSearchInput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ConfirmRide = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const router = useRouter();

  const [pickupCoords, setPickupCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  return (
    <section className="min-h-screen">
      <div className="container mx-auto">
        {/* <div className="flex flex-col md:flex-col lg:flex-row items-center justify-center gap-[17px] items-center justify-center ">
          <div className="h-full w-full">
            <MapLayout />
          </div> */}
        <div className="h-full min-w-full">
          <div className="bg-[#E6E6EB]  rounded-[25px]">
            <div className="p-[20px]">
              <h2 className="text-[#333333] text-[18px] md:text-[25px]">
                Confirm your trip
              </h2>
              <div className="mb-4 bg-[#F5F5F7] rounded-[25px] p-2">
                <div className="space-y-2">
                  {/* <label className="text-[10px] font-medium text-gray-700">
                    Pickup
                  </label> */}

                  <div className="relative w-full">
                    <LocationSearchInput
                      value={pickup}
                      onChange={setPickup}
                      onSelect={(address, lat, lng) => {
                        setPickup(address);
                        setPickupCoords({ lat, lon: lng });
                      }}
                      placeholder="4827 Willowbrook Lane, OH 44126"
                      className="w-full h-14 pl-10 bg-[#F5F5F5] border-b border-[#E6E6E6] focus:border-b-[#A20602] focus:outline-none"
                    />

                    <Image
                      src="/images/Map.png"
                      alt="Map Icon"
                      width={20}
                      height={20}
                      className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Destination */}
                <div className="space-y-2">
                  {/* <label className="text-[10px] font-medium text-gray-700">
                    Destination
                  </label> */}

                  <div className="relative w-full">
                    <LocationSearchInput
                      value={destination}
                      onChange={setDestination}
                      onSelect={(address, lat, lng) => {
                        setDestination(address);
                        setDestinationCoords({ lat, lon: lng });
                      }}
                      placeholder="123 Main St, Springfield, IL 62704"
                      className="w-full h-14 pl-10 bg-[#F5F5F5] border-b border-[#E6E6E6] focus:border-b-[#A20602] focus:outline-none"
                      label="Pickup"
                    />

                    <Image
                      src="/images/Map.png"
                      alt="Map Icon"
                      width={20}
                      height={20}
                      className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
              {/* Fare */}
              <div className="mb-4">
                <div className="bg-white rounded-[8px] px-[16px] py-[12px]">
                  <p className="font-light text-[#555A7B] text-[10px]">
                    Estimated fare
                  </p>
                  <h3 className="text-[#02093A] text-[18px] md:text-[20px] font-bold leading-[120%] tracking-[-4%]">
                    CF 1024
                  </h3>
                </div>
              </div>
              {/* Pay with Cash */}
              <div className="bg-[#FFE6E6] rounded-[8px] px-[16px] py-[12px] flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H2.5C1.67 5 1 5.67 1 6.5V13.5C1 14.33 1.67 15 2.5 15H17.5C18.33 15 19 14.33 19 13.5V6.5C19 5.67 18.33 5 17.5 5Z"
                      stroke="#E53935"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <p className="text-[#E53935] text-[14px] font-medium">
                    Pay with Cash
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E53935]"></div>
                </label>
              </div>
              {/* Confirm Button */}
              <Button
                style="tertiary"
                type="button"
                css="w-full text-white h-[48px] rounded-[12px] font-semibold text-[16px]"
                fn={() => router.push("/finding-ride")}
              >
                Confirm Ride
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default ConfirmRide;
