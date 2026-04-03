"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Star, X, Info, ShieldAlert, CheckCircle2, EyeOff, MapPin, Navigation, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

interface ReviewDetailProps {
    review: any;
    onClose: () => void;
}

export default function ReviewDetailsModal({ review, onClose }: ReviewDetailProps) {
    const [status, setStatus] = useState(review.status || 'Approved');
    const [showStatusMenu, setShowStatusMenu] = useState(false);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white w-full max-w-[950px] rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">

                {/* Header Table-like row */}
                <div className="bg-[#F5F5F7]/30 px-8 py-8 border-b border-[#F5F5F7] flex flex-wrap items-center justify-between gap-y-6">
                    <div className="flex flex-col"><span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Trip ID</span><span className="text-[14px] font-black text-[#333]">#JDN783</span></div>
                    <div className="flex flex-col"><span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Date</span><span className="text-[14px] font-black text-[#333]">25/03/2025 • 5:30 GMT</span></div>
                    <div className="flex flex-col items-center">
                        <span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Ratings</span>
                        <div className="flex items-center gap-1.5 text-[#FFB800] font-black text-[15px]">4.8 <Star size={16} fill="#FFB800" /></div>
                    </div>
                    <div className="flex flex-col"><span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Vehicle type</span><span className="text-[14px] font-black text-[#666]">Motorcycle</span></div>
                    <div className="flex flex-col relative">
                        <span className="text-[11px] font-bold text-[#A0A0A0] uppercase mb-1">Mark review as</span>
                        <div className="relative">
                            <button
                                onClick={() => setShowStatusMenu(!showStatusMenu)}
                                className={`flex items-center gap-3 px-6 py-2 rounded-full text-[13px] font-bold border transition-all shadow-xs
                                    ${status === 'Approved' ? 'text-[#00B230] bg-[#E6F7EB] border-[#CFEFD8]' :
                                        status === 'Hidden' ? 'text-[#E53935] bg-[#FFF4F4] border-[#FFE6E6]' :
                                            'text-[#FFB800] bg-[#FFF8E6] border-[#FFEBBF]'}
                                `}
                            >
                                {status} <ChevronDown size={14} />
                            </button>
                            {showStatusMenu && (
                                <div className="absolute right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-[#E6E6EB] z-20 py-2 p-1 flex flex-col gap-1">
                                    <button onClick={() => { setStatus('Approved'); setShowStatusMenu(false); }} className="w-full px-4 py-2 text-left rounded-xl text-[12px] font-bold text-[#00B230] hover:bg-[#E6F7EB] transition-colors">Approved</button>
                                    <button onClick={() => { setStatus('Flagged'); setShowStatusMenu(false); }} className="w-full px-4 py-2 text-left rounded-xl text-[12px] font-bold text-[#FFB800] hover:bg-[#FFF8E6] transition-colors border border-[#FFEBBF]">Flagged</button>
                                    <button onClick={() => { setStatus('Hidden'); setShowStatusMenu(false); }} className="w-full px-4 py-2 text-left rounded-xl text-[12px] font-bold text-[#E53935] hover:bg-[#FFF4F4] transition-colors border border-[#FFE6E6]">Hidden</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 bg-[#F5F5F7] rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto max-h-[70vh] p-8 md:p-10 flex flex-col gap-10 scrollbar-hide">
                    {/* Trip Overview */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[18px] font-black text-[#0B153D]">Trip Overview</h3>
                        <div className="bg-[#F5F5F7]/30 border-2 border-[#F5F5F7] rounded-[32px] p-8 flex flex-col gap-6">
                            <div className="flex gap-4 relative">
                                <div className="flex flex-col items-center gap-1 mt-1">
                                    <Navigation className="text-[#A0A0A0]" size={16} />
                                    <div className="w-[1.5px] h-6 border-l border-dashed border-[#A0A0A0]"></div>
                                    <MapPin className="text-[#A10601]" size={16} />
                                </div>
                                <div className="flex flex-col gap-6 w-full">
                                    <div className="flex flex-col"><span className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">Pickup</span><span className="text-[14px] font-bold text-[#333]">4827 Willowbrook Lane, OH 44126</span></div>
                                    <div className="flex flex-col"><span className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-widest">Destination</span><span className="text-[14px] font-bold text-[#333]">123 Main St, Springfield, IL 62704</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Review Section */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[18px] font-black text-[#0B153D]">Review</h3>
                        <div className="bg-[#F5F5F7] p-8 rounded-[24px]">
                            <p className="text-[14px] font-bold text-[#333]/80 leading-relaxed italic">
                                "One of your rider need to One of your rider need to One of your rider need to One of your rider need to One of your rider need to One of your rider need to One of your rider need to"
                            </p>
                        </div>
                    </div>

                    {/* Reviewer Details */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[18px] font-black text-[#0B153D]">Reviewer</h3>
                        <div className="bg-white border border-[#E6E6EB] rounded-[32px] p-4 pr-10 shadow-sm flex items-center gap-6 mb-2">
                            <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden border-4 border-[#F5F5F7] shadow-inner shrink-0 scale-90">
                                <Image src="/admin_user_avatar_rider_1773934010183.png" width={128} height={128} alt="User" className="object-cover" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-[24px] font-black text-[#A10602] leading-none tracking-tight">Estime Sa. | Rider</h2>
                                <p className="text-[13px] font-bold text-[#A0A0A0] tracking-wide uppercase">last seen today 9:40 GMT</p>
                            </div>
                        </div>
                        <div className="bg-white border-2 border-[#F5F5F7] rounded-[24px] overflow-hidden">
                            {[
                                { label: 'Phone', value: '08037281938' },
                                { label: 'Email', value: 'exampleemail@gmail.com' },
                                { label: 'Location', value: 'Kimshasha, Congo' },
                            ].map((item, id) => (
                                <div key={id} className={`flex items-center gap-10 p-5 ${id !== 2 ? 'border-b-2 border-[#F5F5F7]' : ''}`}>
                                    <span className="text-[12px] font-black text-[#A0A0A0] uppercase tracking-wider w-24">{item.label}</span>
                                    <span className="text-[15px] font-bold text-[#333333] tracking-tight">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
