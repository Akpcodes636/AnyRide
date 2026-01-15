
// "use client";
// import { FaMotorcycle, FaCar } from "react-icons/fa";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// // import { useTranslations } from "next-intl";
// import { useLocale, useTranslations } from "next-intl";

// import Button from "../ui/Button";
// import SubTitle from "../ui/Subtitle";

// // Ride types & icons
// export const RIDE_TYPES_KEYS: Array<"Motorcycle" | "Car"> = [
//   "Motorcycle",
//   "Car",
// ];

// export const RIDE_TYPES_LOCALIZED: Record<
//   "en" | "fr" | "sw",
//   Record<"Motorcycle" | "Car", string>
// > = {
//   en: { Motorcycle: "Motorcycle", Car: "Car" },
//   fr: { Motorcycle: "Moto", Car: "Voiture" },
//   sw: { Motorcycle: "Pikipiki", Car: "Gari" },
// };

// export const RIDE_ICONS: Record<"Motorcycle" | "Car", React.ReactElement> = {
//   Motorcycle: <FaMotorcycle size={24} color="#A20602" />,
//   Car: <FaCar size={24} color="#A20602" />,
// };

// export default function PricingRider() {
//   const router = useRouter();
//   const t = useTranslations("RiderPage.pricing");

//   // State
//   const [loading, setLoading] = useState(false);
//   const [rideType, setRideType] = useState<"Motorcycle" | "Car">("Motorcycle");

//   // Locale for ride type translation
//   const locale = useLocale() as "en" | "fr" | "sw";

//   const gotoWaitlist = () => {
//     router.push("/waitlist");
//   };

//   return (
//     <section>
//       <div className="container">
//         {/* Header */}
//         <div className="flex flex-col items-center justify-center mb-[58px]">
//           <div className="mb-[24px]">
//             <SubTitle text={t("subtitle")} css="rounded-[40px] font-normal" />
//           </div>

//           <h2>{t("title")}</h2>

//           <p className="max-w-[569px] w-full text-center mx-auto text-[18px] leading-[160%] tracking-[-2%] text-[#333333]">
//             {t("description")}
//           </p>
//         </div>

//         {/* Location Badge */}
//         <div className="mb-6 flex items-center justify-center">
//           <div className="relative inline-flex items-center gap-2 bg-[#FFE5E5] rounded-full px-4 pr-10 py-2">
//             <span className="w-5 h-5">
//               <Image
//                 src="/en/Wave.svg"
//                 alt="icon"
//                 width={20}
//                 height={20}
//                 className="w-full h-full object-contain"
//               />
//             </span>

//             <span className="text-[#A20602] text-sm font-medium">
//               {t("form.location")}
//             </span>

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

//         {/* Form */}
//         <div className="pt-4 bg-white flex items-center justify-center max-w-[745px] mx-auto">
//           <div className="w-full flex flex-col gap-y-5">
//             {/* Pickup */}
//             <div className="space-y-2">
//               <label className="text-[16px] text-[#02093A] font-normal">
//                 {t("form.pickupPlaceholder")}
//               </label>

//               <div className="relative">
//                 <div className="absolute left-4 top-1/2 -translate-y-1/2">
//                   <Image
//                     src="/en/Arrow.svg"
//                     alt="icon"
//                     width={20}
//                     height={20}
//                   />
//                 </div>

//                 <input
//                   type="text"
//                   className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A20602]"
//                 />
//               </div>
//             </div>

//             {/* Destination */}
//             <div className="space-y-2">
//               <label className="text-[16px] text-[#02093A] font-normal">
//                 {t("form.destinationPlaceholder")}
//               </label>

//               <div className="relative">
//                 <div className="absolute left-4 top-1/2 -translate-y-1/2">
//                   <Image
//                     src="/en/Arrow.svg"
//                     alt="icon"
//                     width={20}
//                     height={20}
//                   />
//                 </div>

//                 <input
//                   type="text"
//                   className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A20602]"
//                 />
//               </div>
//             </div>

//             {/* Ride Type */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-[#02093A]">
//                 {t("form.rideTypePlaceholder")}
//               </label>

//               <div className="relative flex items-center">
//                 <div className="absolute left-4 top-1/2 -translate-y-1/2">
//                   {RIDE_ICONS[rideType]}
//                 </div>

//                 <select
//                   value={rideType}
//                   onChange={(e) =>
//                     setRideType(e.target.value as "Motorcycle" | "Car")
//                   }
//                   className="w-full h-14 pl-12 pr-10 bg-[#F5F5F5] rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#A20602]"
//                 >
//                   {RIDE_TYPES_KEYS.map((r) => (
//                     <option key={r} value={r}>
//                       {RIDE_TYPES_LOCALIZED[locale][r]}{" "}
//                       {/* <- localized label */}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex items-center justify-center gap-3 pt-2">
//               <Button type="button" style="danger" css="w-[161px]">
//                 {loading ? t("form.loading") : t("form.cta")}
//               </Button>

//               <Button
//                 type="button"
//                 style="nobg"
//                 css="min-w-[180px]"
//                 fn={gotoWaitlist}
//               >
//                 {t("form.loginInstead")}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import { FaMotorcycle, FaCar } from "react-icons/fa";
// import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import RideETA from "../RideETA";
import Button from "../ui/Button";
import SubTitle from "../ui/Subtitle";
import { useLocale, useTranslations } from "next-intl";

const BASE_URL = "https://anyride.techenex.online";
const RIDE_TYPES = ["Motorcycle", "Car"];
const RIDE_ICONS: Record<string, React.ReactElement> = {
  Motorcycle: <FaMotorcycle size={24} color="#A20602" />,
  Car: <FaCar size={24} color="#A20602" />,
};

export default function PricingForm() {
  const t = useTranslations("RiderPage.pricing");
  const router = useRouter();
  const gotoWaitlist = () => router.push("/waitlist");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [pickupAuto, setPickupAuto] = useState<any>(null);
  const [destinationAuto, setDestinationAuto] = useState<any>(null);
  const [rideType, setRideType] = useState(RIDE_TYPES[0]);
  const [loading, setLoading] = useState(false);
  const [fareData, setFareData] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastError, setToastError] = useState(false);

  if (!isLoaded) return null;

  const handleCheckPrices = async () => {
    setFareData(null);
    setToastMessage(null);

    if (!pickupCoords || !destinationCoords) {
      setToastMessage("Please select pickup and destination from suggestions");
      setToastError(true);
      return setTimeout(() => setToastMessage(null), 4000);
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/public/estimate-fare`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickup_lat: pickupCoords.lat,
          pickup_lon: pickupCoords.lon,
          dropoff_lat: destinationCoords.lat,
          dropoff_lon: destinationCoords.lon,
          vehicle_type: rideType,
        }),
      });
      const json = await res.json();
      if (json.status !== "success") throw new Error(json.message || "API error");

      setFareData(json.data);

      if (json.data.available_drivers === 0) {
        setToastMessage("No rides available in your area");
        setToastError(true);
      } else {
        setToastMessage(`${json.data.available_drivers} rides available in your area`);
        setToastError(false);
      }

      setTimeout(() => setToastMessage(null), 4000);
    } catch (err: any) {
      setToastMessage(err.message || "Something went wrong");
      setToastError(true);
      setFareData(null);
      setTimeout(() => setToastMessage(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="container">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-[58px]">
          <div className="mb-[24px]">
            <SubTitle text={t("subtitle")} css="rounded-[40px] font-normal" />
          </div>
          <h2>{t("title")}</h2>
          <p className="max-w-[569px] w-full text-center mx-auto text-[18px] leading-[160%] tracking-[-2%] text-[#333333]">
            {t("description")}
          </p>
        </div>

        {/* Form */}
        <div className="pt-4 bg-white flex items-center justify-center max-w-[745px] mx-auto">
          <div className="w-full flex flex-col gap-y-5">
            {/* Pickup */}
            <div className="space-y-2">
               <label className="text-[16px] text-[#02093A] font-normal">
                 {t("form.pickupPlaceholder")}
               </label>
               <Autocomplete
              onLoad={(auto) => setPickupAuto(auto)}
              onPlaceChanged={() => {
                if (!pickupAuto) return;
                const place = pickupAuto.getPlace();
                if (!place.geometry) return;
                setPickup(place.formatted_address || "");
                setPickupCoords({ lat: place.geometry.location.lat(), lon: place.geometry.location.lng() });
              }}
            >

               <div className="relative">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2">
                   <img
                     src="/en/Arrow.svg"
                     alt="icon"
                     width={20}
                     height={20}
                   />
                 </div>

                 <input
                  value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                   type="text"
                   className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A20602]"
                 />
               </div>
            </Autocomplete>

             </div>

             {/* Destination */}
             <div className="space-y-2">
               <label className="text-[16px] text-[#02093A] font-normal">
                 {t("form.destinationPlaceholder")}
               </label>
               <Autocomplete
              onLoad={(auto) => setDestinationAuto(auto)}
              onPlaceChanged={() => {
                if (!destinationAuto) return;
                const place = destinationAuto.getPlace();
                if (!place.geometry) return;
                setDestination(place.formatted_address || "");
                setDestinationCoords({ lat: place.geometry.location.lat(), lon: place.geometry.location.lng() });
              }}
            >
               <div className="relative">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2">
                   <img
                     src="/en/Arrow.svg"
                     alt="icon"
                     width={20}
                     height={20}
                   />
                 </div>

                 <input
                 value={destination}
                onChange={(e) => setDestination(e.target.value)}
                   type="text"
                   className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A20602]"
                 />
               </div>

            </Autocomplete>

             </div>

            {/* Ride Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#02093A]"> {t("form.rideTypePlaceholder")}</label>
              <div className="relative flex items-center">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">{RIDE_ICONS[rideType]}</div>
                <select
                  value={rideType}
                  onChange={(e) => setRideType(e.target.value)}
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
              <Button type="button" style="danger" css="w-[161px]" fn={handleCheckPrices}>
                  {loading ? t("form.loading") : t("form.cta")}
              </Button>
              <Button type="button" style="nobg" css="min-w-[180px]" fn={gotoWaitlist}>
                {t("form.loginInstead")}
              </Button>
            </div>

            {/* Toast */}
            {toastMessage && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <div
                  className={`inline-block rounded-[50px] px-6 py-3 shadow-lg animate-slide-up ${
                    toastError ? "bg-[#FDECEC] text-[#FF4D4F]" : "bg-[#E9F9EE] text-[#22C553]"
                  }`}
                >
                  <p className="text-center text-[18px]">{toastMessage}</p>
                </div>
              </div>
            )}

            {/* Fare Result */}
            {fareData && (
              <div className="mt-4 space-y-4">
                {fareData.vehicle_options.map((v: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white rounded-xl px-4 py-2 border-[3px] shadow-sm hover:border-black transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`${BASE_URL}${v.icon_url}`}
                        alt={v.vehicle_type}
                        className="w-[100px] h-[100px] object-contain"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[16px] md:text-[18px] lg:text-[20px]">{v.vehicle_type}</p>
                          <div className="flex items-center">
                            <p className="text-[18px] font-semi-bold">{v.seats}</p>
                          </div>
                        </div>

                        <RideETA estimated_duration_minutes={v.estimated_duration_minutes} />

                        {fareData.is_surge_pricing && i === 0 && (
                          <span className="inline-block mt-1 text-[10px] font-medium text-orange-600 bg-orange-100 px-2 py-[2px] rounded-full">
                            Faster
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="font-bold text-[20px]">{v.formatted_fare}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
