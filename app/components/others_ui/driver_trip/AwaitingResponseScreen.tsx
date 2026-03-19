"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { Navigation, MapPin, Minus, Plus, Banknote, CreditCard } from 'lucide-react';

interface AwaitingResponseScreenProps {
    onNext: () => void;
}

export default function AwaitingResponseScreen({ onNext }: AwaitingResponseScreenProps) {
    const [fare] = useState(1084);

    return (
        <div className="w-full max-w-xl mx-auto py-4 md:py-8 font-sans">
            <h1 className="text-[32px] md:text-[40px] font-extrabold text-[#0B153D] leading-none mb-10">
                Awaiting rider's response
            </h1>

            <div className="bg-white rounded-[24px] shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-gray-50 overflow-hidden">
                <div className="p-6 md:p-8">
                    {/* Header Adjustment Bar (Awaiting style) */}
                    <div className="bg-[#F5F5F7] rounded-[16px] p-4 flex items-center justify-between mb-8">
                        <button disabled className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-300 transition-colors shadow-sm cursor-not-allowed">
                            <Minus size={20} strokeWidth={2.5} />
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="text-[22px] font-extrabold text-[#0B153D] tracking-tight">
                                CF {fare}
                            </span>
                        </div>

                        <button disabled className="w-10 h-10 rounded-full bg-[#A20602] opacity-50 flex items-center justify-center text-white transition-colors shadow-sm cursor-not-allowed">
                            <Plus size={20} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Rider Info */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                                <Image
                                    src="/images/Customer-1.jpg"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                    alt="Rider"
                                    onError={(e) => { e.currentTarget.src = "/images/About-rider.jpg"; }}
                                />
                            </div>
                            <span className="text-[15px] font-extrabold text-[#333333]">Mike Brown</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-[#666666]">1.2km,</span>
                            <span className="text-[13px] font-extrabold text-[#22C553]">50 mins</span>
                        </div>
                    </div>

                    {/* Route Details */}
                    <div className="bg-[#F5F5F7]/40 rounded-[16px] p-5 mb-8 flex flex-col gap-6">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 text-[#A0A0A0]">
                                <Navigation size={14} className="rotate-45" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] font-bold text-[#A0A0A0] leading-none uppercase tracking-wide">Pickup</span>
                                <span className="text-[12px] font-medium text-[#666666]">4827 Willowbrook Lane, OH 44126</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="mt-1 text-[#0B153D]">
                                <MapPin size={14} />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] font-bold text-[#A0A0A0] leading-none uppercase tracking-wide">Destination</span>
                                <span className="text-[12px] font-medium text-[#666666]">123 Main St, Springfield, IL 62704</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Mode Badge */}
                    <div className="flex items-center gap-2 bg-[#F0FFF4] px-4 py-2.5 rounded-[12px] mb-10 w-fit">
                        <CreditCard size={16} className="text-[#22C553]" />
                        <span className="text-[13px] font-bold text-[#22C553]">In-app payment</span>
                    </div>

                    {/* Actions (Disabled state) */}
                    <div className="flex gap-4">
                        <button disabled className="flex-1 bg-[#F5F5F7] text-[#A0A0A0] font-bold py-4 rounded-[12px] text-[15px] cursor-not-allowed">
                            Decline
                        </button>
                        <button
                            onClick={onNext}
                            className="flex-1 bg-[#D3D3D3] text-[#A0A0A0] font-bold py-4 rounded-[12px] text-[15px] transition-colors hover:bg-gray-400"
                        >
                            Accepted
                        </button>
                    </div>
                    <p className="mt-4 text-[10px] text-center text-[#666666] font-medium italic opacity-60">* This is a preview button to see the "Assigned" screen next</p>
                </div>
            </div>
        </div>
    );
}
