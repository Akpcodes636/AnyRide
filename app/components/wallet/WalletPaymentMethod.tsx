"use client";
import { useState } from "react";

export default function WalletPaymentMethod() {
  const [cashEnabled, setCashEnabled] = useState(true);

  return (
    <div>
      <h3 className="text-[16px] md:text-[28px] lg:text-[32px] font-semibold">
        Payment methods
      </h3>

      <div className="flex items-center justify-between mt-4">
        <p className="text-[#555A7B] leading-[160%] tracking-[-2%]">
          Pay with Cash
        </p>

        {/* TOGGLE */}
        <button
          onClick={() => setCashEnabled(!cashEnabled)}
          className={`w-12 h-7 rounded-full transition relative ${
            cashEnabled ? "bg-[#E53935]" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition ${
              cashEnabled ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}