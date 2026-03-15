"use client";

import React from 'react';
import { Info } from 'lucide-react';

export default function MyVehiclesEmptyScreen() {
    return (
        <div className="w-full max-w-5xl mx-auto bg-white p-4 md:p-8 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-10">
                My Vehicles
            </h2>

            <div className="flex flex-col max-w-[500px] w-full mx-auto">
                <div className="bg-[#F5F5F7] rounded-[16px] flex flex-col items-center justify-center text-center px-4 py-24 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#EAEBEF] flex items-center justify-center mb-4">
                        <Info size={24} className="text-[#0B153D]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[20px] font-bold text-[#0B153D] mb-2">No registered vehicle yet.</h3>
                    <p className="text-[14px] font-medium text-[#666666]">Start your driving journey by adding a vehicle</p>
                </div>

                <button className="w-full bg-[#0B153D] hover:bg-[#070e28] text-white font-bold text-[16px] py-4 rounded-[12px] transition-colors shadow-md">
                    Add New Vehicle
                </button>
            </div>
        </div>
    );
}
