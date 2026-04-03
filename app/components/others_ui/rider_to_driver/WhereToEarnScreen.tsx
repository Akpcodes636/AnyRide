"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WhereToEarnScreen() {
    const [location, setLocation] = useState('Congo');
    const router = useRouter();

    return (
        <div className="w-full container mx-auto py-[50px]">
            {/* Content Box */}
            <div className="flex flex-col items-center justify-center  text-center">
                <h1 className="text-[36px] md:text-[48px] font-bold text-[#0B153D] leading-[120%] mb-12 max-w-[419px] mx-auto w-full">
                    Where will you like to Earn?
                </h1>

                <div className="w-full max-w-[628px] text-left mb-16 relative">
                    <label className="block text-[14px] font-semibold text-[#02093A] mb-3 px-1">
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

                <button
                    onClick={() => router.push("/drivers/driver-requirements")}
                    className="bg-[#0B153D] hover:bg-[#070e28] text-white font-semibold py-4 px-12 rounded-[12px] w-full max-w-[518.5px] text-[15px] transition-colors shadow-md"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}


