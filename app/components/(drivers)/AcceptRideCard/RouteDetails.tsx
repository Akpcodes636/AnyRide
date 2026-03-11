"use client"

import Image from "next/image";
import LocationSearchInput from "../../ui/LocationSearchInput";
import { useState } from "react";
import { Coords } from "@/types";

export default function RouteDetails(){
      const [destination, setDestination] = useState("");
      const [pickupCoords, setPickupCoords] = useState<Coords | null>(null);
      const [pickup, setPickup] = useState("");
    return (
        <div className="px-5">
                  <div className="bg-[#F5F5F7] p-2 rounded-lg space-y-2">
                    <div className="relative w-full">
                      <LocationSearchInput
                        value={pickup}
                        onChange={setPickup}
                        onSelect={(address: string, lat: number, lng: number) => {
                          setPickup(address);
                          setPickupCoords({ lat, lon: lng });
                        }}
                        placeholder="4827 Willowbrook Lane"
                        className="w-full h-12 text-[14px] pl-9 border-b border-[#E6E6E6] focus:border-b-[#A20602] focus:outline-none"
                        label="Pickup"
                      />
        
                      <Image
                        src="/images/Map.png"
                        alt="Map"
                        width={14}
                        height={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                      />
                    </div>
        
                    <div className="relative w-full">
                      <LocationSearchInput
                        value={destination}
                        onChange={setDestination}
                        onSelect={(address: string) => {
                          setDestination(address);
                        }}
                        placeholder="123 Main St, Springfield, IL 62704"
                        className="w-full h-12 text-[14px] pl-9 focus:border-b-[#A20602] focus:outline-none"
                        label="Destination"
                      />
        
                      <Image
                        src="/images/Maps.png"
                        alt="Map"
                        width={14}
                        height={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                      />
                    </div>
                  </div>
                </div>
    )
}