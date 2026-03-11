"use client";

import Header from "@/app/components/Header";
import { MapPin, ArrowRight, Trash2, Navigation } from "lucide-react";

const savedRides = [
  { from: "Lagos Ikeja", to: "Transcorp mall" },
  { from: "Lagos Ikeja", to: "Transcorp mall" },
  { from: "Lagos Ikeja", to: "Transcorp mall" },
  { from: "Lagos Ikeja", to: "Transcorp mall" },
  { from: "Lagos Ikeja", to: "Transcorp mall" },
  { from: "Lagos Ikeja", to: "Transcorp mall" },
  { from: "Lagos Ikeja", to: "Transcorp mall" },
  { from: "Lagos Ikeja", to: "Transcorp mall" },
];

export default function SavedRidesPage() {
  return (
    <>
      <Header />

      <div className="container mx-auto pt-32">

        {/* Title */}
        <h1 className="text-[32px] font-semibold text-[#1E1E1E] mb-6">
          Saved rides
        </h1>

        {/* List */}
        <div className="space-y-3">

          {savedRides.map((ride, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#F5F5F7] rounded-[6px] px-4 py-3"
            >
              
              {/* Left content */}
              <div className="flex items-center gap-4 text-[18px] text-[#02093A]">

                <Navigation className="w-4 h-4 text-[#02093A]" />

                <span>{ride.from}</span>

                <ArrowRight className="w-4 h-4 text-[#02093A]" />

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#02093A]" />
                  <span>{ride.to}</span>
                </div>

              </div>

              {/* Delete */}
              <button className="text-[#EF4444] hover:text-red-600 transition">
                <Trash2 className="w-5 h-5" />
              </button>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}