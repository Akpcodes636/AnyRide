"use client";
import React, { useState } from 'react';
import { User, Key, Bell, Shield, Globe, FileText, ChevronRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LanguageScreen() {
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const router = useRouter();

    const menuItems = [
        { icon: User, label: "Personal info", href: "/account/personal-info" },
        { icon: Key, label: "Login & Security", href: "/account/login" },
        { icon: Bell, label: "Notifications", href: "/account/notifications" },
        { icon: Shield, label: "Safety & Privacy", href: "/account/safety" },
        { icon: Globe, label: "Language", active: true, href: "/account/language" },
        { icon: FileText, label: "Terms and conditions", href: "/account/terms" },
    ];

    const languages = [
        "English",
        "French",
        "Swahili",
        "Arabic"
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-10">
                Language
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
                    <h3 className="text-[20px] font-bold text-[#0B153D] mb-6">Select language</h3>

                    <div className="flex flex-col gap-6 w-full max-w-[400px]">
                        {languages.map((lang, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between cursor-pointer group"
                                onClick={() => setSelectedLanguage(lang)}
                            >
                                <span className="text-[15px] font-medium text-[#0B153D]">{lang}</span>

                                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${selectedLanguage === lang
                                    ? 'bg-[#0B153D] border-none'
                                    : 'border border-gray-300 bg-transparent group-hover:border-gray-400'
                                    }`}>
                                    {selectedLanguage === lang && (
                                        <Check size={12} className="text-white" strokeWidth={3} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
