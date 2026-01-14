import React from "react";
import CountryCodeInput from "./CountryCodeInput";
import PhoneNumberInput from "./PhoneNumberInput";
import { CountryConfig } from "./countryList";

interface Props {
  countryList: CountryConfig[];
  countryCode: string;
  phoneNumber: string;
  handleCodeChange: (code: string) => void;
  handlePhoneChange: (value: string) => void;
}

const PhoneInputField: React.FC<Props> = ({
  countryList,
  countryCode,
  phoneNumber,
  handleCodeChange,
  handlePhoneChange,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[510px]">
      <div className="flex gap-3">
        <CountryCodeInput
          countryList={countryList}
          value={countryCode}
          onChange={handleCodeChange}
          className="w-[127px] h-[56px]"
        />
        <PhoneNumberInput
          value={phoneNumber}
          onChange={handlePhoneChange}
          className="flex-1 h-[56px]"
        />
      </div>
    </div>
  );
};

export default PhoneInputField;