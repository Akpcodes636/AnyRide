"use client";

import { useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import Button from "../../ui/Button";
import { useTranslations } from "next-intl";
import LocationSearchInput from "../../ui/LocationSearchInput";

const BASE_URL = "https://anyride.techenex.online";

const rideTypes = ["Motorcycle", "Car"];

const HeroSearchMobile = () => {
  const t = useTranslations("HomePage.hero");

  // Google Maps API loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const [pickup, setPickup] = useState("");
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lon: number } | null>(null);

  const [rideType, setRideType] = useState(rideTypes[0]);
  const [fareData, setFareData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastError, setToastError] = useState(false);

  if (!isLoaded) return null;

  const handleCheckAvailability = async () => {
    if (!pickupCoords) {
      setToastMessage("Please select a pickup location from suggestions");
      setToastError(true);
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    setLoading(true);
    setToastMessage(null);

    try {
      const res = await fetch(`${BASE_URL}/api/v1/public/estimate-fare`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickup_lat: pickupCoords.lat,
          pickup_lon: pickupCoords.lon,
          dropoff_lat: pickupCoords.lat, // dummy
          dropoff_lon: pickupCoords.lon,
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
    <div className="w-full max-w-full mx-auto flex flex-col items-center gap-3 px-4 pb-6">
      
       {/* Pickup Input Container */}
       <div className="w-full max-w-[500px] h-14 bg-white rounded-full px-5 flex items-center shadow-md border border-gray-100 relative">
          {/* Location Icon */}
          <svg
            className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <LocationSearchInput
             value={pickup}
             onChange={setPickup}
             onSelect={(address, lat, lng) => {
               setPickup(address);
               setPickupCoords({ lat, lon: lng });
             }}
             placeholder={t("placeholderPickup")}
             className="flex-1"
          />
           <style jsx global>{`
              .w-full.max-w-\[500px\] input {
                  height: 100% !important;
                  padding-left: 2rem !important; /* Adjust for icon */
                  background: transparent !important;
              }
           `}</style>
       </div>

      {/* Check Availability Button */}
      <Button
        style="danger"
        type="button"
        css="w-full max-w-[240px] !h-[44px] rounded-full font-semibold !text-[13px] shadow-md hover:shadow-lg transition-shadow duration-200 mb-8"
        fn={handleCheckAvailability}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Checking...
          </span>
        ) : (
          t("buttonCheckAvailability")
        )}
      </Button>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slide-up  w-full max-w-[350px]">
          <div
            className={`inline-flex items-center gap-3 rounded-full py-4 py-3 shadow-xl backdrop-blur-sm ${toastError
              ? "bg-red-50 text-red-600 border border-red-200"
              : "bg-green-50 text-green-600 border border-green-200"
              }`}
          >
            {/* Icon */}
            {toastError ? (
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <p className="text-[15px] font-medium">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSearchMobile;