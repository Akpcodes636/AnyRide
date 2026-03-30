"use client";
import { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { PiWarningCircle } from "react-icons/pi";

import AddVehicle from "@/app/components/modals/AddVehicle";
import { useTripModal } from "@/store/Modals";

export default function Page() {
  const { openModal } = useTripModal();
  const [view, setView] = useState<"noVehicles" | "underReview" | "hasVehicles">("noVehicles");

  const handleVehicleSubmit = () => {
    // Switch to under review state when a vehicle is submitted
    setView("underReview");
  };

  return (
    <div className="py-[100px]">
      <div className="container mx-auto">
        <h1 className="text-[#333333] font-bold text-[48px] leading-[120%] mb-[78px]">
          My Vehicles
        </h1>

        <div className={`flex items-center justify-center flex-col ${view === "hasVehicles" ? "items-start justify-start" : ""}`}>
          {/* Main Vehicle Card */}
          {view === "underReview" ? (
            <>
              <div className="w-full max-w-[618px] h-[507px] bg-[#F5F5F7] rounded-[20px] flex items-center justify-center flex-col mb-[24px]">
                <div className="w-[88px] h-[88px] bg-[#FFEBCD] rounded-full flex items-center justify-center mb-[8px]">
                  <PiWarningCircle size={48} color="#F59E0B" />
                </div>
                <h3 className="font-bold text-[25px] leading-[120%] tracking-[-4%] text-[#02093A] mb-[8px] max-w-[318px] mx-auto text-center">
                  Your vehicle is under review by AnyRide Team
                </h3>
                <p className="text-[#545454] text-[14px] leading-[120%] font-normal text-center">
                  You&apos;ll be notified once approved
                </p>
              </div>

              <div className="w-[618px] h-[48px] mb-[24px]">
                <button
                  onClick={() => setView("hasVehicles")}
                  className="text-white bg-[#010C4A] w-full h-[48px] rounded-[12px] cursor-pointer hover:bg-[#010C4A]/90 transition-colors"
                >
                  Done
                </button>
              </div>
            </>
          ) : view === "noVehicles" ? (
            <div className="w-full max-w-[618px] h-[507px] bg-[#F5F5F7] rounded-[20px] flex items-center justify-center flex-col mb-[24px]">
              <div className="w-[88px] h-[88px] bg-[#E6E7ED] rounded-full flex items-center justify-center">
                <RiErrorWarningLine size="43" color="#010C4A" />
              </div>
              <h3 className="font-normal text-[25px] leading-[120%] tracking-[-4%] text-[#02093A] mb-[8px]">
                No registered vehicle yet.
              </h3>
              <p className="text-[#545454] text-[14px] leading-[120%] font-normal text-center">
                Start your driving journey by adding a vehicle
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-[24px]">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="w-full max-w-[655px] h-[246px] bg-[#F5F5F7] rounded-[20px] flex items-center justify-center flex-col mb-[24px]"
                >
                  <div className="p-[16px]">
                    <div className="flex flex-col w-full">
                      <div className="flex items-center gap-[16px]">
                        <div className="w-[273px] h-[170px] rounded-[20px] bg-red-900"></div>
                        <div className="w-[273px] h-[170px] rounded-[20px] flex flex-col justify-between">
                          <div>
                            <h3 className="text-[#02093A] tracking-[-4%] font-bold leading-[120%]">
                              Car-236FGD
                            </h3>
                            <p className="text-[#02093A] text-[14px] font-normal leading-[140%]">
                              Toyota Corolla 2015
                            </p>
                            <p className="text-[#555A7B] text-[14px] font-normal leading-[140%]">
                              Seating Capacity: <span className="font-bold">4 Passengers</span>
                            </p>
                          </div>
                          <button className="w-[84px] h-[33px] border border-[#22C553] bg-[#E9F9EE] py-[8px] px-[14px] rounded-full text-[14px] text-center">
                            Verified
                          </button>
                        </div>
                      </div>

                      <div className="mt-[10px]">
                        <button className="w-full bg-[#E6E7ED] rounded-[12px] h-[36px]">
                          Disactivate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Vehicle Button */}
          {view === "noVehicles" && (
            <div className="max-w-[618px] w-full">
              <button
                onClick={() => openModal("addVehicle")}
                className="text-white bg-[#010C4A] w-full h-[48px] rounded-[12px] cursor-pointer hover:bg-[#010C4A]/90 transition-colors"
              >
                Add New Vehicle
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Vehicle Modal */}
      <div>
        <AddVehicle onVehicleSubmit={handleVehicleSubmit} />
      </div>
    </div>
  );
}