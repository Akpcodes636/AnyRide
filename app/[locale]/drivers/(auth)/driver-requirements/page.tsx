"use client";

import { stepOne } from "@/app/utils/Content";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function GettingStartedPage() {
 
   const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* ── Main ── */}
      <main className="flex-1 flex flex-col items-center px-4 pt-[80px] pb-20">
        <div className="w-full container mx-auto">
          {/* Title block */}
          <div className="mb-8">
            <h2 className="mb-2 w-full max-w-[941px] mx-auto">
              Before you get started
            </h2>
            <p className="text-[18px] text-[#545454] leading-[160%] tracking-[-2%] max-w-[941px] mx-auto w-full">
              To keep riders safe and maintain quality, we&apos;ll need a few details from you.
            </p>
          </div>

          {/* Steps list */}
          <div className="flex flex-col gap-3">
            {stepOne.map((step) => (
              <button
                key={step.id}
                className="w-full flex items-center justify-between bg-[#F5F5F7] transition-all rounded-[24px] w-full max-w-[941px] mx-auto h-[88px] px-4 text-left group"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[14px] md:text-[18px] lg:text-[20px] leading-[120%] font-semibold text-[#000000]">
                    {step.label}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${step.badge.color}`}
                  >
                    {step.badge.text}
                  </span>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 ml-3 group-hover:stroke-gray-600 transition-colors"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}