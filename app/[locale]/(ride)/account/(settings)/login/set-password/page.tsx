"use client";

import { useState } from "react";
import { PenLine } from "lucide-react";
import GoBack from "@/app/components/ui/Goback";

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div>
      <GoBack />
      <h3>Set Password</h3>
      {/* Subtitle */}
      <p className="text-[#666] text-[14px] mb-6">
        Set/Change your login password
      </p>

      {/* Enter Password */}
      <div className="mb-4">
        <label className="block text-[18px] font-normal text-[#02093A] mb-[8px]">
          Enter Password
        </label>
        <div className="flex items-center border border-[#E6E6EB] rounded-[8px] px-4 py-3 bg-white">
          <input
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 text-[14px] text-[#02093A] placeholder:text-[#BDBDBD] outline-none bg-transparent"
          />
          <button className="text-gray-400 hover:text-[#02093A] transition-colors ml-2">
            <PenLine size={16} />
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mb-8">
        <label className="block text-[18px] font-normal text-[#02093A] mb-1.5">
          Confirm Password
        </label>
        <div className="flex items-center border border-[#E6E6EB] rounded-[8px] px-4 py-3 bg-white">
          <input
            type="text"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="flex-1 text-[14px] text-[#02093A] placeholder:text-[#BDBDBD] outline-none bg-transparent"
          />
          <button className="text-gray-400 hover:text-[#02093A] transition-colors ml-2">
            <PenLine size={16} />
          </button>
        </div>
      </div>

      {/* Submit */}
      <button className="w-full py-3.5 rounded-[8px] bg-[#02093A] text-white text-[14px] font-semibold hover:bg-[#0a1a5c] transition-colors">
        Confirm Password
      </button>
    </div>
  );
}
