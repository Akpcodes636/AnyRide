"use client";
import { useState } from "react";
import { Plus, Navigation } from "lucide-react";
import Image from "next/image";
import { useRideStore } from "@/store/rideStore";

const RequestRide = () => {
  const next = useRideStore((s) => s.next);
  const setRideData = useRideStore((s) => s.setRideData);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  // Save without moving to next step
  const handleSave = () => {
    setRideData({
      pickup: { address: pickup, lat: 0, lng: 0 },
      destination: { address: destination, lat: 0, lng: 0 },
    });
    alert("Ride data saved!");
  };

  const handleContinue = () => {
    setRideData({
      pickup: { address: pickup, lat: 0, lng: 0 },
      destination: { address: destination, lat: 0, lng: 0 },
    });
    next(); // move to SelectRideType
  };

  return (
    <div className="w-full max-w-full mx-auto bg-white">
      <h1 className="text-[48px] font-bold text-[#1A1A1A] mb-2">
        Request ride
      </h1>

      <div className="space-y-4">
        {/* Pickup */}
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
            className="w-full max-w-[550px] h-[56px] pl-10 pr-12 bg-[#F5F5F5] rounded-lg border-none text-[14px] focus:outline-none focus:ring-2 focus:ring-[#A20602]"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <Plus className="w-5 h-5 text-[#02093A]" />
          </button>
        </div>

        {/* Destination */}
        <div className="relative">
          <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
            className="w-full max-w-[550px] h-[56px] pl-10 pr-12 bg-[#F5F5F5] rounded-lg border-none text-[14px] focus:outline-none focus:ring-2 focus:ring-[#A20602]"
          />
          {/* Plus button for destination */}
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <Plus className="w-5 h-5 text-[#02093A]" />
          </button>
        </div>
      </div>

      {/* Action Buttons: Save + Continue */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={handleSave}
          className="flex-1 h-[50px] cursor-pointer bg-[#E8E8E8] text-[#1A1A1A] rounded-lg font-semibold text-[16px] hover:bg-[#D8D8D8] transition-colors"
        >
          Save
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 h-[50px] cursor-pointer rounded-lg font-semibold text-[16px] bg-[#02093A] text-white hover:bg-[#030B4D] transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RequestRide;
