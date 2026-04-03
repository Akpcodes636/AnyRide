"use client";
import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FundWalletScreen() {
    const [amount, setAmount] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Funding: ", amount);
        router.push("/wallet/add-funds/payment-method");
    };

    return (
        <div className="w-full container mx-auto ">

            {/* Top Header */}
            <h2 className="text-[32px] md:text-[48px] font-bold text-[#333333] leading-none mb-10">
                Fund Wallet
            </h2>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20">

                {/* Left Column: Balance Card */}
                <div className="bg-[#F5F5F7] rounded-[8px] px-[16px] py-[32px] flex flex-col justify-start min-h-[320px]">
                    <div className="flex items-start gap-4">
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

                {/* Right Column: Add Funds Form */}
                <div className="flex flex-col mt-4 md:mt-2">

                    <form className="flex flex-col gap-4 w-full max-w-full md:max-w-full lg:max-w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="amount" className="text-[18px] font-semibold text-[#555A7B]">
                                Amount to fund
                            </label>

                            <input
                                id="amount"
                                type="number"
                                placeholder=""
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-[#FAFAFA] border-none rounded-[8px] px-4 py-3 h-[48px] focus:outline-none focus:ring-1 focus:ring-[#0B153D]"
                                required
                            />
                        </div>

                        {/* Dark Blue Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#0B153D] hover:bg-[#070e28] text-white font-semibold py-[14px] px-4 rounded-[8px] text-[18px] leading-[160%] tracking-[-2%] transition-colors mt-2"
                        >
                            Proceed
                        </button>
                    </form>

                </div>

            </div>
        </div>
    );
}
