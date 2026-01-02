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

  // Convert address → lat/lon using Google Maps
  const geocodeAddress = async (address: string) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&components=country:ng|country:cd|country:us&key=${
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    }`
  );

  const data = await res.json();
  console.log(data);

 if (data.status === "ZERO_RESULTS") {
  throw new Error("Location must be in Nigeria, Congo, or the US");
}

if (data.status !== "OK") {
  throw new Error("Unable to fetch location");
}


  const location = data.results[0].geometry.location;

  return {
    lat: location.lat,
    lon: location.lng,
  };
};


 const handleCheckAvailability = async () => {
  if (!pickupAddress.trim()) {
    console.error("Pickup location is required");
    return;
  }

  setLoading(true);

  try {
    const pickup = await geocodeAddress(pickupAddress);

    const res = await fetch(
      "https://anyride.techenex.online/api/v1/public/estimate-fare",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickup_lat: pickup.lat,
          pickup_lon: pickup.lon,
          dropoff_lat: pickup.lat,   // temp until dropoff exists
          dropoff_lon: pickup.lon,
        }),
      }
    );

    const data = await res.json();

    if (data.status === "success") {
      setFareData(data.data);
    } else {
      console.error("API Error:", data.message);
    }
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
