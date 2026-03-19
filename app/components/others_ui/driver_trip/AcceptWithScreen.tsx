"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { Navigation, MapPin, Minus, Plus, CreditCard } from 'lucide-react';

interface AcceptWithScreenProps {
    onAccept: () => void;
    onDecline: () => void;
    onToggleTopUp: () => void;
}

export default function AcceptWithScreen({ onAccept, onDecline, onToggleTopUp }: AcceptWithScreenProps) {
    const [fare, setFare] = useState(1084);

    return (
        <div className="w-full max-w-xl mx-auto py-4 md:py-8 font-sans">
            <h1 className="text-[32px] md:text-[40px] font-extrabold text-[#0B153D] leading-none mb-10">
                Accept with..
            </h1>

            <div className="bg-white rounded-[24px] shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-gray-50 overflow-hidden">
                <div className="p-6 md:p-8">
                    {/* Header Adjustment Bar */}
                    <div className="bg-[#F5F5F7] rounded-[16px] p-4 flex items-center justify-between mb-8">
                        <button
                            onClick={() => setFare(prev => Math.max(0, prev - 10))}
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#666666] hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <Minus size={20} strokeWidth={2.5} />
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="text-[22px] font-extrabold text-[#0B153D] tracking-tight">
                                CF {fare}
                            </span>
                        </div>

                        <button
                            onClick={() => setFare(prev => prev + 10)}
                            className="w-10 h-10 rounded-full bg-[#A20602] flex items-center justify-center text-white hover:bg-[#8e0502] transition-colors shadow-sm"
                        >
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

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={onDecline}
                            className="flex-1 bg-[#F5F5F7] hover:bg-gray-200 text-[#333333] font-bold py-4 rounded-[12px] text-[15px] transition-colors"
                        >
                            Decline
                        </button>
                        <button
                            onClick={onAccept}
                            className="flex-1 bg-[#0B153D] hover:bg-[#070e28] text-white font-bold py-4 rounded-[12px] text-[15px] transition-colors"
                        >
                            Accept
                        </button>
                    </div>

                    <button
                        onClick={onToggleTopUp}
                        className="mt-6 w-full text-[13px] text-[#E53935] font-bold underline decoration-2 underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
                    >
                        Preview "Top-up Wallet" Modal
                    </button>
                </div>
            </div>
        </div>
    );
}
