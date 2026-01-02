// "use client";
// import Image from "next/image";
// import Button from "../../ui/Button";
// import { useTranslations } from "next-intl";

// const PricingForm = () => {
//   const t = useTranslations("HomePage.pricing.form");

//   // Get options array
//   const options = t.raw("options") as string[];

//   return (
//     <div className="pt-4 bg-white flex items-center justify-center">
//       <div className="w-full">
//         {/* Location Badge */}
//         <div className="mb-6">
//           <div className="relative inline-flex items-center gap-2 bg-[#FFE5E5] rounded-full px-4 pr-10 py-2">
//             <span className="w-5 h-5">
//               <Image
//                 src="/en/Wave.svg"
//                 className="w-full h-full object-contain"
//                 alt="icon"
//                 width={20}
//                 height={20}
//               />
//             </span>

//             <span className="text-[#A20602] text-sm font-medium">
//               {t("locationBadge")}
//             </span>

//             {/* Dropdown Arrow */}
//             <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M5 7.5L10 12.5L15 7.5"
//                   stroke="#666"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </span>
//           </div>
//         </div>

//         {/* Form Container */}
//         <div className="bg-white rounded-2xl -6 space-y-6">
//           {/* Pickup Location */}
//           <div className="space-y-2">
//             <label className="text-sm text-gray-700 font-medium">
//               {t("pickupLabel")}
//             </label>
//             <div className="relative">
//               <div className="absolute left-4 top-1/2 -translate-y-1/2">
//                 <span>
//                   <Image
//                     src="/en/Arrow.svg"
//                     className="w-full h-full object-cover"
//                     alt="icon"
//                     width={500}
//                     height={500}
//                   />
//                 </span>
//               </div>
//               <input
//                 type="text"
//                 // value={pickupLocation}
//                 // onChange={(e) => setPickupLocation(e.target.value)}
//                 placeholder={t("pickupPlaceholder")}
//                 className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A20602] transition-all"
//               />
//             </div>
//           </div>

//           {/* Destination */}
//           <div className="space-y-2">
//             <label className="text-sm text-gray-700 font-medium">
//               {t("destinationLabel")}
//             </label>
//             <div className="relative">
//               <div className="absolute left-4 top-1/2 -translate-y-1/2">
//                 <span>
//                   <Image
//                     src="/en/Arrow.svg"
//                     className="w-full h-full object-cover"
//                     alt="icon"
//                     width={500}
//                     height={500}
//                   />
//                 </span>
//               </div>
//               <input
//                 type="text"
//                 // value={destination}
//                 // onChange={(e) => setDestination(e.target.value)}
//                 placeholder={t("destinationPlaceholder")}
//                 className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A20602] transition-all"
//               />
//             </div>
//           </div>

//           {/* Ride Type */}
//           <div className="space-y-2">
//             <label className="text-sm text-gray-700 font-medium">
//               {t("rideTypeLabel")}
//             </label>
//             <div className="relative">
//               <div className="absolute left-4 top-1/2 -translate-y-1/2">
//                 <span>
//                   <Image
//                     src="/en/Tram.svg"
//                     className="w-full h-full object-cover"
//                     alt="icon"
//                     width={500}
//                     height={500}
//                   />
//                 </span>
//               </div>
//               <select
//                 // value={rideType}
//                 // onChange={(e) => setRideType(e.target.value)}
//                 className="w-full h-14 pl-12 pr-10 bg-[#F5F5F5] rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#A20602] transition-all cursor-pointer"
//               >
//                 {options.map((option, index) => (
//                   <option key={index}>{option}</option>
//                 ))}
//               </select>
//               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 20 20"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M5 7.5L10 12.5L15 7.5"
//                     stroke="#666"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex items-center  flex-row sm:flex-row gap-3 pt-2">
//             <Button
//               type="button"
//               style="danger"
//               //   fn={handleCheckPrices}
//               css="w-[161px] sm:flx-1"
//             >
//               {t("checkPrices")}
//             </Button>
//             <Button
//               type="button"
//               style="nobg"
//               //   fn={handleLoginInstead}
//               css="w-[180px] sm:flx-1"
//             >
//               {t("loginInstead")}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PricingForm;
"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../../ui/Button";
import { useTranslations } from "next-intl";

/* ------------------ LOCATION DATA ------------------ */
const LOCATION_CLUSTERS = [
  "Lagos, Nigeria",
  "Ikorodu, Nigeria",
  "Epe, Nigeria",
  "Abuja, Nigeria",
  "Gwagwalada, Nigeria",
  "Kubwa, Nigeria",
  "Kinshasa, Congo",
  "Kintambo, Congo",
  "Bandalungwa, Congo",
  "New York, USA",
  "Brooklyn, USA",
  "Queens, USA",
];

const LOCATION_COORDS: Record<string, { lat: number; lon: number }> = {
  "Lagos, Nigeria": { lat: 6.5244, lon: 3.3792 },
  "Ikorodu, Nigeria": { lat: 6.6095, lon: 3.5029 },
  "Epe, Nigeria": { lat: 6.6353, lon: 3.9540 },
  "Abuja, Nigeria": { lat: 9.0765, lon: 7.3986 },
  "Gwagwalada, Nigeria": { lat: 8.9366, lon: 7.0895 },
  "Kubwa, Nigeria": { lat: 9.0032, lon: 7.4791 },
  "Kinshasa, Congo": { lat: -4.4419, lon: 15.2663 },
  "Kintambo, Congo": { lat: -4.3161, lon: 15.2661 },
  "Bandalungwa, Congo": { lat: -4.3270, lon: 15.2600 },
  "New York, USA": { lat: 40.7128, lon: -74.006 },
  "Brooklyn, USA": { lat: 40.6782, lon: -73.9442 },
  "Queens, USA": { lat: 40.7282, lon: -73.7949 },
};

const RIDE_TYPES = ["Bike", "Motorcycle", "Car"];

export default function PricingForm() {
  const t = useTranslations("HomePage.pricing.form");

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] = useState(RIDE_TYPES[0]);
  const [loading, setLoading] = useState(false);
  const [fareData, setFareData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckPrices = async () => {
    setError(null);
    setFareData(null);

    if (!pickup || !destination) {
      setError("Please select pickup and destination");
      return;
    }
    if (pickup === destination) {
      setError("Pickup and destination cannot be the same");
      return;
    }

    const pickupCoords = LOCATION_COORDS[pickup];
    const destinationCoords = LOCATION_COORDS[destination];

    if (!pickupCoords || !destinationCoords) {
      setError("Selected location is not supported");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://anyride.techenex.online/api/v1/public/estimate-fare",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pickup_lat: pickupCoords.lat,
            pickup_lon: pickupCoords.lon,
            dropoff_lat: destinationCoords.lat,
            dropoff_lon: destinationCoords.lon,
            vehicle_type: rideType,
          }),
        }
      );

      const json = await res.json();

      if (json.status !== "success") {
        throw new Error(json.message || "API error");
      }

      setFareData(json.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-4 bg-white flex items-center justify-center">
      <div className="w-full flex  flex-col gap-y-5">
        {/* Pickup Location */}
        <div className="space-y-2">
          <label className="text-sm text-gray-700 font-medium">
            {t("pickupLabel")}
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Image
                src="/en/Arrow.svg"
                className="w-full h-full object-cover"
                alt="icon"
                width={500}
                height={500}
              />
            </div>
            <select
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A20602]"
            >
              <option value="">{t("pickupPlaceholder")}</option>
              {LOCATION_CLUSTERS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <label className="text-sm text-gray-700 font-medium">
            {t("destinationLabel")}
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Image
                src="/en/Arrow.svg"
                className="w-full h-full object-cover"
                alt="icon"
                width={500}
                height={500}
              />
            </div>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A20602]"
            >
              <option value="">{t("destinationPlaceholder")}</option>
              {LOCATION_CLUSTERS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ride Type */}
        <div className="space-y-2">
          <label className="text-sm text-gray-700 font-medium">
            {t("rideTypeLabel")}
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Image
                src="/en/Tram.svg"
                className="w-full h-full object-cover"
                alt="icon"
                width={500}
                height={500}
              />
            </div>
            <select
              value={rideType}
              onChange={(e) => setRideType(e.target.value)}
              className="w-full h-14 pl-12 pr-10 bg-[#F5F5F5] rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#A20602] transition-all cursor-pointer"
            >
              {RIDE_TYPES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center flex-row sm:flex-row gap-3 pt-2">
          <Button
            type="button"
            style="danger"
            css="w-[161px] sm:flx-1"
            fn={handleCheckPrices}
          >
            {loading ? "Checking..." : t("checkPrices")}
          </Button>
          <Button type="button" style="nobg" css="w-[180px] sm:flx-1">
            {t("loginInstead")}
          </Button>
        </div>

        {/* Error */}
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}

        {/* Fare Result */}
        {fareData && (
          <div className="flex justify-center mt-4">
            <div className="inline-block bg-[#E9F9EE] rounded-[50px] px-6 py-3 text-center">
              <p className="text-[#22C553] font-semibold">
                {fareData.available_drivers} rides available
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                {fareData.vehicle_options.map((v: any, i: number) => (
                  <li key={i}>
                    {v.vehicle_type}: {v.formatted_fare} ({v.seats} seats) -{" "}
                    {v.estimated_duration_minutes} min
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
