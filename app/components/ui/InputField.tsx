"use client";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  css?: string;
  value: string;
  readonly?: boolean;
  error?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  autoComplete?: string; // Added autoComplete prop
  disabled?: boolean
  required?: boolean; 
}

const InputField: React.FC<InputProps> = ({
  placeholder,
  disabled,
  name,
  readonly,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  min,
  max,
  autoComplete, // Destructuring autoComplete prop
  required,
  css
}) => {
  const [view, setView] = useState(false);

  const handleView = () => {
    setView(!view);
  };

  //   console.log(error)

  return (
    <div className="flex flex-col gap-2">
      <label className="label-class" htmlFor={name}>
        {label}
         {required && <span className="ml-1 text-[14px] text-red-500">*</span>}
      </label>
      <div className="relative w-full">
        <input
          min={min}
          max={max}
          readOnly={readonly}
          id={name}
          name={name}
          type={view && type === "password" ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          disabled={disabled}
         className={`
    input-class
    h-[48px]
    bg-white
    w-full
    p-2
    rounded-lg
    border-[#000000]
    px-4
    py-3
    text-[#000000E5]
    hover:border
    focus:border-[3px]
    focus:bg-white
    focus:outline-none
    ${
      error
        ? "border-2 border-text-negative bg-[#CC18180F] text-text-negative"
        : ""
    }
    ${css || ""}
  `}
        />
        {type === "password" && (
          <div className="absolute right-4 top-3">
            {!view ? (
              <Eye onClick={handleView} className="text-[#00000066]" />
            ) : (
              <EyeOff onClick={handleView} className="text-[#00000066]" />
            )}
          </div>
        )}
        {name !== "password" && error && (
          <div className="mt-1 flex items-center gap-1 text-title-sm font-bold text-red-600">
            <CircleAlert size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
