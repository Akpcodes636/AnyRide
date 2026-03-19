"use client";
import React from 'react';
import { User, Key, Bell, Shield, Globe, FileText, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ManageAccountScreen() {
    const router = useRouter();
    const menuItems = [
        { icon: User, label: "Personal info", href: "/account/personal-info" },
        { icon: Key, label: "Login & Security", href: "/account/login" },
        { icon: Bell, label: "Notifications", href: "/account/notifications" },
        { icon: Shield, label: "Safety & Privacy", href: "/account/safety" },
        { icon: Globe, label: "Language", href: "/account/language" },
        { icon: FileText, label: "Terms and conditions", href: "/account/terms" },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-10">
                Manage account
            </h2>

            <div className="w-full max-w-[500px] flex flex-col gap-6">

                {/* User Profile Card */}
                <div className="bg-[#F5F5F7] rounded-[16px] p-6 flex flex-col md:flex-row items-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                        {/* Placeholder avatar image */}
                        <img src="https://i.pravatar.cc/150?img=11" alt="Profile avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col text-center md:text-left">
                        <h3 className="text-[22px] font-bold text-[#0B153D] leading-tight mb-1">AbdulMalik Abdul</h3>
                        <p className="text-[14px] font-medium text-[#0B153D] opacity-80">abdul.malik@example.com</p>
                    </div>
                </div>

                {/* Menu Options */}
                <div className="bg-[#F5F5F7] rounded-[16px] flex flex-col overflow-hidden">
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <div
                                onClick={() => router.push(item.href)}
                                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-200 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent">
                                        <item.icon size={20} className="text-[#0B153D]" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[15px] font-medium text-[#0B153D]">{item.label}</span>
                                </div>
                                <ChevronRight size={18} className="text-[#0B153D] opacity-60" />
                            </div>
                            {/* Divider except for last item */}
                            {index < menuItems.length - 1 && (
                                <div className="w-full h-[1px] bg-gray-200 ml-11"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

            </div>
        </div>
    );
}
