"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, X, AlertCircle, CheckCircle2, MoreHorizontal, User, MessageCircle, Clock, Paperclip, Send, Check } from 'lucide-react';
import Image from 'next/image';

interface TicketDetailProps {
    ticket: any;
    onClose: () => void;
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

export default function TicketDetailsModal({ ticket, onClose }: TicketDetailProps) {
    const [priority, setPriority] = useState('Low');
    const [status, setStatus] = useState('Resolved');
    const [showPriorityMenu, setShowPriorityMenu] = useState(false);
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const [sendEmail, setSendEmail] = useState(true);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-[#F5F5F7] w-full max-w-[1000px] h-[95vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">

                {/* Header Row */}
                <div className="bg-white px-8 py-8 border-b border-[#F5F5F7] flex flex-wrap items-center justify-between gap-y-6 shrink-0 relative z-20">
                    <div className="flex flex-col"><span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Trip ID</span><span className="text-[14px] font-black text-[#333]">#JDN783</span></div>

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

                    <div className="flex flex-col"><span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Issue category</span><span className="text-[14px] font-black text-[#666]">Trip issue</span></div>
                    <div className="flex flex-col"><span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Date created</span><span className="text-[14px] font-black text-[#666]">25/03/2025</span></div>
                    <div className="flex flex-col"><span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Last updated</span><span className="text-[14px] font-black text-[#666]">25/03/2025</span></div>

                    <div className="flex flex-col relative">
                        <span className="text-[11px] font-bold text-[#A0A0A0] uppercase mb-1">Mark status as</span>
                        <div className="relative">
                            <button
                                onClick={() => setShowStatusMenu(!showStatusMenu)}
                                className={`flex items-center gap-3 px-6 py-2 rounded-full text-[12px] font-bold border transition-all
                                    ${status === 'Resolved' ? 'text-[#00B230] bg-[#E6F7EB] border-[#CFEFD8]' :
                                        status === 'Open' ? 'text-[#FFB800] bg-[#FFF8E6] border-[#FFEBBF]' :
                                            status === 'In progress' ? 'text-[#3E86F5] bg-[#EBF3FF] border-[#D0E2FF]' :
                                                'text-[#666] bg-[#F5F5F7] border-[#E6E6EB]'}
                                `}
                            >
                                {status} <ChevronDown size={14} />
                            </button>
                            {showStatusMenu && (
                                <div className="absolute right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-[#E6E6EB] z-30 py-2 p-1 flex flex-col gap-1">
                                    <button onClick={() => { setStatus('Open'); setShowStatusMenu(false); }} className="w-full px-4 py-2 text-left rounded-xl text-[12px] font-bold text-[#FFB800] hover:bg-[#FFF8E6] border border-[#FFEBBF]">Open</button>
                                    <button onClick={() => { setStatus('In progress'); setShowStatusMenu(false); }} className="w-full px-4 py-2 text-left rounded-xl text-[12px] font-bold text-[#3E86F5] hover:bg-[#EBF3FF] border border-[#D0E2FF]">In progress</button>
                                    <button onClick={() => { setStatus('Resolved'); setShowStatusMenu(false); }} className="w-full px-4 py-2 text-left rounded-xl text-[12px] font-bold text-[#00B230] hover:bg-[#E6F7EB] border border-[#CFEFD8]">Resolved</button>
                                    <button onClick={() => { setStatus('Closed'); setShowStatusMenu(false); }} className="w-full px-4 py-2 text-left rounded-xl text-[12px] font-bold text-[#666] hover:bg-[#F5F5F7] border border-[#E6E6EB]">Closed</button>
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
                            <InputField label="Subject" value="Enter subject." required />
                            <InputField label="Full Name" value="Samad Phoenix" required />
                            <InputField label="Email" value="exampleemail@gmail.com" required />
                            <InputField label="Phone Number" value="09073729374" />
                            <InputField label="Category" value="Driver behavior" />
                            <InputField label="Country" value="Congo" />
                            <InputField label="Response language" value="Spanish" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[13px] font-bold text-[#333] flex items-center gap-1.5">User Message<span className="text-[#A10602]">*</span></label>
                            <div className="w-full bg-[#F5F5F7] border border-[#E6E6EB] rounded-[24px] p-8 text-[14px] font-bold text-[#333]/70 leading-relaxed italic min-h-[160px]">
                                The Driver was suppose to was suppose to was suppose to was suppose to was suppose to was suppose to...
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="text-[13px] font-bold text-[#A0A0A0] uppercase tracking-wider">Attachment(s)</span>
                            <div className="flex gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-28 h-28 rounded-[16px] overflow-hidden border-2 border-[#F5F5F7]">
                                        <Image src="/images/driverCar.png" width={112} height={112} alt="Evidence" className="object-cover" />
                                    </div>
                                ))}
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

                            <button className="w-full bg-[#A10602] text-white py-5 rounded-full font-black text-[15px] shadow-xl hover:bg-[#8B0501] active:scale-[0.98] transition-all">
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* User Profile Card */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[18px] font-black text-[#0B153D]">User</h3>
                        <div className="bg-white border border-[#E6E6EB] rounded-[32px] p-8 flex flex-col gap-8 shadow-sm">
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#F5F5F7] shadow-inner">
                                    <Image src="/admin_user_avatar_rider_1773934010183.png" width={96} height={96} alt="User" className="object-cover" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-[26px] font-black text-[#A10602] leading-none">Estime Sa. | Rider</h2>
                                    <p className="text-[13px] font-bold text-[#A0A0A0]">last seen today 9:40 GMT</p>
                                </div>
                            </div>

                            <div className="bg-white border-2 border-[#F5F5F7] rounded-[24px] overflow-hidden">
                                {[
                                    { label: 'Phone', value: '08037281938' },
                                    { label: 'Email', value: 'exampleemail@gmail.com' },
                                    { label: 'Location', value: 'Kimshasha, Congo' },
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
