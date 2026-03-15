"use client";

import React from 'react';
import { ChevronDown, X } from 'lucide-react';

export default function AddNewVehicleModalStep1() {
    return (
        <div className="w-full max-w-5xl mx-auto font-sans bg-[#F5F5F7] min-h-[850px] flex items-center justify-center p-4">
            <div className="relative w-full max-w-[480px] bg-white rounded-[24px] p-6 md:p-10 shadow-xl border border-gray-100">
                {/* Close Button floating outside top-right */}
                <button className="absolute -top-4 -right-4 md:-top-14 md:right-0 w-10 h-10 bg-[#0B153D] rounded-full flex items-center justify-center text-white hover:bg-black transition-colors shadow-lg z-10">
                    <X size={20} strokeWidth={2.5} />
                </button>

                <h2 className="text-[28px] font-extrabold text-[#333333] mb-6">
                    Add New Vehicle
                </h2>

                {/* Step Indicator */}
                <div className="bg-[#F5F5F7] rounded-[16px] p-4 flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 shrink-0 rounded-full border-[3px] border-l-[#0B153D] border-t-[#0B153D] border-r-[#EAEBEF] border-b-[#EAEBEF] flex items-center justify-center bg-white">
                        <span className="text-[14px] font-bold text-[#0B153D]">1/2</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[16px] font-bold text-[#333333]">Vehicle Details</span>
                        <span className="text-[12px] font-medium text-[#666666]">Enter vehicle details.</span>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-5 mb-10">
                    <div>
                        <label className="block text-[13px] font-semibold text-[#0B153D] mb-2 px-1">
                            Car Make & Model
                        </label>
                        <input
                            type="text"
                            defaultValue="Xiaomi 647"
                            className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-3.5 text-[14px] font-semibold text-[#0B153D] outline-none focus:border-[#0B153D] focus:ring-1 focus:ring-[#0B153D] transition-shadow placeholder:text-gray-400 placeholder:font-normal"
                        />
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-[#0B153D] mb-2 px-1">
                            Year of Manufacture
                        </label>
                        <div className="relative">
                            <select className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-3.5 text-[14px] font-semibold text-[#0B153D] outline-none appearance-none focus:border-[#0B153D] focus:ring-1 focus:ring-[#0B153D] cursor-pointer">
                                <option>2019</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#333333] pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-[#0B153D] mb-2 px-1">
                            Plate Number
                        </label>
                        <input
                            type="text"
                            defaultValue="HFKD783"
                            className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-3.5 text-[14px] font-semibold text-[#0B153D] outline-none focus:border-[#0B153D] focus:ring-1 focus:ring-[#0B153D] transition-shadow placeholder:text-gray-400 placeholder:font-normal"
                        />
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-[#0B153D] mb-2 px-1">
                            Seating Capacity
                        </label>
                        <div className="relative">
                            <select className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-3.5 text-[14px] font-semibold text-[#0B153D] outline-none appearance-none focus:border-[#0B153D] focus:ring-1 focus:ring-[#0B153D] cursor-pointer">
                                <option>Four</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#333333] pointer-events-none" />
                        </div>
                    </div>
                </div>

                <button className="w-full bg-[#0B153D] hover:bg-[#070e28] text-white font-bold text-[16px] py-4 rounded-[12px] transition-colors shadow-md">
                    Add New Vehicle
                </button>
            </div>
        </div>
    );
}
