// "use client";
// import Button from "@/app/components/ui/Button";
// import LocationSearchInput from "@/app/components/ui/LocationSearchInput";
// import { useRideStore } from "@/store/rideStore";
// import Image from "next/image";
// // import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useConfirmRideRequest } from "@/hooks/useRideHooks";
// import { toast } from "sonner";

// const ConfirmRide = () => {
//   const next = useRideStore((s) => s.next);
//   const rideData = useRideStore((s) => s.rideData);
//   const setRideData = useRideStore((s) => s.setRideData);

//   const [pickup, setPickup] = useState(rideData.pickup?.address || "");
//   const [destination, setDestination] = useState(rideData.destination?.address || "");

//   const [pickupCoords, setPickupCoords] = useState<{
//     lat: number;
//     lon: number;
//   } | null>(rideData.pickup ? { lat: rideData.pickup.lat, lon: rideData.pickup.lng } : null);
//   const [destinationCoords, setDestinationCoords] = useState<{
//     lat: number;
//     lon: number;
//   } | null>(rideData.destination ? { lat: rideData.destination.lat, lon: rideData.destination.lng } : null);

//   // const createRideRequest = useCreateRideRequest();
//   const confirmRideRequest = useConfirmRideRequest();

//   const handleContinue = () => {

//     console.log("=== CONFIRM RIDE START ===");
//     console.log("ConfirmRide - handleContinue called");
//     console.log("ConfirmRide - pickupCoords:", pickupCoords);
//     console.log("ConfirmRide - destinationCoords:", destinationCoords);
//     console.log("ConfirmRide - rideData before:", rideData);
//     console.log("ConfirmRide - createRideRequest function:", createRideRequest);

//     if (!pickupCoords || !destinationCoords) {
//       toast.error("Please set both pickup and destination locations");
//       return;
//     }

//     // Create ride request
//     console.log("ConfirmRide - calling createRideRequest.mutate...");
//     createRideRequest.mutate({
//       pickup_lat: pickupCoords.lat,
//       pickup_lon: pickupCoords.lon,
//       dropoff_lat: destinationCoords.lat,
//       dropoff_lon: destinationCoords.lon,
//       pickup_address: pickup,
//       dropoff_address: destination,
//       estimated_price: rideData.fareEstimate?.base_fare || 1024,
//       rideType: rideData.rideType || "Standard",
//       paymentMethod: "cash", // Default to cash for now
//       fk_customer_id: 1, // This should come from auth context
//     }, {
//       onSuccess: (data) => {
//         console.log("=== CONFIRM RIDE SUCCESS ===");
//         console.log("ConfirmRide - ride request created:", data);
//         console.log("ConfirmRide - setting requestId to:", data.id);
//         console.log("ConfirmRide - calling setRideData...");

//         // Store request ID for later use
//         setRideData({ requestId: data.id });

//         console.log("ConfirmRide - setRideData called");
//         toast.success("Ride request created successfully!");
//         console.log("ConfirmRide - calling next()...");
//         next(); // move to finding ride
//         console.log("=== CONFIRM RIDE END ===");
//       },
//       onError: (error) => {
//         console.log("=== CONFIRM RIDE ERROR ===");
//         console.error("Ride request error:", error);
//         toast.error("Failed to create ride request");
//       }
//     });

//   };
//   return (
//     <section className="min-h-screen">
//       <div className="container mx-auto">
//         {/* <div className="flex flex-col md:flex-col lg:flex-row items-center justify-center gap-[17px] items-center justify-center ">
//           <div className="h-full w-full">
//             <MapLayout />
//           </div> */}
//         <div className="h-full min-w-full">
//           <div className="bg-[#E6E6EB]  rounded-[25px]">
//             <div className="p-[20px]">
//               <h2 className="text-[#333333] text-[18px] md:text-[25px]">
//                 Confirm your trip
//               </h2>
//               <div className="mb-4 bg-[#F5F5F7] rounded-[25px] p-2">
//                 <div className="space-y-2">
//                   <div className="relative w-full mb-[12px]">
//                     <LocationSearchInput
//                       value={pickup}
//                       onChange={setPickup}
//                       onSelect={(address, lat, lng) => {
//                         setPickup(address);
//                         setPickupCoords({ lat, lon: lng });
//                       }}
//                       placeholder="4827 Willowbrook Lane, OH 44126"
//                       className="w-full h-14 pl-10 bg-[#F5F5F5] border-b border-[#E6E6E6] focus:border-b-[#A20602] focus:outline-none"
//                       label="Driver's location"
//                     />

//                     <Image
//                       src="/images/Map.png"
//                       alt="Map Icon"
//                       width={20}
//                       height={20}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
//                     />
//                   </div>
//                 </div>

//                 {/* Destination */}
//                 <div className="space-y-2">
//                   {/* <label className="text-[10px] font-medium text-gray-700">
//                     Destination
//                   </label> */}

//                   <div className="relative w-full">
//                     <LocationSearchInput
//                       value={destination}
//                       onChange={setDestination}
//                       onSelect={(address, lat, lng) => {
//                         setDestination(address);
//                         setDestinationCoords({ lat, lon: lng });
//                       }}
//                       placeholder="123 Main St, Springfield, IL 62704"
//                       className="w-full h-14 pl-10 bg-[#F5F5F5] border-b border-[#E6E6E6] focus:border-b-[#A20602] focus:outline-none"
//                       label="Pickup"
//                     />

//                     <Image
//                       src="/images/Map.png"
//                       alt="Map Icon"
//                       width={20}
//                       height={20}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
//                     />
//                   </div>
//                 </div>
//               </div>
//               {/* Fare */}
//               <div className="mb-4">
//                 <div className="bg-white rounded-[8px] px-[16px] py-[12px]">
//                   <p className="font-light text-[#555A7B] text-[10px]">
//                     Estimated fare
//                   </p>
//                   <h3 className="text-[#02093A] text-[18px] md:text-[20px] font-bold leading-[120%] tracking-[-4%]">
//                     CF 1024
//                   </h3>
//                 </div>
//               </div>
//               {/* Pay with Cash */}
//               <div className="bg-[#FFE6E6] rounded-[8px] px-[16px] py-[12px] flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-2">
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M17.5 5H2.5C1.67 5 1 5.67 1 6.5V13.5C1 14.33 1.67 15 2.5 15H17.5C18.33 15 19 14.33 19 13.5V6.5C19 5.67 18.33 5 17.5 5Z"
//                       stroke="#E53935"
//                       strokeWidth="1.5"
//                     />
//                   </svg>
//                   <p className="text-[#E53935] text-[14px] font-medium">
//                     Pay with Cash
//                   </p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="sr-only peer"
//                     defaultChecked
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E53935]"></div>
//                 </label>
//               </div>
//               {/* Confirm Button */}
//               <Button
//                 style="tertiary"
//                 type="button"
//                 css="w-full text-white h-[48px] rounded-[12px] font-semibold text-[16px]"
//                 // fn={() => router.push("/finding-ride")}
//                 fn={handleContinue}
//               >
//                 Confirm Ride
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* </div> */}
//     </section>
//   );
// };

// export default ConfirmRide;

"use client";
import Button from "@/app/components/ui/Button";
import LocationSearchInput from "@/app/components/ui/LocationSearchInput";
import { useRideStore } from "@/store/rideStore";
import Image from "next/image";
import { useState } from "react";
import { useConfirmRideRequest } from "@/hooks/useRideHooks";
import { toast } from "sonner";

const ConfirmRide = () => {
  const next = useRideStore((s) => s.next);
  const rideData = useRideStore((s) => s.rideData);
  const setRideData = useRideStore((s) => s.setRideData);

  const [pickup, setPickup] = useState(rideData.pickup?.address || "");
  const [destination, setDestination] = useState(
    rideData.destination?.address || "",
  );

  const [pickupCoords, setPickupCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(
    rideData.pickup
      ? { lat: rideData.pickup.lat, lon: rideData.pickup.lng }
      : null,
  );

  const [destinationCoords, setDestinationCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(
    rideData.destination
      ? { lat: rideData.destination.lat, lon: rideData.destination.lng }
      : null,
  );

  const ConfirmRideRequest = useConfirmRideRequest();

  const handleContinue = () => {
    console.log("=== CONFIRM RIDE START ===");
    console.log(
      "pickupCoords:",
      pickupCoords,
      "destinationCoords:",
      destinationCoords,
    );
    console.log("rideData:", rideData);

    if (!pickupCoords || !destinationCoords) {
      toast.error("Please set both pickup and destination locations");
      return;
    }

    if (!rideData.requestId) {
      toast.error("No ride request found.");
      return;
    }

    if (!rideData.rideId) {
      toast.error("Driver not assigned yet. Please wait...");
      return;
    }

    const rideIdNumber = Number(rideData.rideId);

    if (!Number.isInteger(rideIdNumber)) {
      console.error("Invalid rideId:", rideData.rideId);
      toast.error("Invalid ride ID");
      return;
    }

    ConfirmRideRequest.mutate(
      {
        requestId: rideData.requestId,
        rideId: rideIdNumber,
      },
      {
        onSuccess: () => {
          console.log("=== CONFIRM RIDE SUCCESS ===");
          toast.success("Ride confirmed successfully!");
          next();
        },
        onError: (error) => {
          console.log("=== CONFIRM RIDE ERROR ===");
          console.error("Ride request error:", error);
          toast.error("Failed to confirm ride request");
        },
      },
    );
  };

  return (
    <section className="min-h-screen">
      <div className="container mx-auto">
        <div className="h-full min-w-full">
          <div className="bg-[#E6E6EB] rounded-[25px]">
            <div className="p-[20px]">
              <h2 className="text-[#333333] text-[18px] md:text-[25px]">
                Confirm your trip
              </h2>

              {/* Pickup & Destination */}
              <div className="mb-4 bg-[#F5F5F7] rounded-[25px] p-2">
                <div className="space-y-2">
                  <div className="relative w-full mb-[12px]">
                    <LocationSearchInput
                      value={pickup}
                      onChange={setPickup}
                      onSelect={(address, lat, lng) => {
                        setPickup(address);
                        setPickupCoords({ lat, lon: lng });
                      }}
                      placeholder="4827 Willowbrook Lane, OH 44126"
                      className="w-full h-14 pl-10 bg-[#F5F5F5] border-b border-[#E6E6E6] focus:border-b-[#A20602] focus:outline-none"
                      label="Driver's location"
                    />
                    <Image
                      src="/images/Map.png"
                      alt="Map Icon"
                      width={20}
                      height={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative w-full">
                    <LocationSearchInput
                      value={destination}
                      onChange={setDestination}
                      onSelect={(address, lat, lng) => {
                        setDestination(address);
                        setDestinationCoords({ lat, lon: lng });
                      }}
                      placeholder="123 Main St, Springfield, IL 62704"
                      className="w-full h-14 pl-10 bg-[#F5F5F5] border-b border-[#E6E6E6] focus:border-b-[#A20602] focus:outline-none"
                      label="Pickup"
                    />
                    <Image
                      src="/images/Map.png"
                      alt="Map Icon"
                      width={20}
                      height={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Fare */}
              <div className="mb-4">
                <div className="bg-white rounded-[8px] px-[16px] py-[12px]">
                  <p className="font-light text-[#555A7B] text-[10px]">
                    Estimated fare
                  </p>
                  <h3 className="text-[#02093A] text-[18px] md:text-[20px] font-bold leading-[120%] tracking-[-4%]">
                    CF {rideData.fareEstimate?.base_fare || 1024}
                  </h3>
                </div>
              </div>

              {/* Pay with Cash */}
              <div className="bg-[#FFE6E6] rounded-[8px] px-[16px] py-[12px] flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H2.5C1.67 5 1 5.67 1 6.5V13.5C1 14.33 1.67 15 2.5 15H17.5C18.33 15 19 14.33 19 13.5V6.5C19 5.67 18.33 5 17.5 5Z"
                      stroke="#E53935"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <p className="text-[#E53935] text-[14px] font-medium">
                    Pay with Cash
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E53935]"></div>
                </label>
              </div>

              {/* Confirm Ride Button */}
              <Button
                style="tertiary"
                type="button"
                css="w-full text-white h-[48px] rounded-[12px] font-semibold text-[16px]"
                fn={handleContinue}
              >
                Confirm Ride
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmRide;
