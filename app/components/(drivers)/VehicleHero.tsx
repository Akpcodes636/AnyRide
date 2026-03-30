"use client";
import Image from "next/image";
import { useState } from "react";
import { useGetVehicles } from "@/hooks/useRideHooks";
import { Plus } from "lucide-react";
import { Vehicle, VehicleCardProps } from "@/types";
import Button from "../ui/Button";

interface VehicleCard {
  id: number;
  name: string;
  model: string;
  year: string;
  capacity: string;
  activityStatus: "active" | "inactive";
  verificationStatus: "verified" | "under-review" | "declined";
}

interface StatusConfig {
  text: string;
  bgColor: string;
  textColor: string;
}

export default function VehicleHero() {
  const { data: vehiclesData, isLoading, error } = useGetVehicles();
  
  // Transform API data to match our interface
  const vehicles: VehicleCard[] = vehiclesData?.map((vehicle: Vehicle) => ({
    id: vehicle.id,
    name: vehicle.plate_number || `Car-${vehicle.id}`,
    model: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
    year: vehicle.year?.toString() || "2020",
    capacity: `${vehicle.seating_capacity || 4} Passengers`,
    activityStatus: vehicle.is_active ? "active" : "inactive",
    verificationStatus: vehicle.verification_status || "verified",
  })) || [];

  const getStatusButton = (status: string): StatusConfig => {
    switch (status) {
      case "verified":
        return {
          text: "Verified",
          bgColor: "bg-[#E7F9EF]",
          textColor: "text-[#22C553]",
        };
      case "under-review":
        return {
          text: "Under Review",
          bgColor: "bg-[#FEF5E7]",
          textColor: "text-[#F59E0B]",
        };
      case "declined":
        return {
          text: "Declined",
          bgColor: "bg-[#FDECEC]",
          textColor: "text-[#EF4444]",
        };
      default:
        return {
          text: "Unknown",
          bgColor: "bg-gray-200",
          textColor: "text-gray-600",
        };
    }
  };

  if (isLoading) {
    return (
      <section className="py-[100px]">
        <div className="container mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[246px] bg-gray-200 rounded-[20px]"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-[100px]">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-red-600 mb-4">Failed to load vehicles</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-[100px]">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-[15px]">
          <h2 className="text-[24px] font-bold">My Vehicles</h2>
          <Button
            type="button"
            style="primary"
            css="bg-[#010C4A] w-[198px] h-[48px] rounded-[12px] text-white text-[16px] font-normal tracking-[-2%] leading-[160%] flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add Vehicle
          </Button>
        </div>

        {vehicles.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No vehicles added</h3>
            <p className="text-gray-600 mb-6">Add your first vehicle to start driving</p>
            <Button
              type="button"
              style="primary"
              css="bg-[#010C4A] px-6 py-3 rounded-[12px] text-white flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Your First Vehicle
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-[24px]">
            {vehicles.map((vehicle) => {
              const statusConfig = getStatusButton(
                vehicle.verificationStatus
              );

              return (
                <div
                  key={vehicle.id}
                  className="w-full max-w-[655px] h-[246px] bg-[#F5F5F7] rounded-[20px] flex flex-col justify-center mb-[24px]"
                >
                  <div className="p-[16px]">
                    <div className="flex flex-col w-full">
                      
                      {/* Top Section */}
                      <div className="flex items-center gap-[16px]">
                        
                        {/* Image */}
                        <div className="w-[273px] h-[170px] rounded-[20px] overflow-hidden">
                          <Image
                            src={vehiclesData?.find((v: any) => v.id === vehicle.id)?.images?.[0]?.image_url || "/images/Vehicles.png"}
                            width={500}
                            height={500}
                            alt="Vehicle"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="w-full max-w-[277px] h-[170px] flex flex-col">
                          
                          <div>
                            {/* Name + Active Status */}
                            <div className="flex items-center justify-between w-full gap-[8px]">
                              <h3 className="text-[#02093A] text-[16px] font-bold">
                                {vehicle.name}
                              </h3>

                              {vehicle.activityStatus === "active" && (
                                <div className="flex items-center gap-[4px]">
                                  <span className="w-[6px] h-[6px] rounded-full bg-[#22C553]"></span>
                                  <span className="text-[#22C553] text-[12px] font-medium">
                                    Active
                                  </span>
                                </div>
                              )}
                            </div>

                            <p className="text-[#02093A] text-[14px]">
                              {vehicle.model}
                            </p>

                            <p className="text-[#555A7B] text-[14px] mb-[9px]">
                              Seating Capacity:{" "}
                              <span className="font-bold text-[#02093A]">
                                {vehicle.capacity}
                              </span>
                            </p>
                          </div>

                          {/* Status Button */}
                          <button
                            className={`w-fit h-[33px] px-[14px] rounded-full text-[14px] cursor-pointer ${statusConfig.bgColor} ${statusConfig.textColor}`}
                          >
                            {statusConfig.text}
                          </button>
                        </div>
                      </div>

                      {/* Bottom Button */}
                      <div className="mt-[10px]">
                        <button className="w-full bg-[#E6E7ED] rounded-[12px] h-[36px] cursor-pointer hover:bg-gray-300 transition">
                          {vehicle.activityStatus === "active" ? "Deactivate" : "Activate"}
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}