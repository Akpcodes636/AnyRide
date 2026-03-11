"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import GoBack from "@/app/components/ui/Goback";

function PasswordField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-[13px] font-semibold text-[#02093A] mb-1.5">
        {label}
      </label>
      <div className="flex items-center border border-[#E6E6EB] rounded-[8px] px-4 py-3 bg-white">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 text-[14px] text-[#02093A] placeholder:text-[#BDBDBD] outline-none bg-transparent"
        />
        <button
          onClick={() => setShow(!show)}
          className="text-gray-400 hover:text-[#02093A] transition-colors ml-2"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  const [current, setCurrent] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div>
        <GoBack />
      {/* Subtitle */}
      <p className="text-[#666] text-[14px] mb-6">
        Set/Change your login password
      </p>

      <PasswordField
        label="Current Password"
        placeholder="Enter current password"
        value={current}
        onChange={setCurrent}
      />
      <PasswordField
        label="New Password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={setNewPassword}
      />
      <PasswordField
        label="Confirm Password"
        placeholder="Confirm password"
        value={confirm}
        onChange={setConfirm}
      />

      <button className="w-full mt-4 py-3.5 rounded-[8px] bg-[#02093A] text-white text-[14px] font-semibold hover:bg-[#0a1a5c] transition-colors">
        Update Password
      </button>
    </div>
  );
}