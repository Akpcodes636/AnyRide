"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";
import PhoneInput from "../../../components/phoneField/PhoneInputField";
import { countryList } from "@/app/components/phoneField/countryList";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [countryCode, setCountryCode] = useState("+243");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCodeChange = (code: string) => {
    setCountryCode(code);
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleSubmit = async () => {
    if (!phoneNumber || phoneNumber.length < 6) {
      setError("Please enter a valid phone number.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Full phone number:", countryCode + phoneNumber);

      // simulate OTP send
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push("/verify");
    } catch (err) {
      setError("Failed to send OTP. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4 max-w-md">
        <h2 className="font-semibold mb-4">
          Enter your active phone number
        </h2>

        <p className="mb-8 text-[18px] text-[#545454] leading-[160%] tracking-[-2%]">
          Custom OTP might be sent via SMS
        </p>

        <div className="mb-[30px]">
          <PhoneInput
            countryList={countryList}
            countryCode={countryCode}
            phoneNumber={phoneNumber}
            handleCodeChange={handleCodeChange}
            handlePhoneChange={handlePhoneChange}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <Button
          style="tertiary"
          css="!rounded-[12px] w-full max-w-[518.5px] h-[57px] text-[18px] tracking-[-2%] leading-[160%] mt-4"
          type="button"
          fn={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </Button>
      </div>
    </section>
  );
};

export default Page;
