"use client";
import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PayWithScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Logo mockups for presentation since actual assets aren't provided
    const PaymentLogo = ({ name, color = "#333" }: { name: string, color?: string }) => (
        <div
            onClick={() => router.push("/wallet/add-funds/payment-method/add-card")}
            className="flex items-center justify-center w-full h-[54px] bg-white rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-50/50 hover:border-gray-200 transition-colors cursor-pointer px-4"
        >
            <span className="font-bold text-[14px] truncate" style={{ color }}>{name}</span>
        </div>
    );

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">

            {/* Top Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none">
                    Pay with
                </h2>

                {/* Search Bar */}
                <div className="relative w-full max-w-[400px]">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for anything"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] border-none rounded-[8px] text-[14px] outline-none focus:ring-1 focus:ring-gray-300 transition-shadow"
                    />
                </div>
            </div>

            {/* Main Content Grid (3 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">

                {/* Column 1: African Payments */}
                <div className="flex flex-col">
                    <h3 className="text-[16px] font-semibold text-[#0B153D] mb-6 text-center">African Payments</h3>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <PaymentLogo name="AnyPay" color="#0B153D" />
                        <PaymentLogo name="Airtel Money" color="#e40000" />
                        <PaymentLogo name="PesaPal" color="#1c94d2" />
                        <PaymentLogo name="Equitel" color="#d36f29" />
                        <PaymentLogo name="IntaSend" color="#0ea5e9" />
                        <PaymentLogo name="M-Pesa" color="#4ca738" />
                        <PaymentLogo name="MoMo" color="#ffcc00" />
                        <PaymentLogo name="O-Pay" color="#00a859" />
                        <PaymentLogo name="Orange" color="#ff6600" />
                    </div>

                    <button className="flex items-center justify-center gap-2 text-[14px] font-medium text-gray-500 hover:text-gray-800 transition-colors">
                        Show more options
                        <ChevronDown size={16} />
                    </button>
                </div>

                {/* Column 2: American Payments */}
                <div className="flex flex-col">
                    <h3 className="text-[16px] font-semibold text-[#0B153D] mb-6 text-center">American Payments</h3>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <PaymentLogo name="Payoneer" color="#ff4800" />
                        <PaymentLogo name="G Pay" color="#1a73e8" />
                        <PaymentLogo name="PayPal" color="#003087" />
                        <PaymentLogo name="Zelle" color="#7d51ff" />
                        <PaymentLogo name="Cash App" color="#00d632" />
                        <PaymentLogo name="Venmo" color="#008cff" />
                        <PaymentLogo name="Skrill" color="#800020" />
                        <PaymentLogo name="Worldpay" color="#eb1d24" />
                        <PaymentLogo name="Wise" color="#00b9ff" />
                    </div>

                    <button className="flex items-center justify-center gap-2 text-[14px] font-medium text-gray-500 hover:text-gray-800 transition-colors">
                        Show more options
                        <ChevronDown size={16} />
                    </button>
                </div>

                {/* Column 3: Card Options */}
                <div className="flex flex-col">
                    <h3 className="text-[16px] font-semibold text-[#0B153D] mb-6 text-center">Card options</h3>

                    <div className="grid grid-cols-3 gap-4">
                        {/* Simulated Logos for Mastercard, Visa, Verve */}
                        <PaymentLogo name="Mastercard" color="#eb001b" />
                        <PaymentLogo name="VISA" color="#1434cb" />
                        <PaymentLogo name="Verve" color="#00803e" />
                    </div>
                </div>

            </div>
        </div>
    );
}
