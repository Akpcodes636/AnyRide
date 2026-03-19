"use client";
import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WalletScreen() {
    const [cashEnabled, setCashEnabled] = useState(true);
    const router = useRouter();

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 font-sans">

            {/* Top Header */}
            <div className="flex justify-between items-start mb-8">
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-10">Wallet</h2>
                <button
                    onClick={() => router.push("/wallet/spending-trends")}
                    className="text-[#A20602] font-semibold text-[15px] hover:underline mt-2"
                >
                    See trends
                </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-32">

                {/* Left Column: Balance Card */}
                <div className="flex flex-col gap-6 w-full max-w-[480px]">
                    <div className="bg-[#F5F5F7] rounded-[16px] px-8 py-10 flex flex-col justify-start min-h-[260px]">
                        <div className="flex items-start gap-4">
                            {/* Wallet Icon Container / Image */}
                            <div className="bg-[#0B153D] text-white p-2.5 rounded-lg flex items-center justify-center mt-1">
                                <Wallet size={24} strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col gap-1 mt-1">
                                <span className="text-[15px] font-medium text-[#0B153D]">Your Balance</span>
                                <div className="text-[36px] font-extrabold text-[#0B153D] tracking-[0.2em] leading-none translate-y-2">
                                    ****
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push("/wallet/add-funds")}
                        className="w-full bg-[#0B153D] hover:bg-[#070e28] text-white font-semibold py-[18px] px-6 rounded-[12px] text-[16px] transition-colors shadow-sm"
                    >
                        Add funds
                    </button>
                    <button
                        onClick={() => router.push("/wallet/spending-trends")}
                        className="w-full bg-[#F5F5F7] hover:bg-[#EAEBEF] text-[#333333] font-semibold py-[18px] px-6 rounded-[12px] text-[16px] transition-colors shadow-sm"
                    >
                        Spending trends
                    </button>
                </div>

                {/* Right Column: Payment Methods */}
                <div className="flex flex-col mt-4 md:mt-2">
                    <h3 className="text-[28px] font-bold text-[#333333] mb-10">Payment methods</h3>

                    <div className="flex items-center justify-between w-full max-w-[320px]">
                        <span className="text-[16px] text-[#666666] font-medium">Pay with Cash</span>

                        {/* Custom Toggle Switch */}
                        <button
                            onClick={() => setCashEnabled(!cashEnabled)}
                            className={`w-[52px] h-[30px] flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer focus:outline-none ${cashEnabled ? 'bg-[#A20602]' : 'bg-gray-300'}`}
                            aria-pressed={cashEnabled}
                        >
                            <div
                                className={`bg-white w-[22px] h-[22px] rounded-full shadow-sm transform transition-transform duration-300 ease-in-out ${cashEnabled ? 'translate-x-[22px]' : 'translate-x-0'}`}
                            />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
