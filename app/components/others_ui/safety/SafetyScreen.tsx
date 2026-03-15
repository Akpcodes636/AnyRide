"use client";

import React from 'react';
import { ChevronRight, Phone } from 'lucide-react';

export default function SafetyScreen() {
    const listItems = [
        "Driver's verification",
        "Driver's verification",
        "Driver's verification",
        "Driver's verification",
        "Driver's verification",
        "Driver's verification",
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
            <div className="flex flex-col md:flex-row gap-10 lg:gap-20 items-center md:items-start justify-between">

                {/* Left Content Area */}
                <div className="flex-1 w-full max-w-[500px]">
                    <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-2">
                        Safety
                    </h2>
                    <p className="text-[#666666] text-[15px] mb-8">
                        Here's how we get you protected
                    </p>

                    <div className="flex flex-col rounded-[12px] bg-[#F5F5F7] overflow-hidden mb-6">
                        {listItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-200/50 transition-colors">
                                    <span className="text-[15px] font-bold text-[#0B153D]">
                                        {item}
                                    </span>
                                    <ChevronRight size={18} className="text-[#0B153D] opacity-60" />
                                </div>
                                {/* Divider except for last item */}
                                {index < listItems.length - 1 && (
                                    <div className="w-full h-[1px] bg-white"></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        <button className="w-full bg-[#E53935] hover:bg-[#c62828] text-white flex items-center justify-center gap-2 font-semibold h-[52px] rounded-[8px] text-[15px] transition-colors shadow-sm">
                            <Phone size={18} fill="currentColor" /> Call 990
                        </button>
                        <button className="w-full bg-[#F5F5F7] hover:bg-[#EAEBEF] text-[#333333] font-bold h-[52px] rounded-[8px] text-[15px] transition-colors shadow-sm">
                            Emergency Contacts
                        </button>
                    </div>
                </div>

                {/* Right Image Area */}
                <div className="flex-1 w-full max-w-[400px] flex justify-center items-center">
                    <img
                        src="/images/phone-1.jpg"
                        alt="Safety feature preview"
                        className="w-[80%] md:w-full max-w-[320px] object-contain drop-shadow-2xl"
                        onError={(e) => {
                            // Fallback if the image name doesn't match perfectly, though we use the one provided
                            e.currentTarget.src = "/images/Frame 2147227005.png";
                        }}
                    />
                </div>

            </div>
        </div>
    );
}
