"use client";

import React from 'react';
import AdminSidebar from "@/app/components/others_ui/admin/AdminSidebar";
import AdminHeader from "@/app/components/others_ui/admin/AdminHeader";
import {
    TrendingUp,
    TrendingDown,
    ChevronDown,
} from 'lucide-react';

const StatCard = ({ label, value, trend, trendValue }: { label: string, value: string, trend?: 'up' | 'down', trendValue?: string }) => (
    <div className="bg-white border border-[#E6E6EB] rounded-[20px] p-6 lg:p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
        <span className="text-[13px] font-bold text-[#A0A0A0] uppercase tracking-wide">{label}</span>
        <div className="flex items-center justify-between">
            <span className="text-[28px] lg:text-[32px] font-extrabold text-[#333333] tracking-tight">{value}</span>
            {trend && (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold border ${trend === 'up' ? 'text-[#00B230] bg-[#E6F7EB] border-[#CFEFD8]' : 'text-[#E53935] bg-[#FFF4F4] border-[#FFE6E6]'}`}>
                    {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {trendValue}
                </div>
            )}
        </div>
    </div>
);

export default function AdminDashboardPage() {
    return (
        <div className="flex min-h-screen bg-[#F5F5F7] font-sans">
            <AdminSidebar />

            {/* Main Content Area - Responsive width with sidebar offset */}
            <main className="flex-1 w-full lg:ml-[300px] p-4 sm:p-6 lg:p-8 pb-20 overflow-x-hidden">
                <AdminHeader />

                {/* Main Stats Summary Section */}
                <section className="bg-white rounded-[24px] p-6 lg:p-10 border border-[#E6E6EB] shadow-sm mb-8 lg:mb-10 flex flex-col gap-8 lg:gap-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1.5">
                            <h2 className="text-[24px] lg:text-[28px] font-black text-[#333333] flex items-center gap-3">
                                <span role="img" aria-label="welcome" className="text-[24px]">🤖</span> Welcome Sam!
                            </h2>
                            <p className="text-[14px] font-bold text-[#A0A0A0]">Here's what is happening today.</p>
                        </div>
                        <button className="flex items-center gap-3 bg-white border border-[#E6E6EB] rounded-xl px-5 py-3 text-[14px] font-bold text-[#333333] hover:bg-[#F5F5F7] transition-all shadow-sm">
                            This week <ChevronDown size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        <StatCard label="Total trips" value="269" trend="up" trendValue="+1.5%/last wk" />
                        <StatCard label="Active Drivers" value="1,240" trend="down" trendValue="-1.42%/last wk" />
                        <StatCard label="Active Riders" value="165" trend="up" trendValue="+1.5%/last mo" />
                        <StatCard label="Revenue" value="CDF 52,252" />
                    </div>
                </section>

                {/* Overviews Section Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-8 lg:mb-10">
                    {/* Linear Chart Mock up */}
                    <div className="bg-white rounded-[24px] p-6 lg:p-8 border border-[#E6E6EB] shadow-sm min-h-[420px] lg:min-h-[480px] flex flex-col relative overflow-hidden">
                        <div className="flex justify-between items-start mb-10 overflow-x-auto">
                            <h3 className="text-[18px] lg:text-[20px] font-extrabold text-[#333333] shrink-0">Trips Overview</h3>
                            <button className="text-[13px] font-bold text-[#A20602] hover:underline shrink-0">View all trips</button>
                        </div>

                        <div className="flex-1 w-full relative border-b border-l border-[#E6E6EB]/50 pb-6 ml-6 md:ml-10">
                            {/* Y-axis Labels - Hidden on small mobile */}
                            <div className="absolute -left-12 lg:-left-16 inset-y-0 flex flex-col justify-between items-end text-[10px] lg:text-[11px] font-bold text-[#A0A0A0] pr-2 pointer-events-none">
                                <span>1.4M</span>
                                <span>1M</span>
                                <span>800K</span>
                                <span>600K</span>
                                <span>400K</span>
                                <span>200K</span>
                            </div>

                            <div className="w-full h-full relative group">
                                <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="none" className="overflow-visible">
                                    <path
                                        d="M0,180 Q150,140 250,230 T500,80 T750,280 T1000,130"
                                        fill="none"
                                        stroke="#0B153D"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                    />
                                    <circle cx="500" cy="80" r="10" fill="#333333" stroke="#F5F5F7" strokeWidth="3" />
                                </svg>

                                <div className="absolute top-[60px] left-[50%] -translate-x-1/2 -translate-y-[100%] bg-[#333333] text-white px-4 py-2 rounded-[8px] text-[13px] font-bold shadow-xl">
                                    CDF 920K
                                </div>
                                <div className="absolute top-[80px] left-[50%] -translate-x-1/2 w-[2px] h-[78%] bg-[#0B153D]/10"></div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-[11px] font-bold text-[#A0A0A0] mt-6 px-4 md:px-12">
                            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                        </div>
                    </div>

                    {/* Pie Chart Mock up */}
                    <div className="bg-white rounded-[24px] p-6 lg:p-8 border border-[#E6E6EB] shadow-sm min-h-[420px] lg:min-h-[480px] flex flex-col">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-[18px] lg:text-[20px] font-extrabold text-[#333333]">Trips Overview</h3>
                            <button className="text-[13px] font-bold text-[#A20602] hover:underline">View info</button>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center">
                            <div className="relative w-[180px] h-[180px] md:w-[240px] md:h-[240px]">
                                <svg viewBox="0 0 100 100" className="transform -rotate-90 filter drop-shadow-md">
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0B153D" strokeWidth="20" strokeDasharray="188 251" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FFB800" strokeWidth="20" strokeDasharray="63 251" strokeDashoffset="-188" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <div className="bg-[#FFB800] text-white text-[10px] font-bold py-1 px-3 rounded-full mb-10 translate-y-[-10px]">CDF 920K</div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center w-full">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-[4px] bg-[#0B153D]"></div>
                                    <span className="text-[13px] font-bold text-[#666666]">Earnings</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-[4px] bg-[#FFB800]"></div>
                                    <span className="text-[13px] font-bold text-[#666666]">Commission</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom User Stats Section Responsive */}
                <section className="bg-white rounded-[24px] p-6 lg:p-8 border border-[#E6E6EB] shadow-sm mb-10 overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-[#F5F5F7] gap-4">
                        <h3 className="text-[18px] lg:text-[20px] font-extrabold text-[#333333]">User Overview Stats</h3>
                        <button className="flex items-center gap-3 bg-white border border-[#E6E6EB] rounded-[10px] px-5 py-2.5 text-[14px] font-bold text-[#333333] hover:bg-[#F5F5F7] shadow-sm text-sm">
                            To-date <ChevronDown size={14} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                        {[
                            { label: 'Rider signups', value: '50,918' },
                            { label: 'Driver signups', value: '12,202' },
                            { label: 'Verified', value: '10,081' },
                            { label: 'Pending', value: '108' },
                            { label: 'Suspended', value: '68' },
                            { label: 'Blocked', value: '28' },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col gap-4 py-4 rounded-xl border border-transparent hover:border-[#F5F5F7] hover:bg-[#F5F5F7]/20 transition-all">
                                <span className="text-[11px] font-bold text-[#A0A0A0] px-2 min-h-[30px]">{stat.label}</span>
                                <span className="text-[20px] lg:text-[24px] font-black text-[#333333]">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
