"use client";
import React, { useState } from "react";
import { Plus, Navigation, MapPin } from "lucide-react";
import { useRideStore } from "@/store/rideStore";

const RequestRide = () => {
  const next = useRideStore((s) => s.next);
  const setRideData = useRideStore((s) => s.setRideData);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

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
    next();
  };

  return (
    <div className="w-full max-w-[500px] flex flex-col pt-4">
      <h1 className="text-[36px] md:text-[48px] font-bold text-[#333333] mb-8">
        Request ride
      </h1>

      <div className="flex flex-col gap-6 mb-10">
        {/* Pickup Input */}
        <div className="relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0]">
            <Navigation size={20} className="rotate-45" />
          </div>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Enter pickup"
            className="w-full h-16 bg-[#F5F5F7] rounded-[16px] pl-14 pr-12 text-[15px] font-medium text-[#333333] border-none focus:outline-none focus:ring-1 focus:ring-[#0B153D]/10 text-ellipsis"
          />
          <button className="absolute right-5 top-1/2 -translate-y-1/2 text-[#333333] hover:scale-110 transition-transform">
            <Plus size={20} />
          </button>
        </div>

        {/* Destination Input */}
        <div className="relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0]">
            <Navigation size={20} className="rotate-45" />
          </div>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
            className="w-full h-16 bg-[#F5F5F7] rounded-[16px] pl-14 pr-12 text-[15px] font-medium text-[#333333] border-none focus:outline-none focus:ring-1 focus:ring-[#0B153D]/10 text-ellipsis"
          />
          <button className="absolute right-5 top-1/2 -translate-y-1/2 text-[#333333] hover:scale-110 transition-transform">
            <Plus size={20} />
          </button>
        </div>

        {/* Extra Destination Placeholder matching frame 1 */}
        <div className="relative group opacity-80">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0]">
            <MapPin size={20} />
          </div>
          <input
            type="text"
            placeholder="Destination"
            disabled
            className="w-full h-16 bg-white rounded-[16px] pl-14 pr-12 text-[15px] font-medium text-[#A0A0A0] border-2 border-[#F5F5F7] cursor-not-allowed"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-1 items-center justify-center text-[#A0A0A0] cursor-pointer hover:text-[#333]">
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-3 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="flex-1 h-[56px] bg-[#EAEBEF] hover:bg-[#dfe0e5] text-[#0B153D] font-bold rounded-[12px] text-[16px] transition-all shadow-sm"
        >
          Save
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 h-[56px] bg-[#0B153D] hover:bg-[#070e28] text-white font-bold rounded-[12px] text-[16px] transition-all shadow-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RequestRide;
