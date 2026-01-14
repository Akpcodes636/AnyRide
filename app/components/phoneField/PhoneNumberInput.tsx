import React from "react";

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "90848399",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <input
      type="tel"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`${className} bg-[#FBF9F6] border-2 rounded-lg px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#DC2626] transition-colors`}
    />
  );
};

export default PhoneNumberInput;