"use client";

import React, { useState } from 'react';
import { User, Key, Bell, Shield, Globe, FileText, ChevronRight, PenLine, Edit2 } from 'lucide-react';

export default function ProfileInfoScreen() {
    const [name, setName] = useState('Jamal Hassan');
    const [email, setEmail] = useState('jamalhassan@gmail.com');
    const [phone, setPhone] = useState('+23480 343 7828');
    const [address, setAddress] = useState('123 Main St, Springfield, IL 62704');

    const menuItems = [
        { icon: User, label: "Personal info", active: true },
        { icon: Key, label: "Login & Security" },
        { icon: Bell, label: "Notifications" },
        { icon: Shield, label: "Safety & Privacy" },
        { icon: Globe, label: "Language" },
        { icon: FileText, label: "Terms and conditions" },
    ];

    const InputField = ({ label, value, onChange }: { label: string, value: string, onChange: any }) => (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[14px] font-medium text-[#0B153D] pl-1 font-sans">{label}</label>
            <div className="relative w-full">
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className="w-full bg-white border border-[#E5E7EB] rounded-[8px] px-4 py-3 h-[48px] focus:outline-none focus:ring-1 focus:ring-[#0B153D] text-[15px] font-medium text-[#333] tracking-wide"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#0B153D] opacity-60 hover:opacity-100 transition-opacity">
                    <PenLine size={18} strokeWidth={2} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-10">
                Profile info
            </h2>

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
                <div className="flex-1 flex flex-col max-w-[500px]">
                    {/* Avatar Section */}
                    <div className="relative w-[100px] h-[100px] mb-8 mx-auto md:mx-0">
                        <div className="w-full h-full rounded-full overflow-hidden bg-gray-300 shadow-sm border border-gray-100">
                            <img src="https://i.pravatar.cc/150?img=12" alt="Profile avatar" className="w-full h-full object-cover" />
                        </div>
                        {/* Edit Icon Badge */}
                        <button className="absolute bottom-1 right-[-4px] w-7 h-7 bg-[#0B153D] rounded-full flex items-center justify-center text-white border-2 border-white hover:bg-[#070e28] transition-colors shadow-sm">
                            <Edit2 size={12} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Form Fields Section */}
                    <div className="flex flex-col gap-6 mb-10 w-full">
                        <InputField label="Name" value={name} onChange={(e: any) => setName(e.target.value)} />
                        <InputField label="Email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
                        <InputField label="Phone number" value={phone} onChange={(e: any) => setPhone(e.target.value)} />
                        <InputField label="Address" value={address} onChange={(e: any) => setAddress(e.target.value)} />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <button className="flex-1 bg-[#0B153D] hover:bg-[#070e28] text-white font-semibold h-[52px] rounded-[8px] text-[15px] transition-colors flex items-center justify-center shadow-sm">
                            Save
                        </button>
                        <button className="flex-1 bg-[#ee4b40] hover:bg-[#dc3a30] text-white font-semibold h-[52px] rounded-[8px] text-[15px] transition-colors flex items-center justify-center shadow-sm">
                            Delete account
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}
