"use client";

import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export default function WhereToEarnScreen() {
    const [location, setLocation] = useState('Congo');

    return (
        <div className="w-full max-w-5xl mx-auto bg-white overflow-hidden font-sans">
            {/* Header */}
            <header className="flex justify-between items-center p-5 md:px-8 border-b border-gray-50">
                <img src="/images/Anyride.png" alt="AnyRide Logo" className="h-7 object-contain" />
                <button className="flex items-center gap-2 bg-[#F5F5F7] px-4 py-2 rounded-full text-[14px] font-semibold text-[#0B153D] hover:bg-gray-200 transition-colors">
                    <Globe size={16} /> EN <ChevronDown size={14} />
                </button>
            </header>

            {/* Content Box */}
            <div className="flex flex-col items-center justify-center p-8 py-20 md:py-32 max-w-lg mx-auto w-full text-center">
                <h1 className="text-[36px] md:text-[45px] font-extrabold text-[#0B153D] leading-[1.15] mb-12">
                    Where will you<br />like to Earn?
                </h1>

                <div className="w-full text-left mb-16 relative">
                    <label className="block text-[12px] font-semibold text-[#666666] mb-3 px-1">
                        Enter your location
                    </label>
                    <div className="relative">
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-[#F5F5F7] border-none rounded-[12px] px-5 py-4 appearance-none focus:outline-none focus:ring-1 focus:ring-[#0B153D] text-[15px] font-bold text-[#0B153D] cursor-pointer"
                        >
                            <option value="Congo">Congo</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Ghana">Ghana</option>
                        </select>
                        <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-[#0B153D]">
                            <ChevronDown size={18} strokeWidth={2.5} />
                        </div>
                    </div>
                </div>

                <button className="bg-[#0B153D] hover:bg-[#070e28] text-white font-semibold py-4 px-12 rounded-[12px] w-full text-[15px] transition-colors shadow-md">
                    Continue
                </button>
            </div>
        </div>
    );
}
