// "use client";

// import { useState } from "react";
// import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
// import Button from "../../ui/Button";
// import { useTranslations } from "next-intl";

// const BASE_URL = "https://anyride.techenex.online";

// const HeroSearchDesktop = () => {
//   const t = useTranslations("HomePage.hero");

//   // Google Maps loader
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
//     libraries: ["places"],
//   });

//   const [pickup, setPickup] = useState("");
//   const [pickupCoords, setPickupCoords] = useState<{ lat: number; lon: number } | null>(null);
//   const [pickupAuto, setPickupAuto] = useState<any>(null);

//   const [rideType, setRideType] = useState("Bike");
//   const [fareData, setFareData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   // Toast states
//   const [toastMessage, setToastMessage] = useState<string | null>(null);
//   const [toastError, setToastError] = useState(false);

//   if (!isLoaded) return null;

//   const handleCheckAvailability = async () => {
//     if (!pickupCoords) {
//       setToastMessage("Please select a pickup location from suggestions");
//       setToastError(true);
//       setFareData(null);
//       setTimeout(() => setToastMessage(null), 4000);
//       return;
//     }

//     setLoading(true);
//     setToastMessage(null);

//     try {
//       const res = await fetch(`${BASE_URL}/api/v1/public/estimate-fare`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           pickup_lat: pickupCoords.lat,
//           pickup_lon: pickupCoords.lon,
//           dropoff_lat: pickupCoords.lat, // dummy
//           dropoff_lon: pickupCoords.lon,
//           vehicle_type: rideType,
//         }),
//       });

//       const json = await res.json();
//       if (json.status !== "success") throw new Error(json.message || "API error");

//       setFareData(json.data);

//       if (json.data.available_drivers === 0) {
//         setToastMessage("No rides available in your area");
//         setToastError(true);
//       } else {
//         setToastMessage(`${json.data.available_drivers} rides available in your area`);
//         setToastError(false);
//       }

//       setTimeout(() => setToastMessage(null), 4000);
//     } catch (err: any) {
//       setToastMessage(err.message || "Something went wrong");
//       setToastError(true);
//       setFareData(null);
//       setTimeout(() => setToastMessage(null), 4000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-174 mx-auto">
//       <div className="flex items-center bg-white rounded-full p-2">
//         <Autocomplete
//           onLoad={(auto) => setPickupAuto(auto)}
//           onPlaceChanged={() => {
//             if (!pickupAuto) return;
//             const place = pickupAuto.getPlace();
//             if (!place.geometry) return;

//             setPickup(place.formatted_address || "");
//             setPickupCoords({
//               lat: place.geometry.location.lat(),
//               lon: place.geometry.location.lng(),
//             });
//           }}
//         >
//           <input
//             type="text"
//             value={pickup}
//             onChange={(e) => setPickup(e.target.value)}
//             placeholder={t("placeholderPickup")}
//             className="flex-1 h-14 px-6 outline-none text-sm bg-transparent"
//           />
//         </Autocomplete>

//         <Button
//           style="danger"
//           type="button"
//           css="h-[52px] w-[216px] px-8 rounded-full whitespace-nowrap font-semibold relative left-48"
//           fn={handleCheckAvailability}
//         >
//           {loading ? "Checking..." : t("buttonCheckAvailability")}
//         </Button>
//       </div>

//       {/* Toast */}
//       {toastMessage && (
//         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
//           <div
//             className={`inline-block rounded-[50px] px-6 py-3 shadow-lg animate-slide-up ${
//               toastError ? "bg-[#FDECEC] text-[#FF4D4F]" : "bg-[#E9F9EE] text-[#22C553]"
//             }`}
//           >
//             <p className="text-center text-[18px]">{toastMessage}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeroSearchDesktop;



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
      <style jsx global>{`
        /* Professional Autocomplete Dropdown Styling */
        .pac-container {
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          border: 1px solid #e5e7eb;
          margin-top: 8px;
          padding: 8px 0;
          font-family: inherit;
          width:500px !important;
        }

        .pac-container:after {
          display: none; /* Hide default Google branding */
        }

        .pac-item {
          padding: 12px 16px;
          cursor: pointer;
          border: none;
          line-height: 1.5;
          transition: background-color 0.15s ease;
        }

        .pac-item:hover {
          background-color: #f9fafb;
        }

        .pac-item-selected {
          background-color: #f3f4f6;
        }

        .pac-icon {
          margin-top: 0;
          margin-right: 12px;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 18px 18px;
          width: 20px;
          height: 20px;
        }

        .pac-icon-marker {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>');
        }

        .pac-item-query {
          font-size: 15px;
          font-weight: 500;
          color: #1f2937;
          padding-right: 8px;
        }

        .pac-matched {
          font-weight: 600;
          color: #111827;
        }

        .pac-item-query .pac-matched {
          font-weight: 600;
        }

        .pac-item span:not(.pac-item-query) {
          font-size: 13px;
          color: #6b7280;
        }

        /* Custom Google logo styling if needed */
        .pac-logo:after {
          display: none;
        }
      `}</style>

      <div className="flex items-center bg-white rounded-full shadow-lg p-2 border border-gray-100">
        <div className="flex-1 relative flex items-center">
          {/* Location Icon */}
          <svg
            className="absolute left-6 w-5 h-5 text-gray-400 pointer-events-none"
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
            options={{
              componentRestrictions: { country: [] }, // Customize as needed
              fields: ["formatted_address", "geometry"],
            }}
          >
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder={t("placeholderPickup")}
              className="flex-1 h-14 pl-14 pr-6 outline-none text-[15px] bg-transparent font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal"
            />
          </Autocomplete>
        </div>

        <Button
          style="danger"
          type="button"
          css="h-[52px] px-8 rounded-full whitespace-nowrap font-semibold text-[15px] shadow-sm hover:shadow transition-shadow duration-200"
          fn={handleCheckAvailability}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
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
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div
            className={`inline-flex items-center gap-3 rounded-full px-6 py-3 shadow-xl backdrop-blur-sm ${
              toastError
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-green-50 text-green-600 border border-green-200"
            }`}
          >
            {/* Icon */}
            {toastError ? (
              <svg
                className="w-5 h-5"
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
                className="w-5 h-5"
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

export default HeroSearchDesktop;