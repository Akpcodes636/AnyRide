// "use client";
// import { useRouter } from "next/navigation";
// import { FaCar, FaMotorcycle } from "react-icons/fa";
// import Button from "../ui/Button";
// import SubTitle from "../ui/Subtitle";
// import { useState } from "react";

// export default function PricingRider() {

//     const RIDE_TYPES = ["Motorcycle", "Car"];
//     const RIDE_ICONS: Record<string, React.ReactElement> = {
//       Motorcycle: <FaMotorcycle size={24} color="#A20602" />,
//       Car: <FaCar size={24} color="#A20602" />,
//     };

//      const router = useRouter();
//           const gotoWaitlist = () => {
//           router.push("/waitlist");
//         };
//       const [loading, setLoading] = useState(false);
//   return (
//     <section>
//       <div className="container">
//         <div className="flex items-center justify-center flex-col mb-[58px]">
//           <div className="mb-[24px]">
//             <SubTitle text="Pricing & Transparency" css="rounded-[40px] font-normal" />
//           </div>
//           <h2>Clear pricing. No surprises.</h2>
//           <p className="max-w-[569px] w-full text-center mx-auto text-[18px] leading-[160%] tracking-[-2%] text-[#333333]">
//            What you see before you ride is what you pay. No sudden changes, no hidden fees.
//           </p>
//         </div>

//         <div>
//             <div className="pt-4 bg-white flex items-center justify-center max-w-[745px] mx-auto">
//                   <div className="w-full flex flex-col gap-y-5">
//                     {/* Pickup Location */}
//                     <div className="space-y-2">
//                       <label className="text-[16px] text-[#02093A] font-normal">
//                       Enter pickup location
//                       </label>
//                       <select
//                         // value={pickup}
//                         // onChange={(e) => setPickup(e.target.value)}
//                         className="w-full h-14 pl-4 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A20602]"
//                       >
//                         <option value="">{}</option>
//                         {/* {LOCATION_CLUSTERS.map((loc) => (
//                           <option key={loc} value={loc}>
//                             {loc}
//                           </option> */}
                        
//                       </select>
//                     </div>
            
//                     {/* Destination */}
//                     <div className="space-y-2">
//                       <label className="text-[16px] text-[#02093A] font-normal">
//                        Enter destination
//                       </label>
//                       <select
//                         // value={destination}
//                         // onChange={(e) => setDestination(e.target.value)}
//                         className="w-full h-14 pl-4 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A20602]"
//                       >
//                         <option value="">{}</option>
//                         {/* {LOCATION_CLUSTERS.map((loc) => (
//                           <option key={loc} value={loc}>
//                             {loc}
//                           </option> */}
//                         {/* ))} */}
//                       </select>
//                     </div>
            
//                     {/* Ride Type */}
//                     <div className="space-y-2">
//                       <label className="text-sm text- font-medium">
//                         Enter ride type
//                       </label>
//                       <div className="relative flex items-center gap-2">
//                         <div className="absolute left-4 top-1/2 -translate-y-1/2">
//                           {RIDE_ICONS[rideType]}
//                         </div>
//                         <select
//                           value={rideType}
//                           onChange={(e) => setRideType(e.target.value)}
//                           className="w-full h-14 pl-12 pr-10 bg-[#F5F5F5] rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#A20602] transition-all cursor-pointer"
//                         >
//                           {RIDE_TYPES.map((r) => (
//                             <option key={r}>{r}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
            
//                     {/* Buttons */}
//                     <div className="flex items-center justify-center flex-row sm:flex-row gap-3 pt-2">
//                       <Button
//                         type="button"
//                         style="danger"
//                         css="w-[161px] sm:flx-1"
//                         // fn={handleCheckPrices}
//                       >
//                         {loading ? "Checking..." : "Check Prices"}
//                       </Button>
//                       <Button type="button" style="nobg" css="w-[180px] sm:flx-1" fn={gotoWaitlist}>
//                         loginInstead
//                       </Button>
//                     </div>
            
//                     {/* Error
//                     {error && <p className="text-red-600 text-center mt-2">{error}</p>}
            
//                     {/* Fare Result */}
//                     {/* {fareData && (
//                       <div className="flex justify-center mt-4">
//                         <div className="inline-block bg-[#E9F9EE] rounded-[50px] px-6 py-3 text-center">
//                           <p className="text-[#22C553] font-semibold">
//                             {fareData.available_drivers} rides available
//                           </p>
//                           <ul className="mt-2 space-y-1 text-sm text-gray-700">
//                             {fareData.vehicle_options.map((v: any, i: number) => (
//                               <li key={i}>
//                                 {v.vehicle_type}: {v.formatted_fare} ({v.seats} seats) -{" "}
//                                 {v.estimated_duration_minutes} min
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     )}  */}

//                   </div>
//                 </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCar, FaMotorcycle } from "react-icons/fa";
import Image from "next/image";

import Button from "../ui/Button";
import SubTitle from "../ui/Subtitle";

export default function PricingRider() {
  const router = useRouter();

  const gotoWaitlist = () => {
    router.push("/waitlist");
  };

  const [loading, setLoading] = useState(false);
  const [rideType, setRideType] = useState<"Motorcycle" | "Car">("Motorcycle");

  const RIDE_TYPES: Array<"Motorcycle" | "Car"> = ["Motorcycle", "Car"];

  const RIDE_ICONS: Record<"Motorcycle" | "Car", React.ReactElement> = {
    Motorcycle: <FaMotorcycle size={24} color="#A20602" />,
    Car: <FaCar size={24} color="#A20602" />,
  };

  return (
    <section>
      <div className="container">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-[58px]">
          <div className="mb-[24px]">
            <SubTitle
              text="Pricing & Transparency"
              css="rounded-[40px] font-normal"
            />
          </div>

          <h2>Clear pricing. No surprises.</h2>

          <p className="max-w-[569px] w-full text-center mx-auto text-[18px] leading-[160%] tracking-[-2%] text-[#333333]">
            What you see before you ride is what you pay. No sudden changes, no
            hidden fees.
          </p>
        </div>

        {/* Location Badge */}
        <div className="mb-6 flex items-center justify-center">
          <div className="relative inline-flex items-center gap-2 bg-[#FFE5E5] rounded-full px-4 pr-10 py-2">
            <span className="w-5 h-5">
              <Image
                src="/en/Wave.svg"
                alt="icon"
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            </span>

            <span className="text-[#A20602] text-sm font-medium">
              Congo, Congo
            </span>

            {/* Dropdown Arrow */}
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="#666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="pt-4 bg-white flex items-center justify-center max-w-[745px] mx-auto">
          <div className="w-full flex flex-col gap-y-5">
            {/* Pickup */}
            <div className="space-y-2">
              <label className="text-[16px] text-[#02093A] font-normal">
                Enter pickup location
              </label>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Image
                    src="/en/Arrow.svg"
                    alt="icon"
                    width={20}
                    height={20}
                  />
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A20602]"
                />
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label className="text-[16px] text-[#02093A] font-normal">
                Enter destination
              </label>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Image
                    src="/en/Arrow.svg"
                    alt="icon"
                    width={20}
                    height={20}
                  />
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A20602]"
                />
              </div>
            </div>

            {/* Ride Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#02093A]">
                Enter ride type
              </label>

              <div className="relative flex items-center">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  {RIDE_ICONS[rideType]}
                </div>

                <select
                  value={rideType}
                  onChange={(e) =>
                    setRideType(e.target.value as "Motorcycle" | "Car")
                  }
                  className="w-full h-14 pl-12 pr-10 bg-[#F5F5F5] rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#A20602]"
                >
                  {RIDE_TYPES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button type="button" style="danger" css="w-[161px]">
                {loading ? "Checking..." : "Check Prices"}
              </Button>

              <Button
                type="button"
                style="nobg"
                css="w-[180px]"
                fn={gotoWaitlist}
              >
                Login instead
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

