"use client";

import { CircleAlert } from "lucide-react";
import React from "react";

interface SelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[] | [];
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string | null;
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
}

const SelectField: React.FC<SelectProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  defaultValue,
  className,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        {label && (
          <label className="label-class" htmlFor={name}>
            {label}
          </label>
        )}
        <select
          id={name}
          name={name}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`select-class rounded-lg border-[#000000] bg-[#FFFFFF] px-4 py-3 text-[#000000E5] hover:border focus:border-[3px] focus:bg-white focus:outline-none ${className} ${
            error &&
            "border-2 border-text-negative bg-[#CC18180F] text-text-negative"
          }`}
        >
          {/* <option value="">Select {label}</option> */}
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <div className="mt-1 flex items-center gap-1 text-title-sm font-bold text-text-negative">
          <CircleAlert size={16} />
          <span>Field can&apos;t be empty</span>
        </div>
      )}
    </div>
  );
};

export default SelectField;
