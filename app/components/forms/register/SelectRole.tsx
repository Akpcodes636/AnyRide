"use client";

import Image from "next/image";

type UserType = "passenger" | "driver" | null;

type Option = {
  type: Exclude<UserType, null>;
  label: string;
  img: string;
};

interface Props {
  options: Option[];
  selectedType: UserType;
  error: string | null;
  isLoading: boolean;
  onSelect: (type: Exclude<UserType, null>) => void;
  onContinue: () => void;
}

export default function SelectRole({
  options,
  selectedType,
  error,
  isLoading,
  onSelect,
  onContinue,
}: Props) {
  return (
    <div className="w-full max-w-[518.5px]">
      {/* Selection Cards */}
      <div className="space-y-4 mb-6">
        {options.map((option) => (
          <button
            key={option.type}
            onClick={() => onSelect(option.type)}
            className={`w-full h-[120px] p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
              selectedType === option.type
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src={option.img}
                  width={500}
                  height={500}
                  alt="icon"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-[20px] md:text-[25px] font-normal tracking-[-4%] leading-[120%] text-[#02093A]">
                {option.label}
              </span>
            </div>

            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedType === option.type
                  ? "border-blue-600 bg-blue-600"
                  : "border-gray-400"
              }`}
            >
              {selectedType === option.type && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Error */}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Continue Button */}
      <button
        onClick={onContinue}
        disabled={!selectedType || isLoading}
        className={`w-full py-4 rounded-lg font-medium text-lg transition-all ${
          !selectedType || isLoading
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-[#010C4A] text-white"
        }`}
      >
        {isLoading ? "Processing..." : "Continue"}
      </button>
    </div>
  );
}
