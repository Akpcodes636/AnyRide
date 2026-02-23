"use client";
import React, { useEffect, useRef} from "react";
import Button from "../../ui/Button";

interface PinFormProps {
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: () => void;
  isLoading?: boolean;
  error?: string | null;
  buttonText?: string;
  autoFocus?: boolean;
  onSubmit?: (pin: string) => void;
}

const PinForm: React.FC<PinFormProps> = ({
  value = "",
  onChange,
  onComplete,
  isLoading = false,
  error,
  buttonText = "Continue",
  autoFocus = true,
  onSubmit
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  
  // Derive pin array from value prop
  const pin = React.useMemo(() => {
    if (value && value.length <= 6) {
      const pinArray = value.split("");
      return [
        pinArray[0] || "",
        pinArray[1] || "",
        pinArray[2] || "",
        pinArray[3] || "",
        pinArray[4] || "",
        pinArray[5] || "",
      ];
    }
    return ["", "", "", "", "", ""];
  }, [value]);

  useEffect(() => {
    if (autoFocus) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, newValue: string) => {
    const newPin = [...pin];
    newPin[index] = newValue;

    // Notify parent component (Formik) of the change
    const joinedPin = newPin.join("");
    onChange?.(joinedPin);

    // Auto-advance to next input
    if (newValue && index < pin.length - 1) {
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
    if (joinedPin.length === 6) {
      onComplete?.();
      onSubmit?.(joinedPin);
    }
  };

  return (
    <div>
      <div className="flex justify-center gap-4 mb-4">
        {pin.map((pinValue, index) => (
          <input
            key={index}
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            type="password"
            inputMode="numeric"
            maxLength={1}
            value={pinValue}
            onChange={(e) => {
              const val = e.target.value;
              handleChange(index, val);
              // console.log(val);
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