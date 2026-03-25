"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from "@/app/components/others_ui/admin/AdminSidebar";
import AdminHeader from "@/app/components/others_ui/admin/AdminHeader";
import TripDetailsModal from "@/app/components/others_ui/admin/TripDetailsModal";
import { Search, ChevronDown, ChevronRight, Filter } from 'lucide-react';

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        'Completed': 'text-[#00B230] bg-[#E6F7EB] border-[#CFEFD8]',
        'Ongoing': 'text-[#3E86F5] bg-[#EBF3FF] border-[#D0E2FF]',
        'Cancelled': 'text-[#E53935] bg-[#FFF4F4] border-[#FFE6E6]',
        'Disputed': 'text-[#FFB800] bg-[#FFF8E6] border-[#FFEBBF]',
    };
    
    // Format status safely since it comes capitalized from backend e.g. "COMPLETED"
    const formattedStatus = status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : 'Completed';
    const c = styles[formattedStatus] || styles['Completed'];

    return (
        <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold border ${c} min-w-[100px] inline-block text-center shadow-xs`}>
            {formattedStatus}
        </span>
    );
};

export default function TripManagementScreen() {
    const [selectedTrip, setSelectedTrip] = useState<any>(null);
    const [activeFilter, setActiveFilter] = useState('All trips');
    const [showFilterBy, setShowFilterBy] = useState(false);
    const [showStatusFilter, setShowStatusFilter] = useState(false);

    // Live Data State
    const [tripsData, setTripsData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const statusFilters = [
        { label: 'Ongoing', color: 'text-[#3E86F5] border-[#3E86F5]' },
        { label: 'Completed', color: 'text-[#00B230] border-[#00B230]' },
        { label: 'Cancelled', color: 'text-[#E53935] border-[#E53935]' },
        { label: 'Disputed', color: 'text-[#FFB800] border-[#FFB800]' },
        { label: 'All trips', color: 'text-[#02093A] border-[#02093A]' },
    ];

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const token = localStorage.getItem('admin_token');
                const res = await fetch('https://anyride.techenex.online/api/v1/admin/rides', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const json = await res.json();
                
                if (res.ok && json.data?.rides) {
                    const mappedTrips = json.data.rides.map((r: any) => ({
                        _raw: r, // pass original object down too
                        id: `#${r.id.toString().padStart(5, '0')}`,
                        rider: r.customer_name || 'N/A',
                        driver: r.driver_name || 'N/A',
                        vehicle: 'Standard', // backend currently doesn't specify vehicle in rides obj
                        dateTime: new Date(r.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' GMT',
                        status: r.status // e.g., 'COMPLETED', 'CANCELLED'
                    }));
                    setTripsData(mappedTrips);
                }
            } catch (error) {
                console.error("Failed to fetch live trips:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrips();
    }, []);

    return (
        <div className="flex min-h-screen bg-[#F5F5F7] font-sans">
            <AdminSidebar />

            <main className="flex-1 w-full lg:ml-[300px] p-4 sm:p-6 lg:p-8 pb-20 overflow-x-hidden">
                <AdminHeader />

                <div className="bg-white rounded-[32px] p-6 md:p-10 border border-[#E6E6EB] shadow-sm flex flex-col gap-8 min-h-[750px] overflow-hidden">

                    <div className="flex flex-col gap-6">
                        <h2 className="text-[26px] md:text-[32px] font-black text-[#0B153D] tracking-tight leading-none">
                            Monitor all trips across the platform in real time.
                        </h2>
                    </div>

                    {/* Controls Row */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
                        <div className="relative w-full md:flex-1 group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={20} />
                            <input
                                type="text"
                                placeholder="Search by trip ID, driver or rider"
                                className="w-full h-[60px] bg-white border border-[#E6E6EB] rounded-full pl-16 pr-8 text-[15px] font-medium placeholder:text-[#A0A0A0] focus:ring-1 focus:ring-[#A20602] transition-shadow outline-none shadow-sm"
                            />
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            {/* Filter By Population Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowFilterBy(!showFilterBy)}
                                    className="h-[60px] flex items-center gap-3 bg-white border border-[#E6E6EB] rounded-2xl px-8 text-[14px] font-black text-[#A0A0A0] hover:bg-[#F5F5F7] transition-all min-w-[150px] shadow-xs"
                                >
                                    Filter by <ChevronDown size={18} />
                                </button>
                                {showFilterBy && (
                                    <div className="absolute right-0 mt-3 w-64 bg-[#A20601] rounded-[24px] shadow-2xl z-20 overflow-hidden py-4 animate-in fade-in zoom-in duration-300">
                                        <button className="w-full flex items-center justify-between px-8 py-4 text-white font-black text-[14px] hover:bg-black/10 transition-all border-b border-white/10 group">
                                            Date range <ChevronRight size={16} />
                                        </button>
                                        <button className="w-full flex items-center justify-between px-8 py-4 text-white font-black text-[14px] hover:bg-black/10 transition-all group">
                                            Vehicle type <ChevronRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Status Filter Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowStatusFilter(!showStatusFilter)}
                                    className="h-[60px] flex items-center gap-3 bg-white border border-[#E6E6EB] rounded-2xl px-8 text-[14px] font-black text-[#333] hover:bg-[#F5F5F7] transition-all min-w-[150px] shadow-xs"
                                >
                                    {activeFilter} <ChevronDown size={18} />
                                </button>
                                {showStatusFilter && (
                                    <div className="absolute right-0 mt-3 w-56 bg-white border border-[#E6E6EB] rounded-[24px] shadow-2xl z-20 overflow-hidden py-4 animate-in fade-in zoom-in duration-300 p-2 flex flex-col gap-2">
                                        {statusFilters.map((f, i) => (
                                            <button
                                                key={i}
                                                onClick={() => { setActiveFilter(f.label); setShowStatusFilter(false); }}
                                                className={`w-full text-left px-6 py-3 rounded-full border text-[13px] font-bold transition-all hover:scale-[1.03] ${f.color} ${activeFilter === f.label ? 'bg-[#F5F5F7]' : 'bg-transparent'}`}
                                            >
                                                {f.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Triple Header Layout Table (Matching Screenshots) */}
                    <div className="relative w-full overflow-hidden mt-6 flex-1">
                        <div className="overflow-x-auto scrollbar-hide h-full">
                            <table className="w-full min-w-[900px] text-left">
                                <thead className="border-b border-[#F5F5F7] bg-[#F5F5F7]/40 sticky top-0 bg-white z-10">
                                    <tr>
                                        <th className="py-6 px-8 text-[12px] lg:text-[13px] font-black text-[#A0A0A0] uppercase tracking-widest leading-none">Trip ID</th>
                                        <th className="py-6 px-8 text-[12px] lg:text-[13px] font-black text-[#A0A0A0] uppercase tracking-widest leading-none">Rider</th>
                                        <th className="py-6 px-8 text-[12px] lg:text-[13px] font-black text-[#A0A0A0] uppercase tracking-widest leading-none">Driver</th>
                                        <th className="py-6 px-8 text-[12px] lg:text-[13px] font-black text-[#A0A0A0] uppercase tracking-widest leading-none">Vehicle</th>
                                        <th className="py-6 px-8 text-[12px] lg:text-[13px] font-black text-[#A0A0A0] uppercase tracking-widest leading-none">Date & time</th>
                                        <th className="py-6 px-8 text-[12px] lg:text-[13px] font-black text-[#A0A0A0] uppercase tracking-widest leading-none">Status</th>
                                        <th className="py-6 px-8 text-[12px] lg:text-[13px] font-black text-[#A0A0A0] uppercase tracking-widest leading-none">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F5F5F7]">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={7} className="py-10 text-center font-bold text-[#A0A0A0]">Loading fast live trips database...</td>
                                        </tr>
                                    ) : tripsData.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="py-10 text-center font-bold text-[#A0A0A0]">No trips taken yet.</td>
                                        </tr>
                                    ) : tripsData.filter(t => activeFilter === 'All trips' || (t.status && t.status.toLowerCase() === activeFilter.toLowerCase())).map((trip, idx) => (
                                        <tr key={idx} className="group hover:bg-[#F5F5F7]/40 transition-all cursor-default relative">
                                            <td className="py-6 lg:py-8 px-8">
                                                <span className="text-[14px] font-black text-[#333]">{trip.id}</span>
                                            </td>
                                            <td className="py-6 lg:py-8 px-8">
                                                <span className="text-[14px] font-black text-[#333]">{trip.rider}</span>
                                            </td>
                                            <td className="py-6 lg:py-8 px-8">
                                                <span className="text-[14px] font-black text-[#333]">{trip.driver}</span>
                                            </td>
                                            <td className="py-6 lg:py-8 px-8">
                                                <span className="text-[14px] font-bold text-[#666]">{trip.vehicle}</span>
                                            </td>
                                            <td className="py-6 lg:py-8 px-8">
                                                <span className="text-[13px] font-bold text-[#A0A0A0]">{trip.dateTime}</span>
                                            </td>
                                            <td className="py-6 lg:py-8 px-8">
                                                <StatusBadge status={trip.status} />
                                            </td>
                                            <td className="py-6 lg:py-8 px-8">
                                                <button
                                                    onClick={() => setSelectedTrip(trip)}
                                                    className="bg-[#02093A] hover:bg-[#070e28] text-white px-8 py-3 rounded-lg text-[12px] font-black transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-tight"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {selectedTrip && (
                <TripDetailsModal
                    trip={selectedTrip}
                    onClose={() => setSelectedTrip(null)}
                />
            )}
        </div>
    );
}
