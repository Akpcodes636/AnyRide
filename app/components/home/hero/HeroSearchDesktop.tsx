// "use client";

// import Button from "../../ui/Button";
// import { useTranslations } from "next-intl";

// const HeroSearchDesktop = () => {
//   // const t = useTranslations("HomePage.hero"); // load the hero namespace
//   const t = useTranslations("HomePage.hero");

//   return (
//     <div className="w-full max-w-174 mx-auto">
//       <div className="flex items-center bg-white rounded-full p-2">
//         {/* Input */}
//         <input
//           type="search"
//           placeholder={t("placeholderPickup")}
//           className="
//             flex-1 h-14
//             px-6
//             outline-none
//             text-sm
//             bg-transparent
//           "
//         />

//         {/* CTA */}
//         <Button
//           style="danger"
//           type="button"
//           css="h-[56px] w-[216px] px-8 rounded-full whitespace-nowrap font-semibold"
//         >
//           {t("buttonCheckAvailability")}
//         </Button>
//       </div>

//       {/* Info text */}
//       <div className="flex justify-center mt-4">
//         <div className="inline-block bg-[#E9F9EE] rounded-[50px] px-6 py-3">
//           <p className="text-center text-[18px] text-[#22C553]">
//             {t("desktopInfo")}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSearchDesktop;

"use client";

import { useState } from "react";
import Button from "../../ui/Button";
import { useTranslations } from "next-intl";

const HeroSearchDesktop = () => {
  const t = useTranslations("HomePage.hero");

  // Address input
  const [pickup, setPickup] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");


  // API state
  const [fareData, setFareData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Static location data for testing (OpenStreetMap coordinates)
  const staticLocations: { [key: string]: { lat: number; lon: number; drivers: number } } = {
    "lagos": { lat: 6.5244, lon: 3.3792, drivers: 15 },
    "lagos nigeria": { lat: 6.5244, lon: 3.3792, drivers: 15 },
    "abuja": { lat: 9.0765, lon: 7.3986, drivers: 12 },
    "abuja nigeria": { lat: 9.0765, lon: 7.3986, drivers: 12 },
    "kano": { lat: 11.9504, lon: 8.5116, drivers: 8 },
    "kano nigeria": { lat: 11.9504, lon: 8.5116, drivers: 8 },
    "ibadan": { lat: 7.3775, lon: 3.9470, drivers: 10 },
    "ibadan nigeria": { lat: 7.3775, lon: 3.9470, drivers: 10 },
    "port harcourt": { lat: 4.8156, lon: 7.0498, drivers: 7 },
    "port harcourt nigeria": { lat: 4.8156, lon: 7.0498, drivers: 7 },
    "kinshasa": { lat: -4.4419, lon: 15.2663, drivers: 5 },
    "kinshasa congo": { lat: -4.4419, lon: 15.2663, drivers: 5 },
    "new york": { lat: 40.7128, lon: -74.0060, drivers: 25 },
    "new york us": { lat: 40.7128, lon: -74.0060, drivers: 25 },
    "los angeles": { lat: 34.0522, lon: -118.2437, drivers: 20 },
    "los angeles us": { lat: 34.0522, lon: -118.2437, drivers: 20 },
    "chicago": { lat: 41.8781, lon: -87.6298, drivers: 18 },
    "chicago us": { lat: 41.8781, lon: -87.6298, drivers: 18 },
  };

  // Convert address → lat/lon using static data (no API calls)
  const geocodeAddress = async (address: string) => {
    console.log("=== STATIC GEOCODING ===");
    console.log("Search address:", address);
    
    const normalizedAddress = address.toLowerCase().trim();
    
    // Find matching location
    const location = staticLocations[normalizedAddress];
    
    if (location) {
      console.log("Found location:", location);
      return {
        lat: location.lat,
        lon: location.lon,
        drivers: location.drivers // Include driver count
      };
    }
    
    // Try partial matches
    for (const [key, value] of Object.entries(staticLocations)) {
      if (normalizedAddress.includes(key) || key.includes(normalizedAddress)) {
        console.log("Found partial match:", key, value);
        return {
          lat: value.lat,
          lon: value.lon,
          drivers: value.drivers
        };
      }
    }
    
    console.error("Location not found. Try: Lagos, Abuja, Kano, Port Harcourt, Kinshasa, New York, Los Angeles, Chicago");
    throw new Error("Location not found. Try: Lagos, Abuja, Kano, Port Harcourt, Kinshasa, New York, Los Angeles, Chicago");
  };


 const handleCheckAvailability = async () => {
  if (!pickupAddress.trim()) {
    console.error("Pickup location is required");
    return;
  }

  setLoading(true);

  try {
    const location = await geocodeAddress(pickupAddress);

    // Use static driver count from location data
    setFareData({
      available_drivers: location.drivers,
      location: pickupAddress
    });

    console.log(`Found ${location.drivers} drivers in ${pickupAddress}`);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-full max-w-174 mx-auto">
      <div className="flex items-center bg-white rounded-full p-2">
        <input
  type="search"
  value={pickupAddress}
  onChange={(e) => setPickupAddress(e.target.value)}
  placeholder={t("placeholderPickup")}
  className="flex-1 h-14 px-6 outline-none text-sm bg-transparent"
/>


        <Button
          style="danger"
          type="button"
          css="h-[56px] w-[216px] px-8 rounded-full whitespace-nowrap font-semibold"
          fn={handleCheckAvailability}
        >
          {loading ? "Checking..." : t("buttonCheckAvailability")}
        </Button>
      </div>

      {/* Info text */}
      <div className="flex justify-center mt-4">
        <div className="inline-block bg-[#E9F9EE] rounded-[50px] px-6 py-3">
          <p className="text-center text-[18px] text-[#22C553]">
            {fareData
              ? `${fareData.available_drivers} Rides available in your area`
              : t("desktopInfo")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSearchDesktop;
