"use client";

import React, { useState } from 'react';
import { PenLine } from 'lucide-react';

export default function SetPasswordScreen() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Password updated", { password, confirmPassword });
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-2">
                Set Password
            </h2>
            <p className="text-[#666666] text-[15px] mb-12">
                Set/Change your login password
            </p>

            <div className="w-full max-w-[500px]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* Enter Password */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[14px] font-semibold text-[#0B153D] pl-1 font-sans">Enter Password</label>
                        <div className="relative w-full">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full bg-white border border-[#E5E7EB] rounded-[8px] px-4 py-3 h-[48px] focus:outline-none focus:ring-1 focus:ring-[#0B153D] text-[15px] text-[#333] placeholder-gray-400"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#0B153D] opacity-60 hover:opacity-100 transition-opacity">
                                <PenLine size={18} strokeWidth={2} />
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[14px] font-semibold text-[#0B153D] pl-1 font-sans">Confirm Password</label>
                        <div className="relative w-full">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                className="w-full bg-white border border-[#E5E7EB] rounded-[8px] px-4 py-3 h-[48px] focus:outline-none focus:ring-1 focus:ring-[#0B153D] text-[15px] text-[#333] placeholder-gray-400"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#0B153D] opacity-60 hover:opacity-100 transition-opacity">
                                <PenLine size={18} strokeWidth={2} />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#0B153D] hover:bg-[#070e28] text-white font-semibold h-[52px] rounded-[8px] text-[15px] transition-colors flex items-center justify-center shadow-sm mt-4"
                    >
                        Confirm Password
                    </button>

                </form>
            </div>
        </div>
    );
}
