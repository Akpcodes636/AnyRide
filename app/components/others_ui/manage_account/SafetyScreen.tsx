"use client";
import React from 'react';
import { User, Key, Bell, Shield, Globe, FileText, ChevronRight, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SafetyScreen() {
    const router = useRouter();

    const menuItems = [
        { icon: User, label: "Personal info", href: "/account/personal-info" },
        { icon: Key, label: "Login & Security", href: "/account/login" },
        { icon: Bell, label: "Notifications", href: "/account/notifications" },
        { icon: Shield, label: "Safety & Privacy", active: true, href: "/account/safety" },
        { icon: Globe, label: "Language", href: "/account/language" },
        { icon: FileText, label: "Terms and conditions", href: "/account/terms" },
    ];

    const safetyItems = [
        "Driver's verification",
        "Driver's verification",
        "Driver's verification",
        "Driver's verification",
        "Driver's verification",
        "Driver's verification",
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-10">
                Safety
            </h2>

            <div className="flex flex-col md:flex-row gap-10 lg:gap-32">

                {/* Left Sidebar Menu */}
                <div className="w-full md:w-[320px] bg-[#F5F5F7] rounded-[16px] flex flex-col overflow-hidden h-fit flex-shrink-0">
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <div
                                onClick={() => router.push(item.href || "#")}
                                className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-colors ${item.active ? 'bg-[#EAEBEF]' : 'hover:bg-gray-200'}`}
                            >
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
                <div className="flex-1 flex flex-col w-full max-w-[500px]">
                    <h3 className="text-[20px] font-bold text-[#0B153D] mb-2">Safety</h3>
                    <p className="text-[#8B8EA4] text-[14px] mb-6">Here's how we get you protected</p>

                    <div className="bg-[#F5F5F7] rounded-[12px] overflow-hidden mb-8 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                        {safetyItems.map((item, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between p-4 bg-white cursor-pointer hover:bg-gray-50 transition-colors ${index < safetyItems.length - 1 ? 'border-b border-gray-100' : ''
                                    }`}
                            >
                                <span className="text-[14px] font-medium text-[#0B153D]">{item}</span>
                                <ChevronRight size={16} className="text-[#8B8EA4]" />
                            </div>
                        ))}
                    </div>

                    {/* SOS Button */}
                    <button className="w-full bg-[#EF3B3B] hover:bg-[#d93232] active:scale-[0.99] transition-all text-white text-[15px] font-bold h-[54px] rounded-[10px] flex items-center justify-center gap-2 mb-4">
                        <Phone size={18} fill="white" />
                        Call 990
                    </button>

                    <button className="w-full text-[14px] font-bold text-[#0B153D] hover:opacity-80 transition-opacity">
                        Emergency Contacts
                    </button>
                </div>

            </div>
        </div>
    );
}
