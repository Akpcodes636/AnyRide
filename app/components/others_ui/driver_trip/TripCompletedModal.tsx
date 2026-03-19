"use client";

import React from 'react';
import { X, Check } from 'lucide-react';

interface TripCompletedModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TripCompletedModal({ isOpen, onClose }: TripCompletedModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-[32px] w-full max-w-xl p-8 md:p-10 relative shadow-2xl animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-[#0B153D] hover:bg-gray-100 p-2 rounded-full transition-colors"
                >
                    <X size={24} strokeWidth={2.5} />
                </button>

                <div className="flex flex-col items-center">
                    {/* Success Circle */}
                    <div className="w-16 h-16 bg-[#22C553] rounded-full flex items-center justify-center mb-6 shadow-[0_8px_20px_rgba(34,197,83,0.3)]">
                        <Check size={32} className="text-white" strokeWidth={3} />
                    </div>

                    <h2 className="text-[18px] md:text-[20px] font-bold text-[#666666] text-center mb-1">
                        Congratulations, you just earned yourself
                    </h2>

                    <div className="text-[48px] md:text-[56px] font-black text-[#0B153D] leading-tight mb-2">
                        -58.12 CFD
                    </div>

                    <p className="text-[18px] font-bold text-[#22C553] mb-8">
                        Added to your Wallet
                    </p>

                    {/* Fare breakdown card */}
                    <div className="w-full bg-[#f8f8fa] rounded-[24px] p-6 mb-8 border border-gray-100">
                        <h3 className="text-[16px] font-extrabold text-[#0B153D] mb-6">Fare breakdown</h3>

                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <span className="text-[12px] font-medium text-[#A0A0A0]">Trip details</span>
                                <span className="text-[12px] font-bold text-[#0B153D] text-right max-w-[180px]">
                                    From 4827 Willowbrook Lane, OH 44126 to Oaklahoma hix road
                                </span>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex justify-between items-center">
                                <span className="text-[12px] font-medium text-[#A0A0A0]">Completed on</span>
                                <span className="text-[12px] font-bold text-[#0B153D]">Sept 8th, 2025 08:33:21</span>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex justify-between items-center">
                                <span className="text-[12px] font-medium text-[#A0A0A0]">Base fare</span>
                                <span className="text-[12px] font-bold text-[#0B153D]">+$30</span>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex justify-between items-center">
                                <span className="text-[12px] font-medium text-[#A0A0A0]">Distance & time</span>
                                <span className="text-[12px] font-bold text-[#0B153D]">+$23.12 (for 3km in 8mins)</span>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex justify-between items-center">
                                <span className="text-[12px] font-medium text-[#A0A0A0]">Service fee</span>
                                <span className="text-[12px] font-bold text-[#0B153D]">-$5</span>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex justify-between items-center">
                                <span className="text-[12px] font-medium text-[#A0A0A0]">Total charged</span>
                                <span className="text-[12px] font-bold text-[#0B153D]">+$58.12</span>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex justify-between items-center">
                                <span className="text-[12px] font-medium text-[#A0A0A0]">Payment method</span>
                                <span className="text-[12px] font-bold text-[#0B153D]">Wallet/Card</span>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex justify-between items-center">
                                <span className="text-[12px] font-medium text-[#A0A0A0]">Status</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-[#22C553] rounded-full"></div>
                                    <span className="text-[12px] font-bold text-[#22C553]">Completed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full max-w-xs bg-[#0B1233] hover:bg-[#070b22] text-white font-extrabold py-4 rounded-[16px] text-[16px] transition-colors shadow-lg"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
