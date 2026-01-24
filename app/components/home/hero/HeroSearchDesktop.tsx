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
      

//       <div className="flex items-center bg-white rounded-full shadow-lg p-2 border border-gray-100">
//         <div className="flex-1 relative flex items-center">
//           {/* Location Icon */}
//           <svg
//             className="absolute left-6 w-5 h-5 text-gray-400 pointer-events-none"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//             />
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//             />
//           </svg>

//           <Autocomplete
//             onLoad={(auto) => setPickupAuto(auto)}
//             onPlaceChanged={() => {
//               if (!pickupAuto) return;
//               const place = pickupAuto.getPlace();
//               if (!place.geometry) return;

//               setPickup(place.formatted_address || "");
//               setPickupCoords({
//                 lat: place.geometry.location.lat(),
//                 lon: place.geometry.location.lng(),
//               });
//             }}
//             options={{
//               componentRestrictions: { country: [] }, // Customize as needed
//               fields: ["formatted_address", "geometry"],
//             }}
//           >
//             <input
//               type="text"
//               value={pickup}
//               onChange={(e) => setPickup(e.target.value)}
//               placeholder={t("placeholderPickup")}
//               className="flex-1 h-14 pl-14 pr-6 outline-none text-[15px] bg-transparent font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal"
//             />
//           </Autocomplete>
//         </div>

//         <Button
//           style="danger"
//           type="button"
//           css="h-[52px] px-8 rounded-full whitespace-nowrap font-semibold text-[15px] shadow-sm hover:shadow transition-shadow duration-200"
//           fn={handleCheckAvailability}
//           disabled={loading}
//         >
//           {loading ? (
//             <span className="flex items-center gap-2">
//               <svg
//                 className="animate-spin h-4 w-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Checking...
//             </span>
//           ) : (
//             t("buttonCheckAvailability")
//           )}
//         </Button>
//       </div>

//       {/* Toast */}
//       {toastMessage && (
//         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
//           <div
//             className={`inline-flex items-center gap-3 rounded-full px-6 py-3 shadow-xl backdrop-blur-sm ${
//               toastError
//                 ? "bg-red-50 text-red-600 border border-red-200"
//                 : "bg-green-50 text-green-600 border border-green-200"
//             }`}
//           >
//             {/* Icon */}
//             {toastError ? (
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             )}
//             <p className="text-[15px] font-medium">{toastMessage}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeroSearchDesktop;






"use client";

import { useState, useEffect, useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import Button from "../../ui/Button";
import { useTranslations } from "next-intl";

const BASE_URL = "https://anyride.techenex.online";

const HeroSearchDesktop = () => {
  const t = useTranslations("HomePage.hero");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [uniqueId] = useState(() => `autocomplete-${Math.random().toString(36).substr(2, 9)}`);

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
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastError, setToastError] = useState(false);

  // Target only THIS component's dropdown
  useEffect(() => {
    if (!isLoaded) return;

    const styleId = `custom-autocomplete-${uniqueId}`;
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      /* Target only dropdowns that appear after this specific input */
      .${uniqueId} ~ .pac-container,
      input.${uniqueId} + .pac-container {
        background-color: #ffffff;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
        margin-top: 8px;
        padding: 8px 0;
        font-family: inherit;
        width: 100% !important;
        max-width: 100%
      }

      .${uniqueId} ~ .pac-container:after,
      input.${uniqueId} + .pac-container:after {
        display: none;
      }

      .${uniqueId} ~ .pac-container .pac-item,
      input.${uniqueId} + .pac-container .pac-item {
        padding: 12px 16px;
        cursor: pointer;
        border: none;
        font-size: 15px;
        line-height: 1.5;
        transition: all 0.15s ease;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .${uniqueId} ~ .pac-container .pac-item:hover,
      input.${uniqueId} + .pac-container .pac-item:hover {
        background-color: #fef2f2;
      }

      .${uniqueId} ~ .pac-container .pac-item-selected,
      input.${uniqueId} + .pac-container .pac-item-selected,
      .${uniqueId} ~ .pac-container .pac-item-selected:hover,
      input.${uniqueId} + .pac-container .pac-item-selected:hover {
        background-color: #fee2e2;
      }

      .${uniqueId} ~ .pac-container .pac-icon,
      input.${uniqueId} + .pac-container .pac-icon {
        width: 20px;
        height: 20px;
        margin: 0;
        background-image: none !important;
        flex-shrink: 0;
      }

      .${uniqueId} ~ .pac-container .pac-icon::before,
      input.${uniqueId} + .pac-container .pac-icon::before {
        content: "📍";
        font-size: 16px;
      }

      .${uniqueId} ~ .pac-container .pac-item-query,
      input.${uniqueId} + .pac-container .pac-item-query {
        font-size: 15px;
        font-weight: 500;
        color: #111827;
        flex: 1;
      }

      .${uniqueId} ~ .pac-container .pac-matched,
      input.${uniqueId} + .pac-container .pac-matched {
        font-weight: 700;
        color: #991b1b;
      }

      .${uniqueId} ~ .pac-container .pac-item-query + span,
      input.${uniqueId} + .pac-container .pac-item-query + span {
        font-size: 13px;
        color: #6b7280;
        margin-left: 4px;
      }

      .${uniqueId} ~ .pac-container .pac-item:first-child,
      input.${uniqueId} + .pac-container .pac-item:first-child {
        border-radius: 12px 12px 0 0;
      }

      .${uniqueId} ~ .pac-container .pac-item:last-child,
      input.${uniqueId} + .pac-container .pac-item:last-child {
        border-radius: 0 0 12px 12px;
      }
    `;

    document.head.appendChild(style);

    // Add unique class to input and track dropdown
    const addClassToDropdown = () => {
      const input = inputRef.current;
      if (input) {
        input.classList.add(uniqueId);
      }

      // Find and mark the associated dropdown
      const observer = new MutationObserver(() => {
        const dropdowns = document.querySelectorAll('.pac-container');
        dropdowns.forEach((dropdown) => {
          const rect = input?.getBoundingClientRect();
          const dropdownRect = dropdown.getBoundingClientRect();
          
          // Check if dropdown is positioned near our input
          if (rect && Math.abs(dropdownRect.left - rect.left) < 50) {
            (dropdown as HTMLElement).setAttribute('data-component', uniqueId);
            
            // Set width dynamically
            if (containerRef.current) {
              (dropdown as HTMLElement).style.width = `${containerRef.current.offsetWidth}px`;
            }
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    };

    const cleanup = addClassToDropdown();

    return () => {
      cleanup();
      const styleToRemove = document.getElementById(styleId);
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, [isLoaded, uniqueId]);

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
          dropoff_lat: pickupCoords.lat,
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
      <div 
        ref={containerRef}
        className="flex items-center bg-white rounded-full shadow-lg p-2 border border-gray-100"
      >
        <div className="flex-1 relative flex items-center">
          <svg
            className="absolute left-6 w-5 h-5 text-gray-400 pointer-events-none z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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
              componentRestrictions: { country: [] },
              fields: ["formatted_address", "geometry"],
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder={t("placeholderPickup")}
              className="flex-1 h-14 pl-14 pr-6 outline-none text-[15px] bg-transparent font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal rounded-full  transition-all"
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

      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div
            className={`inline-flex items-center gap-3 rounded-full px-6 py-3 shadow-xl backdrop-blur-sm ${
              toastError
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-green-50 text-green-600 border border-green-200"
            }`}
          >
            {toastError ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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