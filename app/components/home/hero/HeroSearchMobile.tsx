
"use client";

import { useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import Button from "../../ui/Button";
import { useTranslations } from "next-intl";

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
  const [pickupAuto, setPickupAuto] = useState<any>(null);

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
      // auto-hide toast
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

      // Show success toast
      setToastMessage(`${json.data.available_drivers} rides available in your area`);
      setToastError(false);

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
    <div className="w-full max-w-full mx-auto flex flex-col items-center gap-3">
      {/* Pickup Input */}
      <Autocomplete
        onLoad={(auto) => setPickupAuto(auto)}
        onPlaceChanged={() => {
          if (!pickupAuto) return;
          const place = pickupAuto.getPlace();
          if (!place.geometry) return;

          setPickup(place.formatted_address || "");
          setPickupCoords({
            lat: place.geometry.location.lat(),
            lon: place.geometry.location.lng(),
          });
        }}
      >
        <div className="w-full max-w-[500px] h-14 bg-white rounded-full px-4 flex items-center">
          <input
            type="search"
            placeholder={t("placeholderPickup")}
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full h-full outline-none text-[16px] bg-transparent text-gray-900"
          />
        </div>
      </Autocomplete>

      {/* Check Availability Button */}
      <Button
        style="danger"
        type="button"
        css="w-full max-w-[335px] rounded-full font-semibold text-[16px]"
        fn={handleCheckAvailability}
      >
        {loading ? "Checking..." : t("buttonCheckAvailability")}
      </Button>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 h-[64px] z-50">
          <div
            className={`inline-block rounded-[50px] px-6 py-3 shadow-lg animate-slide-up ${
              toastError ? "bg-[#FDECEC]" : "bg-[#E9F9EE]"
            }`}
          >
            <p
              className={`text-center text-[16px] ${
                toastError ? "text-[#FF4D4F]" : "text-[#22C553]"
              }`}
            >
              {toastMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSearchMobile;
