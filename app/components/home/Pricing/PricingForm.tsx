"use client";

import { useState } from "react";
import { FaMotorcycle, FaCar } from "react-icons/fa";
import Button from "../../ui/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import RideETA from "../../RideETA";

/* ------------------ CONSTANTS ------------------ */
const RIDE_TYPES = [
  {
    value: "Motorcycle",
    icon: <FaMotorcycle size={24} color="#A20602" />,
  },
  {
    value: "Car",
    icon: <FaCar size={24} color="#A20602" />,
  },
];

export default function PricingForm() {
  const t = useTranslations("HomePage.pricing.form");
  const router = useRouter();

  const gotoWaitlist = () => router.push("/waitlist");

  /* ------------------ GOOGLE MAPS LOADER ------------------ */
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  /* ------------------ STATE ------------------ */
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lon: number } | null>(null);

  const [pickupAuto, setPickupAuto] = useState<any>(null);
  const [destinationAuto, setDestinationAuto] = useState<any>(null);

  const [rideType, setRideType] = useState<string>("Motorcycle");
  const [loading, setLoading] = useState(false);
  const [fareData, setFareData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isLoaded) return null;

  /* ------------------ PRICE CHECK ------------------ */
  const handleCheckPrices = async () => {
    setError(null);
    setFareData(null);

    if (!pickupCoords || !destinationCoords) {
      setError(t("errors.missingLocations"));
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
        throw new Error(json.message || t("errors.generic"));
      }

      setFareData(json.data);
    } catch (err: any) {
      setError(err.message || t("errors.generic"));
    } finally {
      setLoading(false);
    }
  };

  const BASE_URL = "https://anyride.techenex.online";

  return (
    <div className="pt-4 bg-white flex items-center justify-center">
      <div className="w-full flex flex-col gap-y-5">

        {/* Pickup */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {t("pickupLabel")}
          </label>

          <Autocomplete
            onLoad={setPickupAuto}
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
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder={t("pickupPlaceholder")}
              className="w-full h-14 px-4 bg-[#F5F5F5] rounded-lg focus:ring-2 focus:ring-[#A20602]"
            />
          </Autocomplete>
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {t("destinationLabel")}
          </label>

          <Autocomplete
            onLoad={setDestinationAuto}
            onPlaceChanged={() => {
              if (!destinationAuto) return;
              const place = destinationAuto.getPlace();
              if (!place.geometry) return;

              setDestination(place.formatted_address || "");
              setDestinationCoords({
                lat: place.geometry.location.lat(),
                lon: place.geometry.location.lng(),
              });
            }}
          >
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={t("destinationPlaceholder")}
              className="w-full h-14 px-4 bg-[#F5F5F5] rounded-lg focus:ring-2 focus:ring-[#A20602]"
            />
          </Autocomplete>
        </div>

        {/* Ride Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {t("rideTypeLabel")}
          </label>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              {RIDE_TYPES.find((r) => r.value === rideType)?.icon}
            </div>

            <select
              value={rideType}
              onChange={(e) => setRideType(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg focus:ring-2 focus:ring-[#A20602]"
            >
              {RIDE_TYPES.map((r, i) => (
                <option key={r.value} value={r.value}>
                  {t(`options.${i}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Button type="button" style="danger" fn={handleCheckPrices}>
            {loading ? t("loading.checkingPrices") : t("checkPrices")}
          </Button>

          <Button type="button" style="nobg" fn={gotoWaitlist}>
            {t("loginInstead")}
          </Button>
        </div>

        {/* Error */}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Fare Result */}
        {fareData && (
          <div className="mt-4 space-y-4">
            {fareData.vehicle_options.map((v: any, i: number) => (
              <div
                key={i}
                className="flex justify-between items-center border rounded-xl p-4 hover:border-black transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`${BASE_URL}${v.icon_url}`}
                    alt={v.vehicle_type}
                    className="w-14 h-14 object-contain"
                  />

                  <div>
                    <p className="font-bold">{v.vehicle_type}</p>
                    <RideETA estimated_duration_minutes={v.estimated_duration_minutes} />
                  </div>
                </div>

                <p className="font-bold">{v.formatted_fare}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
