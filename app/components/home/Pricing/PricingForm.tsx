"use client";

import { useState } from "react";
import { FaMotorcycle, FaCar } from "react-icons/fa";
import Button from "../../ui/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useJsApiLoader } from "@react-google-maps/api";
import RideETA from "../../RideETA";
import LocationSearchInput from "../../ui/LocationSearchInput";
import { FareData } from "@/types";
import Image from "next/image";

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

  const gotoWaitlist = () => router.push("/login");

  /* ------------------ GOOGLE MAPS LOADER ------------------ */
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  /* ------------------ STATE ------------------ */
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [pickupCoords, setPickupCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [rideType, setRideType] = useState<string>("Motorcycle");
  const [loading, setLoading] = useState(false);
  const [fareData, setFareData] = useState<FareData | null>(null);
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
        },
      );

      // ✅ Handle HTTP errors first
      if (!res.ok) {
        throw new Error("Network error. Please try again.");
      }

      const json = await res.json();

      if (json.status !== "success") {
        throw new Error(json.message || t("errors.generic"));
      }

      setFareData(json.data);
    } catch (err: unknown) {
      // ✅ Properly narrow the error type
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("errors.generic"));
      }
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

          <LocationSearchInput
            value={pickup}
            onChange={setPickup}
            onSelect={(address, lat, lng) => {
              setPickup(address);
              setPickupCoords({ lat, lon: lng });
            }}
            placeholder={t("pickupPlaceholder")}
            className="w-full h-14 bg-[#F5F5F5] rounded-lg focus-within:ring-2 focus-within:ring-[#A20602]"
          />
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {t("destinationLabel")}
          </label>

          <LocationSearchInput
            value={destination}
            onChange={setDestination}
            onSelect={(address, lat, lng) => {
              setDestination(address);
              setDestinationCoords({ lat, lon: lng });
            }}
            placeholder={t("destinationPlaceholder")}
            className="w-full h-14 bg-[#F5F5F5] rounded-lg focus-within:ring-2 focus-within:ring-[#A20602]"
          />
        </div>

        {/* Ride Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {t("rideTypeLabel")}
          </label>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              {RIDE_TYPES.find((r) => r.value === rideType)?.icon}
            </div>

            <select
              value={rideType}
              onChange={(e) => setRideType(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg focus:ring-2 focus:ring-[#A20602] outline-none appearance-none"
            >
              {RIDE_TYPES.map((r, i) => (
                <option key={r.value} value={r.value}>
                  {t(`options.${i}`)}
                </option>
              ))}
            </select>
            {/* Custom arrow if needed, but standard select is okay for now, maybe add logic later */}
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
            {fareData.vehicle_options.map((v, i) => (
              <div
                key={i}
                className="flex justify-between items-center border rounded-xl p-4 hover:border-black transition"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={`${BASE_URL}${v.icon_url}`}
                    alt={v.vehicle_type}
                    className="w-14 h-14 object-contain"
                    width={50}
                    height={50}
                  />

                  <div>
                    <p className="font-bold">{v.vehicle_type}</p>
                    <RideETA
                      estimated_duration_minutes={v.estimated_duration_minutes}
                    />
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
