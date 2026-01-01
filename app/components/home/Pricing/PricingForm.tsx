"use client";
import Image from "next/image";
import Button from "../../ui/Button";
import { useTranslations } from "next-intl";

const PricingForm = () => {
  const t = useTranslations("HomePage.pricing.form");

  // Get options array
  const options = t.raw("options") as string[];

  return (
    <div className="pt-4 bg-white flex items-center justify-center">
      <div className="w-full">
        {/* Location Badge */}
        <div className="mb-6">
          <div className="relative inline-flex items-center gap-2 bg-[#FFE5E5] rounded-full px-4 pr-10 py-2">
            <span className="w-5 h-5">
              <Image
                src="/en/Wave.svg"
                className="w-full h-full object-contain"
                alt="icon"
                width={20}
                height={20}
              />
            </span>

            <span className="text-[#A20602] text-sm font-medium">
              {t("locationBadge")}
            </span>

            {/* Dropdown Arrow */}
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="#666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl -6 space-y-6">
          {/* Pickup Location */}
          <div className="space-y-2">
            <label className="text-sm text-gray-700 font-medium">
              {t("pickupLabel")}
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <span>
                  <Image
                    src="/en/Arrow.svg"
                    className="w-full h-full object-cover"
                    alt="icon"
                    width={500}
                    height={500}
                  />
                </span>
              </div>
              <input
                type="text"
                // value={pickupLocation}
                // onChange={(e) => setPickupLocation(e.target.value)}
                placeholder={t("pickupPlaceholder")}
                className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A20602] transition-all"
              />
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <label className="text-sm text-gray-700 font-medium">
              {t("destinationLabel")}
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <span>
                  <Image
                    src="/en/Arrow.svg"
                    className="w-full h-full object-cover"
                    alt="icon"
                    width={500}
                    height={500}
                  />
                </span>
              </div>
              <input
                type="text"
                // value={destination}
                // onChange={(e) => setDestination(e.target.value)}
                placeholder={t("destinationPlaceholder")}
                className="w-full h-14 pl-12 pr-4 bg-[#F5F5F5] rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A20602] transition-all"
              />
            </div>
          </div>

          {/* Ride Type */}
          <div className="space-y-2">
            <label className="text-sm text-gray-700 font-medium">
              {t("rideTypeLabel")}
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <span>
                  <Image
                    src="/en/Tram.svg"
                    className="w-full h-full object-cover"
                    alt="icon"
                    width={500}
                    height={500}
                  />
                </span>
              </div>
              <select
                // value={rideType}
                // onChange={(e) => setRideType(e.target.value)}
                className="w-full h-14 pl-12 pr-10 bg-[#F5F5F5] rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#A20602] transition-all cursor-pointer"
              >
                {options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center  flex-row sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              style="danger"
              //   fn={handleCheckPrices}
              css="w-[161px] sm:flx-1"
            >
              {t("checkPrices")}
            </Button>
            <Button
              type="button"
              style="nobg"
              //   fn={handleLoginInstead}
              css="w-[180px] sm:flx-1"
            >
              {t("loginInstead")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingForm;