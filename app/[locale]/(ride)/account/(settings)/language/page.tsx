"use client";

import { useState } from "react";

const languages = ["English", "French", "Swahili", "Arabic"];

export default function LanguagePanel() {
  const [selected, setSelected] = useState("English");

  return (
    <div className="w-full max-w-[831px]">
      <h2 className="text-sm md:text-[18px] font-semibold text-[#02093A] mb-4">
        Select language
      </h2>

      <div className="flex flex-col">
        {languages.map((lang, index) => (
          <button
            key={lang}
            onClick={() => setSelected(lang)}
            className={`flex items-center justify-between px-0 py-3 text-sm text-[#02093A] transition-colors cursor-pointer`}
          >
            <span className="font-normal">{lang}</span>

            {/* Radio circle */}
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                selected === lang
                  ? "border-[#02093A] bg-[#02093A]"
                  : "border-gray-300 bg-white"
              }`}
            >
              {selected === lang && (
                <svg
                  className="w-3 h-3 text-white"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="2,6 5,9 10,3" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}