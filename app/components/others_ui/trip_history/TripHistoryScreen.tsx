"use client";

import React from 'react';
import { ChevronDown, Send, MapPin, Star } from 'lucide-react';

export default function TripHistoryScreen() {
    const historyList = [1, 2, 3]; // Mock data items to match visual repeating

    return (
        <div className="w-full max-w-5xl mx-auto bg-white p-4 md:p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#0B153D] leading-none">
                    Your trip history
                </h2>
                <div className="flex items-center gap-2 bg-[#F5F5F7] px-4 py-2 rounded-full cursor-pointer hover:bg-[#EAEBEF] transition-colors">
                    <span className="text-[14px] font-semibold text-[#666666]">This week</span>
                    <ChevronDown size={16} className="text-[#666666]" />
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {historyList.map((item, index) => (
                    <div key={index} className="flex flex-col border border-gray-100 rounded-[16px] p-5">
                        {/* Top header */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/images/rider-1.png"
                                    alt="Rider profile"
                                    onError={(e) => { e.currentTarget.src = "/images/User.png"; }}
                                    className="w-12 h-12 rounded-full object-cover bg-gray-100"
                                />
                                <div className="flex flex-col">
                                    <span className="text-[15px] font-bold text-[#333333]">Rider's name</span>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                className={i < 4 ? "text-[#F2C94C] fill-[#F2C94C]" : "text-[#F2C94C]"}
                                                strokeWidth={i < 4 ? 0 : 2}
                                            />
                                        ))}
                                        <span className="text-[13px] font-bold text-[#666666] ml-1">4.8</span>
                                    </div>
                                </div>
                            </div>
                            <span className="text-[18px] font-extrabold text-[#0B153D]">
                                + CF 1084
                            </span>
                        </div>

                        {/* Middle Gray Box */}
                        <div className="bg-[#EAEBEF] rounded-[8px] p-4 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 mb-4">
                            <div className="flex items-start gap-3 flex-1">
                                <Send size={20} className="text-[#666666] mt-1 shrink-0" strokeWidth={1.5} />
                                <div className="flex flex-col">
                                    <span className="text-[12px] text-[#A0A0A0] font-semibold">Pickup</span>
                                    <span className="text-[14px] font-semibold text-[#333333]">4827 Willowbrook Lane, OH 44126</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 flex-1">
                                <MapPin size={20} className="text-[#666666] mt-1 shrink-0" strokeWidth={1.5} />
                                <div className="flex flex-col">
                                    <span className="text-[12px] text-[#A0A0A0] font-semibold">Destination</span>
                                    <span className="text-[14px] font-semibold text-[#333333]">123 Main St, Springfield, IL 62704</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex justify-between items-center">
                            <span className="text-[15px] font-bold text-[#0B153D]">Today</span>
                            <span className="border border-[#00b230] text-[#00b230] text-[13px] font-bold px-4 py-1 rounded-full">
                                Completed
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
