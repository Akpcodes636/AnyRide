"use client";

import { ChevronRight } from "lucide-react";
import { SettingsItemProps } from "@/types";

const SettingsItem = ({ icon: Icon, label, onClick }: SettingsItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition"
    >
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-[#353A61]" />
        <span className="text-[18px] font-normal text-[#02093A]">
          {label}
        </span>
      </div>

      {/* Right Arrow */}
      <ChevronRight size={18} className="text-[#98A2B3]" />
    </div>
  );
};

export default SettingsItem;