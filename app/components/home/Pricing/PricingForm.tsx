// Hello This one works
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import Button from "../../ui/Button";
// import { useTranslations } from "next-intl";
// import { useLoadScript } from "@react-google-maps/api";

// /* ------------------ TYPES ------------------ */
// type LocationValue = {
//   label: string;
//   lat: number;
//   lon: number;
// };

// /* ------------------ CONSTANTS ------------------ */
// const RIDE_TYPES = ["Bike", "Car"];
// const libraries: ("places")[] = ["places"];

// /* ------------------ AUTOCOMPLETE INPUT ------------------ */
// function LocationInput({
//   placeholder,
//   onSelect,
//   isLoaded,
// }: {
//   placeholder: string;
//   onSelect: (value: LocationValue) => void;
//   isLoaded: boolean;
// }) {
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (!isLoaded || !window.google || !inputRef.current) {
//       console.log("Not ready:", { isLoaded, google: !!window.google, input: !!inputRef.current });
//       return;
//     }

//     console.log("✅ Google Maps loaded, initializing autocomplete");

//     const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
//       types: ["geocode"],
//       componentRestrictions: { country: ["ng"] }, // lowercase
//     });

//     const listener = autocomplete.addListener("place_changed", () => {
//       const place = autocomplete.getPlace();
//       console.log("Place selected:", place);

//       if (!place.geometry?.location) {
//         console.warn("No geometry found");
//         return;
//       }

//       const selected = {
//         label: place.formatted_address || "",
//         lat: place.geometry.location.lat(),
//         lon: place.geometry.location.lng(),
//       };

//       console.log("Selected location:", selected);
//       onSelect(selected);
//     });

//     return () => {
//       google.maps.event.removeListener(listener);
//     };
//   }, [isLoaded, onSelect]);

//   return (
//     <input
//       ref={inputRef}
//       placeholder={placeholder}
//       disabled={!isLoaded}
//       className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A20602] disabled:opacity-50"
//     />
//   );
// }

// /* ------------------ MAIN COMPONENT ------------------ */
// export default function PricingForm() {
//   const t = useTranslations("HomePage.pricing.form");

//   // Load Google Maps API
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
//     libraries,
//   });

//   const [pickup, setPickup] = useState<LocationValue | null>(null);
//   const [destination, setDestination] = useState<LocationValue | null>(null);
//   const [rideType, setRideType] = useState(RIDE_TYPES[0]);
//   const [loading, setLoading] = useState(false);
//   const [fareData, setFareData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleCheckPrices = async () => {
//     setError(null);
//     setFareData(null);

//     console.log("Checking prices with:", { pickup, destination });

//     if (!pickup || !destination) {
//       setError("Please select pickup and destination locations");
//       return;
//     }

//     if (pickup.lat === destination.lat && pickup.lon === destination.lon) {
//       setError("Pickup and destination cannot be the same");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(
//         "https://anyride.techenex.online/api/v1/public/estimate-fare",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             pickup_lat: pickup.lat,
//             pickup_lon: pickup.lon,
//             dropoff_lat: destination.lat,
//             dropoff_lon: destination.lon,
//             vehicle_type: rideType,
//           }),
//         }
//       );

//       const response = await res.json();
//       console.log("API Response:", response);

//       if (response.status !== "success") {
//         throw new Error(response.message || "API error");
//       }

//       setFareData(response.data);
//     } catch (err: any) {
//       console.error("Error:", err);
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loadError) {
//     return <div className="text-red-600">Error loading maps</div>;
//   }

//   return (
//     <div className="pt-4 bg-white flex items-center justify-center">
//       <div className="w-full flex flex-col gap-y-5">
//         {!isLoaded && (
//           <p className="text-gray-500 text-center">Loading maps...</p>
//         )}

//         {/* Pickup */}
//         <div className="space-y-2">
//           <label className="text-sm text-gray-700 font-medium">
//             {t("pickupLabel")}
//           </label>
//           <div className="relative">
//             <div className="absolute left-4 top-1/2 -translate-y-1/2">
//               <Image src="/en/Arrow.svg" alt="icon" width={20} height={20} />
//             </div>
//             <LocationInput
//               placeholder={t("pickupPlaceholder")}
//               onSelect={(val) => {
//                 console.log("Pickup selected:", val);
//                 setPickup(val);
//               }}
//               isLoaded={isLoaded}
//             />
//           </div>
//           {pickup && (
//             <p className="text-xs text-green-600">✓ {pickup.label}</p>
//           )}
//         </div>

//         {/* Destination */}
//         <div className="space-y-2">
//           <label className="text-sm text-gray-700 font-medium">
//             {t("destinationLabel")}
//           </label>
//           <div className="relative">
//             <div className="absolute left-4 top-1/2 -translate-y-1/2">
//               <Image src="/en/Arrow.svg" alt="icon" width={20} height={20} />
//             </div>
//             <LocationInput
//               placeholder={t("destinationPlaceholder")}
//               onSelect={(val) => {
//                 console.log("Destination selected:", val);
//                 setDestination(val);
//               }}
//               isLoaded={isLoaded}
//             />
//           </div>
//           {destination && (
//             <p className="text-xs text-green-600">✓ {destination.label}</p>
//           )}
//         </div>

//         {/* Ride Type */}
//         <div className="space-y-2">
//           <label className="text-sm text-gray-700 font-medium">
//             {t("rideTypeLabel")}
//           </label>
//           <div className="relative">
//             <div className="absolute left-4 top-1/2 -translate-y-1/2">
//               <Image src="/en/Tram.svg" alt="icon" width={20} height={20} />
//             </div>
//             <select
//               value={rideType}
//               onChange={(e) => setRideType(e.target.value)}
//               className="w-full h-14 pl-12 pr-10 bg-[#F5F5F5] rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#A20602]"
//             >
//               {RIDE_TYPES.map((r) => (
//                 <option key={r}>{r}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-3 pt-2">
//           <Button
//             type="button"
//             style="danger"
//             css="w-[161px]"
//             fn={handleCheckPrices}
//           >
//             {loading ? "Checking..." : t("checkPrices")}
//           </Button>
//           <Button type="button" style="nobg" css="w-[180px]">
//             {t("loginInstead")}
//           </Button>
//         </div>

//         {/* Error */}
//         {error && <p className="text-red-600 text-center">{error}</p>}

//         {/* Fare Result */}
//         {fareData && (
//           <div className="flex justify-center mt-4">
//             <div className="bg-[#E9F9EE] rounded-[50px] px-6 py-3 text-center">
//               <p className="text-[#22C553] font-semibold">
//                 {fareData.available_drivers} rides available
//               </p>
//               <ul className="mt-2 text-sm text-gray-700">
//                 {fareData.vehicle_options.map((v: any, i: number) => (
//                   <li key={i}>
//                     {v.vehicle_type}: {v.formatted_fare} ({v.seats} seats) –{" "}
//                     {v.estimated_duration_minutes} min
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { FaMotorcycle, FaCar } from "react-icons/fa";
import Button from "../../ui/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

/* ------------------ LOCATION DATA ------------------ */
const LOCATION_CLUSTERS = [
  "Kinshasa, Congo",
  "Kintambo, Congo",
  "Bandalungwa, Congo",
  "New York, USA",
  "Brooklyn, USA",
  "Queens, USA",
];

const LOCATION_COORDS: Record<string, { lat: number; lon: number }> = {
  "Kinshasa, Congo": { lat: -4.4419, lon: 15.2663 },
  "Kintambo, Congo": { lat: -4.3161, lon: 15.2661 },
  "Bandalungwa, Congo": { lat: -4.3270, lon: 15.2600 },
  "New York, USA": { lat: 40.7128, lon: -74.006 },
  "Brooklyn, USA": { lat: 40.6782, lon: -73.9442 },
  "Queens, USA": { lat: 40.7282, lon: -73.7949 },
};

const RIDE_TYPES = ["Motorcycle", "Car"];
const RIDE_ICONS: Record<string, React.ReactElement> = {
  Motorcycle: <FaMotorcycle size={24} color="#A20602" />,
  Car: <FaCar size={24} color="#A20602" />,
};

export default function PricingForm() {
  const t = useTranslations("HomePage.pricing.form");
    const router = useRouter();
      const gotoWaitlist = () => {
      router.push("/waitlist");
    };

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
      <div className="w-full flex flex-col gap-y-5">
        {/* Pickup Location */}
        <div className="space-y-2">
          <label className="text-sm text-gray-700 font-medium">
            {t("pickupLabel")}
          </label>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full h-14 pl-4 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A20602]"
          >
            <option value="">{t("pickupPlaceholder")}</option>
            {LOCATION_CLUSTERS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <label className="text-sm text-gray-700 font-medium">
            {t("destinationLabel")}
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full h-14 pl-4 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A20602]"
          >
            <option value="">{t("destinationPlaceholder")}</option>
            {LOCATION_CLUSTERS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Ride Type */}
        <div className="space-y-2">
          <label className="text-sm text-gray-700 font-medium">
            {t("rideTypeLabel")}
          </label>
          <div className="relative flex items-center gap-2">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              {RIDE_ICONS[rideType]}
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
          <Button type="button" style="nobg" css="w-[180px] sm:flx-1" fn={gotoWaitlist}>
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
