"use client";
import { useState } from "react";
import { Plus, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRideStore } from "@/store/rideStore";
import { useRideTypes } from "@/hooks/useRideHooks";
import Loader from "../ui/Loader";
import { FareVehicleOption } from "@/types";

const SelectRideType = () => {
  const next = useRideStore((s) => s.next);
  const back = useRideStore((s) => s.back);
  const setRideData = useRideStore((s) => s.setRideData);
  const fareEstimate = useRideStore((s) => s.rideData.fareEstimate);
  const pickup = useRideStore((s) => s.rideData.pickup);
  const destination = useRideStore((s) => s.rideData.destination);

  const [payWithCash, setPayWithCash] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const { data: rideTypes, isLoading, isError } = useRideTypes();

  // Use fare estimate vehicle options if available, otherwise fall back to ride types
  const vehicleOptions = fareEstimate?.vehicle_options || [];
  const hasEstimate = vehicleOptions.length > 0;

  const handleSelectVehicle = (index: number, option: FareVehicleOption) => {
    setSelectedIndex(index);
    setRideData({ selectedVehicle: option });
  };

  const handleContinue = () => {
    // Store selected vehicle if from fare estimate
    if (hasEstimate && vehicleOptions[selectedIndex]) {
      setRideData({ selectedVehicle: vehicleOptions[selectedIndex] });
    }
    next();
  };

  return (
    <div className="w-full max-w-full mx-auto">
      {/* Back button + header */}
      <button
        onClick={back}
        className="flex items-center gap-1 text-[14px] text-[#666] hover:text-[#1A1A1A] mb-4 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Route summary */}
      <div className="bg-[#F5F5F7] rounded-[16px] p-4 mb-4">
        <div className="flex gap-3">
          <div className="flex flex-col items-center pt-1 gap-[2px]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#02093A]" />
            <div className="w-[2px] flex-1 bg-[#D1D1D6] min-h-[20px]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#A20602]" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-[10px] text-[#999] uppercase tracking-wide">Pickup</p>
              <p className="text-[13px] text-[#1A1A1A] font-medium truncate">
                {pickup?.address || "Not set"}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-[#999] uppercase tracking-wide">Destination</p>
              <p className="text-[13px] text-[#1A1A1A] font-medium truncate">
                {destination?.address || "Not set"}
              </p>
            </div>
          </div>
        </div>

        {fareEstimate && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E6E6E6]">
            <span className="text-[12px] text-[#666]">{fareEstimate.distance_km?.toFixed(1)} km · ~{fareEstimate.estimated_duration_minutes} min</span>
            {fareEstimate.available_drivers > 0 && (
              <span className="text-[12px] text-[#02093A] font-medium">{fareEstimate.available_drivers} drivers available</span>
            )}
          </div>
        )}
      </div>

      {/* Ride type selection */}
      <div className="mb-4">
        <h2 className="text-[16px] font-semibold text-[#1A1A1A] mb-3">
          Choose a ride
        </h2>

        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader />
          </div>
        )}

        {isError && (
          <p className="text-[14px] text-[#E53935] text-center py-6">
            Failed to load ride types. Please try again.
          </p>
        )}

        {/* Fare estimate vehicle options (preferred) */}
        {hasEstimate && (
          <div className="space-y-2">
            {vehicleOptions.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelectVehicle(i, option)}
                className={`w-full flex justify-between items-center rounded-[14px] p-4 transition-all cursor-pointer ${
                  selectedIndex === i
                    ? "bg-[#02093A] text-white shadow-lg shadow-[#02093A]/15"
                    : "bg-[#F5F5F7] hover:bg-[#EBEBF0]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/_car.png"
                    alt={option.vehicle_type}
                    className="w-14 h-10 object-contain"
                    width={56}
                    height={40}
                  />
                  <div className="text-left">
                    <p className={`font-semibold text-[14px] capitalize ${selectedIndex === i ? "text-white" : "text-[#1A1A1A]"}`}>
                      {option.vehicle_type}
                    </p>
                    <p className={`text-[12px] ${selectedIndex === i ? "text-white/70" : "text-[#666]"}`}>
                      ~{option.estimated_duration_minutes} min · {option.surge_multiplier > 1 ? `${option.surge_multiplier}x surge` : "Standard rate"}
                    </p>
                  </div>
                </div>
                <p className={`font-bold text-[16px] ${selectedIndex === i ? "text-white" : "text-[#1A1A1A]"}`}>
                  {option.formatted_fare}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Fallback: ride types without fare estimate */}
        {!hasEstimate && Array.isArray(rideTypes) && rideTypes.map((v, i) => (
          <button
            key={v.id}
            onClick={() => setSelectedIndex(i)}
            className={`w-full flex justify-between items-center rounded-[14px] p-4 mb-2 transition-all cursor-pointer ${
              selectedIndex === i
                ? "bg-[#02093A] text-white shadow-lg shadow-[#02093A]/15"
                : "bg-[#F5F5F7] hover:bg-[#EBEBF0]"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/images/_car.png"
                alt={v.name}
                className="w-14 h-10 object-contain"
                width={56}
                height={40}
              />
              <div className="text-left">
                <p className={`font-semibold text-[14px] ${selectedIndex === i ? "text-white" : "text-[#1A1A1A]"}`}>
                  {v.name}
                </p>
                <p className={`text-[12px] ${selectedIndex === i ? "text-white/70" : "text-[#666]"}`}>
                  {v.description || `Capacity: ${v.capacity}`}
                </p>
              </div>
            </div>
            <p className={`font-bold text-[16px] ${selectedIndex === i ? "text-white" : "text-[#1A1A1A]"}`}>
              FC {v.base_fare}
            </p>
          </button>
        ))}
      </div>

      {/* Pay with Cash toggle */}
      <div className="bg-[#FFE6E6] rounded-[12px] px-4 py-3 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#E53935]">
            <path d="M17.5 5H2.5C1.67 5 1 5.67 1 6.5V13.5C1 14.33 1.67 15 2.5 15H17.5C18.33 15 19 14.33 19 13.5V6.5C19 5.67 18.33 5 17.5 5Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <p className="text-[14px] font-medium text-[#E53935]">Pay with Cash</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={payWithCash}
            onChange={(e) => setPayWithCash(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E53935]"></div>
        </label>
      </div>

      {/* Request ride button */}
      <button
        onClick={handleContinue}
        className="w-full bg-[#02093A] text-white py-4 rounded-[12px] font-semibold text-[16px] hover:bg-[#030B4D] transition-all cursor-pointer shadow-lg shadow-[#02093A]/20"
      >
        Request ride
      </button>
    </div>
  );
};

export default SelectRideType;
