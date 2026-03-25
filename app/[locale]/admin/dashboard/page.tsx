"use client";

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
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
    const [stats, setStats] = useState({
        total_trips: "...",
        active_drivers: "...",
        active_riders: "...",
        revenue: "..."
    });

    const [apiError, setApiError] = useState<string | null>(null);
    const [analytics, setAnalytics] = useState<any>(null);
    const [commissionRate, setCommissionRate] = useState<number>(20); // Default to 20%

    useEffect(() => {
        const fetchStats = async () => {
            console.log("Dashboard mount: Beginning fetch for Admin Stats...");
            try {
                const token = localStorage.getItem('admin_token');
                console.log("Checking for token in localStorage:", token ? "Token Exists!" : "No Token Found!");
                
                const res = await fetch('https://anyride.techenex.online/api/v1/admin/dashboard/stats', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const statsRaw = await res.json();
                
                const analyticsRes = await fetch('https://anyride.techenex.online/api/v1/admin/dashboard/analytics', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const analyticsRaw = await analyticsRes.json();

                const settingsRes = await fetch('https://anyride.techenex.online/api/v1/admin/settings', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const settingsRaw = await settingsRes.json();

                if (res.ok) {
                    const statsData = statsRaw.data || statsRaw; // Handle backend wrapping
                    setStats({
                        total_trips: statsData.rides?.total?.toLocaleString() || "0",
                        active_drivers: statsData.drivers?.total?.toLocaleString() || "0",
                        active_riders: statsData.users?.total?.toLocaleString() || "0",
                        revenue: `CDF ${statsData.revenue?.total?.toLocaleString() || "0"}`
                    });
                    
                    if (analyticsRes.ok) setAnalytics(analyticsRaw.data || analyticsRaw);
                    if (settingsRes.ok) {
                        const comRate = settingsRaw.data?.commission?.platform_commission_percentage;
                        if (comRate !== undefined) setCommissionRate(comRate);
                    }

                    console.log("React UI successfully updated with live API data.");
                } else {
                    console.warn("Backend rejected the API Request:", statsRaw.message);
                    setApiError(statsRaw.message || 'API Error');
                }
            } catch (error) {
                console.error("Dashboard Stats Fetch Error:", error);
                setApiError("Network Error - Check console");
            }
        };
        fetchStats();
    }, []);

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
                        <StatCard label="Total trips" value={apiError ? "Auth Error" : (stats.total_trips !== "..." ? stats.total_trips : "...")} trend="up" trendValue="+1.5%/last wk" />
                        <StatCard label="Active Drivers" value={apiError ? "Auth Error" : (stats.active_drivers !== "..." ? stats.active_drivers : "...")} trend="down" trendValue="-1.42%/last wk" />
                        <StatCard label="Active Riders" value={apiError ? "Auth Error" : (stats.active_riders !== "..." ? stats.active_riders : "...")} trend="up" trendValue="+1.5%/last mo" />
                        <StatCard label="Revenue" value={apiError ? "Auth Error" : (stats.revenue !== "..." ? stats.revenue : "...")} />
                    </div>
                    {apiError && (
                        <div className="mt-4 p-4 text-[13px] font-bold text-red-600 bg-red-50 border border-red-200 rounded-xl">
                            API Connection Live: Server rejected request with reason: "{apiError}". We must implement Admin Login to generate access tokens first.
                        </div>
                    )}
                </section>

                {/* Overviews Section Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-8 lg:mb-10">
                    {/* Linear Chart */}
                    <div className="bg-white rounded-[24px] p-6 lg:p-8 border border-[#E6E6EB] shadow-sm min-h-[420px] lg:min-h-[480px] flex flex-col relative overflow-hidden">
                        <div className="flex justify-between items-start mb-10 overflow-x-auto">
                            <h3 className="text-[18px] lg:text-[20px] font-extrabold text-[#333333] shrink-0">Trips Overview</h3>
                            <button className="text-[13px] font-bold text-[#A20602] hover:underline shrink-0">View all trips</button>
                        </div>

                        <div className="flex-1 w-full relative mb-4">
                            {!analytics ? (
                                <div className="absolute inset-0 flex items-center justify-center text-[#A0A0A0] font-bold text-[14px]">Loading...</div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={analytics?.rides_over_time || []} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0B153D" stopOpacity={0.2}/>
                                                <stop offset="95%" stopColor="#0B153D" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="date" tick={{fontSize: 10, fill: '#A0A0A0', fontWeight: 'bold'}} tickLine={false} axisLine={false} tickFormatter={(val) => { const d = new Date(val); return d.getDate().toString(); }} />
                                        <Tooltip 
                                            contentStyle={{backgroundColor: '#333333', color: '#fff', borderRadius: '8px', border: 'none', fontWeight: 'bold'}}
                                            itemStyle={{color: '#fff'}}
                                        />
                                        <Area type="monotone" dataKey="count" stroke="#0B153D" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white rounded-[24px] p-6 lg:p-8 border border-[#E6E6EB] shadow-sm min-h-[420px] lg:min-h-[480px] flex flex-col">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-[18px] lg:text-[20px] font-extrabold text-[#333333]">Revenue Split</h3>
                            <button className="text-[13px] font-bold text-[#A20602] hover:underline">View info</button>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center relative">
                            {!analytics ? (
                                <div className="text-[#A0A0A0] font-bold text-[14px]">Loading...</div>
                            ) : (
                                <>
                                    <div className="w-full h-[220px] md:h-[260px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={[
                                                        { name: 'Earnings', value: analytics.revenue_over_time?.reduce((a:any,b:any)=>a+b.revenue,0) * ((100 - commissionRate) / 100) || (100 - commissionRate) },
                                                        { name: 'Commission', value: analytics.revenue_over_time?.reduce((a:any,b:any)=>a+b.revenue,0) * (commissionRate / 100) || commissionRate }
                                                    ]}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius="65%"
                                                    outerRadius="100%"
                                                    paddingAngle={2}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    <Cell fill="#0B153D" />
                                                    <Cell fill="#FFB800" />
                                                </Pie>
                                                <Tooltip contentStyle={{ borderRadius: '12px', fontWeight: 'bold', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="absolute flex flex-col items-center justify-center pointer-events-none mt-[-40px]">
                                        <div className="bg-[#FFB800] text-white text-[11px] font-bold py-1 px-3 rounded-full shadow-lg">
                                            {stats.revenue === 'CDF 0' || stats.revenue === '...' ? 'No Data' : stats.revenue}
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center w-full">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-[4px] bg-[#0B153D]"></div>
                                    <span className="text-[13px] font-bold text-[#666666]">Earnings ({100 - commissionRate}%)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-[4px] bg-[#FFB800]"></div>
                                    <span className="text-[13px] font-bold text-[#666666]">Commission ({commissionRate}%)</span>
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
                            { label: 'Rider signups', value: analytics?.user_growth?.reduce((a:number,b:any)=>a+b.count,0)?.toLocaleString() || '0' },
                            { label: 'Driver check-ins', value: analytics?.driver_status_distribution?.reduce((a:number,b:any)=>a+b.count,0)?.toLocaleString() || '0' },
                            { label: 'Verified', value: analytics?.driver_status_distribution?.find((s:any)=>s.status==='verified')?.count?.toLocaleString() || '0' },
                            { label: 'Pending', value: analytics?.driver_status_distribution?.find((s:any)=>s.status==='pending')?.count?.toLocaleString() || '0' },
                            { label: 'Completed Rides', value: analytics?.ride_status_distribution?.find((s:any)=>s.status==='COMPLETED')?.count?.toLocaleString() || '0' },
                            { label: 'Cancelled Rides', value: analytics?.ride_status_distribution?.find((s:any)=>s.status==='CANCELLED')?.count?.toLocaleString() || '0' },
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
