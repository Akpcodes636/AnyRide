"use client";

import React from 'react';
import { Globe, Bike, Banknote } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DriveAndEarnScreen() {
    const router = useRouter();

    return (
        <div className="w-full container mx-auto py-[50px]">
            {/* Content Box */}
            <div className="flex flex-col items-center justify-center  w-full text-center">
                <h1 className="text-[36px] md:text-[48px] font-bold text-[#02093A] leading-[120%] mb-[8px]">
                    Drive and Earn<br />on AnyRide
                </h1>
                <p className="text-[18px] text-[#02093A] mb-[74px] max-w-[517px] text-center font-medium leading-[160%] ">
                    Earn on your own schedule by driving people in your city.
                    Use your car or motorcycle and start making money when
                    it works for you.
                </p>

                <div className="flex flex-col md:flex-row gap-5 mb-16 w-full justify-center">
                    {/* Card 1 */}
                    <div className="bg-[#FFF4F4] px-5 py-4 rounded-[12px] flex items-center gap-4 text-left w-full md:w-1/3 max-w-[280px]">
                        <div className="w-10 h-10 rounded-[8px] bg-[#E53935] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                            <Globe size={20} />
                        </div>
                        <span className="text-[13px] sm:text-[18px] font-bold text-[#02093A] leading-snug">
                            Choose when you&apos;re online
                        </span>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#F0F5FF] px-5 py-4 rounded-[12px] flex items-center gap-4 text-left w-full md:w-1/3 max-w-[280px]">
                        <div className="w-10 h-10 rounded-[8px] bg-[#4285F4] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                            <Bike size={20} />
                        </div>
                        <span className="text-[13px] sm:text-[18px] font-bold text-[#02093A] leading-snug">
                            Drive with your car or motorcycle
                        </span>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#F0FFF4] px-5 py-4 rounded-[12px] flex items-center gap-4 text-left w-full md:w-1/3 max-w-[280px]">
                        <div className="w-10 h-10 rounded-[8px] bg-[#0F9D58] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                            <Banknote size={20} />
                        </div>
                        <span className="text-[13px] sm:text-[18px] font-bold text-[#02093A] leading-snug">
                            Get paid per trip, transparently
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => router.push("/drivers/choose-location")}
                    className="bg-[#0B153D] hover:bg-[#070e28] text-white font-semibold py-4 md:py-4 px-12 rounded-[12px] w-full cursor-pointer max-w-[517px] text-[18px] transition-colors shadow-md mb-6"
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


