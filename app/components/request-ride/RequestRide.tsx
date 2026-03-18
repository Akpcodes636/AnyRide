"use client";

import { useState, useEffect, useCallback } from "react";
import { Home, Briefcase, Plus, Crosshair, ChevronRight, Loader2, Star, Navigation } from "lucide-react";
import { useRideStore } from "@/store/rideStore";
import { useEstimateFare, useSavedLocations, useAddSavedLocation } from "@/hooks/useRideHooks";
import { SavedLocationCreate, SavedLocationOut } from "@/types";
import { toast } from "sonner";
import LocationSearchInput from "@/app/components/ui/LocationSearchInput";
import { useCreateRideRequest } from "@/hooks/useRideHooks"; // make sure path is correct

const RequestRide = () => {
  const next = useRideStore((s) => s.next);
  const setRideData = useRideStore((s) => s.setRideData);

  const [pickup, setPickup] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const createRideRequest = useCreateRideRequest();
  // const addLocation = useAddSavedLocation(); // not ready yet

  // const { data: savedLocations = [], isLoading: locationsLoading } = useSavedLocations();
  const fareEstimate = useEstimateFare();
  const addLocation = useAddSavedLocation();

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

  // Select saved location — fills pickup first, then destination
  const handleSelectSavedLocation = (
    loc: SavedLocationOut,
    target: "pickup" | "destination"
  ): void => {
    if (target === "pickup") {
      setPickup(loc.address);
      setPickupCoords({ lat: loc.latitude, lng: loc.longitude });
    } else {
      setDestination(loc.address);
      setDestinationCoords({ lat: loc.latitude, lng: loc.longitude });
    }
  };

 const buildPayload = (
  address: string,
  coords: { lat: number; lng: number } | null
): SavedLocationCreate => ({
  name: address,
  address,
  latitude: coords?.lat ?? 0,
  longitude: coords?.lng ?? 0,
});

const handleSave = async (): Promise<void> => {
  if (!pickup && !destination) return;

  await Promise.all([
    pickup && addLocation.mutateAsync(buildPayload(pickup, pickupCoords)),
    destination && addLocation.mutateAsync(buildPayload(destination, destinationCoords)),
  ]);
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

  // Build payload for the API
  const payload = {
    pickup_lat: pickupCoords.lat,
    pickup_lon: pickupCoords.lng,
    dropoff_lat: destinationCoords.lat,
    dropoff_lon: destinationCoords.lng,
    pickup_address: pickup,
    dropoff_address: destination,
    estimated_price: fareEstimate.data?.data?.base_fare || 0,
    rideType: "regular", // or whatever your UI allows
    paymentMethod: "CASH", // or user selection
    fk_customer_id: 1, // TODO: set current customer
  };

  // Call the mutation
  createRideRequest.mutate(payload, {
    onSuccess: (data) => {
      // Store requestId in Zustand
      setRideData({ requestId: data.id });
      toast.success("Ride request created!");
      // Go to next step
      next();
    },
    onError: (err) => {
      console.error("Create ride request failed:", err);
    },
  });
};

  // const getLocationIcon = (name: string): JSX.Element => {
  //   const lower = name.toLowerCase();
  //   if (lower.includes("home")) return <Home className="w-4 h-4" />;
  //   if (lower.includes("work") || lower.includes("office")) return <Briefcase className="w-4 h-4" />;
  //   return <Star className="w-4 h-4" />;
  // };

  const canContinue = !!pickupCoords && !!destinationCoords;

  return (
    <div className="w-full max-w-full mx-auto h-screen">
      {/* Header */}
      <h1 className="text-[28px] md:text-[48px] font-bold text-[#1A1A1A] mb-1">
        Request a ride
      </h1>

      {/* Location inputs card */}
      <div className="rounded-[16px] p-4 mb-4">
        <div className="flex-1 space-y-2">
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
                setPickupCoords({ lat, lng }); // fixed: was { lat, lon: lng }
              }}
              placeholder="Enter pickup location"
              className="w-full h-[56px] pl-10 pr-12 bg-[#F5F5F7] rounded-lg border-none text-[14px] focus:outline-none focus:ring-2 focus:ring-[#A20602]"
            />
            <button
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="absolute right-3 top-1/2 -translate-y-1/2 disabled:opacity-50 z-10"
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
                setDestinationCoords({ lat, lng }); // fixed: was { lat, lon: lng }
              }}
              placeholder="Enter destination"
              className="w-full h-[56px] pl-10 pr-12 bg-[#F5F5F7] rounded-lg border-none text-[14px] focus:outline-none focus:ring-2 focus:ring-[#A20602]"
            />
          </div>
        </div>
      </div>

      {/* Saved locations */}
      {/* {savedLocations.length > 0 && (
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-[#999] uppercase tracking-wide mb-3">
            Saved places
          </h3>
          <div className="space-y-1">
            {savedLocations.slice(0, 4).map((loc) => (
              <button
                key={loc.id}
                onClick={() => {
                  const target = !pickupCoords ? "pickup" : "destination";
                  handleSelectSavedLocation(loc, target);
                }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-[12px] hover:bg-[#F5F5F7] transition-colors text-left cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[#F0F0F5] flex items-center justify-center text-[#555]">
                  {getLocationIcon(loc.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-[#1A1A1A] truncate">{loc.name}</p>
                  <p className="text-[12px] text-[#999] truncate">{loc.address}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#CCC] flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )} */}

      {/* Quick picks — shown when no saved locations */}
      {/* {savedLocations.length === 0 && !locationsLoading && (
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-[#999] uppercase tracking-wide mb-3">
            Quick picks
          </h3>
          <div className="space-y-1">
            {[
              { icon: <Home className="w-4 h-4" />, label: "Set Home", sub: "Save your home address" },
              { icon: <Briefcase className="w-4 h-4" />, label: "Set Work", sub: "Save your work address" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-3 rounded-[12px] hover:bg-[#F5F5F7] transition-colors cursor-pointer opacity-50"
              >
                <div className="w-9 h-9 rounded-full bg-[#F0F0F5] flex items-center justify-center text-[#555]">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-[#1A1A1A]">{item.label}</p>
                  <p className="text-[12px] text-[#999]">{item.sub}</p>
                </div>
                <Plus className="w-4 h-4 text-[#CCC]" />
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={handleSave}
          disabled={addLocation.isPending || (!pickup && !destination)}
          className="flex-1 h-[50px] cursor-pointer bg-[#E8E8E8] text-[#1A1A1A] rounded-lg font-semibold text-[16px] hover:bg-[#D8D8D8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {addLocation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </button>
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="flex-1 h-[50px] cursor-pointer rounded-lg font-semibold text-[16px] bg-[#02093A] text-white hover:bg-[#030B4D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RequestRide;

// "use client";
// import { useState } from "react";
// import { Plus, Navigation } from "lucide-react";
// import Image from "next/image";
// import { useRideStore } from "@/store/rideStore";

// const RequestRide = () => {
//   const next = useRideStore((s) => s.next);
//   const setRideData = useRideStore((s) => s.setRideData);

//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");

//   // Save without moving to next step
//   const handleSave = () => {
//     setRideData({
//       pickup: { address: pickup, lat: 0, lng: 0 },
//       destination: { address: destination, lat: 0, lng: 0 },
//     });
//     alert("Ride data saved!");
//   };

//   const handleContinue = () => {
//     setRideData({
//       pickup: { address: pickup, lat: 0, lng: 0 },
//       destination: { address: destination, lat: 0, lng: 0 },
//     });
//     next(); // move to SelectRideType
//   };

//   return (
//     <div className="w-full max-w-full mx-auto bg-white">
//       <h1 className="text-[48px] font-bold text-[#1A1A1A] mb-2">
//         Request ride
//       </h1>

//       <div className="space-y-4">
//         {/* Pickup */}
//         <div className="relative">
//           <Image
//             src="/images/Map.png"
//             className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
//             alt="Arrow Icon"
//             width={50}
//             height={50}
//           />
//           <input
//             type="text"
//             value={pickup}
//             onChange={(e) => setPickup(e.target.value)}
//             placeholder="Enter pickup"
//             className="w-full max-w-[550px] h-[56px] pl-10 pr-12 bg-[#F5F5F5] rounded-lg border-none text-[14px] focus:outline-none focus:ring-2 focus:ring-[#A20602]"
//           />
//           <button className="absolute right-3 top-1/2 -translate-y-1/2">
//             <Plus className="w-5 h-5 text-[#02093A]" />
//           </button>
//         </div>

//         {/* Destination */}
//         <div className="relative">
//           <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
//           <input
//             type="text"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//             placeholder="Enter destination"
//             className="w-full max-w-[550px] h-[56px] pl-10 pr-12 bg-[#F5F5F5] rounded-lg border-none text-[14px] focus:outline-none focus:ring-2 focus:ring-[#A20602]"
//           />
//           {/* Plus button for destination */}
//           <button className="absolute right-3 top-1/2 -translate-y-1/2">
//             <Plus className="w-5 h-5 text-[#02093A]" />
//           </button>
//         </div>
//       </div>

//       {/* Action Buttons: Save + Continue */}
//       <div className="flex gap-3 mt-8">
//         <button
//           onClick={handleSave}
//           className="flex-1 h-[50px] cursor-pointer bg-[#E8E8E8] text-[#1A1A1A] rounded-lg font-semibold text-[16px] hover:bg-[#D8D8D8] transition-colors"
//         >
//           Save
//         </button>
//         <button
//           onClick={handleContinue}
//           className="flex-1 h-[50px] cursor-pointer rounded-lg font-semibold text-[16px] bg-[#02093A] text-white hover:bg-[#030B4D] transition-colors"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RequestRide;


// "use client";
// import { useState } from "react";
// import { Plus, Navigation, Loader2 } from "lucide-react";
// import Image from "next/image";
// import { useRideStore } from "@/store/rideStore";
// // import { useAddSavedLocation } from "@/hooks/rideHooks";
// import { SavedLocationCreate } from "@/types";
// import { useAddSavedLocation } from "@/hooks/useRideHooks";

// const RequestRide = () => {
//   const next = useRideStore((s) => s.next);
//   const setRideData = useRideStore((s) => s.setRideData);

//   const [pickup, setPickup] = useState<string>("");
//   const [destination, setDestination] = useState<string>("");

//   const addLocation = useAddSavedLocation();

//   const buildPayload = (address: string): SavedLocationCreate => ({
//     address,
//     lat: 0,
//     lng: 0,
//   });

  
//   const handleContinue = (): void => {
//     setRideData({
//       pickup: { address: pickup, lat: 0, lng: 0 },
//       destination: { address: destination, lat: 0, lng: 0 },
//     });
//     next();
//   };
  
//   const handleSave = async (): Promise<void> => {
//     if (!pickup && !destination) return;

//     await Promise.all([
//       pickup && addLocation.mutateAsync(buildPayload(pickup)),
//       destination && addLocation.mutateAsync(buildPayload(destination)),
//     ]);
//   };

//   return (
//     <div className="w-full max-w-full mx-auto bg-white">
//       <h1 className="text-[48px] font-bold text-[#1A1A1A] mb-2">
//         Request ride
//       </h1>

//       <div className="space-y-4">
//         {/* Pickup */}
//         <div className="relative">
//           <Image
//             src="/images/Map.png"
//             className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
//             alt="Arrow Icon"
//             width={50}
//             height={50}
//           />
//           <input
//             type="text"
//             value={pickup}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setPickup(e.target.value)
//             }
//             placeholder="Enter pickup"
//             className="w-full max-w-[550px] h-[56px] pl-10 pr-12 bg-[#F5F5F5] rounded-lg border-none text-[14px] focus:outline-none focus:ring-2 focus:ring-[#A20602]"
//           />
//           <button className="absolute right-3 top-1/2 -translate-y-1/2">
//             <Plus className="w-5 h-5 text-[#02093A]" />
//           </button>
//         </div>

//         {/* Destination */}
//         <div className="relative">
//           <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
//           <input
//             type="text"
//             value={destination}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setDestination(e.target.value)
//             }
//             placeholder="Enter destination"
//             className="w-full max-w-[550px] h-[56px] pl-10 pr-12 bg-[#F5F5F5] rounded-lg border-none text-[14px] focus:outline-none focus:ring-2 focus:ring-[#A20602]"
//           />
//           <button className="absolute right-3 top-1/2 -translate-y-1/2">
//             <Plus className="w-5 h-5 text-[#02093A]" />
//           </button>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-3 mt-8">
//         <button
//           onClick={handleSave}
//           disabled={addLocation.isPending || (!pickup && !destination)}
//           className="flex-1 h-[50px] cursor-pointer bg-[#E8E8E8] text-[#1A1A1A] rounded-lg font-semibold text-[16px] hover:bg-[#D8D8D8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//         >
//           {addLocation.isPending ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               Saving...
//             </>
//           ) : (
//             "Save"
//           )}
//         </button>
//         <button
//           onClick={handleContinue}
//           disabled={!pickup || !destination}
//           className="flex-1 h-[50px] cursor-pointer rounded-lg font-semibold text-[16px] bg-[#02093A] text-white hover:bg-[#030B4D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RequestRide;


// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { Plus, Navigation, Loader2 } from "lucide-react";
// import Image from "next/image";
// import { useRideStore } from "@/store/rideStore";
// import { useAddSavedLocation, useEstimateFare } from "@/hooks/useRideHooks";
// import { SavedLocationCreate } from "@/types";
// import { toast } from "sonner";

// const RequestRide = () => {
//   const next = useRideStore((s) => s.next);
//   const setRideData = useRideStore((s) => s.setRideData);

//   const [pickup, setPickup] = useState<string>("");
//   const [destination, setDestination] = useState<string>("");
//   const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(null);
//   const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lng: number } | null>(null);

//   const addLocation = useAddSavedLocation();
//   const fareEstimate = useEstimateFare();

//   // Auto-estimate fare when both coords are set
//   useEffect(() => {
//     if (pickupCoords && destinationCoords) {
//       fareEstimate.mutate({
//         pickup_lat: pickupCoords.lat,
//         pickup_lon: pickupCoords.lng,
//         dropoff_lat: destinationCoords.lat,
//         dropoff_lon: destinationCoords.lng,
//       });
//     }
//   }, [pickupCoords, destinationCoords]);

//   // Sync pickup coords to store
//   useEffect(() => {
//     if (pickupCoords) {
//       setRideData({
//         pickup: { address: pickup, lat: pickupCoords.lat, lng: pickupCoords.lng },
//       });
//     }
//   }, [pickupCoords, pickup]);

//   // Sync destination coords to store
//   useEffect(() => {
//     if (destinationCoords) {
//       setRideData({
//         destination: { address: destination, lat: destinationCoords.lat, lng: destinationCoords.lng },
//       });
//     }
//   }, [destinationCoords, destination]);

//   // Store fare estimate in ride store
//   useEffect(() => {
//     if (fareEstimate.data?.data) {
//       setRideData({ fareEstimate: fareEstimate.data.data });
//     }
//   }, [fareEstimate.data]);

//   // Use current location for pickup
//   const handleUseCurrentLocation = useCallback((): void => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation is not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         setPickupCoords({ lat: latitude, lng: longitude });

//         if (window.google?.maps) {
//           const geocoder = new window.google.maps.Geocoder();
//           geocoder.geocode(
//             { location: { lat: latitude, lng: longitude } },
//             (results, status) => {
//               if (status === "OK" && results?.[0]) {
//                 setPickup(results[0].formatted_address);
//               } else {
//                 setPickup(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
//               }
//             }
//           );
//         } else {
//           setPickup(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
//         }
//       },
//       (error) => {
//         toast.error("Could not get your location. Please allow location access.");
//         console.error("Geolocation error:", error);
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   }, []);

//   const buildPayload = (address: string): SavedLocationCreate => ({
//     name: address,
//     latitude: 0,
//     longitude: 0,
//   });

//   const handleSave = async (): Promise<void> => {
//     if (!pickup && !destination) return;

//     await Promise.all([
//       pickup && addLocation.mutateAsync(buildPayload(pickup)),
//       destination && addLocation.mutateAsync(buildPayload(destination)),
//     ]);
//   };

//   const handleContinue = (): void => {
//     if (!pickupCoords) {
//       toast.error("Please select a pickup location.");
//       return;
//     }
//     if (!destinationCoords) {
//       toast.error("Please select a destination.");
//       return;
//     }

//     setRideData({
//       pickup: { address: pickup, lat: pickupCoords.lat, lng: pickupCoords.lng },
//       destination: { address: destination, lat: destinationCoords.lat, lng: destinationCoords.lng },
//     });
//     next();
//   };

//   return (
//     <div className="w-full max-w-full mx-auto bg-white">
//       <h1 className="text-[48px] font-bold text-[#1A1A1A] mb-2">
//         Request ride
//       </h1>

//       <div className="space-y-4">
//         {/* Pickup */}
//         <div className="relative">
//           <Image
//             src="/images/Map.png"
//             className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
//             alt="Arrow Icon"
//             width={50}
//             height={50}
//           />
//           <input
//             type="text"
//             value={pickup}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//               setPickup(e.target.value);
//               setPickupCoords(null); // reset coords when manually typing
//             }}
//             placeholder="Enter pickup"
//             className="w-full max-w-[550px] h-[56px] pl-10 pr-12 bg-[#F5F5F5] rounded-lg border-none text-[14px] focus:outline-none focus:ring-2 focus:ring-[#A20602]"
//           />
//           <button
//             onClick={handleUseCurrentLocation}
//             className="absolute right-3 top-1/2 -translate-y-1/2"
//             title="Use current location"
//           >
//             <Plus className="w-5 h-5 text-[#02093A]" />
//           </button>
//         </div>

//         {/* Destination */}
//         <div className="relative">
//           <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
//           <input
//             type="text"
//             value={destination}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//               setDestination(e.target.value);
//               setDestinationCoords(null); // reset coords when manually typing
//             }}
//             placeholder="Enter destination"
//             className="w-full max-w-[550px] h-[56px] pl-10 pr-12 bg-[#F5F5F5] rounded-lg border-none text-[14px] focus:outline-none focus:ring-2 focus:ring-[#A20602]"
//           />
//           <button className="absolute right-3 top-1/2 -translate-y-1/2">
//             <Plus className="w-5 h-5 text-[#02093A]" />
//           </button>
//         </div>

//         {/* Fare estimate preview */}
//         {fareEstimate.isPending && (
//           <div className="flex items-center gap-2 px-1">
//             <Loader2 className="w-4 h-4 animate-spin text-[#02093A]" />
//             <span className="text-[13px] text-[#02093A]">Estimating fare...</span>
//           </div>
//         )}

//         {fareEstimate.data?.data && (
//           <div className="bg-[#F0FFF4] rounded-lg px-4 py-3 border border-[#C6F6D5]">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-[11px] text-[#666] font-medium uppercase tracking-wide">
//                   Estimated fare
//                 </p>
//                 <p className="text-[20px] font-bold text-[#02093A]">
//                   {fareEstimate.data.data.vehicle_options?.[0]?.formatted_fare ||
//                     `${fareEstimate.data.data.currency_symbol} ${fareEstimate.data.data.base_fare}`}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-[11px] text-[#666]">
//                   {fareEstimate.data.data.distance_km?.toFixed(1)} km
//                 </p>
//                 <p className="text-[11px] text-[#666]">
//                   ~{fareEstimate.data.data.estimated_duration_minutes} min
//                 </p>
//               </div>
//             </div>
//             {fareEstimate.data.data.is_surge_pricing && (
//               <div className="mt-2 flex items-center gap-1 text-[11px] text-[#E53935]">
//                 <span className="inline-block w-2 h-2 rounded-full bg-[#E53935]" />
//                 Surge pricing active
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-3 mt-8">
//         <button
//           onClick={handleSave}
//           disabled={addLocation.isPending || (!pickup && !destination)}
//           className="flex-1 h-[50px] cursor-pointer bg-[#E8E8E8] text-[#1A1A1A] rounded-lg font-semibold text-[16px] hover:bg-[#D8D8D8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//         >
//           {addLocation.isPending ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               Saving...
//             </>
//           ) : (
//             "Save"
//           )}
//         </button>
//         <button
//           onClick={handleContinue}
//           disabled={!pickup || !destination}
//           className="flex-1 h-[50px] cursor-pointer rounded-lg font-semibold text-[16px] bg-[#02093A] text-white hover:bg-[#030B4D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RequestRide;