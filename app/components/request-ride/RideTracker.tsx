import Image from "next/image";
import { useState, useEffect } from "react";
import LocationSearchInput from "../ui/LocationSearchInput";
import EmergencyContact from "./EmergencyContact";
import { useTripModal } from "@/store/Modals";
import TripCompleted from "../modals/TripCompleted";
import DriverCardUi from "../ui/DriverCardUi";
import { Coords, StageConfig } from "@/types";

type Stage = "assigned" | "pickup" | "onway" | "completed";

const STAGES: Stage[] = ["assigned", "pickup", "onway", "completed"];
const STAGE_DURATION = 5;


export default function RideTracker() {
  const [stage, setStage] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(STAGE_DURATION);
  const [visible, setVisible] = useState<boolean>(true);
  const [pickup, setPickup] = useState<string>("");
  const [pickupCoords, setPickupCoords] = useState<Coords | null>(null);
  const [destination, setDestination] = useState<string>("");
  const [destinationCoords, setDestinationCoords] = useState<Coords | null>(
    null,
  );
  const { modal,openModal } = useTripModal();

  const advance = (): void => {
    if (stage >= STAGES.length - 1) return;
    setVisible(false);
    setTimeout(() => {
      setStage((s: number) => s + 1);
      setCountdown(STAGE_DURATION);
      setVisible(true);
    }, 300);
  };

  useEffect(() => {
    if (stage >= STAGES.length - 1) return;
    const timer = setInterval(() => {
      setCountdown((c: number) => {
        if (c <= 1) {
          clearInterval(timer);
          return STAGE_DURATION;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [stage], );

  useEffect(() => {
    if (stage >= STAGES.length - 1) return;
    const auto = setTimeout(() => advance(), STAGE_DURATION * 1000);
    return () => clearTimeout(auto);
  }, [stage]);

  const stageConfig: StageConfig[] = [
    { title: "Jameel assigned to you, keep track.", greenSub: true },
    { title: "Track Ride.", subtitle: "Jameel is here to pick you.." },
    { title: "Track Ride.", subtitle: "On the way to your destination... " },
    {
      title: "Track Ride.",
      subtitle: "Trip marked completed by the driver",
      greenSub: true,
    },
  ];

  const current: StageConfig = stageConfig[stage];
  const primaryLabel: string = stage === 1 ? "Confirm Pickup" : "Confirm Ride";

  return (
    <div>
      <div
        className={`w-full mx-w-[512px] bg-white rounded-2xl p-4 shadow-lg transition-all duration-300
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        {/* Progress indicators */}
        <div className="flex gap-4">
          {/* Right content */}
          <div className="flex-1">
            {/* Header */}
            <h2
              className={`text-[25px] font-bold leading-[120%] tracking-[-4%] mb-1 ${
                stage === 3 ? "text-emerald-600" : "text-[#333333]"
              }`}
            >
              {current.title}
            </h2>
            {stage === 0 ? (
              <p className="text-[16px] mb-4">
                Arriving pickup in{" "}
                <span className="text-emerald-500 font-bold">5mins</span>
              </p>
            ) : (
              <p className="text-sm text-gray-500 mb-4">{current.subtitle}</p>
            )}

            {/* Countdown bar */}
            {/* {stage < STAGES.length - 1 && (
              <CountdownBar seconds={countdown} total={STAGE_DURATION} />
            )} */}

            <DriverCardUi />
            <div className="flex items-start justify-center flex-row gap-4">
              {/* Timeline (left side) */}
              <div className="flex flex-col items-center">
                {STAGES.map((_: Stage, i: number) => (
                  <div key={i} className="flex flex-col items-center">
                    {/* Dot */}
                    <div
                      className={`w-[16px] h-[16px] rounded-full transition-all duration-300 ${
                        i <= stage ? "bg-[#010C4A]" : "bg-[#E6E6EB]"
                      }`}
                    />
                    {/* Line */}
                    {i !== STAGES.length - 1 && (
                      <div
                        className={`w-[2px] border-dotted border-black h-16 transition-all duration-300 ${
                          i < stage ? "bg-gray-900" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="w-full">
                <div className="mb-2">
                  <div className="relative w-full mb-[12px]">
                    <LocationSearchInput
                      value={pickup}
                      onChange={setPickup}
                      onSelect={(address: string, lat: number, lng: number) => {
                        setPickup(address);
                        setPickupCoords({ lat, lon: lng });
                      }}
                      placeholder="4827 Willowbrook Lane, OH 44126"
                      className="w-full h-14 pl-10 bg-white border-b border-[#E6E6E6] focus:border-b-[#A20602] focus:outline-none"
                      label="Pickup"
                    />
                    <Image
                      src="/images/Map.png"
                      alt="Map Icon"
                      width={20}
                      height={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                  
                  <div className="relative w-full mb-[12px]">
                    <LocationSearchInput
                      value={destination}
                      onChange={setDestination}
                      onSelect={(address: string, lat: number, lng: number) => {
                        setDestination(address);
                        setDestinationCoords({ lat, lon: lng });
                      }}
                      placeholder="123 Main St, Springfield, IL 62704"
                      className="w-full h-14 pl-10 bg-white border-b border-[#E6E6E6] focus:border-b-[#A20602] focus:outline-none"
                      label="Destination"
                    />
                    <Image
                      src="/images/Map.png"
                      alt="Map Icon"
                      width={20}
                      height={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                  <div className="relative w-full mb-[12px]">
                    <LocationSearchInput
                      value={pickup}
                      onChange={setPickup}
                      onSelect={(address, lat, lng) => {
                        setPickup(address);
                        setPickupCoords({ lat, lon: lng });
                      }}
                      placeholder="4827 Willowbrook Lane, OH 44126"
                      className="w-full h-14 pl-10 bg-white border-b border-[#E6E6E6] focus:border-b-[#A20602] focus:outline-none"
                      label="Driver's location"
                    />

                    <Image
                      src="/images/Map.png"
                      alt="Map Icon"
                      width={20}
                      height={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mt-5">
                  <div className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 cursor-pointer transition-colors flex items-center justify-center gap-1">
                    <div className="w-[12px] h-[12px]">
                      <Image
                        src="/images/Calling.png"
                        alt="call icons"
                        width={500}
                        height={500}
                      />{" "}
                    </div>
                    Call
                  </div>
                  <div className="flex-1 py-3 rounded-xl border border-gray-200 cursor-pointer text-sm font-semibold text-gray-700 transition-colors flex items-center justify-center gap-1">
                    <div className="w-[12px] h-[12px]">
                      <Image
                        src="/images/Vector.png"
                        alt="call icons"
                        width={500}
                        height={500}
                      />{" "}
                    </div>
                    Chat
                  </div>
                  {stage === 0 ? (
                    <button
                     onClick={() => openModal("tripCompleted")}
                      className="flex-2 w-36 py-3 rounded-xl bg-gray-900 text-white text-sm font-normal hover:bg-gray-700 transition-colors"
                    >
                      Confirm ride
                    </button>
                  ) : (
                    <button
                      onClick={() => openModal("tripCompleted")}
                      // onClick={advance}
                      className="flex-2 w-36 py-3 cursor-pointer rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-700 transition-colors"
                    >
                      {primaryLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* Route rows */}
          </div>
        </div>
      </div>

      <EmergencyContact />
     {modal === "tripCompleted" && <TripCompleted />}
    </div>
  );
}
