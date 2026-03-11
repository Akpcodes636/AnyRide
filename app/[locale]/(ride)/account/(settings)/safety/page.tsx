"use client";

import { ChevronRight, Phone } from "lucide-react";

const safetyItems = [
  "Driver's verification",
  "Driver's verification",
  "Driver's verification",
  "Driver's verification",
  "Driver's verification",
  "Driver's verification",
];

export default function SafetyPanel() {
  return (
    <div className="w-full max-w-[831px]">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-[#02093A]">Safety</h1>
        <p className="text-sm text-[#8B8EA4] mt-1">Here&apos;s how we get you protected</p>
      </div>

      {/* List */}
      <div className="bg-[#F5F5F7] rounded-[8px] overflow-hidden mb-4">
        {safetyItems.map((item, index) => (
          <button
            key={index}
            className={`w-full bg-white flex items-center justify-between px-4 py-4 text-sm text-[#02093A] font-normal hover:bg-gray-50 active:bg-gray-100 transition-colors ${
              index < safetyItems.length - 1 ? "border-b border-[#F5F5F7]" : ""
            }`}
          >
            <span>{item}</span>
            <ChevronRight className="w-4 h-4 text-[#8B8EA4]" />
          </button>
        ))}
      </div>

      {/* Call 990 */}
      <button className="w-full bg-[#EF3B3B] hover:bg-[#d93232] active:scale-[0.99] transition-all text-white text-sm font-medium py-3.5 rounded-[8px] flex items-center justify-center gap-2 mb-3">
        <Phone className="w-4 h-4" />
        Call 990
      </button>

      {/* Emergency Contacts */}
      <button className="w-full text-sm font-medium text-[#02093A] hover:text-[#0a1660] transition-colors py-1">
        Emergency Contacts
      </button>
    </div>
  );
}