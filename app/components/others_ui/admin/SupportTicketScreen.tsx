"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from "@/app/components/others_ui/admin/AdminSidebar";
import AdminHeader from "@/app/components/others_ui/admin/AdminHeader";
import TicketDetailsModal from "@/app/components/others_ui/admin/TicketDetailsModal";
import { Search, ChevronDown, ChevronRight, Filter, AlertCircle, Clock, CheckCircle2, MoreHorizontal } from 'lucide-react';

const PriorityBadge = ({ priority }: { priority: string }) => {
    const styles: Record<string, string> = {
        'Low': 'text-gray-500 bg-gray-100',
        'Medium': 'text-orange-600 bg-orange-100',
        'High': 'text-red-700 bg-red-100 font-black',
    };
    return (
        <span className={`px-2 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider ${styles[priority]}`}>
            {priority}
        </span>
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        'Resolved': 'text-[#00B230] bg-[#E6F7EB] border-[#CFEFD8]',
        'In progress': 'text-[#3E86F5] bg-[#EBF3FF] border-[#D0E2FF]',
        'Open': 'text-[#FFB800] bg-[#FFF8E6] border-[#FFEBBF]',
        'Closed': 'text-[#666] bg-[#F5F5F7] border-[#E6E6EB]',
    };
    const c = styles[status] || styles['Open'];
    return (
        <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold border ${c} min-w-[110px] inline-block text-center shadow-xs`}>
            {status}
        </span>
    );
};

export default function SupportTicketScreen() {
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [showStatusFilter, setShowStatusFilter] = useState(false);
    
    // Live State
    const [ticketsData, setTicketsData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem('admin_token');
                if (!token) return;

                const res = await fetch('https://anyride.techenex.online/api/v1/admin/support/tickets', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                const json = await res.json();
                if (res.ok && Array.isArray(json)) {
                    // Helper to map snake_case API status to UI Status
                    const formatStatus = (s: string) => {
                        if (s === 'in_progress') return 'In progress';
                        if (s) return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
                        return 'Open';
                    };

                    const mapped = json.map((t: any) => ({
                        _raw: t,
                        id: `#${t.id.toString().padStart(5, '0')}`,
                        userType: 'User', // Backend currently doesn't provide explicit user type inside ticket
                        userName: t.user_name || 'N/A',
                        category: t.subject || 'Support',
                        priority: 'Medium', // Priority is missing from payload, defaulting to Medium
                        dateTime: new Date(t.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                        status: formatStatus(t.status)
                    }));
                    setTicketsData(mapped);
                }
            } catch (error) {
                console.error("Failed to fetch tickets:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div className="flex min-h-screen bg-[#F5F5F7] font-sans">
            <AdminSidebar />
            <main className="flex-1 w-full lg:ml-[300px] p-4 sm:p-6 lg:p-8 pb-20 overflow-x-hidden">
                <AdminHeader />
                <div className="bg-white rounded-[32px] p-6 md:p-10 border border-[#E6E6EB] shadow-sm flex flex-col gap-10 min-h-[850px] overflow-hidden">

                    <div className="flex flex-col gap-8">
                        <h2 className="text-[26px] md:text-[32px] font-black text-[#0B153D] tracking-tight leading-none text-center sm:text-left">
                            Monitor who has a problem, what is the problem and what is its status
                        </h2>
                    </div>

                    {/* Controls Row */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-2">
                        <div className="md:col-span-8 relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={20} />
                            <input
                                type="text"
                                placeholder="Search by ticket ID, user, issue"
                                className="w-full h-[60px] bg-white border border-[#E6E6EB] rounded-full pl-16 pr-8 text-[15px] font-medium placeholder:text-[#A0A0A0] focus:ring-1 focus:ring-[#A20602] transition-shadow outline-none shadow-sm"
                            />
                        </div>
                        <div className="md:col-span-4 relative">
                            <button
                                onClick={() => setShowStatusFilter(!showStatusFilter)}
                                className="w-full h-[60px] flex items-center justify-center gap-3 bg-white border border-[#E6E6EB] rounded-2xl px-10 text-[14px] font-black text-[#A0A0A0] hover:bg-[#F5F5F7] transition-all shadow-xs"
                            >
                                Filter by <ChevronDown size={18} />
                            </button>
                            {showStatusFilter && (
                                <div className="absolute right-0 mt-3 w-64 bg-white rounded-[24px] shadow-2xl z-20 overflow-hidden py-4 animate-in fade-in zoom-in duration-300 border border-[#E6E6EB]">
                                    <button className="w-full flex items-center justify-between px-8 py-4 text-[#333] font-black text-[14px] hover:bg-[#A20601] hover:text-white transition-all group">
                                        Status <ChevronRight size={16} />
                                    </button>
                                    <button className="w-full flex items-center justify-between px-8 py-4 text-[#333] font-black text-[14px] hover:bg-[#A20601] hover:text-white transition-all group">
                                        User type <ChevronRight size={16} />
                                    </button>
                                    <button className="w-full flex items-center justify-between px-8 py-4 text-[#333] font-black text-[14px] hover:bg-[#A20601] hover:text-white transition-all group">
                                        Date range <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="relative w-full overflow-hidden flex-1">
                        <div className="overflow-x-auto scrollbar-hide h-full">
                            <table className="w-full min-w-[1100px] text-left">
                                <thead className="border-b border-[#F5F5F7] bg-[#F5F5F7]/30 sticky top-0 bg-white z-10 transition-all">
                                    <tr>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Trip ID</th>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em]">User type</th>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em]">User Name</th>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Category</th>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Priority</th>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Date & time</th>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Status</th>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F5F5F7]">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={8} className="py-10 text-center font-bold text-[#A0A0A0]">Loading fast live tickets database...</td>
                                        </tr>
                                    ) : ticketsData.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="py-10 text-center font-bold text-[#A0A0A0]">No support tickets found.</td>
                                        </tr>
                                    ) : ticketsData.map((ticket, idx) => (
                                        <tr key={idx} className="group hover:bg-[#F5F5F7]/40 transition-all cursor-default relative">
                                            <td className="py-6 lg:py-8 px-8"><span className="text-[14px] font-black text-[#333]">{ticket.id}</span></td>
                                            <td className="py-6 lg:py-8 px-8"><span className="text-[13px] font-bold text-[#666]">{ticket.userType}</span></td>
                                            <td className="py-6 lg:py-8 px-8"><span className="text-[15px] font-black text-[#333]">{ticket.userName}</span></td>
                                            <td className="py-6 lg:py-8 px-8"><span className="text-[14px] font-bold text-[#333]">{ticket.category}</span></td>
                                            <td className="py-6 lg:py-8 px-8"><PriorityBadge priority={ticket.priority} /></td>
                                            <td className="py-6 lg:py-8 px-8"><span className="text-[13px] font-bold text-[#A0A0A0]">{ticket.dateTime}</span></td>
                                            <td className="py-6 lg:py-8 px-8"><StatusBadge status={ticket.status} /></td>
                                            <td className="py-6 lg:py-8 px-8">
                                                <button onClick={() => setSelectedTicket(ticket)} className="bg-[#02093A] hover:bg-[#070e28] text-white px-10 py-3.5 rounded-xl text-[12px] font-black transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-tight">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            {selectedTicket && (
                <TicketDetailsModal 
                    ticket={selectedTicket} 
                    onClose={() => setSelectedTicket(null)} 
                    onUpdateStatus={(ticketId, newStatus) => {
                        setTicketsData(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
                        setSelectedTicket((prev: any) => ({ ...prev, status: newStatus }));
                    }}
                />
            )}
        </div>
    );
}
