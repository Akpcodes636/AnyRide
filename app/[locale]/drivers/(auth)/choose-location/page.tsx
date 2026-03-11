"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Angola", "Argentina", "Australia",
  "Austria", "Belgium", "Bolivia", "Brazil", "Cambodia", "Cameroon", "Canada",
  "Chad", "Chile", "China", "Colombia", "Congo", "Côte d'Ivoire", "Croatia",
  "Cuba", "Czech Republic", "Denmark", "DR Congo", "Ecuador", "Egypt",
  "Ethiopia", "Finland", "France", "Germany", "Ghana", "Greece", "Guatemala",
  "Guinea", "Haiti", "Honduras", "Hungary", "India", "Indonesia", "Iran",
  "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kenya",
  "Laos", "Libya", "Madagascar", "Malawi", "Malaysia", "Mali", "Mexico",
  "Morocco", "Mozambique", "Myanmar", "Nepal", "Netherlands", "New Zealand",
  "Nicaragua", "Niger", "Nigeria", "Norway", "Pakistan", "Panama", "Paraguay",
  "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Rwanda",
  "Saudi Arabia", "Senegal", "Sierra Leone", "Somalia", "South Africa",
  "South Korea", "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland",
  "Syria", "Tanzania", "Thailand", "Tunisia", "Turkey", "Uganda", "Ukraine",
  "United Kingdom", "United States", "Uruguay", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe",
];

export default function AnyRidePage() {
  const [selectedCountry, setSelectedCountry] = useState("Congo");
  const [language, setLanguage] = useState("EN");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
    

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        <div className="w-full container mx-auto flex flex-col items-center text-center gap-8">
          {/* Heading */}
          <h1 className=" w-full max-w-[319px] mx-auto text-[24px] md:text-[32px] lg:text-[48px] font-bold text-gray-900 leading-[120%] tracking-[-4%]">
            Where will you like to Earn?
          </h1>

          {/* Form */}
          <div className="w-full max-w-[628px] mx-auto flex flex-col gap-5">
            {/* Location dropdown */}
            <div className="w-full flex flex-col gap-1.5 text-left">
              <label className="text-[14px] text-[#02093A] font-normal leading-[120%] pl-0.5">
                Enter your location
              </label>
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full appearance-none bg-[#F5F5F7] text-gray-800 font-medium rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-colors cursor-pointer"
                >
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {/* Custom chevron */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Continue button */}
            <button
              className="w-full max-w-[518.5px] mx-auto bg-[#010C4A] cursor-pointer hover:bg-[#162852] tracking-[-2%] text-white font-semibold text-[18px] rounded-lg py-3.5 transition-all duration-150"
              onClick={() => router.push("/drivers/driver-requirements")}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}