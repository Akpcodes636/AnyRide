"use client";

import React, { useState } from 'react';
import {
    LayoutDashboard,
    UserRound,
    Route,
    Star,
    FileText,
    Ticket,
    Settings,
    Menu,
    X
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const SidebarItem = ({ icon: Icon, label, href, onClick }: { icon: any, label: string, href: string, onClick?: () => void }) => {
    const pathname = usePathname();
    const router = useRouter();
    const isActive = pathname.includes(href);

    return (
        <button
            onClick={() => {
                router.push(href);
                if (onClick) onClick();
            }}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-[12px] transition-all cursor-pointer ${isActive ? 'bg-[#A20602] text-white shadow-md' : 'text-[#666666] hover:bg-[#F5F5F7]'}`}
        >
            <Icon size={20} className={isActive ? 'text-white' : 'text-[#A0A0A0]'} />
            <span className="text-[14px] font-bold leading-none">{label}</span>
        </button>
    );
};

export default function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-6 left-6 z-[60] bg-white border border-[#E6E6EB] p-2.5 rounded-full shadow-lg text-[#333]"
            >
                <Menu size={24} />
            </button>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Content */}
            <aside className={`
                fixed top-0 left-0 z-[70] h-screen bg-white border-r border-[#E6E6EB] transition-transform duration-300 ease-in-out
                w-[280px] lg:w-[300px] p-6 flex flex-col gap-10 scrollbar-hide
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#A20602] rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-[24px] font-black">A</span>
                        </div>
                        <span className="text-[24px] font-black text-[#0B153D]">AnyRide</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden text-[#666] hover:text-[#333]">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex flex-col gap-1.5 flex-1 select-none">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/admin/dashboard" onClick={() => setIsOpen(false)} />
                    <SidebarItem icon={UserRound} label="User Management" href="/admin/users" onClick={() => setIsOpen(false)} />
                    <SidebarItem icon={Route} label="Trip Management" href="/admin/trips" onClick={() => setIsOpen(false)} />
                    <SidebarItem icon={Star} label="Ratings & Reviews" href="/admin/reviews" onClick={() => setIsOpen(false)} />
                    <SidebarItem icon={FileText} label="Financials & Reports" href="/admin/financials" onClick={() => setIsOpen(false)} />
                    <SidebarItem icon={Ticket} label="Support Tickets" href="/admin/tickets" onClick={() => setIsOpen(false)} />
                    <SidebarItem icon={Settings} label="Settings" href="/admin/settings" onClick={() => setIsOpen(false)} />
                </nav>

                <div className="mt-auto px-6 py-4 border-t border-[#F5F5F7]">
                    <p className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-widest">Version 1.0.2</p>
                </div>
            </aside>
        </>
    );
}
