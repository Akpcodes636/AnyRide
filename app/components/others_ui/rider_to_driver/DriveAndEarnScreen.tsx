"use client";

import React from 'react';
import { Globe, Bike, Banknote } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DriveAndEarnScreen() {
    const router = useRouter();

    return (
        <div className="w-full max-w-5xl mx-auto bg-white font-sans">
            {/* Content Box */}
            <div className="flex flex-col items-center justify-center p-8 md:p-16 lg:pt-16 lg:pb-24 max-w-4xl mx-auto w-full text-center">
                <h1 className="text-[36px] md:text-[45px] font-extrabold text-[#0B153D] leading-[1.15] mb-6">
                    Drive and Earn<br />on AnyRide
                </h1>
                <p className="text-[15px] text-[#0B153D] mb-12 max-w-[480px] font-medium leading-[1.6]">
                    Earn on your own schedule by driving people in your city.<br className="hidden md:block" />
                    Use your car or motorcycle and start making money when<br className="hidden md:block" />
                    it works for you.
                </p>

                <div className="flex flex-col md:flex-row gap-5 mb-16 w-full justify-center">
                    {/* Card 1 */}
                    <div className="bg-[#FFF4F4] px-5 py-4 rounded-[12px] flex items-center gap-4 text-left w-full md:w-1/3 max-w-[280px]">
                        <div className="w-10 h-10 rounded-[8px] bg-[#E53935] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                            <Globe size={20} />
                        </div>
                        <span className="text-[13px] sm:text-[14px] font-bold text-[#0B153D] leading-snug">
                            Choose when<br />you're online
                        </span>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#F0F5FF] px-5 py-4 rounded-[12px] flex items-center gap-4 text-left w-full md:w-1/3 max-w-[280px]">
                        <div className="w-10 h-10 rounded-[8px] bg-[#4285F4] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                            <Bike size={20} />
                        </div>
                        <span className="text-[13px] sm:text-[14px] font-bold text-[#0B153D] leading-snug">
                            Drive with your car or<br />motorcycle
                        </span>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#F0FFF4] px-5 py-4 rounded-[12px] flex items-center gap-4 text-left w-full md:w-1/3 max-w-[280px]">
                        <div className="w-10 h-10 rounded-[8px] bg-[#0F9D58] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                            <Banknote size={20} />
                        </div>
                        <span className="text-[13px] sm:text-[14px] font-bold text-[#0B153D] leading-snug">
                            Get paid per trip,<br />transparently
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => router.push("/drivers/choose-location")}
                    className="bg-[#0B153D] hover:bg-[#070e28] text-white font-semibold py-4 md:py-4 px-12 rounded-[12px] w-full max-w-[400px] text-[15px] transition-colors shadow-md mb-6"
                >
                    Continue as Driver
                </button>

                <button
                    onClick={() => router.push("/en/drivers/dashboard")}
                    className="text-[14px] font-bold text-[#0B153D] underline underline-offset-4 hover:text-[#A20602] transition-colors"
                >
                    Already have an account? Sign in
                </button>
            </div>
        </div>
    );
}


