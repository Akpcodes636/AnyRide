// "use client";

// import Button from "../../ui/Button";
// import { useTranslations } from "next-intl";

// const HeroSearchMobile = () => {
//   const t = useTranslations("HomePage.hero"); // load the hero namespace

//   return (
//     <div className="w-full max-w-83.75 mx-auto flex flex-col items-center gap-3 px-4">
//       {/* Input */}
//       <div className="w-full h-15.5 bg-white rounded-full px-4 flex items-center">
//         <input
//           type="search"
//           placeholder={t("placeholderPickup")}
//           className="w-full h-full outline-none text-[16px] bg-transparent text-gray-300"
//         />
//       </div>

//       {/* Primary CTA */}
//       <Button
//         style="danger"
//         type="button"
//         css="w-full h-[52px] rounded-full font-semibold text-[16px] tracking-[-2%]"
//       >
//         {t("buttonCheckAvailability")}
//       </Button>

//       {/* Secondary info pill */}
//       <div className="w-64.5 px-6 h-15.25 rounded-full bg-[#FFECEC] flex items-center justify-center">
//         <span className="text-xs font-medium text-[#FF4D4F]">
//           {t("mobileInfo")}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default HeroSearchMobile;


"use client";

import { useState } from "react";
import Button from "../../ui/Button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const rideTypes = ["Motorcycle", "Car"];

const staticLocations: { [key: string]: { lat: number; lon: number; drivers: number } } = {
  "lagos": { lat: 6.5244, lon: 3.3792, drivers: 15 },
  "abuja": { lat: 9.0765, lon: 7.3986, drivers: 12 },
  "kano": { lat: 11.9504, lon: 8.5116, drivers: 8 },
  "ibadan": { lat: 7.3775, lon: 3.9470, drivers: 10 },
  "port harcourt": { lat: 4.8156, lon: 7.0498, drivers: 7 },
  "kinshasa": { lat: -4.4419, lon: 15.2663, drivers: 5 },
  "lubumbashi": { lat: -11.6870, lon: 27.4770, drivers: 3 },
  "new york": { lat: 40.7128, lon: -74.0060, drivers: 25 },
  "los angeles": { lat: 34.0522, lon: -118.2437, drivers: 20 },
  "chicago": { lat: 41.8781, lon: -87.6298, drivers: 18 },
  "houston": { lat: 29.7604, lon: -95.3698, drivers: 12 },
};

const geocodeAddress = async (address: string) => {
  const normalized = address.toLowerCase().trim();
  const location = staticLocations[normalized];
  if (location) return location;

  for (const [key, value] of Object.entries(staticLocations)) {
    if (normalized.includes(key) || key.includes(normalized)) return value;
  }

  throw new Error(
    "Location not supported. Try Lagos, Abuja, Kano, Port Harcourt, Kinshasa, Lubumbashi, New York, Los Angeles, Chicago, Houston."
  );
};

const HeroSearchMobile = () => {
  const t = useTranslations("HomePage.hero");
  const [pickupAddress, setPickupAddress] = useState("");
  const [rideType, setRideType] = useState(rideTypes[0]);
  const [loading, setLoading] = useState(false);
  const [fareData, setFareData] = useState<any>(null);

  const handleCheckAvailability = async () => {
    if (!pickupAddress.trim()) {
      toast.error("Please enter a pickup location!");
      return;
    }

    setLoading(true);
    try {
      const location = await geocodeAddress(pickupAddress);
      setFareData({ available_drivers: location.drivers, location: pickupAddress });
    } catch (err: any) {
      toast.error(err.message); // ← Sonner popup
      setFareData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[335px] mx-auto flex flex-col itms-center gap-3">
      {/* Pickup Input */}
      <div className="w-full h-14 bg-white rounded-full px-4 flex items-center">
        <input
          type="search"
          placeholder={t("placeholderPickup")}
          value={pickupAddress}
          onChange={(e) => setPickupAddress(e.target.value)}
          className="w-full h-full outline-none text-[16px] bg-transparent text-gray-900"
        />
      </div>

      {/* Ride Type Selector */}
      <select
        value={rideType}
        onChange={(e) => setRideType(e.target.value)}
        className="w-full h-14 rounded-full px-4 bg-[#F5F5F5] text-gray-900 text-sm focus:outline-none"
      >
        {rideTypes.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      {/* Check Availability Button */}
      <Button
        style="danger"
        type="button"
        css="w-full  rounded-full font-semibold text-[16px]"
        fn={handleCheckAvailability} // use onClick
      >
        {loading ? "Checking..." : t("buttonCheckAvailability")}
      </Button>

      {/* Info Pill */}
      <div className="px-6 py-3 rounded-full bg-[#FFECEC] flex items-center justify-center">
        <span className="text-xs font-medium text-[#FF4D4F]">
          {fareData
            ? `${fareData.available_drivers} rides available in ${fareData.location}`
            : t("mobileInfo")}
        </span>
      </div>
    </div>
  );
};

export default HeroSearchMobile;
