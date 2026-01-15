"use client";

import { useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import Button from "../../ui/Button";
import { useTranslations } from "next-intl";

const BASE_URL = "https://anyride.techenex.online";

const HeroSearchDesktop = () => {
  const t = useTranslations("HomePage.hero");

  // Google Maps loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const [pickup, setPickup] = useState("");
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [pickupAuto, setPickupAuto] = useState<any>(null);

  const [rideType, setRideType] = useState("Bike");
  const [fareData, setFareData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Toast states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastError, setToastError] = useState(false);

  if (!isLoaded) return null;

  const handleCheckAvailability = async () => {
    if (!pickupCoords) {
      setToastMessage("Please select a pickup location from suggestions");
      setToastError(true);
      setFareData(null);
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
    <div className="w-full max-w-174 mx-auto">
      <div className="flex items-center bg-white rounded-full p-2">
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
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder={t("placeholderPickup")}
            className="flex-1 h-14 px-6 outline-none text-sm bg-transparent"
          />
        </Autocomplete>

        <Button
          style="danger"
          type="button"
          css="h-[52px] w-[216px] px-8 rounded-full whitespace-nowrap font-semibold relative left-48"
          fn={handleCheckAvailability}
        >
          {loading ? "Checking..." : t("buttonCheckAvailability")}
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
    </div>
  );
};

export default HeroSearchDesktop;
