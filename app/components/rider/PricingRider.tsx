"use client";

import { useState } from "react";
import { FaMotorcycle, FaCar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useJsApiLoader } from "@react-google-maps/api";
import RideETA from "../RideETA";
import Button from "../ui/Button";
import SubTitle from "../ui/Subtitle";
import { useTranslations } from "next-intl";
import LocationSearchInput from "../ui/LocationSearchInput";

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
 
  const [loading, setLoading] = useState(false);
  const [fareData, setFareData] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastError, setToastError] = useState(false);
  const RIDE_TYPES = ["Car", "Motorcycle"] as const;
  type RideType = (typeof RIDE_TYPES)[number];

  const [rideType, setRideType] = useState<RideType>("Car");

  if (!isLoaded) return null;

  const handleCheckPrices = async () => {
    setFareData(null);
    setToastMessage(null);

    if (!pickupCoords || !destinationCoords) {
      setToastMessage(t("form.errors.missingLocations"));
      setToastError(true);
      setTimeout(() => setToastMessage(null), 4000);
      return;
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
      if (json.status !== "success") {
        throw new Error(t("form.errors.generic"));
      }

      setFareData(json.data);

      if (json.data.available_drivers === 0) {
        setToastMessage(t("form.availability.none"));
        setToastError(true);
      } else {
        setToastMessage(
          t("form.availability.available", {
            count: json.data.available_drivers,
          })
        );
        setToastError(false);
      }

      setTimeout(() => setToastMessage(null), 4000);
    } catch {
      setToastMessage(t("form.errors.generic"));
      setToastError(true);
      setFareData(null);
      setTimeout(() => setToastMessage(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-[30px] lg:pt-0">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-[58px]">
          <div className="mb-[24px]">
            <SubTitle text={t("subtitle")} css="rounded-[40px] font-normal" />
          </div>
          <h2 className="text-center">{t("title")}</h2>
          <p className="max-w-[569px] w-full text-center mx-auto text-[18px] leading-[160%] tracking-[-2%] text-[#333333]">
            {t("description")}
          </p>
        </div>

        {/* Form */}
        <div className="pt-8 bg-white flex items-center justify-center max-w-[745px] mx-auto">
          <div className="w-full flex flex-col gap-y-5">
            {/* Pickup */}
            <div className="space-y-2">
              <label className="text-[16px] text-[#02093A] font-normal">
                {t("form.pickupPlaceholder")}
              </label>
              
              <LocationSearchInput
                 value={pickup}
                 onChange={setPickup}
                 onSelect={(address, lat, lng) => {
                   setPickup(address);
                   setPickupCoords({ lat, lon: lng });
                 }}
                 placeholder={t("form.pickupPlaceholder")} // Or just use placeholder text directly if key doesn't match
                 className="w-full h-14 bg-[#F5F5F5] rounded-lg focus-within:ring-2 focus-within:ring-[#A20602]"
              />

            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label className="text-[16px] text-[#02093A] font-normal">
                {t("form.destinationPlaceholder")}
              </label>
              
              <LocationSearchInput
                value={destination}
                onChange={setDestination}
                onSelect={(address, lat, lng) => {
                  setDestination(address);
                  setDestinationCoords({ lat, lon: lng });
                }}
                placeholder={t("form.destinationPlaceholder")}
                className="w-full h-14 bg-[#F5F5F5] rounded-lg focus-within:ring-2 focus-within:ring-[#A20602]"
              />
            </div>

            {/* Ride Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#02093A]"> {t("form.rideTypePlaceholder")}</label>
              <div className="relative flex items-center">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">{RIDE_ICONS[rideType]}</div>
                <select
                  value={rideType}
                  onChange={(e) => setRideType(e.target.value as RideType)}
                  className="w-full h-14 pl-12 pr-10 bg-[#F5F5F5] rounded-lg"
                >
                  {RIDE_TYPES.map((r) => (
                    <option key={r} value={r}>
                      {t(`form.rideTypes.${r}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button type="button" style="danger" css="w-[161px]" fn={handleCheckPrices}>
                {loading ? "Checking..." : t("form.cta")}
              </Button>
              <Button type="button" style="nobg" css="min-w-[180px]" fn={gotoWaitlist}>
                {t("form.loginInstead")}
              </Button>
            </div>

            {/* Toast */}
            {toastMessage && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <div
                  className={`inline-block rounded-[50px] px-6 py-3 shadow-lg animate-slide-up ${toastError ? "bg-[#FDECEC] text-[#FF4D4F]" : "bg-[#E9F9EE] text-[#22C553]"
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
