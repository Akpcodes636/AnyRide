"use client";
import React, { useState } from "react";
import { Plus, Navigation, Star, Banknote } from "lucide-react";
import Image from "next/image";
import { useRideTypes } from "@/hooks/useAuthHook";
import Loader from "../ui/Loader";
import { useRouter } from "next/navigation";
import { useRideStore } from "@/store/rideStore";

const RideETA = ({ estimated_duration_minutes }: { estimated_duration_minutes: number }) => {
  return <p className="text-[12px] text-[#666666]">{estimated_duration_minutes} min away</p>;
};

const SelectRideType = () => {
  const router = useRouter();
  const [payWithCash, setPayWithCash] = useState(true);
  const next = useRideStore((s) => s.next);
  const [pickup, setPickup] = useState("Abuja, Nigeria");
  const [enterDestination, setEnterDestination] = useState("Lagos, Nigeria");

  const { data: rideTypes, isLoading, isError } = useRideTypes();

  const handleContinue = () => {
    next();
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-start">

      {/* Column 1: Route Form */}
      <div className="w-full xl:w-[45%] flex flex-col pt-4">
        <h1 className="text-[32px] font-bold text-[#333333] mb-8 leading-tight">
          Enter your <br className="hidden xl:block" /> route
        </h1>

        <div className="flex flex-col gap-5">
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0] group-focus-within:text-[#0B153D] transition-colors">
              <Navigation size={18} className="rotate-45" />
            </div>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Pickup"
              className="w-full h-16 bg-[#F5F5F7] rounded-[16px] pl-14 pr-12 text-[15px] font-medium text-[#333333] border-none focus:outline-none focus:ring-1 focus:ring-[#0B153D]/10"
            />
            <Plus size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#333] cursor-pointer" />
          </div>

          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0] group-focus-within:text-[#0B153D] transition-colors">
              <Navigation size={18} className="rotate-45" />
            </div>
            <input
              type="text"
              value={enterDestination}
              onChange={(e) => setEnterDestination(e.target.value)}
              placeholder="Destination"
              className="w-full h-16 bg-[#F5F5F7] rounded-[16px] pl-14 pr-12 text-[15px] font-medium text-[#333333] border-none focus:outline-none focus:ring-1 focus:ring-[#0B153D]/10"
            />
            <Plus size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#333] cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Column 2: Select Ride Type List */}
      <div className="w-full xl:w-[55%] bg-[#F5F5F7] rounded-[32px] p-6 lg:p-8 shadow-sm border border-gray-100 flex flex-col min-h-[600px]">
        <h2 className="text-[22px] font-bold text-[#333333] mb-8">
          Select ride type
        </h2>

        <div className="flex flex-col gap-4 flex-1">
          {isLoading && <Loader />}
          {isError && <p className="text-red-500 text-sm py-4">Failed to load ride types</p>}

          {Array.isArray(rideTypes) ? rideTypes.map((v, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-white p-4 lg:p-5 rounded-[20px] border-2 border-transparent hover:border-[#0B153D] transition-all cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="w-16 h-16 bg-[#F5F5F7] rounded-2xl flex items-center justify-center overflow-hidden group-hover:bg-[#EAEBEF] transition-colors">
                  <Image
                    src={v.vehicle_type === "Motorcycle/Moto" ? "/images/_moto.png" : "/images/_car.png"}
                    alt={v.name}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#0B153D] mb-1">{v.name}</h4>
                  <div className="flex items-center gap-2.5 text-[13px] text-[#666666]">
                    <span>{v.estimated_duration_minutes || 10}min</span>
                    <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                    <span>{v.capacity || '4 seats'}</span>
                    <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                    <span className="flex items-center gap-1 font-bold text-[#333]"> 4.8 <Star size={12} fill="#FFB800" className="text-[#FFB800]" /></span>
                  </div>
                </div>
              </div>
              <span className="text-[18px] font-black text-[#0B153D] tracking-tight">FC{v.base_price}</span>
            </div>
          )) : (
            // Enhanced Fallback UI matching screenshot
            [
              { name: 'Premium / Black', price: '76', img: '/images/_car.png' },
              { name: 'Shared / Pool', price: '76', img: '/images/_car.png' },
              { name: 'Comfort', price: '76', img: '/images/_car.png' },
              { name: 'Moto / Bike', price: '76', img: '/images/_moto.png' },
            ].map((v, i) => (
              <div key={i} className="flex items-center justify-between bg-white p-4 lg:p-5 rounded-[20px] border-2 border-transparent hover:border-[#0B153D] transition-all cursor-pointer group shadow-sm hover:shadow-md">
                <div className="flex items-center gap-4 lg:gap-6">
                  <div className="w-16 h-16 bg-[#F5F5F7] rounded-2xl flex items-center justify-center overflow-hidden group-hover:bg-[#EAEBEF] transition-colors">
                    <img src={v.img} alt={v.name} className="w-12 h-12 object-contain" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[#0B153D] mb-1">{v.name}</h4>
                    <div className="flex items-center gap-2.5 text-[13px] text-[#666666]">
                      <span>10min</span>
                      <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                      <span>3 seats</span>
                      <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                      <span className="flex items-center gap-1 font-bold text-[#333]"> 4.8 <Star size={12} fill="#FFB800" className="text-[#FFB800]" /></span>
                    </div>
                  </div>
                </div>
                <span className="text-[18px] font-black text-[#0B153D] tracking-tight">FC{v.price}</span>
              </div>
            ))
          )}
        </div>

        {/* Bottom Panel */}
        <div className="mt-8 space-y-5">
          <div className="flex items-center justify-between bg-[#FFF4F4] px-5 py-4 rounded-[16px] border border-[#FFE6E6]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E53935] flex items-center justify-center text-white shadow-sm">
                <Banknote size={20} />
              </div>
              <span className="text-[15px] font-extrabold text-[#E53935]">Pay with Cash</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={payWithCash}
                onChange={(e) => setPayWithCash(e.target.checked)}
              />
              <div className="w-12 h-6.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-[#E53935]"></div>
            </label>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-[#0B153D] hover:bg-[#070e28] text-white py-5 rounded-[16px] font-bold text-[17px] transition-all shadow-lg active:scale-[0.98]"
          >
            Request ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRideType;
