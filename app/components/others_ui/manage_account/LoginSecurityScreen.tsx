"use client";

import React, { useState } from 'react';
import { User, Key, Bell, Shield, Globe, FileText, ChevronRight } from 'lucide-react';

export default function LoginSecurityScreen() {
    const [biometricEnabled, setBiometricEnabled] = useState(true);

    const menuItems = [
        { icon: User, label: "Personal info" },
        { icon: Key, label: "Login & Security", active: true },
        { icon: Bell, label: "Notifications" },
        { icon: Shield, label: "Safety & Privacy" },
        { icon: Globe, label: "Language" },
        { icon: FileText, label: "Terms and conditions" },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-2">
                Login & security
            </h2>
            <p className="text-[#666666] text-[15px] mb-10">
                Protect to get your account secured
            </p>

            <div className="flex flex-col md:flex-row gap-10 lg:gap-20">

                {/* Left Sidebar Menu */}
                <div className="w-full md:w-[320px] bg-[#F5F5F7] rounded-[16px] flex flex-col overflow-hidden h-fit flex-shrink-0">
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <div className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-colors ${item.active ? 'bg-[#EAEBEF]' : 'hover:bg-gray-200'}`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent text-[#0B153D]">
                                        <item.icon size={20} className="" strokeWidth={1.5} />
                                    </div>
                                    <span className={`text-[15px] text-[#0B153D] ${item.active ? 'font-semibold' : 'font-medium'}`}>
                                        {item.label}
                                    </span>
                                </div>
                                <ChevronRight size={18} className="text-[#0B153D] opacity-60" />
                            </div>
                            {/* Divider except for last item */}
                            {index < menuItems.length - 1 && (
                                <div className="w-full h-[1px] bg-gray-200 ml-16"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Right Content Area */}
                <div className="flex-1 flex flex-col max-w-[600px]">
                    <div className="bg-[#F5F5F7] rounded-[16px] flex flex-col pt-2 pb-2 overflow-hidden">

                        {/* Item 1 */}
                        <div className="flex flex-col py-5 px-6 cursor-pointer hover:bg-gray-200/50 transition-colors">
                            <span className="text-[16px] font-medium text-[#c62828] mb-1">Set/Change Password</span>
                            <span className="text-[13px] text-[#666666]">Create a strong password to secure your account and personal information.</span>
                        </div>

                        {/* Item 2 */}
                        <div className="flex flex-col py-5 px-6 cursor-pointer hover:bg-gray-200/50 transition-colors">
                            <span className="text-[16px] font-medium text-[#c62828] mb-1">Set/Change PIN</span>
                            <span className="text-[13px] text-[#666666]">Set a quick 4-digit PIN to log in and confirm key actions instantly.</span>
                        </div>

                        {/* Item 3 */}
                        <div className="flex items-center justify-between py-5 px-6">
                            <div className="flex flex-col max-w-[80%]">
                                <span className="text-[16px] font-medium text-[#333333] mb-1">Allow Biometric</span>
                                <span className="text-[13px] text-[#666666]">Set a quick 4-digit PIN to log in and confirm key actions instantly.</span>
                            </div>

                            {/* Custom Toggle Switch */}
                            <button
                                onClick={() => setBiometricEnabled(!biometricEnabled)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer focus:outline-none ${biometricEnabled ? 'bg-[#A20602]' : 'bg-gray-300'}`}
                                aria-pressed={biometricEnabled}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ease-in-out ${biometricEnabled ? 'translate-x-6' : 'translate-x-0'}`}
                                />
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
