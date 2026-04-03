"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCardScreen() {
    const [cardNumber, setCardNumber] = useState('4412 8272 72626 9721');
    const [expiry, setExpiry] = useState('07/27');
    const [cvv, setCvv] = useState('****');
    const [accountName, setAccountName] = useState('Saleem Ammar');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Card Added", { cardNumber, expiry, cvv, accountName });
        router.push("/wallet");
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 font-sans flex flex-col items-center justify-center min-h-[500px]">

            {/* Header */}
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-2 text-center">
                Add debit/credit card
            </h2>
            <p className="text-[#666666] text-[15px] mb-12 text-center">
                Add your bank credit/debit card to pay with
            </p>

            {/* Main Form Container */}
            <div className="bg-[#F6F7F9] rounded-[16px] p-8 w-full max-w-[500px]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Card Number Input */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[14px] font-medium text-[#777777]">Card number</label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full h-[48px] bg-white border-none rounded-[8px] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#0B153D] text-[15px] font-medium text-[#333] tracking-wider"
                            />
                            {/* Fake Mastercard Logo inside input */}
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center pointer-events-none">
                                <div className="w-4 h-4 rounded-full bg-[#EA001B] opacity-90 -mr-1.5 z-10"></div>
                                <div className="w-4 h-4 rounded-full bg-[#F7A000] opacity-90 mix-blend-multiply"></div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Expiry Date */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[14px] font-medium text-[#777777]">Expiry date</label>
                            <input
                                type="text"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                className="w-full h-[48px] bg-white border-none rounded-[8px] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#0B153D] text-[15px] font-medium text-[#333]"
                            />
                        </div>

                        {/* CVV */}
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-[14px] font-medium text-[#777777]">CVV</label>
                            <input
                                type="password"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="w-full h-[48px] bg-white border-none rounded-[8px] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#0B153D] text-[15px] font-medium text-[#333]"
                            />
                        </div>
                    </div>

                    {/* Account Name */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[14px] font-medium text-[#777777]">Account name</label>
                        <input
                            type="text"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            className="w-full h-[48px] bg-white border-none rounded-[8px] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#0B153D] text-[15px] font-medium text-[#333]"
                        />
                    </div>

                    {/* Submit Button inside the gray container or under it */}
                </form>
            </div>

            {/* Submit Button matching the position in the design */}
            <div className="w-full max-w-[500px] mt-6">
                <button
                    type="button"
                    className="w-full bg-[#0B153D] hover:bg-[#070e28] text-white font-semibold h-[54px] rounded-[8px] text-[15px] transition-colors"
                >
                    Add card
                </button>
            </div>

        </div>
    );
}
