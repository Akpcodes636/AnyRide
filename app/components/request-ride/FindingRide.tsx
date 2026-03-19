// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import LoadingBar from "../LoadingBar";
// import Button from "../ui/Button";
// import RideAcceptanceCard from "../RideAcceptanceCard";
// import { useRideStore } from "@/store/rideStore";
// import { useRideRequestById, useIncreaseFare, useAcceptRideRequest, useCancelRideRequest } from "@/hooks/useRideHooks";
// import { useWebSocketSimulation } from "@/hooks/useWebSocketSimulation";
// import { toast } from "sonner";

// const FindingRide = () => {
//   const next = useRideStore((s) => s.next);
//   const rideData = useRideStore((s) => s.rideData);
//   const requestId = rideData.requestId;

//   // WebSocket Simulation - move hooks to top
//   const { 
//     isSimulating, 
//     driversViewing, 
//     currentDriver, 
//     startSimulation, 
//     stopSimulation 
//   } = useWebSocketSimulation();

//   // Poll ride request every 5 seconds to get updated driver info
//   const { data: rideRequest, isLoading } = useRideRequestById(requestId);
  
//   const increaseFare = useIncreaseFare();
//   const acceptRide = useAcceptRideRequest();
//   const cancelRide = useCancelRideRequest();

//   const [fareAmount, setFareAmount] = useState<number>(0);
//   const [elapsed, setElapsed] = useState<number>(0);

//   // Check if requestId changed
//   useEffect(() => {
//     console.log("FindingRide - requestId changed to:", requestId);
//     if (requestId) {
//       console.log("FindingRide - ✅ RequestId available, starting simulation...");
//     }
//   }, [requestId]);

//   // Fallback: If no requestId, show message and don't start simulation
//   if (!requestId) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center max-w-md">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             No Active Ride Request
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Please go back and create a ride request first.
//           </p>
//           <div className="space-y-3">
//             <Button 
//               style="primary" 
//               type="button" 
//               css="px-6 py-2"
//               fn={() => {
//                 const back = useRideStore.getState().back;
//                 back();
//               }}
//             >
//               Go Back to Request
//             </Button>
//             <Button 
//               style="secondary" 
//               type="button" 
//               css="px-6 py-2"
//               fn={() => {
//                 // Test: Create a mock ride request
//                 console.log("Creating test ride request...");
//                 const testRequestData = {
//                   pickup_lat: 40.7128,
//                   pickup_lon: -74.0060,
//                   dropoff_lat: 40.7589,
//                   dropoff_lon: -73.9851,
//                   pickup_address: "Times Square, New York",
//                   dropoff_address: "Central Park, New York",
//                   estimated_price: 1500,
//                   rideType: "Standard",
//                   paymentMethod: "cash",
//                   fk_customer_id: 1,
//                 };
                
//                 // Simulate successful response
//                 const mockResponse = { id: 12345 };
//                 console.log("Mock ride request created:", mockResponse);
                
//                 // Store in ride store
//                 const setRideData = useRideStore.getState().setRideData;
//                 setRideData({ 
//                   ...rideData, 
//                   requestId: mockResponse.id 
//                 });
                
//                 toast.success("Test ride request created!");
//               }}
//             >
//               Create Test Ride
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Countdown timer
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setElapsed((prev) => prev + 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Auto-advance when a driver accepts
//   useEffect(() => {
//     if (rideRequest?.status === "accepted" || currentDriver) {
//       console.log("Ride accepted, advancing to next step");
//       setTimeout(() => {
//         next();
//       }, 1000);
//     }
//   }, [rideRequest?.status, currentDriver, next]);

//   const formatTime = (seconds: number): string => {
//     const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
//     const secs = (seconds % 60).toString().padStart(2, "0");
//     return `${mins}:${secs}`;
//   };

//   const handleAddToPrice = (): void => {
//     console.log("Add to price clicked, requestId:", requestId);
//     if (!requestId) {
//       toast.error("No active ride request.");
//       return;
//     }

//     // For demo, increase by 5 CF
//     const newFare = (rideRequest?.estimated_price || 1024) + 5;
    
//     increaseFare.mutate(
//       {
//         requestId,
//         fareUpdate: { new_fare: newFare },
//       },
//       {
//         onSuccess: () => {
//           toast.success("Fare increased!");
//           console.log("Fare increased successfully");
//         },
//         onError: (error) => {
//           console.error("Increase fare error:", error);
//           toast.error("Failed to increase fare");
//         }
//       }
//     );
//   };

//   const handleContinue = (): void => {
//     console.log("Continue clicked");
//     next();
//   };

//   const handleCancelRideRequest = (): void => {
//     console.log("Cancel ride clicked, requestId:", requestId);
//     if (!requestId) {
//       toast.error("No active ride request.");
//       return;
//     }

//     cancelRide.mutate({ requestId, reason: "Customer cancelled the request" }, {
//       onSuccess: () => {
//         toast.success("Ride request cancelled");
//         console.log("Ride cancelled successfully");
//         // Reset the flow or go back to request step
//         const reset = useRideStore.getState().reset;
//         reset();
//       },
//       onError: (error) => {
//         console.error("Cancel ride error:", error);
//         toast.error("Failed to cancel ride");
//       }
//     });
//   };

//   return (
//     <div>
//       <div className="bg-[#E6E6EB] w-full max-w-[512px] h-[378px] rounded-[25px] px-[20px] py-[25px]">
//         <h1 className="text-[16px] md:text-[25px] font-bold leading-[120%] tracking-[-4%] text-[#333333] mb-[16px]">
//           Finding nearby drivers...
//           {isSimulating && (
//             <span className="ml-2 text-xs text-green-600">● Live</span>
//           )}
//         </h1>
//         <div className="bg-[#F5F5F7] p-[16px] mb-[24px] rounded-[8px]">
//           <p className="text-[14px] text-[#02093A] leading-[140%] text-center font-normal">
//             {formatTime(elapsed)}
//           </p>
//           <div className="mb-[16px]">
//             <LoadingBar />
//           </div>
//           <div className="border-b text-[#E6E6E6] border-1 mb-[16px]"></div>
//           <div className="w-full">
//             <div className="flex items-center justify-between">
//               {/* Left circle */}
//               <div className="flex items-center justify-center bg-[#E6E6EB] h-[30px] w-[30px] rounded-full">
//                 <p className="text-[10px] text-[#8B8EA4] font-normal leading-[140%] p-2">
//                   -5
//                 </p>
//               </div>
//               {/* Center text — ride code from store or fallback */}
//               <h3 className="text-[18px] md:text-[25px] font-bold tracking-[-0.04em] leading-[120%] text-[#02093A]">
//                 CF {rideRequest?.id || "1024"}
//               </h3>
//               {/* Right circle */}
//               <div className="flex items-center justify-center bg-[#A20602] h-[30px] w-[30px] rounded-full">
//                 <p className="text-[10px] text-white font-normal leading-[140%] p-2">
//                   +5
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Drivers viewing */}
//         <div className="bg-white h-[48px] rounded-[8px] px-4 py-2 flex items-center justify-between shadow-sm">
//           <h3 className="text-[#02093A] text-[12px] leading-[120%]">
//             {driversViewing || rideRequest?.drivers_viewing_count || 5} drivers are viewing your request...
//           </h3>
//           <div className="flex p-4">
//             {[
//               "/images/img.png",
//               "/images/img-1.png",
//               "/images/img-2.png",
//               "/images/img-3.png",
//             ].map((src, index) => (
//               <div
//                 key={index}
//                 className="w-6 h-6 relative rounded-full overflow-hidden -mr-10"
//               >
//                 <Image
//                   src={src}
//                   alt={`driver ${index + 1}`}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Button */}
//         <div className="flex gap-2 mt-6">
//           <Button
//             style="disabled"
//             type="button"
//             css="w-full h-[18px] button rounded-[8px]"
//             fn={handleAddToPrice}
//           >
//             {increaseFare.isPending ? "Updating..." : "Add to price"}
//           </Button>
//           <Button
//             style="secondary"
//             type="button"
//             css="w-full h-[18px] button rounded-[8px] text-red-600 border-red-600"
//             fn={handleCancelRideRequest}
//           >
//             {cancelRide.isPending ? "Cancelling..." : "Cancel Request"}
//           </Button>
//         </div>
//       </div>

//       <RideAcceptanceCard
//         driverName="Jameel Abdullahi"
//         car="Xiaomi car 56"
//         rideCode="CF 1084"
//         eta="5 min"
//         rides={563}
//         distance="400m"
//         rating={4.8}
//         image="/images/img-1.png"
//         requestId={requestId || 0}
//       />
//       <RideAcceptanceCard
//         driverName="Aisha Bello"
//         car="Toyota Corolla 12"
//         rideCode="CF 1099"
//         eta="3 min"
//         rides={420}
//         distance="350m"
//         rating={4.9}
//         image="/images/img-2.png"
//         requestId={requestId || 0}
//       />
//     </div>
//   );
// };

// export default FindingRide;



"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LoadingBar from "../LoadingBar";
import Button from "../ui/Button";
import RideAcceptanceCard from "../RideAcceptanceCard";
import { Driver, useRideStore } from "@/store/rideStore";
import {
  useRideRequestById,
  useIncreaseFare,
  useAcceptRideRequest,
  useCancelRideRequest,
} from "@/hooks/useRideHooks";
import { useRideSocket } from "@/hooks/useRideSocket";
import { toast } from "sonner";

const FindingRide = () => {
  const { next, rideData } = useRideStore();
  const requestId = rideData.requestId;

  const { handleEvent } = useRideSocket();

  // Socket-driven state
  // const [driversViewing, setDriversViewing] = useState(0);
  // const [currentDriver, setCurrentDriver] = useState<Driver | null>(null); // accepted driver

  const driversViewing = rideData.driversViewing || 0;
  const currentDriver = rideData.driver || null;

  // Poll ride request
  const { data: rideRequest } = useRideRequestById(requestId);

  const increaseFare = useIncreaseFare();
  const cancelRide = useCancelRideRequest();
  

  const [elapsed, setElapsed] = useState(0);

  // Start socket test events when requestId is available
  useEffect(() => {
    if (!requestId) return;

    console.log("FindingRide - requestId ready:", requestId);

    // For testing: simulate drivers viewing
    handleEvent({ type: "DRIVER_VIEWING", count: 3 });

    // Simulate a driver accepting after 5s
    const timer = setTimeout(() => {
      const driver = {
        id: 1,
        name: "Jameel Abdullahi",
        car: "Toyota Corolla",
        rating: 4.8,
        rides: 500,
        eta: "5 min",
        distance: "300m",
        image: "/images/img-1.png",
      };
      handleEvent({ type: "DRIVER_ACCEPTED", driver });
    }, 5000);

    return () => clearTimeout(timer);
  }, [requestId, handleEvent]);

  // Update local state when store updates
  // useEffect(() => {
  //   // Listen to rideData changes for drivers viewing & accepted driver
  //   setDriversViewing(rideData.driversViewing || 0);
  //   setCurrentDriver(rideData.driver || null);

  //   // Auto advance if driver accepted
  //   if (rideData.driver) {
  //     console.log("Driver accepted, moving to next step");
  //     setTimeout(() => next(), 1000);
  //   }
  // }, [rideData, next]);

  useEffect(() => {
  if (currentDriver) {
    console.log("Driver accepted, moving to next step");
    const timer = setTimeout(() => next(), 1000);
    return () => clearTimeout(timer);
  }
}, [currentDriver, next]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => setElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleAddToPrice = () => {
    if (!requestId) return toast.error("No active ride request");

    const newFare = (rideRequest?.estimated_price || 1024) + 5;

    increaseFare.mutate(
      { requestId, fareUpdate: { new_fare: newFare } },
      {
        onSuccess: () => toast.success("Fare increased!"),
        onError: () => toast.error("Failed to increase fare"),
      }
    );
  };

  const handleCancelRideRequest = () => {
    if (!requestId) return toast.error("No active ride request");
    console.log(requestId);

    cancelRide.mutate(
      { requestId, reason: "Customer cancelled" },
      {
        onSuccess: () => {
          toast.success("Ride request cancelled");
          useRideStore.getState().reset();
        },
        onError: () => toast.error("Failed to cancel ride"),
      }
    );
  };

  if (!requestId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold mb-4">No Active Ride Request</h2>
          <p className="text-gray-600 mb-4">Please create a ride request first.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#E6E6EB] w-full max-w-[512px] min-h-[378px] rounded-[25px] px-[20px] py-[25px]">
        <h1 className="text-[16px] md:text-[25px] font-bold mb-[16px]">
          Finding nearby drivers...
          {driversViewing > 0 && <span className="ml-2 text-xs text-green-600">● Live</span>}
        </h1>

        <div className="bg-[#F5F5F7] p-[16px] mb-[24px] rounded-[8px]">
          <p className="text-[14px] text-[#02093A] text-center mb-[16px]">{formatTime(elapsed)}</p>
          <LoadingBar />
          <div className="border-b border-[#E6E6E6] my-[16px]"></div>
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center bg-[#E6E6EB] h-[30px] w-[30px] rounded-full">
              <p className="text-[10px] text-[#8B8EA4] font-normal">-5</p>
            </div>
            <h3 className="text-[18px] md:text-[25px] font-bold">
              CF {rideRequest?.id || "1024"}
            </h3>
            <div className="flex items-center justify-center bg-[#A20602] h-[30px] w-[30px] rounded-full">
              <p className="text-[10px] text-white font-normal">+5</p>
            </div>
          </div>
        </div>

        {/* Drivers viewing */}
        <div className="bg-white h-[48px] rounded-[8px] px-4 py-2 flex items-center justify-between shadow-sm mb-6">
          <h3 className="text-[#02093A] text-[12px]">
            {driversViewing} driver{driversViewing !== 1 ? "s" : ""} are viewing your request...
          </h3>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-6 h-6 relative rounded-full overflow-hidden">
                <Image
                  src={`/images/img-${i}.png`}
                  alt={`driver ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button style="disabled" type="button" css="w-full" fn={handleAddToPrice}>
            Add to price
          </Button>
          <Button style="secondary" type="button" css="w-full text-red-600" fn={handleCancelRideRequest}>
            Cancel Request
          </Button>
        </div>
      </div>

      {/* Accepted driver */}
      {currentDriver && (
        <RideAcceptanceCard
          driverName={currentDriver.name}
          car={currentDriver.car}
          rideCode={`CF ${rideRequest?.id}`}
          eta={currentDriver.eta}
          rides={currentDriver.rides}
          distance={currentDriver.distance}
          rating={currentDriver.rating}
          image={currentDriver.image}
          requestId={requestId}
        />
      )}
    </div>
  );
};

export default FindingRide;