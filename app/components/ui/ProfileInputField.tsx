"use client";

import { PenLine } from "lucide-react";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProfileInputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
}) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[18px] font-medium text-[#02093A] pl-1">
      {label}
    </label>

    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-[#E5E7EB] rounded-[8px] px-4 py-3 pr-10 h-[48px] focus:outline-none focus:ring-1 focus:ring-[#0B153D]"
      />

      {/* Pen Icon */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0B153D] opacity-60 hover:opacity-100 cursor-pointer transition">
        <PenLine size={18} strokeWidth={2} />
      </div>
    </div>
  </div>
);

export default ProfileInputField;