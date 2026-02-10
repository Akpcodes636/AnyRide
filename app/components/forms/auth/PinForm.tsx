"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";

interface PinFormProps {
  onSubmit: (pin: string) => void;
  isLoading?: boolean;
  error?: string | null;
  buttonText?: string;
  autoFocus?: boolean;
}

const PinForm: React.FC<PinFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  buttonText = "Continue",
  autoFocus = true,
}) => {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (autoFocus) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, value: string) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-advance
    if (value && index < pin.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const joinedPin = pin.join("");
    if (joinedPin.length === 4) {
      onSubmit(joinedPin);
    }
  };

  return (
    <div>
      <div className="flex justify-center gap-4 mb-4">
        {pin.map((value, index) => (
          <input
            key={index}
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            type="password"
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d?$/.test(val)) handleChange(index, val);
            }}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-[16px] border border-[#E6E6E7] text-center text-2xl font-bold focus:border-[#010C4A] outline-none transition-colors"
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <Button
        style="primary"
        css="w-full !bg-[#010C4A] text-white mt-8"
        type="button"
        fn={handleSubmit}
        loading={isLoading}
        disabled={isLoading || pin.includes("")}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PinForm;
