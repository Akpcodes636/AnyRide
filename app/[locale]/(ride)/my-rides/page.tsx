"use client";
import { rides } from "@/app/utils/Content";
import { useTripModal } from "@/store/Modals";
import { RideCardProps } from "@/types";
import Image from "next/image";

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function TipIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function MapArrowRightIcon() {
  return (
    <svg
      className="w-4 h-4 text-gray-400 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M13 7l5 5-5 5M6 12h12"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

function DestinationIcon() {
  return (
    <svg className="w-[24px] h-[24px] text-[#02093A] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function RideCard({ ride }: RideCardProps) {
  const { modal,openModal } = useTripModal();
  return (
    <div className="bg-[#F5F5F7] rounded-[8px]">
      {/* Header Row */}
      <div className="flex items-center justify-between b-[8px] p-4">
        <span className="text-[18px] font-normal text-[#02093A]">{ride.label}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ride.statusColor}`}>
          {ride.status}
        </span>
      </div>

      <div className="px-4 pb-4">
        <div className="bg-[#E6E6EB] p-4 rounded-md space-y-4">

          {/* Pickup */}
          <div>
            <p className="text-[12px] font-light text-[#555A7B] uppercase tracking-wide">
              Pickup
            </p>

            <div className="flex items-center gap-2">
              <MapArrowRightIcon />
              <span className="text-[18px] text-[#02093A] leading-[140%]">
                {ride.pickup}
              </span>
            </div>
          </div>

          {/* Destination */}
          <div>
            <p className="text-[12px] font-light text-[#555A7B] uppercase tracking-wide">
              Destination
            </p>

            <div className="flex items-center gap-2">
              <DestinationIcon />
              <span className="text-[18px] text-[#02093A]">
                {ride.destination}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 p-4">
        <button className="flex cursor-pointer items-center gap-1 px-3 py-[14px] rounded-md border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors" onClick={()=>openModal("review")}>
          <StarIcon />
          Rate
        </button>
        <button className=" cusor-pointer flex items-center gap-1 px-3 py-[14px] rounded-md border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors" onClick={()=> openModal("tip")}>
          <TipIcon />
          Tip
        </button>
        <button className="flex-1 py-[14px] rounded-[8px] bg-[#010C4A] text-white text-xs font-semibold hover:bg-gray-700 transition-colors text-center">
          Repeat ride
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <div>
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 b-2">
              <h2 className="text-[48px] font-bold text-[#333333]">My Rides</h2>
              <button className="text-[18px] leading-[120%] font-medium text-[#353A61] border border-[#F5F5F7] rounded-[50px] px-3 py-1.5 hover:bg-gray-50 transition-colors">
                This week ▾
              </button>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {/* Left Panel — My Rides */}
          <div className="bg-white w-full h-full">

            {/* Ride List */}
            <div className="px-5 space-y-[8px] rounded-[8px]">
              {rides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          </div>

          {/* Right Panel — Promo Banner */}
          <div className="relative w-full h-full min-h-[420px] overflow-hidden rounded-[8px] hidden md:hidden lg:block">
            <Image
              src="/images/saved-ride.jpg"
              alt="woman sitting motorbike scooter talking african man"
              fill
              className="object-cover"
              priority
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* CTA Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6 text-center">
              <h2 className="text-white text-[48px] font-bold tracking-[-4%] leading-[120%]  mb-2">
                Ready for your<br />next trip?
              </h2>
              <p className="text-[#E8E8E8] text-[18px] mb-6">You are just a click away</p>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm w-[388px] h-[50px] rounded-[8px] transition-colors shadow-lg">
                Book a ride
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}