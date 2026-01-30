"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

type UserType = "passenger" | "driver" | null;

export default function Page() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    if (!selectedType) return;

    setIsLoading(true);
    setError(null);

    try {
      // simulate API call
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          Math.random() < 0.2 ? reject(new Error("Network error")) : resolve();
        }, 1500);
      });

      // success → navigate
      router.push("/dashboard");
    } catch (err) {
      setError((err as Error).message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const options: { type: Exclude<UserType, null>; label: string; img: string }[] = [
    { type: "passenger", label: "As a Passenger", img: "/images/_car.png" },
    { type: "driver", label: "As a Driver", img: "/images/driver.png" },
  ];

  return (
    <div className="h-screen flex items-center justify-center flex-col px-4">
      <div className="mb-[8px] text-center">
        <h2 className="w-full max-w-[518.5px] mx-auto">
          How will you like to join AnyRide?
        </h2>
        <p className="font-normal text-[18px] tracking-[-2%] leading-[160%] text-[#545454]">
          Select whether to enjoy rides or become a driver
        </p>
      </div>

      {/* Selection Cards */}
      <div className="space-y-4 mb-6 w-full max-w-[518.5px]">
        {options.map((option) => (
          <button
            key={option.type}
            onClick={() => setSelectedType(option.type)}
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
              {selectedType === option.type && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
          </button>
        ))}
      </div>

      {/* Error */}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!selectedType || isLoading}
        className={`w-full max-w-[518.5px] py-4 rounded-lg font-medium text-lg transition-all ${
          selectedType
            ? "bg-[#010C4A] text-white"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
