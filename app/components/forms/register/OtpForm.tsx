"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";
import { useSearchParams } from "next/navigation";
import { useResendOtp, useVerifyOtp } from "@/hooks/useAuthHook";

const OtpForm: React.FC = () => {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const roleParam = searchParams.get("role");
  const role: "customer" | "driver" =
  roleParam === "driver" ? "driver" : "customer";


  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(30);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: resendOtp } = useResendOtp();

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Cooldown timer for resend
  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((c) => c - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // Handle single digit input
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const joinedOtp = otp.join("");
    if (otp.includes("")) {
      setError("Enter all 6 digits.");
      return;
    }

    setError(null);

    // ✅ Send phone, OTP, and role to mutation
    verifyOtp({
      phonenumber: phone,
      otp_code: joinedOtp,
      role,
    });
  };

  const handleResend = () => {
    setCooldown(30);
   resendOtp({ phonenumber: phone, forgot_pin: false });
  };

  return (
    <div className="flex flex-col items-center">
      {/* OTP Inputs */}
      <div className="flex justify-center gap-2 md:gap-4">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="h-[40px] w-[40px] md:h-[54px] md:w-[54px] rounded-lg border border-[#E6E6E7] p-2 text-center text-lg md:text-xl"
          />
        ))}
      </div>

      {/* Error Message */}
      {error && <div className="text-xs text-red-500 mt-2 text-center">{error}</div>}

      {/* Resend */}
      <p className="text-center mt-6 text-sm">
        Didn&apos;t get the code?{" "}
        {cooldown > 0 ? (
          <span className="text-gray-400">Resend in {cooldown}s</span>
        ) : (
          <button onClick={handleResend} className="underline">
            Resend code
          </button>
        )}
      </p>

      {/* Submit Button */}
      <Button
        css="w-full max-w-[518px] mt-4 !bg-[#010C4A] text-white"
        fn={handleSubmit}
        style="primary"
        type="button"
        loading={isVerifying}
        disabled={isVerifying || otp.includes("")}
      >
        {isVerifying ? "Verifying..." : "Verify & Continue"}
      </Button>
    </div>
  );
};

export default OtpForm;
