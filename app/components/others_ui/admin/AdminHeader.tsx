"use client";

import React from 'react';
import { Search, Bell } from 'lucide-react';
import Image from 'next/image';
import Avatar from './Avatar';

export default function AdminHeader() {
    return (
        <header className="flex flex-col-reverse md:flex-row items-center justify-between mb-8 md:mb-10 gap-6 w-full">
            {/* Search Bar - Responsive width */}
            <div className="relative w-full md:max-w-[400px] lg:max-w-[500px]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={18} />
                <input
                    type="text"
                    placeholder="Search anything here"
                    className="w-full bg-white border border-[#E6E6EB] rounded-full py-4 pl-14 pr-6 text-[14px] font-medium outline-none focus:ring-1 focus:ring-[#A20602] transition-shadow shadow-sm"
                />
            </div>

            {/* Profile/Notification Cluster - Responsive alignment */}
            <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 w-full md:w-auto px-1">
                {/* Spacer on mobile to push items to right */}
                <div className="md:hidden invisible">Nav</div>

                <div className="flex items-center gap-4 md:gap-6">
                    <button className="relative p-3 bg-white border border-[#E6E6EB] rounded-full text-[#333333] hover:bg-[#F5F5F7] shadow-sm transform transition-all active:scale-95 cursor-pointer">
                        <Bell size={20} />
                        <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#A20602] rounded-full border border-white shadow-xs"></div>
                    </button>
                    <div className="flex items-center gap-3 bg-white/50 border border-[#E6E6EB] md:border-none p-1 pr-4 md:p-0 rounded-full md:rounded-none">
                        <Avatar name="Sam Malik" className="w-11 h-11 md:w-12 md:h-12 border border-[#E6E6EB] shadow-inner text-[16px]" />
                        <div className="flex flex-col">
                            <span className="text-[14px] md:text-[16px] font-extrabold text-[#333333] leading-tight">Sam Malik</span>
                            <span className="text-[11px] md:text-[12px] font-bold text-[#A0A0A0]">Manager</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
