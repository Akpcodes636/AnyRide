"use client";

import React from 'react';
import Image from "next/image";
import { Navigation, MapPin, Phone, MessageSquare, CreditCard } from 'lucide-react';

interface OnTripScreenProps {
    onEndTrip: () => void;
}

export default function OnTripScreen({ onEndTrip }: OnTripScreenProps) {
    return (
        <div className="w-full max-w-xl mx-auto py-4 md:py-8 font-sans">
            <h1 className="text-[32px] md:text-[40px] font-extrabold text-[#0B153D] leading-none mb-1">
                On Trip
            </h1>
            <p className="text-[15px] font-medium text-[#666666] mb-10">
                You are currently driving the rider to the destination.
            </p>

            <div className="bg-white rounded-[24px] shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-gray-50 overflow-hidden">
                <div className="p-6 md:p-8">

                    {/* Progress Bar with Car */}
                    <div className="relative h-20 flex items-center mb-8 px-4">
                        <div className="w-full h-[3px] bg-gray-100 rounded-full relative">
                            {/* Dotted grey line */}
                            <div className="absolute top-0 left-0 w-full h-full border-b-[3px] border-dotted border-gray-200"></div>
                            {/* Car marker (Moved further left to show progress) */}
                            <div className="absolute left-[55%] -translate-y-[15px]">
                                <Image
                                    src="/images/Sedan_Side.png"
                                    width={45}
                                    height={20}
                                    alt="Car"
                                    className="object-contain"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>
                            {/* Destination marker */}
                            <div className="absolute right-0 -translate-y-[10px] text-[#A20602]">
                                <MapPin size={22} fill="currentColor" strokeWidth={1} />
                            </div>
                        </div>
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

                    {/* Route Info */}
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

                    {/* Payment Badge */}
                    <div className="flex items-center gap-2 bg-[#F0FFF4] px-4 py-2.5 rounded-[12px] mb-10 w-fit">
                        <CreditCard size={16} className="text-[#22C553]" />
                        <span className="text-[13px] font-bold text-[#22C553]">In-app payment</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button className="flex items-center justify-center gap-2 px-6 bg-[#F5F5F7] border border-gray-200 hover:bg-gray-200 text-[#0B153D] font-bold py-4 rounded-[12px] text-[15px] transition-colors">
                            <Phone size={18} /> Call
                        </button>
                        <button className="flex items-center justify-center gap-2 px-6 bg-[#F5F5F7] border border-gray-200 hover:bg-gray-200 text-[#0B153D] font-bold py-4 rounded-[12px] text-[15px] transition-colors">
                            <MessageSquare size={18} /> Chat
                        </button>
                        <button
                            onClick={onEndTrip}
                            className="flex-1 bg-[#0B153D] hover:bg-[#071333] text-white font-bold py-4 rounded-[12px] text-[15px] transition-colors shadow-lg shadow-blue-900/10"
                        >
                            End Trip
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
