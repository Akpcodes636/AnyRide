"use client";

import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface TopUpWalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TopUpWalletModal({ isOpen, onClose }: TopUpWalletModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-[24px] w-full max-w-lg p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-[#0B153D] hover:bg-gray-100 p-2 rounded-full transition-colors"
                >
                    <X size={24} strokeWidth={2.5} />
                </button>

                <div className="flex flex-col items-center text-center mt-4">
                    <h2 className="text-[32px] font-extrabold text-[#333333] mb-6">
                        Top-up your Wallet
                    </h2>

                    <div className="bg-[#FFF4F4] px-4 py-3 rounded-full flex items-center gap-3 mb-10 w-fit">
                        <AlertCircle size={18} className="text-[#E53935]" />
                        <span className="text-[13px] font-bold text-[#E53935]">
                            You are running low on balances to cover the service charge
                        </span>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full bg-[#0B1233] hover:bg-[#070b22] text-white font-extrabold py-5 rounded-[16px] text-[18px] transition-colors shadow-lg"
                    >
                        Add funds
                    </button>
                </div>
            </div>
        </div>
    );
}
