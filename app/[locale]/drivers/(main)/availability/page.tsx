"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navigation, MapPin, ChevronRight, Globe, ChevronDown } from 'lucide-react';

export default function AvailabilityPage() {
  const [isOnline, setIsOnline] = useState(false);
  const router = useRouter();

  const requests = [
    {
      id: 1,
      name: "Mike Brown",
      code: "CF 1084",
      pickup: "4827 Willowbrook Lane, OH 44126",
      dropoff: "123 Main St, Springfield, IL 62704",
    },
    {
      id: 2,
      name: "Mike Brown",
      code: "CF 1084",
      pickup: "4827 Willowbrook Lane, OH 44126",
      dropoff: "123 Main St, Springfield, IL 62704",
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto py-4 md:py-8 font-sans">
      {!isOnline ? (
        /* --- OFFLINE STATE --- */
        <div className="flex flex-col items-start">
          <h1 className="text-[40px] font-extrabold text-[#0B153D] leading-none mb-3">
            You're Offline
          </h1>
          <p className="text-[15px] font-medium text-[#666666] mb-8">
            Go online to be seen by riders.
          </p>
          <button
            onClick={() => setIsOnline(true)}
            className="bg-[#22C553] hover:bg-[#1faa4b] text-white font-bold px-8 py-3.5 rounded-full text-[15px] transition-colors shadow-sm mb-12"
          >
            Go online
          </button>

          {/* Empty State Cards / Placeholders */}
          <div className="w-full flex flex-col gap-4">
            <div className="w-full h-40 bg-[#F5F5F7] rounded-[20px]"></div>
            <div className="w-full h-40 bg-[#F5F5F7] rounded-[20px]"></div>
          </div>
        </div>
      ) : (
        /* --- ONLINE STATE --- */
        <div className="flex flex-col items-start">
          <h1 className="text-[40px] font-extrabold text-[#0B153D] leading-none mb-3">
            You're Online
          </h1>
          <p className="text-[15px] font-medium text-[#666666] mb-8">
            Wait for requests...
          </p>
          <button
            onClick={() => setIsOnline(false)}
            className="bg-[#E53935] hover:bg-[#d4312d] text-white font-bold px-8 py-3.5 rounded-full text-[15px] transition-colors shadow-sm mb-12"
          >
            Go offline
          </button>

          {/* Request Cards */}
          <div className="w-full flex flex-col gap-5">
            {requests.map((req) => (
              <div key={req.id} className="w-full bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src="/images/Customer-1.jpg"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                          alt="Rider"
                          onError={(e) => { e.currentTarget.src = "/images/About-rider.jpg"; }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-[#22C553] rounded-full"></div>
                          <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider leading-none">New Request</span>
                        </div>
                        <span className="text-[14px] font-extrabold text-[#333333]">{req.name}</span>
                      </div>
                    </div>
                    <span className="text-[18px] font-bold text-[#0B153D]">{req.code}</span>
                  </div>

                  {/* Location details */}
                  <div className="flex flex-col gap-5 mb-6 pl-1 pr-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-[#A0A0A0]">
                        <Navigation size={14} className="rotate-45" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold text-[#A0A0A0] leading-none uppercase tracking-wide">Pickup</span>
                        <span className="text-[12px] font-medium text-[#666666]">{req.pickup}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-[#0B153D]">
                        <MapPin size={14} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold text-[#A0A0A0] leading-none uppercase tracking-wide">Destination</span>
                        <span className="text-[12px] font-medium text-[#666666]">{req.dropoff}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push("/drivers/incoming-request")}
                    className="w-full bg-[#0B153D] hover:bg-[#070e28] text-white font-bold py-3.5 rounded-[12px] text-[15px] transition-colors"
                  >
                    View request
                  </button>
                </div>
                {/* Red accent at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E53935]/10">
                  <div className="h-full w-1/3 bg-[#E53935]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

