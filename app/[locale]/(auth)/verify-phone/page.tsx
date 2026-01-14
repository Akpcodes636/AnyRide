"use client";
import { useState } from "react";
// import PhoneInput from "@/app/components/phoneField/phoneInput";
import Button from "@/app/components/ui/Button";
import PhoneInput from "../../../components/phoneField/PhoneInputField";
import { countryList } from "@/app/components/phoneField/countryList";
// import { countryList } from "@/app/components/phoneField/countryList";

const Page = () => {
  const [countryCode, setCountryCode] = useState("+243");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCodeChange = (code: string) => {
    setCountryCode(code);
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleSubmit = () => {
    console.log("Full phone number:", countryCode + phoneNumber);
    // Handle your submission logic here
  };

  return (
    <section className="h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4 max-w-md">
        <h2 className="font-semibold mb-4">Enter your active phone number</h2>
        <p className="mb-8 text-[18px] text-[#545454] leading-[160%] tracking-[-2%]">
          Custom OTP might be send via SMS
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
        <Button
          style="tertiary"
          css="!rounded-[12px] w-full max-w-[518.5px] h-[57px] text-[18px] tracking-[-2%] leading-[160%] mt-4"
          type="button"
        //   onClick={handleSubmit}
        >
          Open email app
        </Button>
      </div>
    </section>
  );
};

export default Page;