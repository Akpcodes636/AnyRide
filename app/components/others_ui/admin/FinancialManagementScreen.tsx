"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from "@/app/components/others_ui/admin/AdminSidebar";
import AdminHeader from "@/app/components/others_ui/admin/AdminHeader";
import { Search, ChevronDown, ChevronRight, TrendingUp, TrendingDown, Clock, Download, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from 'recharts';

const StatCard = ({ label, value, trend, isPositive = true }: { label: string, value: string, trend?: string, isPositive?: boolean }) => (
    <div className="bg-white border border-[#E6E6EB] rounded-[24px] p-6 lg:p-8 flex flex-col gap-3 shadow-xs flex-1 min-w-[240px]">
        <span className="text-[13px] font-bold text-[#A0A0A0] leading-none uppercase tracking-wider">{label}</span>
        <div className="flex items-center justify-between">
            <span className="text-[24px] font-black text-[#0B153D] tracking-tight">{value}</span>
            {trend && (
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold border ${isPositive ? 'text-[#00B230] bg-[#E6F7EB] border-[#CFEFD8]' : 'text-[#E53935] bg-[#FFF4F4] border-[#FFE6E6]'}`}>
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {trend}
                </div>
            )}
        </div>
    </div>
);

export default function FinancialManagementScreen() {
    const [activeTab, setActiveTab] = useState('All');
    const [showStatusFilter, setShowStatusFilter] = useState(false);

    // Live State
    const [stats, setStats] = useState({ totalRevenue: 0, completedTrips: 0, platformCommission: 0, driverPayouts: 0 });
    const [revenueData, setRevenueData] = useState<any[]>([]);
    const [earningsData, setEarningsData] = useState<any[]>([]);
    const [tripsData, setTripsData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFinancials = async () => {
            try {
                const token = localStorage.getItem('admin_token');
                if (!token) return;
                const headers = { 'Authorization': `Bearer ${token}` };

                const [settingsRes, statsRes, analyticsRes, ridesRes] = await Promise.all([
                    fetch('https://anyride.techenex.online/api/v1/admin/settings', { headers }),
                    fetch('https://anyride.techenex.online/api/v1/admin/dashboard/stats', { headers }),
                    fetch('https://anyride.techenex.online/api/v1/admin/dashboard/analytics', { headers }),
                    fetch('https://anyride.techenex.online/api/v1/admin/rides', { headers }),
                ]);

                const settings = await settingsRes.json();
                const statsData = await statsRes.json();
                const analyticsData = await analyticsRes.json();
                const ridesDataObj = await ridesRes.json();

                // Determine split from backend or default 20% platform cut
                const commissionRate = settings.data?.commission_percentage ? (settings.data.commission_percentage / 100) : 0.20;

                // Set Cards
                if (statsData.data) {
                    const totalRev = statsData.data.revenue?.total || 0;
                    setStats({
                        totalRevenue: totalRev,
                        completedTrips: statsData.data.rides?.completed || 0,
                        platformCommission: totalRev * commissionRate,
                        driverPayouts: totalRev * (1 - commissionRate)
                    });
                }

                // Set Charts
                if (analyticsData.data?.revenue_over_time) {
                    const last7 = analyticsData.data.revenue_over_time.slice(-7);
                    
                    const revArr = last7.map((item: any) => ({
                        name: item.date.split('-')[2], // day of month
                        value: item.revenue
                    }));
                    setRevenueData(revArr);

                    const earnArr = last7.map((item: any) => ({
                        name: item.date.split('-')[2],
                        platform: item.revenue * commissionRate,
                        drivers: item.revenue * (1 - commissionRate)
                    }));
                    setEarningsData(earnArr);
                }

                // Set Table
                if (ridesDataObj.data?.rides) {
                    const mapped = ridesDataObj.data.rides.map((r: any) => ({
                        id: `#${r.id.toString().padStart(5, '0')}`,
                        date: new Date(r.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                        rider: r.customer_name || 'N/A',
                        driver: r.driver_name || 'N/A',
                        fare: r.ride_price || 0,
                        commission: (r.ride_price || 0) * commissionRate,
                        driverEarnings: (r.ride_price || 0) * (1 - commissionRate),
                        status: r.status ? r.status.charAt(0).toUpperCase() + r.status.slice(1).toLowerCase() : 'Unknown'
                    }));
                    setTripsData(mapped);
                }

            } catch (error) {
                console.error("Failed to fetch financials:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFinancials();
    }, []);

    return (
        <div className="flex min-h-screen bg-[#F5F5F7] font-sans">
            <AdminSidebar />
            <main className="flex-1 w-full lg:ml-[300px] p-4 sm:p-6 lg:p-8 pb-20 overflow-x-hidden">
                <AdminHeader />
                <div className="bg-white rounded-[32px] p-6 md:p-10 border border-[#E6E6EB] shadow-sm flex flex-col gap-10 min-h-[900px] overflow-hidden">

                    {/* Header Controls */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-4 border-b border-[#F5F5F7]">
                        <h2 className="text-[22px] md:text-[28px] font-black text-[#0B153D] tracking-tight leading-none text-center sm:text-left">
                            Track revenue, payouts, commissions and platform health
                        </h2>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <button className="flex-1 md:flex-none h-[52px] bg-[#02093A] text-white px-8 rounded-full font-black text-[14px] flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
                                <Download size={18} /> Export CSV
                            </button>
                            <button className="flex-1 md:flex-none h-[52px] bg-white border border-[#E6E6EB] px-6 rounded-xl font-bold text-[14px] text-[#333] flex items-center justify-center gap-3 hover:bg-[#F5F5F7] transition-all">
                                Today <ChevronDown size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="flex flex-wrap gap-6 select-none">
                        <StatCard label="Total Revenues" value={`CDF ${stats.totalRevenue.toLocaleString()}`} />
                        <StatCard label="Completed trips" value={stats.completedTrips.toLocaleString()} />
                        <StatCard label="Platform commission" value={`CDF ${stats.platformCommission.toLocaleString()}`} />
                        <StatCard label="Driver payouts" value={`CDF ${stats.driverPayouts.toLocaleString()}`} />
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[480px]">
                        {/* Area Chart Component */}
                        <div className="lg:col-span-7 bg-white border border-[#E6E6EB] rounded-[32px] p-8 flex flex-col gap-8 shadow-xs">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-[20px] font-black text-[#0B153D]">Revenue trend</h3>
                                    <div className="flex items-center gap-2">
                                        <button className="w-8 h-8 rounded-full border border-[#E6E6EB] flex items-center justify-center text-[#A0A0A0] hover:bg-[#F5F5F7] transition-all"><ChevronDown className="rotate-90" size={16} /></button>
                                        <button className="w-8 h-8 rounded-full border border-[#E6E6EB] flex items-center justify-center text-[#A0A0A0] hover:bg-[#F5F5F7] transition-all"><ChevronDown className="-rotate-90" size={16} /></button>
                                    </div>
                                </div>
                                <button className="h-[44px] bg-[#F5F5F7] border border-[#E6E6EB] px-5 rounded-xl font-bold text-[12px] text-[#333] flex items-center gap-3">
                                    January 2026 <ChevronDown size={14} />
                                </button>
                            </div>
                            <div className="flex-1 min-h-[250px] w-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData}>
                                        <defs>
                                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#A20601" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#A20601" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5FF" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#A0A0A0' }} />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', padding: '12px 20px' }}
                                            itemStyle={{ fontSize: '14px', fontWeight: '900', color: '#0B153D' }}
                                            formatter={(val) => [`CDF ${Number(val).toLocaleString()}`, 'Revenue']}
                                            cursor={{ stroke: '#E6E6EB', strokeWidth: 1 }}
                                        />
                                        <Area type="monotone" dataKey="value" stroke="#333" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Bar Chart Component */}
                        <div className="lg:col-span-5 bg-white border border-[#E6E6EB] rounded-[32px] p-8 flex flex-col gap-8 shadow-xs">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-[20px] font-black text-[#0B153D]">Earning splits</h3>
                                    <div className="flex items-center gap-2">
                                        <button className="w-8 h-8 rounded-full border border-[#E6E6EB] flex items-center justify-center text-[#A0A0A0] hover:bg-[#F5F5F7] transition-all"><ChevronDown className="rotate-90" size={16} /></button>
                                        <button className="w-8 h-8 rounded-full border border-[#E6E6EB] flex items-center justify-center text-[#A0A0A0] hover:bg-[#F5F5F7] transition-all"><ChevronDown className="-rotate-90" size={16} /></button>
                                    </div>
                                </div>
                                <button className="h-[44px] bg-[#F5F5F7] border border-[#E6E6EB] px-5 rounded-xl font-bold text-[12px] text-[#333] flex items-center gap-3">
                                    2026 <ChevronDown size={14} />
                                </button>
                            </div>
                            <div className="flex-1 w-full min-h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={earningsData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5FF" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#A0A0A0' }} />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', padding: '12px 20px' }}
                                            itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                                        />
                                        <Bar dataKey="platform" stackId="a" fill="#A20601" radius={[8, 8, 8, 8]} barSize={40} name="Platform commission" />
                                        <Bar dataKey="drivers" stackId="a" fill="#F8E5E5" radius={[8, 8, 8, 8]} barSize={40} name="Driver's earnings" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex items-center justify-center gap-6 pt-4">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#A20601]"></div><span className="text-[11px] font-bold text-[#666]">Platform commission</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#F8E5E5]"></div><span className="text-[11px] font-bold text-[#666]">Driver's earnings</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <h3 className="text-[20px] font-black text-[#0B153D]">Trip Revenue Breakdown</h3>
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="relative group flex-1 md:w-80">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={18} />
                                    <input type="text" placeholder="Search by trip ID, driver, rider or date" className="w-full h-12 bg-[#F5F5F7] rounded-full pl-14 pr-6 text-[13px] font-bold focus:ring-1 focus:ring-[#A20602] outline-none transition-shadow" />
                                </div>
                                <div className="relative">
                                    <button onClick={() => setShowStatusFilter(!showStatusFilter)} className="h-12 bg-white border border-[#E6E6EB] px-6 rounded-xl font-bold text-[13px] text-[#A0A0A0] flex items-center justify-center gap-3 hover:bg-[#F5F5F7] transition-all">Filter by <ChevronDown size={16} /></button>
                                    {showStatusFilter && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E6E6EB] rounded-[24px] shadow-2xl z-20 overflow-hidden py-4 animate-in fade-in zoom-in duration-300">
                                            <button className="w-full h-14 flex items-center justify-between px-8 text-[#333] font-black text-[13px] hover:bg-[#A20602] hover:text-white transition-all group">Status <ChevronRight size={16} /></button>
                                            <button className="w-full h-14 flex items-center justify-between px-8 text-[#333] font-black text-[13px] hover:bg-[#A20602] hover:text-white transition-all group">Payment method <ChevronRight size={16} /></button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="relative w-full overflow-hidden flex-1 border border-[#F5F5F7] rounded-[24px] mt-2">
                            <div className="overflow-x-auto scrollbar-hide h-full">
                                <table className="w-full min-w-[950px] text-left">
                                    <thead className="border-b border-[#F5F5F7] bg-[#F5F5F7]/30 sticky top-0 bg-white z-10 transition-all">
                                        <tr>
                                            <th className="py-6 px-8 text-[11px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Trip ID</th>
                                            <th className="py-6 px-8 text-[11px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Date joined</th>
                                            <th className="py-6 px-8 text-[11px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Rider</th>
                                            <th className="py-6 px-8 text-[11px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Driver</th>
                                            <th className="py-6 px-8 text-[11px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Fare</th>
                                            <th className="py-6 px-8 text-[11px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Commission</th>
                                            <th className="py-6 px-8 text-[11px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Driver earnings</th>
                                            <th className="py-6 px-8 text-[11px] font-black text-[#333] uppercase lg:tracking-[0.1em]">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#F5F5F7]">
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan={8} className="py-10 text-center font-bold text-[#A0A0A0]">Loading fast live ledger database...</td>
                                            </tr>
                                        ) : tripsData.length === 0 ? (
                                            <tr>
                                                <td colSpan={8} className="py-10 text-center font-bold text-[#A0A0A0]">No financial trips found.</td>
                                            </tr>
                                        ) : tripsData.map((trip, idx) => (
                                            <tr key={idx} className="group hover:bg-[#F5F5F7]/40 transition-all cursor-default">
                                                <td className="py-6 px-8"><span className="text-[13px] font-black text-[#333]">{trip.id}</span></td>
                                                <td className="py-6 px-8"><span className="text-[13px] font-bold text-[#A0A0A0]">{trip.date}</span></td>
                                                <td className="py-6 px-8"><span className="text-[14px] font-black text-[#333]">{trip.rider}</span></td>
                                                <td className="py-6 px-8"><span className="text-[14px] font-black text-[#333]">{trip.driver}</span></td>
                                                <td className="py-6 px-8"><span className="text-[13px] font-bold text-[#333]">CDF {trip.fare.toLocaleString()}</span></td>
                                                <td className="py-6 px-8"><span className="text-[13px] font-bold text-[#A20601]">CDF {trip.commission.toLocaleString()}</span></td>
                                                <td className="py-6 px-8"><span className="text-[13px] font-bold text-[#00B230]">CDF {trip.driverEarnings.toLocaleString()}</span></td>
                                                <td className="py-6 px-8">
                                                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold border min-w-[80px] inline-block text-center
                                                        ${trip.status === 'Completed' ? 'text-[#00B230] bg-[#E6F7EB] border-[#CFEFD8]' :
                                                            trip.status === 'Ongoing' ? 'text-[#FFB800] bg-[#FFF8E6] border-[#FFEBBF]' :
                                                                'text-[#E53935] bg-[#FFF4F4] border-[#FFE6E6]'}`}>
                                                        {trip.status === 'Completed' ? 'Paid' : trip.status === 'Ongoing' ? 'Pending' : 'Failed'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
