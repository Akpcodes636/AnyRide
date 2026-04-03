"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, X, AlertCircle, CheckCircle2, MoreHorizontal, User, MessageCircle, Clock, Paperclip, Send, Check } from 'lucide-react';
import Image from 'next/image';
import Avatar from './Avatar';

interface TicketDetailProps {
    ticket: any;
    onClose: () => void;
    onUpdateStatus: (ticketId: string, newStatus: string) => void;
}

const InputField = ({ label, value, required = false }: { label: string, value: string, required?: boolean }) => (
    <div className="flex flex-col gap-2 w-full">
        <label className="text-[13px] font-bold text-[#333] flex items-center gap-1.5">
            {label}{required && <span className="text-[#A10602]">*</span>}
        </label>
        <div className="w-full h-[56px] bg-[#F5F5F7] border border-[#E6E6EB] rounded-[16px] px-6 flex items-center text-[14px] font-bold text-[#A0A0A0]">
            {value}
        </div>
    </div>
);

export default function TicketDetailsModal({ ticket, onClose, onUpdateStatus }: TicketDetailProps) {
    const [priority, setPriority] = useState('Medium');
    const [status, setStatus] = useState(ticket?.status || 'Open');
    const [showPriorityMenu, setShowPriorityMenu] = useState(false);
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const [sendEmail, setSendEmail] = useState(true);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    const handleStatusUpdate = async (uiStatus: string, backendString: string) => {
        setStatus(uiStatus);
        setShowStatusMenu(false);
        setIsUpdatingStatus(true);
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`https://anyride.techenex.online/api/v1/admin/support/tickets/${ticket._raw.id}/status`, {
                method: 'PATCH',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ status: backendString })
            });
            if (res.ok) {
                onUpdateStatus(ticket.id, uiStatus);
            } else {
                console.error("Failed to update status");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-[#F5F5F7] w-full max-w-[1000px] h-[95vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">

                {/* Header Row */}
                <div className="bg-white px-8 py-8 border-b border-[#F5F5F7] flex flex-wrap items-center justify-between gap-y-6 shrink-0 relative z-20">
                    <div className="flex flex-col"><span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Ticket ID</span><span className="text-[14px] font-black text-[#333]">{ticket.id}</span></div>

                    <div className="flex flex-col relative">
                        <span className="text-[11px] font-bold text-[#A0A0A0] uppercase mb-1">Set priority as</span>
                        <div className="relative">
                            <button
                                onClick={() => setShowPriorityMenu(!showPriorityMenu)}
                                className={`flex items-center gap-3 px-6 py-2 rounded-full text-[12px] font-bold border transition-all
                                    ${priority === 'Low' ? 'text-[#00B230] bg-[#E6F7EB] border-[#CFEFD8]' :
                                        priority === 'Medium' ? 'text-[#FFB800] bg-[#FFF8E6] border-[#FFEBBF]' :
                                            'text-[#E53935] bg-[#FFF4F4] border-[#FFE6E6]'}
                                `}
                            >
                                {priority} <ChevronDown size={14} />
                            </button>
                            {showPriorityMenu && (
                                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-[#E6E6EB] z-30 py-2 p-1 flex flex-col gap-1">
                                    <button onClick={() => { setPriority('Low'); setShowPriorityMenu(false); }} className="w-full px-4 py-2 text-left rounded-xl text-[12px] font-bold text-[#00B230] hover:bg-[#E6F7EB]">Low</button>
                                    <button onClick={() => { setPriority('Medium'); setShowPriorityMenu(false); }} className="w-full px-4 py-2 text-left rounded-xl text-[12px] font-bold text-[#FFB800] hover:bg-[#FFF8E6] border border-[#FFEBBF]">Medium</button>
                                    <button onClick={() => { setPriority('High'); setShowPriorityMenu(false); }} className="w-full px-4 py-2 text-left rounded-xl text-[12px] font-bold text-[#E53935] hover:bg-[#FFF4F4] border border-[#FFE6E6]">High</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col"><span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Issue category</span><span className="text-[14px] font-black text-[#666]">{ticket.category}</span></div>
                    <div className="flex flex-col"><span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Date created</span><span className="text-[14px] font-black text-[#666]">{ticket.dateTime}</span></div>
                    <div className="flex flex-col"><span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Last updated</span><span className="text-[14px] font-black text-[#666]">{new Date(ticket._raw?.updated_at || Date.now()).toLocaleDateString('en-GB')}</span></div>

                    <div className="flex flex-col relative">
                        <span className="text-[11px] font-bold text-[#A0A0A0] uppercase mb-1">Mark status as</span>
                        <div className="relative">
                            <button
                                onClick={() => setShowStatusMenu(!showStatusMenu)}
                                disabled={isUpdatingStatus}
                                className={`flex items-center gap-3 px-6 py-2 rounded-full text-[12px] font-bold border transition-all disabled:opacity-50
                                    ${status === 'Resolved' ? 'text-[#00B230] bg-[#E6F7EB] border-[#CFEFD8]' :
                                        status === 'Open' ? 'text-[#FFB800] bg-[#FFF8E6] border-[#FFEBBF]' :
                                            status === 'In progress' ? 'text-[#3E86F5] bg-[#EBF3FF] border-[#D0E2FF]' :
                                                'text-[#666] bg-[#F5F5F7] border-[#E6E6EB]'}
                                `}
                            >
                                {isUpdatingStatus ? 'Saving...' : status} <ChevronDown size={14} />
                            </button>
                            {showStatusMenu && (
                                <div className="absolute right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-[#E6E6EB] z-30 py-2 p-1 flex flex-col gap-1">
                                    <button onClick={() => handleStatusUpdate('Open', 'open')} className="w-full px-4 py-2 text-left rounded-xl text-[12px] font-bold text-[#FFB800] hover:bg-[#FFF8E6] border border-[#FFEBBF]">Open</button>
                                    <button onClick={() => handleStatusUpdate('In progress', 'in_progress')} className="w-full px-4 py-2 text-left rounded-xl text-[12px] font-bold text-[#3E86F5] hover:bg-[#EBF3FF] border border-[#D0E2FF]">In progress</button>
                                    <button onClick={() => handleStatusUpdate('Resolved', 'resolved')} className="w-full px-4 py-2 text-left rounded-xl text-[12px] font-bold text-[#00B230] hover:bg-[#E6F7EB] border border-[#CFEFD8]">Resolved</button>
                                    <button onClick={() => handleStatusUpdate('Closed', 'closed')} className="w-full px-4 py-2 text-left rounded-xl text-[12px] font-bold text-[#666] hover:bg-[#F5F5F7] border border-[#E6E6EB]">Closed</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 md:p-10 flex flex-col gap-10 scrollbar-hide">
                    {/* Reported Issue Section */}
                    <div className="bg-white border-2 border-[#F5F5F7] rounded-[32px] p-8 md:p-12 flex flex-col gap-10">
                        <h3 className="text-[22px] font-black text-[#0B153D]">Reported Issue</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="Subject" value={ticket._raw?.subject || 'N/A'} required />
                            <InputField label="Full Name" value={ticket.userName || 'N/A'} required />
                            <InputField label="Email" value={ticket._raw?.user_email || 'N/A'} required />
                            <InputField label="Phone Number" value={ticket._raw?.user_phone || 'N/A'} />
                            <InputField label="Category" value={ticket.category || 'N/A'} />
                            <InputField label="Country" value="Congo" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[13px] font-bold text-[#333] flex items-center gap-1.5">User Message<span className="text-[#A10602]">*</span></label>
                            <div className="w-full bg-[#F5F5F7] border border-[#E6E6EB] rounded-[24px] p-8 text-[14px] font-bold text-[#333]/70 leading-relaxed italic min-h-[120px]">
                                "{ticket._raw?.message || 'No explicit message body provided by the user.'}"
                            </div>
                        </div>



                        <div className="flex flex-col gap-6 pt-6 border-t border-[#F5F5F7]">
                            <h4 className="text-[18px] font-black text-[#0B153D]">Add response</h4>
                            <textarea placeholder="Send a response to user" className="w-full h-40 bg-[#F5F5F7] border border-[#E6E6EB] rounded-[24px] p-8 text-[14px] font-bold focus:ring-1 focus:ring-[#A10602] outline-none transition-shadow resize-none" />

                            <div className="flex items-center gap-3">
                                <button onClick={() => setSendEmail(!sendEmail)} className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${sendEmail ? 'bg-[#A10602] border-[#A10602]' : 'bg-white border-[#E6E6EB]'}`}>
                                    {sendEmail && <Check size={14} className="text-white" />}
                                </button>
                                <span className="text-[14px] font-bold text-[#333]">Send updates via email</span>
                            </div>

                            <button 
                                onClick={() => alert("Waiting for Backend Implementation: The API endpoint for sending email replies directly to the user (e.g. POST /api/v1/admin/support/tickets/{id}/reply) has not been built yet. I've added this to our backend requirements logic!")}
                                className="w-full bg-[#A10602] text-white py-5 rounded-full font-black text-[15px] shadow-xl hover:bg-[#8B0501] active:scale-[0.98] transition-all"
                            >
                                Submit Reply
                            </button>
                        </div>
                    </div>

                    {/* User Profile Card */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[18px] font-black text-[#0B153D]">User</h3>
                        <div className="bg-white border border-[#E6E6EB] rounded-[32px] p-8 flex flex-col gap-8 shadow-sm">
                            <div className="flex items-center gap-6">
                                <Avatar name={ticket.userName} className="w-24 h-24 text-[32px] border-4 border-[#F5F5F7] shadow-inner shrink-0" />
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-[26px] font-black text-[#A10602] leading-none">{ticket.userName} | {ticket.userType}</h2>
                                    <p className="text-[13px] font-bold text-[#A0A0A0]">Sent a request over</p>
                                </div>
                            </div>

                            <div className="bg-white border-2 border-[#F5F5F7] rounded-[24px] overflow-hidden">
                                {[
                                    { label: 'Phone', value: ticket._raw?.user_phone || 'N/A' },
                                    { label: 'Email', value: ticket._raw?.user_email || 'N/A' },
                                    { label: 'Location', value: 'Congo' },
                                ].map((item, id) => (
                                    <div key={id} className={`flex items-center gap-10 p-5 ${id !== 2 ? 'border-b-2 border-[#F5F5F7]' : ''}`}>
                                        <span className="text-[12px] font-black text-[#A0A0A0] uppercase tracking-wider w-24 shrink-0">{item.label}</span>
                                        <span className="text-[15px] font-bold text-[#333] tracking-tight truncate">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
