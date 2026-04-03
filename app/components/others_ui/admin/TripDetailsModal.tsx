"use client";

import React, { useState } from 'react';
import { Search, MapPin, Phone, MessageSquare, AlertCircle, X, Navigation, CreditCard, Clock, RotateCcw, ShieldAlert, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Avatar from './Avatar';

interface TripDetailProps {
    trip: any;
    onClose: () => void;
}

const UserMiniProfile = ({ name, role, isOnline = true }: { name: string, role: string, isOnline?: boolean }) => (
    <div className="bg-white border-2 border-[#F5F5F7] rounded-[24px] p-6 flex flex-col gap-6 flex-1 min-w-[280px]">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Avatar name={name} className="w-16 h-16 text-[22px] border-2 border-[#F5F5F7]" />
                <div className="flex flex-col">
                    <h4 className="text-[18px] font-black text-[#A10601] leading-none">{name} | {role}</h4>
                    <span className="text-[12px] font-bold text-[#A0A0A0] mt-1 flex items-center gap-1.5 font-sans">
                        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#00B230]' : 'bg-gray-300'}`}></div> Online
                    </span>
                </div>
            </div>
            <button className="bg-[#02093A] text-white px-5 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-2 shadow-md hover:scale-[1.05] transition-transform">
                <Phone size={14} fill="white" className="rotate-2" /> Call
            </button>
        </div>

        <div className="grid grid-cols-1 gap-2 pt-2 border-t border-[#F5F5F7]">
            {[
                { label: 'Phone', value: '08037281938' },
                { label: 'Email', value: 'exampleemail@gmail.com' },
                { label: 'Location', value: 'Kimshasha, Congo' },
                { label: role === 'Driver' ? 'Ratings' : 'Date joined', value: role === 'Driver' ? '5.0 ⭐' : '12 Oct 2025' }
            ].map((detail, idx) => (
                <div key={idx} className="flex items-center justify-between py-1">
                    <span className="text-[12px] font-bold text-[#A0A0A0] tracking-tight">{detail.label}</span>
                    <span className="text-[13px] font-black text-[#333]">{detail.value}</span>
                </div>
            ))}
        </div>
    </div>
);

export default function TripDetailsModal({ trip, onClose }: TripDetailProps) {
    const status = trip.status ? trip.status.charAt(0).toUpperCase() + trip.status.slice(1).toLowerCase() : 'Ongoing';
    const raw = trip._raw || {};

    // Helper to calculate duration if start & end are present
    const getDuration = () => {
        if (!raw.start_time || !raw.end_time) return 'N/A';
        const s = new Date(raw.start_time).getTime();
        const e = new Date(raw.end_time).getTime();
        const diffMs = e - s;
        if (diffMs <= 0) return '0 mins';
        return `${Math.ceil(diffMs / 60000)} mins`;
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-[#F5F5F7] w-full max-w-[1000px] h-[95vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
                {/* Header */}
                <div className="bg-white px-8 py-6 border-b border-[#E6E6EB] flex items-center justify-between sticky top-0 z-10 shrink-0">
                    <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                        <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Trip ID</span>
                            <span className="text-[15px] font-black text-[#333]">{trip.id}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-[#A0A0A0] uppercase">{status === 'Completed' ? 'Date' : 'Start time'}</span>
                            <span className="text-[15px] font-black text-[#333]">{trip.dateTime}</span>
                        </div>
                        {status === 'Completed' && (
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Duration</span>
                                <span className="text-[15px] font-black text-[#333]">{getDuration()}</span>
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Estimated fare</span>
                            <span className="text-[15px] font-black text-[#333]">{raw.ride_price ? `CDF ${raw.ride_price}` : 'N/A'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Vehicle type</span>
                            <span className="text-[15px] font-black text-[#333]">{trip.vehicle || 'Standard'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-[#A0A0A0] uppercase">Status</span>
                            <span className={`px-4 py-1 rounded-full text-[12px] font-bold border mt-0.5 text-center
                                ${status === 'Ongoing' ? 'text-[#3E86F5] bg-[#EBF3FF] border-[#D0E2FF]' :
                                    status === 'Completed' ? 'text-[#00B230] bg-[#E6F7EB] border-[#CFEFD8]' :
                                        'text-[#E53935] bg-[#FFF4F4] border-[#FFE6E6]'}
                            `}>
                                {status.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 bg-[#F5F5F7] rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-8 scrollbar-hide">
                    {/* Pickup and Destinations */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[20px] font-black text-[#0B153D] tracking-tight">Pickup and destinations</h3>
                        <div className="bg-white border-2 border-[#F5F5F7] rounded-[24px] p-6 flex flex-col gap-6">
                            <div className="flex gap-4 relative">
                                <div className="flex flex-col items-center gap-1 mt-1">
                                    <Navigation className="text-[#A0A0A0]" size={16} />
                                    <div className="w-[1.5px] h-6 border-l border-dashed border-[#A0A0A0]"></div>
                                    <MapPin className="text-[#A10601]" size={16} />
                                </div>
                                <div className="flex flex-col gap-5 w-full">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase">Pickup</span>
                                        <span className="text-[14px] font-bold text-[#333]">4827 Willowbrook Lane, OH 44126</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-[#A0A0A0] uppercase">Destination</span>
                                        <span className="text-[14px] font-bold text-[#333]">123 Main St, Springfield, IL 62704</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Simulation - Static for now */}
                    <div className="w-full h-[240px] bg-white rounded-[24px] border-2 border-[#F5F5F7] relative overflow-hidden shadow-inner group">
                        <Image src="/admin_trip_map_route_1773933989636.png" layout="fill" objectFit="cover" alt="Map" className="opacity-80 scale-110 group-hover:scale-100 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"></div>
                    </div>

                    {/* Additional Details for Completed/Disputed */}
                    {(status === 'Completed' || status === 'Disputed') && (
                        <div className="bg-white border-2 border-[#F5F5F7] rounded-[24px] p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-[12px] font-bold text-[#A0A0A0]">Base fare</span>
                                <span className="text-[14px] font-black text-[#333]">{raw.base_price ? `CDF ${raw.base_price}` : 'N/A'}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[12px] font-bold text-[#A0A0A0]">Distance/time</span>
                                <span className="text-[14px] font-black text-[#333]">- • {getDuration()}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[12px] font-bold text-[#A0A0A0]">Total paid</span>
                                <span className="text-[14px] font-black text-[#333]">{raw.ride_price ? `CDF ${raw.ride_price}` : 'N/A'}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[12px] font-bold text-[#A0A0A0]">Payment method</span>
                                <span className="text-[14px] font-black text-[#333]">Cash</span>
                            </div>
                        </div>
                    )}

                    {/* Profiles Section */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <UserMiniProfile name={trip.rider || 'Unknown Rider'} role="Rider" />
                        <UserMiniProfile name={trip.driver || 'Unknown Driver'} role="Driver" isOnline={false} />
                    </div>

                    {/* Disputed Evidences Section */}
                    {status === 'Disputed' && (
                        <div className="bg-white border-2 border-[#F5F5F7] rounded-[32px] p-8 flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-[18px] font-black text-[#0B153D]">Note and evidences</h3>
                                <p className="text-[13px] font-bold text-[#A0A0A0]">Submitted by Driver</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[12px] font-bold text-[#A0A0A0] uppercase">Message</span>
                                <div className="bg-[#F5F5F7] p-5 rounded-[20px] text-[13px] font-bold text-[#333] leading-relaxed">
                                    One of your rider need to One of your rider need to One of your rider need to One of your rider need to...
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className="text-[12px] font-bold text-[#A0A0A0] uppercase">Images (Screenshots, photos etc...)</span>
                                <div className="flex gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-24 h-24 rounded-[16px] overflow-hidden border-2 border-[#F5F5F7]">
                                            <Image src="/images/driverCar.png" width={96} height={96} alt="Evidence" className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer Actions */}
                    <div className="flex flex-col gap-6 mt-4">
                        {status === 'Ongoing' ? (
                            <div className="flex flex-col gap-4">
                                <h4 className="text-[18px] font-black text-[#0B153D]">Admin actions</h4>
                                <div className="flex gap-6">
                                    <button className="flex-1 bg-[#FFF4F4] text-[#E53935] border border-[#FFE6E6] py-4 rounded-[16px] font-black hover:bg-[#FFE6E6] transition-colors">Flag trip</button>
                                    <button className="flex-1 bg-[#E53935] text-white py-4 rounded-[16px] font-black shadow-xl hover:bg-[#D32F2F] transition-colors">Cancel trip</button>
                                </div>
                            </div>
                        ) : status === 'Disputed' ? (
                            <div className="flex flex-col gap-4">
                                <h4 className="text-[18px] font-black text-[#0B153D]">Admin actions</h4>
                                <div className="flex gap-6">
                                    <button className="flex-1 bg-[#FFF4F4] text-[#E53935] border border-[#FFE6E6] py-4 rounded-[16px] font-black">Dismiss Dispute</button>
                                    <button className="flex-1 bg-[#02093A] text-white py-4 rounded-[16px] font-black shadow-xl">Resolve dispute</button>
                                </div>
                            </div>
                        ) : status === 'Cancelled' ? (
                            <div className="w-full bg-[#FFF4F4] border-2 border-[#E53935] p-8 rounded-[24px] text-center">
                                <span className="text-[16px] font-black text-[#E53935]">This trip was cancelled.</span>
                            </div>
                        ) : (
                            <div className="w-full bg-white border-2 border-[#E6E6EB] p-8 rounded-[24px] text-center">
                                <span className="text-[16px] font-black text-[#0B153D]">This trip has successfully completed and closed.</span>
                            </div>
                        )}
                        <p className="text-[13px] font-bold text-[#E53935] text-center">Note: Admin actions should only be used in exceptional cases.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
