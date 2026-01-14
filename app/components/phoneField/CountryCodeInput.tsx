import React, { useState } from "react";
import { CountryConfig } from "../../components/phoneField/countryList";

interface CountryCodeInputProps {
  countryList: CountryConfig[];
  value: string;
  onChange: (code: string) => void;
  className?: string;
}

const CountryCodeInput: React.FC<CountryCodeInputProps> = ({
  countryList,
  value,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedCountry = countryList.find(
    (country) => country.code === value
  ) || countryList[0];

  const filteredCountries = countryList.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full bg-[#F5F5F7] rounded-lg px-3 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{selectedCountry.flag}</span>
          <span className="font-medium text-gray-900">
            {selectedCountry.code}
          </span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 mt-2 w-[250px] bg-[#FBF9F6] border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-hidden">
           
            <div className="overflow-y-auto max-h-[240px]">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onChange(country.code);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className={`w-full px-3 py-2 flex items-center gap-3 hover:bg-blue-50 transition-colors ${
                    country.code === value ? "bg-blue-100" : ""
                  }`}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm text-gray-900">
                      {country.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {country.code}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CountryCodeInput;