"use client";

import { useState } from "react";
import SelectRole from "@/app/components/forms/register/SelectRole";
import { useSelectRole } from "@/hooks/useAuthHook";

type UserType = "passenger" | "driver" | null;

export default function Page() {
  const [selectedType, setSelectedType] = useState<UserType>(null);
  
  const { mutate, isPending } = useSelectRole();

  const handleContinue = () => {
    if (!selectedType) return;
    mutate({ role: selectedType });
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

      <SelectRole 
        options={options}
        selectedType={selectedType}
        error={null}
        isLoading={isPending}
        onSelect={setSelectedType}
        onContinue={handleContinue} 
      />
    </div>
  );
}

