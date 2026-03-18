"use client";

import React from 'react';
import { ShieldCheck, Landmark, ScanFace, ChevronRight } from 'lucide-react';

export default function VerificationsScreen() {
    return (
        <div className="w-full max-w-5xl mx-auto bg-white p-4 md:p-8 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#0B153D] leading-none mb-10">
                Verifications
            </h2>

            <div className="flex flex-col gap-4">
                {/* Driver's License */}
                <div className="bg-[#F5F5F7] rounded-[16px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer hover:bg-[#EAEBEF] transition-colors group gap-4">
                    <div className="flex items-start sm:items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#EAEBEF] flex items-center justify-center shrink-0">
                            <ShieldCheck size={24} className="text-[#0B153D]" strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[18px] font-bold text-[#0B153D]">Driver's License</span>
                            <span className="text-[14px] text-[#666666] font-medium">Verify your driving license.</span>
                            <div className="mt-1">
                                <span className="border border-[#F2994A] text-[#F2994A] text-[11px] font-bold px-3 py-1 rounded-full inline-block">
                                    Verification required
                                </span>
                            </div>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-[#333333] transition-transform group-hover:translate-x-1 hidden sm:block" strokeWidth={2} />
                </div>

                {/* National ID / Passport */}
                <div className="bg-[#F5F5F7] rounded-[16px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer hover:bg-[#EAEBEF] transition-colors group gap-4">
                    <div className="flex items-start sm:items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#EAEBEF] flex items-center justify-center shrink-0">
                            <Landmark size={24} className="text-[#0B153D]" strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[18px] font-bold text-[#0B153D]">National ID / Passport</span>
                            <span className="text-[14px] text-[#666666] font-medium">Verify you identity or passport.</span>
                            <div className="mt-1">
                                <span className="border border-[#00b230] text-[#00b230] text-[11px] font-bold px-3 py-1 rounded-full inline-block">
                                    Verified
                                </span>
                            </div>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-[#333333] transition-transform group-hover:translate-x-1 hidden sm:block" strokeWidth={2} />
                </div>

                {/* Profile Photo (Selfie) */}
                <div className="bg-[#F5F5F7] rounded-[16px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer hover:bg-[#EAEBEF] transition-colors group gap-4">
                    <div className="flex items-start sm:items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#EAEBEF] flex items-center justify-center shrink-0">
                            <ScanFace size={24} className="text-[#0B153D]" strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[18px] font-bold text-[#0B153D]">Profile Photo (Selfie)</span>
                            <span className="text-[14px] text-[#666666] font-medium">Verify your profile picture.</span>
                            <div className="mt-1">
                                <span className="border border-[#F2994A] text-[#F2994A] text-[11px] font-bold px-3 py-1 rounded-full inline-block">
                                    Verification required
                                </span>
                            </div>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-[#333333] transition-transform group-hover:translate-x-1 hidden sm:block" strokeWidth={2} />
                </div>
            </div>
        </div>
    );
}
