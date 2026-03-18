"use client";

import React from 'react';
import { ChevronDown, Star } from 'lucide-react';

export default function ReviewHistoryScreen() {
    return (
        <div className="w-full max-w-5xl mx-auto bg-white p-4 md:p-8 font-sans">
            {/* Header section with title and date filter */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#0B153D] leading-none">
                    Review history
                </h2>
                <button className="flex items-center gap-2 bg-[#F5F5F7] px-4 py-2 rounded-full text-[14px] font-medium text-[#333333] hover:bg-gray-200 transition-colors">
                    This week
                    <ChevronDown size={16} className="text-[#666666]" />
                </button>
            </div>

            {/* Top stats section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                {/* Stats cards */}
                <div className="flex gap-4">
                    {/* Average ratings */}
                    <div className="bg-[#F5F5F7] rounded-[12px] p-4 flex items-center gap-4 min-w-[200px]">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                            <Star size={20} className="text-[#0B153D] fill-[#0B153D]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[12px] font-medium text-[#A0A0A0] mb-0.5">Average ratings</span>
                            <span className="text-[24px] font-extrabold text-[#0B153D] leading-none">4.8/5</span>
                        </div>
                    </div>

                    {/* Overall tips */}
                    <div className="bg-[#F5F5F7] rounded-[12px] p-4 flex items-center gap-4 min-w-[200px]">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                            <Star size={20} className="text-[#0B153D] fill-[#0B153D]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[12px] font-medium text-[#A0A0A0] mb-0.5">Overall tips</span>
                            <span className="text-[24px] font-extrabold text-[#0B153D] leading-none">500</span>
                        </div>
                    </div>
                </div>

                {/* Filter / Sort by */}
                <div className="flex flex-col items-start md:items-end">
                    <span className="text-[10px] font-bold text-[#A0A0A0] tracking-wider mb-2">SORT BY</span>
                    <div className="flex gap-2 flex-wrap">
                        <button className="bg-[#0B153D] text-white text-[13px] font-bold px-5 py-1.5 rounded-full border border-[#0B153D]">
                            All
                        </button>
                        <button className="bg-white text-[#333333] text-[13px] font-bold px-4 py-1.5 rounded-full border border-gray-300 flex items-center gap-1 hover:bg-gray-50 transition-colors">
                            5 <Star size={12} className="text-[#F2C94C] fill-[#F2C94C]" />
                        </button>
                        <button className="bg-white text-[#333333] text-[13px] font-bold px-4 py-1.5 rounded-full border border-gray-300 flex items-center gap-1 hover:bg-gray-50 transition-colors">
                            4 <Star size={12} className="text-[#F2C94C] fill-[#F2C94C]" />
                        </button>
                        <button className="bg-white text-[#333333] text-[13px] font-bold px-4 py-1.5 rounded-full border border-gray-300 flex items-center gap-1 hover:bg-gray-50 transition-colors">
                            3 <Star size={12} className="text-[#F2C94C] fill-[#F2C94C]" />
                        </button>
                        <button className="bg-white text-[#333333] text-[13px] font-bold px-4 py-1.5 rounded-full border border-gray-300 flex items-center gap-1 hover:bg-gray-50 transition-colors">
                            2 <Star size={12} className="text-[#F2C94C] fill-[#F2C94C]" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews list title */}
            <h3 className="text-[16px] font-bold text-[#0B153D] mb-6">
                Reviews <span className="text-[#A0A0A0] font-medium">(56)</span>
            </h3>

            {/* Reviews List */}
            <div className="flex flex-col gap-4">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-[#F9F9FB] rounded-[16px] p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/images/Customer-1.jpg"
                                    alt="Rider"
                                    className="w-10 h-10 rounded-full object-cover shrink-0"
                                    onError={(e) => { e.currentTarget.src = "/images/About-rider.jpg"; }}
                                />
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-bold text-[#333333] mb-0.5">Rider's name</span>
                                    <div className="flex items-center gap-1">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={10} className="text-[#F2C94C] fill-[#F2C94C]" />
                                            ))}
                                        </div>
                                        <span className="text-[11px] font-semibold text-[#A0A0A0] ml-1">4.8</span>
                                    </div>
                                </div>
                            </div>
                            <span className="text-[14px] font-bold text-[#0B153D]">+ CF 1084</span>
                        </div>
                        <p className="text-[13px] text-[#666666] leading-relaxed">
                            Driver was punctual, polite, and the car was very clean. Smooth and safe driving the whole way. Really appreciated the professionalism and friendly conversation. Would definitely ride again.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
