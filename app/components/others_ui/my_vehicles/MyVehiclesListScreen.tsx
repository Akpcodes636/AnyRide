"use client";

import React from 'react';

export default function MyVehiclesListScreen() {
    return (
        <div className="w-full max-w-5xl mx-auto bg-white p-4 md:p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none">
                    My Vehicles
                </h2>
                <button className="bg-[#0B153D] hover:bg-[#070e28] text-white font-bold text-[14px] px-6 py-3 rounded-[12px] transition-colors">
                    Add New Vehicle
                </button>
            </div>

            <div className="flex flex-col gap-6 max-w-[500px]">
                {/* Vehicle Card 1 - Verified */}
                <div className="bg-[#F5F5F7] rounded-[16px] p-4 flex flex-col gap-4">
                    <div className="flex gap-4">
                        <img
                            src="/images/car-placeholder.jpg"
                            alt="Car"
                            className="w-[140px] h-[100px] object-cover rounded-[12px] bg-gray-300"
                            onError={(e) => { e.currentTarget.src = "/images/phone-1.jpg"; }}
                        />
                        <div className="flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[16px] font-bold text-[#0B153D]">Car-236FGD</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00b230]"></div>
                                    <span className="text-[11px] font-bold text-[#00b230]">Active</span>
                                </div>
                            </div>
                            <span className="text-[14px] font-medium text-[#333333] mb-1">Toyota Corolla 2015</span>
                            <span className="text-[12px] text-[#A0A0A0] mb-3">
                                Seating Capacity: <span className="font-bold text-[#333333]">4 Passengers</span>
                            </span>
                            <div>
                                <span className="border border-[#00b230] text-[#00b230] text-[12px] font-bold px-4 py-1 rounded-full inline-block">
                                    Verified
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="w-full bg-[#EAEBEF] hover:bg-gray-200 text-[#0B153D] font-bold text-[14px] py-3 rounded-[8px] transition-colors">
                        Disactivate
                    </button>
                </div>

                {/* Vehicle Card 2 - Under review */}
                <div className="bg-[#F5F5F7] rounded-[16px] p-4 flex flex-col gap-4">
                    <div className="flex gap-4">
                        <img
                            src="/images/car-placeholder.jpg"
                            alt="Car"
                            className="w-[140px] h-[100px] object-cover rounded-[12px] bg-gray-300"
                            onError={(e) => { e.currentTarget.src = "/images/phone-1.jpg"; }}
                        />
                        <div className="flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[16px] font-bold text-[#0B153D]">Car-236FGD</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00b230]"></div>
                                    <span className="text-[11px] font-bold text-[#00b230]">Active</span>
                                </div>
                            </div>
                            <span className="text-[14px] font-medium text-[#333333] mb-1">Toyota Corolla 2015</span>
                            <span className="text-[12px] text-[#A0A0A0] mb-3">
                                Seating Capacity: <span className="font-bold text-[#333333]">4 Passengers</span>
                            </span>
                            <div>
                                <span className="border border-[#F2994A] text-[#F2994A] text-[12px] font-bold px-4 py-1 rounded-full inline-block">
                                    Under review
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="w-full bg-[#EAEBEF] hover:bg-gray-200 text-[#0B153D] font-bold text-[14px] py-3 rounded-[8px] transition-colors">
                        Disactivate
                    </button>
                </div>

                {/* Vehicle Card 3 - Declined */}
                <div className="bg-[#F5F5F7] rounded-[16px] p-4 flex flex-col gap-4">
                    <div className="flex gap-4">
                        <img
                            src="/images/car-placeholder.jpg"
                            alt="Car"
                            className="w-[140px] h-[100px] object-cover rounded-[12px] bg-gray-300"
                            onError={(e) => { e.currentTarget.src = "/images/phone-1.jpg"; }}
                        />
                        <div className="flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[16px] font-bold text-[#0B153D]">Car-236FGD</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00b230]"></div>
                                    <span className="text-[11px] font-bold text-[#00b230]">Active</span>
                                </div>
                            </div>
                            <span className="text-[14px] font-medium text-[#333333] mb-1">Toyota Corolla 2015</span>
                            <span className="text-[12px] text-[#A0A0A0] mb-3">
                                Seating Capacity: <span className="font-bold text-[#333333]">4 Passengers</span>
                            </span>
                            <div>
                                <span className="border border-[#EB5757] text-[#EB5757] text-[12px] font-bold px-4 py-1 rounded-full inline-block">
                                    Declined
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="w-full bg-[#EAEBEF] hover:bg-gray-200 text-[#0B153D] font-bold text-[14px] py-3 rounded-[8px] transition-colors">
                        Disactivate
                    </button>
                </div>
            </div>
        </div>
    );
}
