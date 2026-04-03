"use client";
import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProfilePopover from "../../nav/ProfilePopover";

export default function GettingStartedScreen() {
    const router = useRouter();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const displayName = "Guest (Dev Preview)";

    return (
        <div className="w-full max-w-5xl mx-auto bg-white p-6 md:p-12 font-sans">
            {/* DEV PREVIEW: Profile Button */}
            <div className="flex justify-end mb-8 relative">
                <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-[188px] flex items-center justify-between px-4 py-2 bg-[#A20602] text-white rounded-full font-bold text-[14px] transition-colors hover:bg-[#8e0502]"
                >
                    <span className="truncate">{displayName}</span>
                    <ChevronDown size={16} />
                </button>

                <ProfilePopover
                    isOpen={isProfileOpen}
                    onClose={() => setIsProfileOpen(false)}
                />
            </div>

            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#0B153D] leading-none mb-4">
                Before you get started
            </h2>
            <p className="text-[#666666] text-[15px] font-medium mb-10">
                To keep riders safe and maintain quality, we'll need a few details from you.
            </p>

            <div className="flex flex-col gap-4">
                {/* Personal Information */}
                <div
                    onClick={() => router.push("/drivers/personal-info")}
                    className="bg-[#F5F5F7] rounded-[16px] p-6 flex items-center justify-between cursor-pointer hover:bg-[#EAEBEF] transition-colors group"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-[16px] font-bold text-[#333333]">Personal information</span>
                        <span className="border border-[#00b230] text-[#00b230] text-[11px] font-bold px-2 py-0.5 rounded-full">
                            Verified
                        </span>
                    </div>
                    <ChevronRight size={20} className="text-[#333333] transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </div>

                {/* Valid ID & driver's license */}
                <div
                    onClick={() => router.push("/drivers/verifications")}
                    className="bg-[#F5F5F7] rounded-[16px] p-6 flex items-center justify-between cursor-pointer hover:bg-[#EAEBEF] transition-colors group"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-[16px] font-bold text-[#333333]">Valid ID & driver's license</span>
                        <span className="border border-[#00b230] text-[#00b230] text-[11px] font-bold px-2 py-0.5 rounded-full">
                            Verified
                        </span>
                    </div>
                    <ChevronRight size={20} className="text-[#333333] transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </div>

                {/* Vehicle details */}
                <div
                    onClick={() => router.push("/drivers/my-vehicles")}
                    className="bg-[#F5F5F7] rounded-[16px] p-6 flex items-center justify-between cursor-pointer hover:bg-[#EAEBEF] transition-colors group"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-[16px] font-bold text-[#333333]">Vehicle details (you can add more than one)</span>
                        <span className="border border-[#F2994A] text-[#F2994A] text-[11px] font-bold px-2 py-0.5 rounded-full">
                            Verification required
                        </span>
                    </div>
                    <ChevronRight size={20} className="text-[#333333] transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </div>

                {/* Clear photos */}
                <div
                    onClick={() => router.push("/drivers/profile-photo")}
                    className="bg-[#F5F5F7] rounded-[16px] p-6 flex items-center justify-between cursor-pointer hover:bg-[#EAEBEF] transition-colors group"
                >
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

