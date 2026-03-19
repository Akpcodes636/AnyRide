"use client";

import React, { useState } from 'react';
import AdminSidebar from "@/app/components/others_ui/admin/AdminSidebar";
import AdminHeader from "@/app/components/others_ui/admin/AdminHeader";
import UserDetailsModal from "@/app/components/others_ui/admin/UserDetailsModal";
import { Search, ChevronDown, ChevronRight } from 'lucide-react';

const driversData = [
    { name: 'Noor Hayat', phone: '08037281938', email: 'exampleemail@gmail.com', date: '12 Oct 2025', status: 'Active' },
    { name: 'Ajr Noah', phone: '08037281938', email: 'exampleemail@gmail.com', date: '12 Oct 2025', status: 'Pending' },
    { name: 'Tom Ferry', phone: '08037281938', email: 'exampleemail@gmail.com', date: '12 Oct 2025', status: 'Suspended' },
    { name: 'Tom Ferry', phone: '08037281938', email: 'exampleemail@gmail.com', date: '12 Oct 2025', status: 'Active' },
];

const ridersData = [
    { name: 'Mustapha Hassan', phone: '08037281938', email: 'exampleemail@gmail.com', date: '12 Oct 2025', status: 'Active' },
    { name: 'Praise Jummy', phone: '08037281938', email: 'exampleemail@gmail.com', date: '12 Oct 2025', status: 'Active' },
    { name: 'Tom Ferry', phone: '08037281938', email: 'exampleemail@gmail.com', date: '12 Oct 2025', status: 'Suspended' },
];

const partnersData = [
    { name: 'Noor Hayat', phone: '08037281938', email: 'exampleemail@gmail.com', date: '12 Oct 2025', status: 'Active', partnerType: 'Fleet Owner' },
    { name: 'Ajr Noah', phone: '08037281938', email: 'exampleemail@gmail.com', date: '12 Oct 2025', status: 'Pending', partnerType: 'Service provider' },
    { name: 'Ajr Noah', phone: '08037281938', email: 'exampleemail@gmail.com', date: '12 Oct 2025', status: 'Pending', partnerType: 'Fleet Owner' },
    { name: 'Tom Ferry', phone: '08037281938', email: 'exampleemail@gmail.com', date: '12 Oct 2025', status: 'Suspended', partnerType: 'Cooperate Partner' },
    { name: 'Tom Ferry', phone: '08037281938', email: 'exampleemail@gmail.com', date: '12 Oct 2025', status: 'Active', partnerType: 'Service provider' },
];

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        'Active': 'text-[#00B230] bg-[#E6F7EB] border-[#CFEFD8]',
        'Pending': 'text-[#FFB800] bg-[#FFF8E6] border-[#FFEBBF]',
        'Suspended': 'text-[#E53935] bg-[#FFF4F4] border-[#FFE6E6]',
        'Blocked': 'text-[#E53935] bg-[#FFF4F4] border-[#FFE6E6]',
    };
    const c = styles[status] || styles['Active'];

    return (
        <span className={`px-4 py-1.5 rounded-full text-[12px] md:text-[13px] font-bold border ${c} min-w-[80px] md:min-w-[100px] inline-block text-center shadow-xs`}>
            {status}
        </span>
    );
};

export default function UserManagementPage() {
    const [activeTab, setActiveTab] = useState<'Drivers' | 'Riders' | 'Partners'>('Partners');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [showFilter, setShowFilter] = useState(false);

    const tabs = ['Drivers', 'Riders', 'Partners'];
    const currentData = activeTab === 'Drivers' ? driversData : activeTab === 'Riders' ? ridersData : partnersData;

    return (
        <div className="flex min-h-screen bg-[#F5F5F7] font-sans">
            <AdminSidebar />
            <main className="flex-1 w-full lg:ml-[300px] p-4 sm:p-6 lg:p-8 pb-20 overflow-x-hidden">
                <AdminHeader />
                <div className="bg-white rounded-[24px] p-4 md:p-8 lg:p-10 border border-[#E6E6EB] shadow-sm flex flex-col gap-8 lg:gap-10 min-h-[700px] overflow-hidden">

                    <div className="flex flex-col gap-6 lg:gap-8 text-center sm:text-left">
                        <h2 className="text-[24px] md:text-[28px] font-black text-[#333333] tracking-tight leading-[1.1]">
                            Manage riders, drivers, partners profiles.
                        </h2>
                        <div className="flex bg-[#F5F5F7]/40 border border-[#E6E6EB] p-1.5 rounded-full w-full sm:w-fit overflow-x-auto scrollbar-hide select-none transition-all">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`flex-1 sm:flex-none px-6 md:px-10 lg:px-12 py-3 lg:py-3.5 rounded-full text-[13px] md:text-[14px] font-bold transition-all cursor-pointer whitespace-nowrap
                                        ${activeTab === tab ? 'bg-[#A20602] text-white shadow-lg scale-[1.03]' : 'text-[#666] hover:text-[#333] hover:bg-white'}
                                    `}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                        <div className="relative w-full md:flex-1 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name, phone number or email"
                                className="w-full h-[54px] md:h-[58px] bg-white border border-[#E6E6EB] rounded-full pl-14 pr-6 text-[14px] font-medium placeholder:text-[#A0A0A0] focus:ring-1 focus:ring-[#A20602] transition-shadow outline-none shadow-sm"
                            />
                        </div>
                        <div className="relative w-full md:w-auto">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="w-full md:w-auto flex items-center justify-center gap-3 bg-white border border-[#E6E6EB] rounded-2xl px-8 py-4 text-[14px] font-black text-[#8C8C8C] hover:bg-[#F5F5F7] transition-all cursor-pointer shadow-sm min-w-[140px]"
                            >
                                Filter by <ChevronDown size={18} />
                            </button>
                            {showFilter && (
                                <div className="absolute right-0 mt-2 w-full md:w-64 bg-white border border-[#E6E6EB] rounded-[24px] shadow-2xl z-20 overflow-hidden py-4 animate-in fade-in zoom-in duration-300">
                                    <button className="w-full flex items-center justify-between px-7 py-4 hover:bg-[#A20602] hover:text-white transition-all text-[#333] font-black text-[14px] group">
                                        Status <ChevronRight size={16} className="text-[#A0A0A0] group-hover:text-white" />
                                    </button>
                                    <button className="w-full flex items-center justify-between px-7 py-4 hover:bg-[#A20602] hover:text-white transition-all text-[#333] font-black text-[14px] group">
                                        {activeTab === 'Partners' ? "Partner's type" : "Date range"} <ChevronRight size={16} className="text-[#A0A0A0] group-hover:text-white" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative w-full overflow-hidden flex-1">
                        <div className="overflow-x-auto scrollbar-hide h-full">
                            <table className="w-full min-w-[800px] text-left">
                                <thead className="border-b border-[#F5F5F7] bg-[#F5F5F7]/30 sticky top-0 bg-white z-10 transition-all">
                                    <tr>
                                        <th className="py-5 px-6 text-[13px] lg:text-[14px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Name</th>
                                        <th className="py-5 px-6 text-[13px] lg:text-[14px] font-black text-[#333] uppercase lg:tracking-[0.1em]">{activeTab === 'Partners' ? 'Contact' : 'Phone / Email'}</th>
                                        <th className="py-5 px-6 text-[13px] lg:text-[14px] font-black text-[#333] uppercase lg:tracking-[0.1em]">{activeTab === 'Partners' ? "Partner's type" : 'Joined Date'}</th>
                                        <th className="py-5 px-6 text-[13px] lg:text-[14px] font-black text-[#333] uppercase lg:tracking-[0.1em]">{activeTab === 'Partners' ? 'Date joined' : 'Status'}</th>
                                        <th className="py-5 px-6 text-[13px] lg:text-[14px] font-black text-[#333] uppercase lg:tracking-[0.1em]">{activeTab === 'Partners' ? 'Status' : 'Action'}</th>
                                        {activeTab === 'Partners' && <th className="py-5 px-6 text-[13px] lg:text-[14px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Actions</th>}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F5F5F7]">
                                    {currentData.map((user, idx) => (
                                        <tr key={idx} className="group hover:bg-[#F5F5F7]/40 transition-all cursor-default relative">
                                            <td className="py-5 lg:py-8 px-6">
                                                <span className="text-[14px] md:text-[15px] font-black text-[#262626] group-hover:text-[#A10602] transition-colors">{user.name}</span>
                                            </td>
                                            <td className="py-5 lg:py-8 px-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[13px] font-bold text-[#333333] mb-0.5">{user.phone}</span>
                                                    <span className="text-[12px] font-medium text-[#A0A0A0] lowercase tracking-tight">{user.email}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 lg:py-8 px-6">
                                                <span className="text-[12px] md:text-[14px] font-black text-[#333] leading-none shrink-0">{activeTab === 'Partners' ? (user as any).partnerType : (user as any).date}</span>
                                            </td>
                                            <td className="py-5 lg:py-8 px-6">
                                                <span className="text-[12px] md:text-[14px] font-bold text-[#666666] leading-none shrink-0">{activeTab === 'Partners' ? user.date : <StatusBadge status={user.status} />}</span>
                                            </td>
                                            <td className="py-5 lg:py-8 px-6">
                                                {activeTab === 'Partners' ? <StatusBadge status={user.status} /> : (
                                                    <button onClick={() => setSelectedUser(user)} className="bg-[#02093A] hover:bg-[#070e28] text-white px-8 md:px-10 py-3.5 rounded-xl text-[12px] md:text-[13px] font-black transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-tight">View</button>
                                                )}
                                            </td>
                                            {activeTab === 'Partners' && (
                                                <td className="py-5 lg:py-8 px-6">
                                                    <button onClick={() => setSelectedUser(user)} className="bg-[#02093A] hover:bg-[#070e28] text-white px-8 md:px-10 py-3.5 rounded-xl text-[12px] md:text-[13px] font-black transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-tight">View</button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            {selectedUser && <UserDetailsModal user={selectedUser} userType={activeTab.slice(0, -1) as any} onClose={() => setSelectedUser(null)} />}
        </div>
    );
}
