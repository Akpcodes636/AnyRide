"use client";

import { useState } from "react";
import { SECURITY_ITEMS } from "@/app/utils/Content";
import { useRouter } from "next/navigation";

export default function LoginSecurityPage() {
  const [biometric, setBiometric] = useState(true);
  const router = useRouter();

  return (
    <div>
      {/* Security items card */}
      <div className="bg-[#F5F5F7] rounded-[8px]">
        {SECURITY_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 gap-4"
          >
            {/* Text */}
            <div className="flex-1">
              <p
                className={`text-[18px] font-normal mb-0.5 cursor-pointer ${
                  item.type === "link" ? "text-[#A20602]" : "text-[#02093A]"
                }`}
                onClick={() => item.route && router.push(item.route)}
              >
                {item.title}
              </p>
              <p className="text-[14px] text-[#555A7B] leading-snug">
                {item.description}
              </p>
            </div>

            {/* Action */}
            {item.type === "toggle" && (
              <button
                onClick={() => setBiometric(!biometric)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none ${
                  biometric ? "bg-[#C0001A]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 mt-0.5 ${
                    biometric ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}