"use client";

import { useState } from "react";

const NavArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12,2 19,21 12,17 5,21" />
  </svg>
);

const Pin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

interface Suggestion {
  label: string;
}

interface LocationRowProps {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  active: boolean;
  suggestions?: Suggestion[];
}

function LocationRow({ icon, label, placeholder, active, suggestions = [] }: LocationRowProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const showSuggestions = focused && suggestions.length > 0;

  return (
    <div className={`flex items-start gap-3 px-4 py-3 ${active ? "" : "opacity-45"}`}>
      {/* Icon */}
      <div
        className={`w-7 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
          active ? "bg-[#02093A] text-white" : "bg-gray-100 text-gray-400"
        }`}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
          {label}
        </p>

        {active ? (
          <div>
            <input
              value={value}
              placeholder={placeholder}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              className="w-full text-sm font-semibold text-[#02093A] border-b-2 border-blue-500 focus:outline-none pb-0.5 bg-transparent placeholder:text-[#02093A] placeholder:font-semibold"
            />
            {/* Suggestions */}
            {showSuggestions && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    onMouseDown={() => setValue(s.label)}
                    className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400 truncate">{placeholder}</p>
        )}
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex items-center px-4">
      <div className="w-7 flex justify-center flex-shrink-0">
        {/* <div className="w-px h-5 border-l border-dashed border-gray-300" /> */}
      </div>
      <div className="flex-1 h-[5px] bg-red-900 ml-3" />
    </div>
  );
}

export default function DriverLocation() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full overflow-hidden">
        <LocationRow
          icon={<NavArrow />}
          label="Driver's location"
          placeholder="4827 Willowbrook Lane, OH 44126"
          active={true}
          suggestions={[{ label: "240 Hug × 20 Hug" }]}
        />
        <Connector />
        <LocationRow
          icon={<Pin />}
          label="Pickup"
          placeholder="123 Main St, Springfield, IL 62704"
          active={false}
        />
        <Connector />
        <LocationRow
          icon={<Pin />}
          label="Your Destination"
          placeholder="123 Main St, Springfield, IL 62704"
          active={false}
        />
      </div>
    </div>
  );
}