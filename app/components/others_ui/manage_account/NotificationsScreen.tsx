"use client";
import React, { useState } from 'react';
import { User, Key, Bell, Shield, Globe, FileText, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotificationsScreen() {
    const [loginEmail, setLoginEmail] = useState(true);
    const [loginSms, setLoginSms] = useState(false);
    const [updateEmail, setUpdateEmail] = useState(false);
    const [updatePush, setUpdatePush] = useState(true);
    const router = useRouter();

    const menuItems = [
        { icon: User, label: "Personal info", href: "/account/personal-info" },
        { icon: Key, label: "Login & Security", href: "/account/login" },
        { icon: Bell, label: "Notifications", active: true, href: "/account/notifications" },
        { icon: Shield, label: "Safety & Privacy", href: "/account/safety" },
        { icon: Globe, label: "Language", href: "/account/language" },
        { icon: FileText, label: "Terms and conditions", href: "/account/terms" },
    ];

    const CustomToggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
        <button
            onClick={onChange}
            className={`w-[40px] h-[22px] flex items-center rounded-full p-0.5 transition-colors duration-300 ease-in-out cursor-pointer focus:outline-none ${checked ? 'bg-[#c5eacc]' : 'bg-[#e5e7eb]'}`}
            aria-pressed={checked}
        >
            <div
                className={`w-[18px] h-[18px] rounded-full shadow-sm transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-[18px] bg-[#00b230]' : 'translate-x-0 bg-black'}`}
            />
        </button>
    );

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-10">
                Notifications
            </h2>

            <div className="flex flex-col md:flex-row gap-10 lg:gap-20">

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
                <div className="flex-1 flex flex-col max-w-[600px]">
                    <div className="bg-[#F5F5F7] rounded-[16px] p-6 flex flex-col gap-8">

                        {/* Login Alerts Group */}
                        <div className="flex flex-col">
                            <h3 className="text-[20px] font-semibold text-[#0B153D] mb-4">Login Alerts</h3>
                            <div className="bg-white rounded-[12px] flex flex-col overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)]">

                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="text-[15px] font-medium text-[#999999]">Email</span>
                                    <CustomToggle checked={loginEmail} onChange={() => setLoginEmail(!loginEmail)} />
                                </div>

                                <div className="w-full h-[1px] bg-gray-100"></div>

                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="text-[15px] font-medium text-[#999999]">SMS</span>
                                    <CustomToggle checked={loginSms} onChange={() => setLoginSms(!loginSms)} />
                                </div>

                            </div>
                        </div>

                        {/* Update Alerts Group */}
                        <div className="flex flex-col">
                            <h3 className="text-[20px] font-semibold text-[#0B153D] mb-4">Update Alerts</h3>
                            <div className="bg-white rounded-[12px] flex flex-col overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)]">

                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="text-[15px] font-medium text-[#999999]">Email</span>
                                    <CustomToggle checked={updateEmail} onChange={() => setUpdateEmail(!updateEmail)} />
                                </div>

                                <div className="w-full h-[1px] bg-gray-100"></div>

                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="text-[15px] font-medium text-[#999999]">Push Notification</span>
                                    <CustomToggle checked={updatePush} onChange={() => setUpdatePush(!updatePush)} />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
