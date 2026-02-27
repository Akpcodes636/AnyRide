"use client";
import { useState } from "react";
import { Navigation, Plus } from "lucide-react";
import Image from "next/image";
import { LuMapPin } from "react-icons/lu";
import { useRideTypes } from "@/hooks/useAuthHook";
import Loader from "../ui/Loader";
import { useRouter } from "next/navigation";
import { useRideStore } from "@/store/rideStore";

interface VehicleOption {
  vehicle_type: string;
  icon_url: string;
  formatted_fare: string;
  estimated_duration_minutes: number;
  capacity: string;
}

const RideETA = ({
  estimated_duration_minutes,
}: {
  estimated_duration_minutes: number;
}) => {
  return (
    <p className="text-[12px] text-[#666666]">
      {estimated_duration_minutes} min away
    </p>
  );
};

const SelectRideType = () => {
  const router = useRouter();
  const [payWithCash, setPayWithCash] = useState(true);
  const next = useRideStore((s) => s.next);
  const [pickup, setPickup] = useState("");
  const [enterDestination, setEnterDestination] = useState("");

  const { data: rideTypes, isLoading, isError } = useRideTypes();
  console.log("Ride types data:", rideTypes); // Debug log to check the structure of rideTypes

  const handleContinue = () => {
    next(); // move to findingRoute
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[0.9fr_2fr] max-w-full mx-auto bg-white gap-x-4">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-[20px] md:text-[21px] font-bold text-[#1A1A1A] mb-4">
          Enter your route
        </h1>

        {/* Route Inputs */}
        <div className="space-y-3 mb-6">
          <div className="relative">
            <div className="relative">
              <Image
                src="/images/Map.png"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                alt="Arrow Icon"
                width={50}
                height={50}
              />
              <input
                type="text"
                value={enterDestination}
                onChange={(e) => setEnterDestination(e.target.value)}
                placeholder="Enter destination"
                className="w-full max-w-[550px] h-[56px] pl-10 pr-12 bg-[#F5F5F5] rounded-lg border-none text-[14px] focus:outline-none focus:ring-2 focus:ring-[#A20602]"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Plus className="w-5 h-5 text-[#02093A]" />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <div className="relative">
                <Image
                  src="/images/Map.png"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  alt="Arrow Icon"
                  width={50}
                  height={50}
                />
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Enter pickup"
                  className="w-full max-w-[550px] h-[56px] pl-10 pr-12 bg-[#F5F5F5] rounded-lg border-none text-[14px] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#A20602]"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Plus className="w-5 h-5 text-[#02093A]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Select Ride Type Section */}
      <div className="bg-[#F5F5F5] rounded-[20px] p-4">
        <h2 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">
          Select ride type
        </h2>

        {/* Ride Options */}
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}

        {isError && (
          <p className="text-[14px] text-[#E53935] text-center py-6">
            Failed to load ride types. Please try again.
          </p>
        )}

        {Array.isArray(rideTypes) &&
          rideTypes.map((v, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-[#F5F5F7] border-2 border-transparent rounded-xl p-4 hover:border-[#1A1A1A] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/images/_car.png"
                  alt={v.name}
                  className="w-12 h-12 object-contain"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="font-semibold text-[14px] text-[#1A1A1A]">
                    {v.name}
                  </p>
                  <p className="text-[12px] text-[#666666]">{v.description}</p>
                </div>
              </div>
              <p className="font-bold text-[16px] text-[#1A1A1A]">
                FC{v.base_price}
              </p>
            </div>
          ))}

        {/* Pay with Cash Toggle */}
        <div className="bg-[#FFE6E6] rounded-lg px-4 py-3 flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#E53935]"
            >
              <path
                d="M17.5 5H2.5C1.67 5 1 5.67 1 6.5V13.5C1 14.33 1.67 15 2.5 15H17.5C18.33 15 19 14.33 19 13.5V6.5C19 5.67 18.33 5 17.5 5Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <p className="text-[14px] font-medium text-[#E53935]">
              Pay with Cash
            </p>
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

        {/* Request Ride Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-[#02093A] text-white py-4 rounded-lg font-semibold text-[16px] mt-4 hover:bg-[#030B4D] transition-colors cursor-pointer"
        >
          Request ride
        </button>
      </div>
    </div>
  );
};

export default SelectRideType;
