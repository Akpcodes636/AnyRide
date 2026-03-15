"use client";

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetPasswordScreen() {
    // For demonstration, pre-filling this to show the error state from the screenshot
    const [currentPassword, setCurrentPassword] = useState('AGfg6@335');
    const [newPassword, setNewPassword] = useState('Yu775@234');
    const [confirmPassword, setConfirmPassword] = useState('Yu775@234');

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Simulated error state based on the screenshot
    const [hasError, setHasError] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple mock validation reset
        setHasError(false);
        console.log("Password Reset", { currentPassword, newPassword, confirmPassword });
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-2">
                Reset Password
            </h2>
            <p className="text-[#666666] text-[15px] mb-12">
                Set/Change your login password
            </p>

            <div className="w-full max-w-[500px]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* Current Password */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[14px] font-medium text-[#0B153D] pl-1 font-sans">Current Password</label>
                        <div className="relative w-full">
                            <input
                                type={showCurrent ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => {
                                    setCurrentPassword(e.target.value);
                                    if (hasError) setHasError(false);
                                }}
                                placeholder="Enter current password"
                                className={`w-full bg-white border ${hasError ? 'border-[#ff4d4f]' : 'border-[#E5E7EB]'} rounded-[8px] px-4 py-3 h-[48px] focus:outline-none focus:ring-1 focus:ring-[#0B153D] text-[15px] text-[#333] placeholder-gray-500`}
                            />
                            <div
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#0B153D] opacity-80 hover:opacity-100 transition-opacity"
                                onClick={() => setShowCurrent(!showCurrent)}
                            >
                                {showCurrent ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
                            </div>
                        </div>
                        {hasError && (
                            <div className="flex justify-between items-center mt-1 px-1">
                                <span className="text-[13px] text-[#ff4d4f]">Incorrect password!</span>
                                <span className="text-[13px] text-[#0B153D] font-medium cursor-pointer hover:underline">Forgot Password?</span>
                            </div>
                        )}
                    </div>

                    {/* New Password */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[14px] font-medium text-[#0B153D] pl-1 font-sans">New Password</label>
                        <div className="relative w-full">
                            <input
                                type={showNew ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full bg-white border border-[#E5E7EB] rounded-[8px] px-4 py-3 h-[48px] focus:outline-none focus:ring-1 focus:ring-[#0B153D] text-[15px] text-[#333] placeholder-gray-500"
                            />
                            <div
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#0B153D] opacity-80 hover:opacity-100 transition-opacity"
                                onClick={() => setShowNew(!showNew)}
                            >
                                {showNew ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-[14px] font-medium text-[#0B153D] pl-1 font-sans">Confirm Password</label>
                        <div className="relative w-full">
                            <input
                                type={showConfirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                className="w-full bg-white border border-[#E5E7EB] rounded-[8px] px-4 py-3 h-[48px] focus:outline-none focus:ring-1 focus:ring-[#0B153D] text-[15px] text-[#333] placeholder-gray-500"
                            />
                            <div
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#0B153D] opacity-80 hover:opacity-100 transition-opacity"
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#0B153D] hover:bg-[#070e28] text-white font-semibold h-[52px] rounded-[8px] text-[15px] transition-colors flex items-center justify-center shadow-sm mt-3"
                    >
                        Update Password
                    </button>

                </form>
            </div>
        </div>
    );
}
