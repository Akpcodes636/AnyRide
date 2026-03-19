"use client";

import { FaCar, FaMotorcycle } from "react-icons/fa";
import LocationButton from "../ui/LocationButton";
import LocationSearchInput from "../ui/LocationSearchInput";
import { useState } from "react";
import Image from "next/image";
import { useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/navigation";

/* ------------------ CONSTANTS ------------------ */
const RIDE_TYPES = ["Car", "Motorcycle"] as const;
type RideType = (typeof RIDE_TYPES)[number];

const RIDE_ICONS: Record<RideType, React.ReactElement> = {
  Motorcycle: <FaMotorcycle size={24} color="#A20602" />,
  Car: <FaCar size={24} color="#A20602" />,
};

export default function RideHeroSection() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const router = useRouter();

  const [pickupCoords, setPickupCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [destinationCoords, setDestinationCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [rideType, setRideType] = useState<RideType>("Car");

  const today = new Date();

  const [rideDate, setRideDate] = useState(today.toISOString().split("T")[0]);

  const [rideTime, setRideTime] = useState(today.toTimeString().slice(0, 5));

  if (!isLoaded) return null;

  return (
    <section className="min-h-screen py-[100px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Get where you&apos;re going faster, safer, and fair.
            </h2>

            <div className="mb-6">
              <LocationButton />
            </div>

            <div className="flex flex-col gap-y-6">
              {/* PICKUP */}
              <div className="relative w-full max-w-[527px]">
                <label className="block text-[16px] text-[#02093A] mb-1">
                  Enter pickup location
                </label>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <Image
                      src="/images/Map.png"
                      alt="map"
                      width={20}
                      height={20}
                    />
                  </div>

                  <LocationSearchInput
                    value={pickup}
                    onChange={setPickup}
                    onSelect={(address, lat, lng) => {
                      setPickup(address);
                      setPickupCoords({ lat, lon: lng });
                    }}
                    placeholder="Enter pickup location"
                    className="w-full h-14 pl-10 pr-4 bg-[#F5F5F5] rounded-lg focus:ring-2 focus:ring-[#A20602]"
                  />
                </div>
              </div>

              {/* DESTINATION */}
              <div className="relative w-full max-w-[527px]">
                <label className="block text-[16px] text-[#02093A] mb-1">
                  Enter destination
                </label>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <Image
                      src="/images/Map.png"
                      alt="map"
                      width={20}
                      height={20}
                    />
                  </div>

                  <LocationSearchInput
                    value={destination}
                    onChange={setDestination}
                    onSelect={(address, lat, lng) => {
                      setDestination(address);
                      setDestinationCoords({ lat, lon: lng });
                    }}
                    placeholder="Enter destination"
                    className="w-full h-14 pl-10 pr-4 bg-[#F5F5F5] rounded-lg focus:ring-2 focus:ring-[#A20602]"
                  />
                </div>
              </div>

              {/* RIDE TYPE */}
              <div className="space-y-2 max-w-[527px]">
                <label className="text-sm font-medium text-[#02093A]">
                  Enter ride type
                </label>

                <div className="relative flex items-center">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    {RIDE_ICONS[rideType]}
                  </div>

                  <select
                    value={rideType}
                    onChange={(e) => setRideType(e.target.value as RideType)}
                    className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg focus:ring-2 focus:ring-[#A20602]"
                  >
                    {RIDE_TYPES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* DATE + TIME (KEPT TOGETHER) */}
              <div className="flex flex-col gap-4 w-full max-w-[527px]">
                <div className="flex gap-3">
                  {/* DATE */}
                  <div className="flex-1">
                    <p className="text-[16px] text-gray-500 mb-1">Date</p>

                    <div className="relative">
                      <input
                        type="date"
                        value={rideDate}
                        onChange={(e) => setRideDate(e.target.value)}
                        className="w-full bg-[#F5F5F7] py-[18px] px-[16px] rounded-[8px] outline-none"
                      />
                    </div>
                  </div>

                  {/* TIME */}
                  <div className="flex-1">
                    <p className="text-[16px] text-gray-500 mb-1">Time</p>

                    <div className="relative">
                      <input
                        type="time"
                        value={rideTime}
                        onChange={(e) => setRideTime(e.target.value)}
                        className="w-full bg-[#F5F5F7] py-[18px] px-[16px] rounded-[8px] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Check Prices Button */}
                <button className="bg-[#C0392B] cursor-pointer hover:bg-[#a93226] transition text-white font-semibold rounded-full px-8 h-[56px] w-fit" onClick={() => router.push("/request-ride")}>
                  Check prices
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <Image
              src="/images/Pricing.png"
              width={600}
              height={600}
              alt="riders"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
