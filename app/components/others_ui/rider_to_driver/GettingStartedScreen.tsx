"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function GettingStartedScreen() {
    return (
        <div className="w-full max-w-5xl mx-auto bg-white p-6 md:p-12 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#0B153D] leading-none mb-4">
                Before you get started
            </h2>
            <p className="text-[#666666] text-[15px] font-medium mb-10">
                To keep riders safe and maintain quality, we'll need a few details from you.
            </p>

            <div className="flex flex-col gap-4">
                {/* Personal Information */}
                <div className="bg-[#F5F5F7] rounded-[16px] p-6 flex items-center justify-between cursor-pointer hover:bg-[#EAEBEF] transition-colors group">
                    <div className="flex items-center gap-3">
                        <span className="text-[16px] font-bold text-[#333333]">Personal information</span>
                        <span className="border border-[#00b230] text-[#00b230] text-[11px] font-bold px-2 py-0.5 rounded-full">
                            Verified
                        </span>
                    </div>
                    <ChevronRight size={20} className="text-[#333333] transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </div>

                {/* Valid ID & driver's license */}
                <div className="bg-[#F5F5F7] rounded-[16px] p-6 flex items-center justify-between cursor-pointer hover:bg-[#EAEBEF] transition-colors group">
                    <div className="flex items-center gap-3">
                        <span className="text-[16px] font-bold text-[#333333]">Valid ID & driver's license</span>
                        <span className="border border-[#00b230] text-[#00b230] text-[11px] font-bold px-2 py-0.5 rounded-full">
                            Verified
                        </span>
                    </div>
                    <ChevronRight size={20} className="text-[#333333] transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </div>

                {/* Vehicle details */}
                <div className="bg-[#F5F5F7] rounded-[16px] p-6 flex items-center justify-between cursor-pointer hover:bg-[#EAEBEF] transition-colors group">
                    <div className="flex items-center gap-3">
                        <span className="text-[16px] font-bold text-[#333333]">Vehicle details (you can add more than one)</span>
                        <span className="border border-[#F2994A] text-[#F2994A] text-[11px] font-bold px-2 py-0.5 rounded-full">
                            Verification required
                        </span>
                    </div>
                    <ChevronRight size={20} className="text-[#333333] transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </div>

                {/* Clear photos */}
                <div className="bg-[#F5F5F7] rounded-[16px] p-6 flex items-center justify-between cursor-pointer hover:bg-[#EAEBEF] transition-colors group">
                    <div className="flex items-center gap-3">
                        <span className="text-[16px] font-bold text-[#333333]">Clear photos for verification</span>
                        <span className="border border-[#F2994A] text-[#F2994A] text-[11px] font-bold px-2 py-0.5 rounded-full">
                            Verification required
                        </span>
                    </div>
                    <ChevronRight size={20} className="text-[#333333] transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </div>
            </div>
        </div>
    );
}
