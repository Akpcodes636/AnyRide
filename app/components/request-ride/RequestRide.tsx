"use client";

import { useState, useEffect, useCallback } from "react";
import { Home, Briefcase, Plus, Crosshair, ChevronRight, Loader2, Star, Navigation, MapPin } from "lucide-react";
import { useRideStore } from "@/store/rideStore";
import { useEstimateFare, useSavedLocations, useAddSavedLocation } from "@/hooks/useRideHooks";
import { SavedLocationCreate, SavedLocationOut } from "@/types";
import { toast } from "sonner";
import LocationSearchInput from "@/app/components/ui/LocationSearchInput";
import { useCreateRideRequest } from "@/hooks/useRideHooks";

const RequestRide = () => {
  const next = useRideStore((s) => s.next);
  const setRideData = useRideStore((s) => s.setRideData);

  const [pickup, setPickup] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  const createRideRequest = useCreateRideRequest();
  const fareEstimate = useEstimateFare();
  const addLocation = useAddSavedLocation();

  // FETCH REAL SAVED LOCATIONS
  const { data: savedLocations = [], isLoading: locationsLoading } = useSavedLocations();

  // Auto-estimate fare when both coords are set
  useEffect(() => {
    if (pickupCoords && destinationCoords) {
      fareEstimate.mutate({
        pickup_lat: pickupCoords.lat,
        pickup_lon: pickupCoords.lng,
        dropoff_lat: destinationCoords.lat,
        dropoff_lon: destinationCoords.lng,
      });
    }
  }, [pickupCoords, destinationCoords]);

  // Sync pickup to store
  useEffect(() => {
    if (pickupCoords) {
      setRideData({
        pickup: { address: pickup, lat: pickupCoords.lat, lng: pickupCoords.lng },
      });
    }
  }, [pickupCoords, pickup]);

  // Sync destination to store
  useEffect(() => {
    if (destinationCoords) {
      setRideData({
        destination: { address: destination, lat: destinationCoords.lat, lng: destinationCoords.lng },
      });
    }
  }, [destinationCoords, destination]);

  // Store fare estimate
  useEffect(() => {
    if (fareEstimate.data?.data) {
      setRideData({ fareEstimate: fareEstimate.data.data });
    }
  }, [fareEstimate.data]);

  // Use current location for pickup
  const handleUseCurrentLocation = useCallback((): void => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPickupCoords({ lat: latitude, lng: longitude });

        if (window.google?.maps) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode(
            { location: { lat: latitude, lng: longitude } },
            (results, status) => {
              setIsLocating(false);
              if (status === "OK" && results?.[0]) {
                setPickup(results[0].formatted_address);
              } else {
                setPickup(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
              }
            }
          );
        } else {
          setIsLocating(false);
          setPickup(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
      },
      (error) => {
        setIsLocating(false);
        toast.error("Could not get your location. Please allow location access.");
        console.error("Geolocation error:", error);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const buildPayload = (
    address: string,
    coords: { lat: number; lng: number } | null
  ): SavedLocationCreate => ({
    name: address.split(',')[0] || "Saved Location",
    address,
    latitude: coords?.lat ?? 0,
    longitude: coords?.lng ?? 0,
  });

  const handleSave = async (): Promise<void> => {
    if (!pickup && !destination) return;

    try {
      if (pickup && pickupCoords) {
        await addLocation.mutateAsync(buildPayload(pickup, pickupCoords));
      }
      if (destination && destinationCoords) {
        await addLocation.mutateAsync(buildPayload(destination, destinationCoords));
      }
      toast.success("Locations saved to your profile!");
    } catch (error) {
      toast.error("Failed to save locations.");
    }
  };

  const handleContinue = async (): Promise<void> => {
    if (!pickupCoords) {
      toast.error("Please select a pickup location.");
      return;
    }
    if (!destinationCoords) {
      toast.error("Please select a destination.");
      return;
    }

    const payload = {
      pickup_lat: pickupCoords.lat,
      pickup_lon: pickupCoords.lng,
      dropoff_lat: destinationCoords.lat,
      dropoff_lon: destinationCoords.lng,
      pickup_address: pickup,
      dropoff_address: destination,
      estimated_price: fareEstimate.data?.data?.base_fare || 0,
      rideType: "regular",
      paymentMethod: "CASH",
      fk_customer_id: 1,
    };

    createRideRequest.mutate(payload, {
      onSuccess: (data) => {
        setRideData({ requestId: data.id });
        toast.success("Ride request created!");
        next();
      },
      onError: (err) => {
        console.error("Create ride request failed:", err);
        toast.error("Failed to create ride request.");
      },
    });
  };

  const handleSelectSavedLocation = (loc: SavedLocationOut) => {
    if (!pickupCoords) {
      setPickup(loc.address);
      setPickupCoords({ lat: loc.latitude, lng: loc.longitude });
    } else {
      setDestination(loc.address);
      setDestinationCoords({ lat: loc.latitude, lng: loc.longitude });
    }
  };

  const getLocationIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("home")) return <Home className="w-5 h-5" />;
    if (lower.includes("work") || lower.includes("office")) return <Briefcase className="w-5 h-5" />;
    return <Star className="w-5 h-5" />;
  };

  const canContinue = !!pickupCoords && !!destinationCoords;

  return (
    <div className="w-full max-w-full mx-auto h-full flex flex-col p-2">
      <h1 className="text-[28px] md:text-[48px] font-bold text-[#1A1A1A] mb-8 leading-tight">
        Request a ride
      </h1>

      <div className="space-y-4 mb-8">
        {/* Pickup */}
        <div className="relative">
          <LocationSearchInput
            value={pickup}
            onChange={(val: string) => {
              setPickup(val);
              setPickupCoords(null);
            }}
            onSelect={(address: string, lat: number, lng: number) => {
              setPickup(address);
              setPickupCoords({ lat, lng });
            }}
            placeholder="Enter pickup location"
            className="w-full h-[64px] pl-14 pr-12 bg-[#F5F5F7] rounded-[16px] border-none text-[15px] font-medium focus:outline-none focus:ring-1 focus:ring-[#0B153D]/10"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0]">
            <Navigation size={20} className="rotate-45" />
          </div>
          <button
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="absolute right-5 top-1/2 -translate-y-1/2 disabled:opacity-50 z-10 cursor-pointer hover:scale-110 transition-transform"
            title="Use current location"
          >
            {isLocating ? (
              <Loader2 className="w-5 h-5 text-[#02093A] animate-spin" />
            ) : (
              <Crosshair className="w-5 h-5 text-[#02093A]" />
            )}
          </button>
        </div>

        {/* Destination */}
        <div className="relative">
          <LocationSearchInput
            value={destination}
            onChange={(val: string) => {
              setDestination(val);
              setDestinationCoords(null);
            }}
            onSelect={(address: string, lat: number, lng: number) => {
              setDestination(address);
              setDestinationCoords({ lat, lng });
            }}
            placeholder="Enter destination"
            className="w-full h-[64px] pl-14 pr-12 bg-[#F5F5F7] rounded-[16px] border-none text-[15px] font-medium focus:outline-none focus:ring-1 focus:ring-[#0B153D]/10"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0]">
            <Navigation size={20} className="rotate-45" />
          </div>
          <button className="absolute right-5 top-1/2 -translate-y-1/2 text-[#333333] hover:scale-110 transition-transform cursor-pointer">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Saved Locations Section */}
      <div className="flex-1 overflow-y-auto mb-6 scrollbar-hide">
        {savedLocations.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[13px] font-bold text-[#A0A0A0] uppercase tracking-widest mb-4">
              Saved places
            </h3>
            <div className="space-y-4">
              {savedLocations.slice(0, 3).map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleSelectSavedLocation(loc)}
                  className="w-full flex items-center justify-between p-3.5 bg-white border border-gray-50 rounded-[20px] hover:bg-[#F5F5F7] transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-[#F5F5F7] group-hover:bg-white rounded-[14px] flex items-center justify-center text-[#0B153D] transition-colors shadow-inner">
                      {getLocationIcon(loc.name)}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[15px] font-bold text-[#333333]">{loc.name}</span>
                      <span className="text-[12px] text-[#A0A0A0] truncate max-w-[200px]">{loc.address}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#E0E0E0] group-hover:text-[#0B153D] transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Picks */}
        <div>
          <h3 className="text-[13px] font-bold text-[#A0A0A0] uppercase tracking-widest mb-4">
            Quick picks
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-white opacity-60 rounded-[20px] transition-all cursor-not-allowed border border-dashed border-[#F5F5F7]">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-[#F5F5F7] rounded-[14px] flex items-center justify-center text-[#A0A0A0]">
                  <Home className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[15px] font-bold text-[#333333]">Set Home</span>
                  <span className="text-[12px] text-[#A0A0A0]">Add your home address</span>
                </div>
              </div>
              <Plus className="w-5 h-5 text-[#A0A0A0]" />
            </div>
            <div className="flex items-center justify-between p-3.5 bg-white opacity-60 rounded-[20px] transition-all cursor-not-allowed border border-dashed border-[#F5F5F7]">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-[#F5F5F7] rounded-[14px] flex items-center justify-center text-[#A0A0A0]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[15px] font-bold text-[#333333]">Set Work</span>
                  <span className="text-[12px] text-[#A0A0A0]">Add your work address</span>
                </div>
              </div>
              <Plus className="w-5 h-5 text-[#A0A0A0]" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-auto pt-4 border-t border-gray-50">
        <button
          onClick={handleSave}
          disabled={addLocation.isPending || (!pickup && !destination)}
          className="flex-1 h-[58px] bg-[#EAEBEF] hover:bg-[#dfe0e5] text-[#0B153D] font-bold rounded-[18px] text-[16px] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
        >
          {addLocation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </button>
        <button
          onClick={handleContinue}
          disabled={!canContinue || createRideRequest.isPending}
          className="flex-1 h-[58px] bg-[#0B153D] hover:bg-[#070e28] text-white font-bold rounded-[18px] text-[16px] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center shadow-lg"
        >
          {createRideRequest.isPending ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
};

export default RequestRide;

