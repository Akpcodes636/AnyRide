"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useResendOtp, useVerifyOtp } from "@/hooks/useAuthHook";

const OtpForm: React.FC = () => {
    // const router = useRouter(); // Handled in hook
    const searchParams = useSearchParams();

    // const email = searchParams.get("email"); 
    const phone = searchParams.get("phone");
    // const identifier = email || phone || "";

    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [error, setError] = useState<string | null>(null);

    const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
    const { mutate: resendOtp } = useResendOtp();


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
            setError("Enter all 6 digits.");
            return;
        }

        setError(null);
        verifyOtp({ code: joinedOtp });
    };

    const handleResend = () => {
        setCooldown(30);
        resendOtp();
    };

    return (
        <div>
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
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d?$/.test(inputValue)) {
                                handleChange(index, inputValue);
                            }
                        }}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="h-[40px] w-[40px] md:h-[54px] md:w-[54px] rounded-[9.79px] border border-[#E6E6E7] p-2 text-center text-lg md:text-xl"
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
                    <span className="text-gray-400">Resend in {cooldown}s</span>
                ) : (
                    <button
                        onClick={handleResend}
                        className="underline"
                    >
                        Resend code
                    </button>
                )}
            </p>

            <Button
                css="w-full max-w-[518.5px] mx-auto mt-4 !bg-[#010C4A] text-white"
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


