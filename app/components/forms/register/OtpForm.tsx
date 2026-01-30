"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";
import { useRouter, useSearchParams } from "next/navigation";

const FAKE_OTP = "1234";

const OtpForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const phone = searchParams.get("phone");

  const identifier = email || phone || "";

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [cooldown, setCooldown] = useState(30);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // countdown timer
  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((c) => c - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const joinedOtp = otp.join("");

    if (otp.includes("")) {
      setError("Enter all 4 digits.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // fake API call
    await new Promise((r) => setTimeout(r, 1200));

    if (joinedOtp !== FAKE_OTP) {
      setError("Invalid OTP. Try again.");
      setIsLoading(false);
      return;
    }

    // success
    router.push("/select-role");
  };

  const handleResend = () => {
    setCooldown(30);
    alert("Simulating resend OTP to " + identifier);
  };

  return (
    <div>
      <div className="flex justify-center gap-4">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d?$/.test(inputValue)) {
                handleChange(index, inputValue);
              }
            }}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="h-[54px] w-[54px] rounded-[9.79px] border border-[#E6E6E7] p-2 text-center text-xl"
          />
        ))}
      </div>

      {error && (
        <div className="text-xs text-red-500 mt-2 text-center">
          {error}
        </div>
      )}

      <p className="text-center mt-10 text-sm">
        Didn&apos;t get the code?{" "}
        {cooldown > 0 ? (
          <span>Resend in {cooldown}s</span>
        ) : (
          <button
            onClick={handleResend}
            className="underline"
          >
            Resend code
          </button>
        )}
      </p>

      {!otp.includes("") && (
        <Button
          css="w-full max-w-[518.5px] mx-auto mt-4 !bg-[#010C4A] text-white"
          fn={handleSubmit}
          style="primary"
          type="button"
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify & Continue"}
        </Button>
      )}
    </div>
  );
};

export default OtpForm;

