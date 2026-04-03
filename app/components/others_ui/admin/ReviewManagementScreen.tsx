"use client";

import React, { useState } from 'react';
import AdminSidebar from "@/app/components/others_ui/admin/AdminSidebar";
import AdminHeader from "@/app/components/others_ui/admin/AdminHeader";
import ReviewDetailsModal from "@/app/components/others_ui/admin/ReviewDetailsModal";
import { Search, ChevronDown, ChevronRight, Star, AlertCircle, CheckCircle2, EyeOff, ShieldAlert } from 'lucide-react';

const reviewsData = [
    { tripId: '#JDN783', reviewer: 'Rider', reviewedUser: 'Esteem Salah', rating: 4.8, review: 'Esteem is easy to work with...', date: '25/03/2025 • 5:30 GMT', status: 'Approved' },
    { tripId: '#JDN783', reviewer: 'Rider', reviewedUser: 'Esteem Salah', rating: 4.8, review: 'Esteem is easy to work with...', date: '25/03/2025 • 5:30 GMT', status: 'Approved' },
    { tripId: '#JDN783', reviewer: 'Driver', reviewedUser: 'Esteem Salah', rating: 4.8, review: 'Esteem is easy to work with...', date: '25/03/2025 • 5:30 GMT', status: 'Hidden' },
    { tripId: '#JDN783', reviewer: 'Rider', reviewedUser: 'Esteem Salah', rating: 4.8, review: 'Esteem is easy to work with...', date: '25/03/2025 • 5:30 GMT', status: 'Flagged' },
    { tripId: '#JDN783', reviewer: 'Rider', reviewedUser: 'Esteem Salah', rating: 4.8, review: 'Esteem is easy to work with...', date: '25/03/2025 • 5:30 GMT', status: 'Flagged' },
    { tripId: '#JDN783', reviewer: 'Driver', reviewedUser: 'Esteem Salah', rating: 4.8, review: 'Esteem is easy to work with...', date: '25/03/2025 • 5:30 GMT', status: 'Approved' },
];

const StatCard = ({ label, value, subValue, icon: Icon }: { label: string, value: string, subValue?: string, icon?: any }) => (
    <div className="bg-white border border-[#E6E6EB] rounded-[24px] p-6 lg:p-8 flex flex-col gap-2 shadow-sm flex-1 min-w-[240px]">
        <span className="text-[14px] font-bold text-[#A0A0A0] uppercase tracking-wider">{label}</span>
        <div className="flex items-center gap-2">
            <span className="text-[28px] font-black text-[#0B153D]">{subValue && <span className="text-[#A0A0A0] text-[20px] mr-2">({subValue})</span>} {value}</span>
            {Icon && <Icon size={24} fill="#FFB800" className="text-[#FFB800]" />}
        </div>
    </div>
);

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        'Approved': 'text-[#00B230] bg-[#E6F7EB] border-[#CFEFD8]',
        'Hidden': 'text-[#E53935] bg-[#FFF4F4] border-[#FFE6E6]',
        'Flagged': 'text-[#FFB800] bg-[#FFF8E6] border-[#FFEBBF]',
    };
    const c = styles[status] || styles['Approved'];
    return (
        <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold border ${c} min-w-[100px] inline-block text-center shadow-xs`}>
            {status}
        </span>
    );
};

export default function ReviewManagementScreen() {
    const [selectedReview, setSelectedReview] = useState<any>(null);
    const [showRatingsFilter, setShowRatingsFilter] = useState(false);
    const [showMainFilter, setShowMainFilter] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#F5F5F7] font-sans">
            <AdminSidebar />
            <main className="flex-1 w-full lg:ml-[300px] p-4 sm:p-6 lg:p-8 pb-20 overflow-x-hidden">
                <AdminHeader />
                <div className="bg-white rounded-[32px] p-6 md:p-10 border border-[#E6E6EB] shadow-sm flex flex-col gap-10 min-h-[800px] overflow-hidden">

                    <div className="flex flex-col gap-8">
                        <h2 className="text-[26px] md:text-[32px] font-black text-[#0B153D] tracking-tight leading-none text-center sm:text-left">
                            Monitor rider and driver feedback across the platform
                        </h2>

                        {/* Stats Grid */}
                        <div className="flex flex-wrap gap-6 select-none">
                            <StatCard label="Overall ratings" value="4.6" subValue="269" icon={Star} />
                            <StatCard label="Driver ratings" value="4.1" subValue="101" icon={Star} />
                            <StatCard label="Rider ratings" value="4.8" subValue="168" icon={Star} />
                            <StatCard label="Flagged reviews" value="19" />
                        </div>
                    </div>

                    {/* Controls Row */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-2">
                        <div className="md:col-span-8 relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={20} />
                            <input
                                type="text"
                                placeholder="Search by trip ID, user or keyword"
                                className="w-full h-[60px] bg-white border border-[#E6E6EB] rounded-full pl-16 pr-8 text-[15px] font-medium placeholder:text-[#A0A0A0] focus:ring-1 focus:ring-[#A20602] transition-shadow outline-none shadow-sm"
                            />
                        </div>
                        <div className="md:col-span-4 relative">
                            <button
                                onClick={() => setShowMainFilter(!showMainFilter)}
                                className="w-full h-[60px] flex items-center justify-center gap-3 bg-white border border-[#E6E6EB] rounded-2xl px-10 text-[14px] font-black text-[#A0A0A0] hover:bg-[#F5F5F7] transition-all shadow-xs"
                            >
                                Filter by <ChevronDown size={18} />
                            </button>
                            {showMainFilter && (
                                <div className="absolute right-0 mt-3 w-64 bg-white rounded-[24px] shadow-2xl z-20 overflow-hidden py-4 animate-in fade-in zoom-in duration-300 border border-[#E6E6EB]">
                                    <div className="relative group/sub">
                                        <button
                                            onClick={() => setShowRatingsFilter(!showRatingsFilter)}
                                            className={`w-full flex items-center justify-between px-8 py-4 font-black text-[14px] hover:bg-[#A20601] hover:text-white transition-all ${showRatingsFilter ? 'bg-[#A20601] text-white' : 'text-[#333]'}`}
                                        >
                                            Ratings <ChevronRight size={16} />
                                        </button>
                                        {showRatingsFilter && (
                                            <div className="absolute left-[-220px] top-0 w-52 bg-[#A20601] rounded-[24px] shadow-2xl z-30 overflow-hidden py-4 animate-in fade-in slide-in-from-right-4 duration-200">
                                                <button className="w-full px-8 py-3.5 text-white font-black text-[14px] text-left hover:bg-black/10 transition-all border-b border-white/5">1 - 5</button>
                                                <button className="w-full px-8 py-3.5 text-white font-black text-[14px] text-left hover:bg-black/10 transition-all">5 - 1</button>
                                            </div>
                                        )}
                                    </div>
                                    <button className="w-full flex items-center justify-between px-8 py-4 text-[#333] font-black text-[14px] hover:bg-[#A20601] hover:text-white transition-all group">
                                        Reviewer <ChevronRight size={16} />
                                    </button>
                                    <button className="w-full flex items-center justify-between px-8 py-4 text-[#333] font-black text-[14px] hover:bg-[#A20601] hover:text-white transition-all group">
                                        Status <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="relative w-full overflow-hidden flex-1">
                        <div className="overflow-x-auto scrollbar-hide h-full">
                            <table className="w-full min-w-[1000px] text-left">
                                <thead className="border-b border-[#F5F5F7] bg-[#F5F5F7]/30 sticky top-0 bg-white z-10 transition-all">
                                    <tr>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em] shrink-0">Trip ID</th>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Reviewer</th>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Reviewed user</th>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Ratings</th>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em] w-1/4">Reviews</th>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Date & time</th>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Status</th>
                                        <th className="py-6 px-8 text-[12px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F5F5F7]">
                                    {reviewsData.map((review, idx) => (
                                        <tr key={idx} className="group hover:bg-[#F5F5F7]/40 transition-all cursor-default relative">
                                            <td className="py-6 lg:py-8 px-8"><span className="text-[14px] font-black text-[#333]">{review.tripId}</span></td>
                                            <td className="py-6 lg:py-8 px-8"><span className="text-[14px] font-bold text-[#666]">{review.reviewer}</span></td>
                                            <td className="py-6 lg:py-8 px-8"><span className="text-[14px] font-black text-[#333]">{review.reviewedUser}</span></td>
                                            <td className="py-6 lg:py-8 px-8">
                                                <div className="flex items-center gap-1.5 text-[#FFB800] font-black text-[14px]">
                                                    {review.rating} <Star size={16} fill="#FFB800" />
                                                </div>
                                            </td>
                                            <td className="py-6 lg:py-8 px-8">
                                                <p className="text-[14px] font-bold text-[#333] truncate max-w-[150px] shadow-xs bg-white/50 px-2 py-1 rounded inline-block">{review.review}</p>
                                            </td>
                                            <td className="py-6 lg:py-8 px-8"><span className="text-[13px] font-bold text-[#A0A0A0]">{review.date}</span></td>
                                            <td className="py-6 lg:py-8 px-8"><StatusBadge status={review.status} /></td>
                                            <td className="py-6 lg:py-8 px-8">
                                                <button onClick={() => setSelectedReview(review)} className="bg-[#02093A] hover:bg-[#070e28] text-white px-8 py-3 rounded-lg text-[12px] font-black transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-tight">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            {selectedReview && <ReviewDetailsModal review={selectedReview} onClose={() => setSelectedReview(null)} />}
        </div>
    );
}
