"use client";
import LocationSearchInput from "@/app/components/ui/LocationSearchInput";
import { useTripModal } from "@/store/Modals";
import { Coords } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function Page() {
  const [isOnline, setIsOnline] = useState(false);
  const [stage, setStage] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [pickup, setPickup] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [pickupCoords, setPickupCoords] = useState<Coords | null>(null);
  const { modal, openModal } = useTripModal();
  const router = useRouter()

  const requests = [
    {
      id: 1,
      name: "Mike Brown",
      code: "CF 1084",
      pickup: "4827 Willowbrook Lane, OH 45056",
      dropoff: "123 Main St, Springfield, IL 62701",
    },
    {
      id: 2,
      name: "Mike Brown",
      code: "CF 1084",
      pickup: "4827 Willowbrook Lane, OH 45056",
      dropoff: "123 Main St, Springfield, IL 62701",
    },
  ];

  return (
    <div>
      {isOnline ? (
        <div>
          <h2>You&apos;re Online</h2>
          <p>Wait for requests...</p>
          <button
            onClick={() => setIsOnline(false)}
            className="cursor-pointer rounded-full w-[129px] h-[48px] bg-[#EF4444] text-[#FFFFFF] text-[16px] mb-[24px]"
          >
            Go offline
          </button>

          {requests.map((req) => (
            <div
              key={req.id}
              className="w-full max-w-[507px] min-h-[200px] rounded-[18px] bg-white shadow-[0_4px_16px_#00000026] mb-4 p-4 border-b-4 border-[#A20602]"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                {/* Left side */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src="https://i.pravatar.cc/50"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                      alt="Driver"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-center gap-2">

                    <div className="w-[6px] h-[6px] bg-[#22C553] rounded-full">
                        .
                    </div>
                    <p className="text-[10px] font-light text-[#02093A]">
                      New Request
                    </p>
                    </div>

                    <h3 className="text-[#02093A] font-bold text-[14px] leading-[120%]">
                      {req.name}
                    </h3>
                  </div>
                </div>

                {/* Right side */}
                <p className="text-[#010C4A] font-bold text-[20px]">
                  {req.code}
                </p>
              </div>

              {/* Location section */}
              <div className="bg-[#F5F5F7] p-3 rounded-lg space-y-2  ">
                <div className="relative w-full">
                  <LocationSearchInput
                    value={pickup}
                    onChange={setPickup}
                    onSelect={(address: string, lat: number, lng: number) => {
                      setPickup(address);
                      setPickupCoords({ lat, lon: lng });
                    }}
                    placeholder="4827 Willowbrook Lane, OH 44126"
                    className="w-full h-12 text-[12px] pl-9  border-b border-[#E6E6E6] focus:border-b-[#A20602] focus:outline-none"
                    label="Pickup"
                  />

                  <Image
                    src="/images/Map.png"
                    alt="Map Icon"
                    width={14}
                    height={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  />
                </div>

                <div className="relative w-full">
                  <LocationSearchInput
                    value={pickup}
                    onChange={setPickup}
                    onSelect={(address, lat, lng) => {
                      setPickup(address);
                      setPickupCoords({ lat, lon: lng });
                    }}
                    placeholder="123 Main St, Springfield, IL 62704"
                    className="w-full h-12 text-[12px] pl-9  border-[#E6E6E6] focus:border-b-[#A20602] focus:outline-none"
                    label="Destination"
                  />

                  <Image
                    src="/images/Maps.png"
                    alt="Map Icon"
                    width={14}
                    height={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  />
                </div>
              </div>

              {/* Button */}
              <button className="w-full bg-[#02093A] text-white rounded-lg py-2 mt-3 cursor-pointer" onClick={()=> router.push("/drivers/incoming-request")}>
                View request
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>You&apos;re Offline</h2>
          <p className="text-[18px] text-[#02093A] font-normal leading-[160%] mb-[17px]">
            Go online to be seen by riders.
          </p>
          <button
            onClick={() => setIsOnline(true)}
            className="cursor-pointer rounded-full w-[129px] h-[48px] bg-[#22C553] text-[16px] leading-[160%] text-center text-white"
          >
            Go online
          </button>
        </div>
      )}
    </div>
  );
}
