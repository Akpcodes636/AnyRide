"use client";

import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, Calendar, Wallet, FileText, CheckCircle2, AlertCircle, File, Eye, TrendingUp, Users, Car, Star, Briefcase, Hash, Building2, CreditCard } from 'lucide-react';
import Image from 'next/image';

interface UserDetailProps {
    user: any;
    userType: 'Driver' | 'Rider' | 'Partner';
    onClose: () => void;
}

const StatMiniCard = ({ label, value, icon: Icon }: { label: string, value: string, icon?: any }) => (
    <div className="bg-[#F5F5F7] rounded-[20px] p-4 flex flex-col gap-1 shadow-xs border border-[#F5F5F7] min-h-[90px] justify-center">
        <span className="text-[18px] lg:text-[20px] font-black text-[#333333] flex items-center gap-2">
            {value} {Icon && <Icon size={16} fill="#FFB800" className="text-[#FFB800]" />}
        </span>
        <span className="text-[11px] font-bold text-[#A0A0A0] leading-tight">{label}</span>
    </div>
);

const ToggleSwitch = ({ label, active = false }: { label: string, active?: boolean }) => (
    <div className="flex items-center justify-between py-3">
        <span className="text-[14px] font-bold text-[#666]">{label}</span>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked={active} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A20602]"></div>
        </label>
    </div>
);

const DocumentRow = ({ name, size, submittedAt }: { name: string, size: string, submittedAt: string }) => (
    <div className="flex items-center justify-between p-4 bg-[#F5F5F7]/40 rounded-xl border border-[#F5F5F7] mb-3 group hover:bg-white transition-all">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#E6E6EB] rounded-lg flex items-center justify-center text-[#A0A0A0]">
                <FileText size={20} />
            </div>
            <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#333]">{name}</span>
                <span className="text-[11px] font-bold text-[#A0A0A0] uppercase">{size} • Submitted {submittedAt}</span>
            </div>
        </div>
        <button className="bg-[#02093A] text-white px-6 py-2 rounded-lg text-[12px] font-bold shadow-md hover:scale-[1.03] transition-transform">View</button>
    </div>
);

export default function UserDetailsModal({ user, userType, onClose }: UserDetailProps) {
    const isDriver = userType === 'Driver';
    const isPartner = userType === 'Partner';
    const [message, setMessage] = useState(isPartner ? 'One of your rider need to....' : 'You need to re-upload the front side of the......');

    const partnerDetails = [
        { label: 'Company Name', value: 'Arramlah Transport & co.', icon: Building2 },
        { label: 'Reg. Number', value: 'Rc829382', icon: Hash },
        { label: 'Partner type', value: user.partnerType || 'Service Provider', icon: Briefcase },
        { label: 'Phone', value: user.phone, icon: Phone },
        { label: 'Email', value: user.email, icon: Mail },
        { label: 'Location', value: 'Kimshasha, Congo', icon: MapPin },
        { label: 'Date joined', value: user.date, icon: Calendar },
    ];

    const standardDetails = [
        { label: 'Phone', value: user.phone, icon: Phone },
        { label: 'Email', value: user.email, icon: Mail },
        { label: 'Location', value: 'Kimshasha, Congo', icon: MapPin },
        { label: 'Date joined', value: user.date, icon: Calendar },
    ];

    const currentDetails = isPartner ? partnerDetails : standardDetails;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="relative bg-white w-full max-w-[1100px] h-[95vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">

                <div className="absolute top-6 right-8 z-10">
                    <button onClick={onClose} className="w-10 h-10 bg-white border border-[#E6E6EB] rounded-full flex items-center justify-center text-[#333] hover:bg-[#F5F5F7] transition-all shadow-sm">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 scrollbar-hide py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

                        {/* LEFT COLUMN */}
                        <div className="lg:col-span-5 flex flex-col gap-8">

                            <div className="bg-white border border-[#E6E6EB] rounded-[32px] p-4 pr-10 shadow-sm flex items-center gap-6">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full overflow-hidden border-4 border-[#F5F5F7] shadow-inner shrink-0 scale-90">
                                    <Image src="/images/driverprofile.png" width={128} height={128} alt="User" className="object-cover" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-[22px] md:text-[26px] font-black text-[#A10602] leading-none tracking-tight">
                                        {user.name} | {userType}
                                    </h2>
                                    <p className="text-[13px] font-bold text-[#A0A0A0] mb-2 tracking-wide uppercase">last seen today 9:40 GMT</p>
                                    <span className="bg-[#E6F7EB] text-[#00B230] border border-[#CFEFD8] px-4 py-1.5 rounded-full text-[12px] font-bold w-fit shadow-xs">Active</span>
                                </div>
                            </div>

                            <div className="bg-white border-2 border-[#F5F5F7] rounded-[24px] overflow-hidden">
                                {currentDetails.map((item, id) => (
                                    <div key={id} className={`flex items-center gap-6 p-4 ${id !== currentDetails.length - 1 ? 'border-b-2 border-[#F5F5F7]' : ''} hover:bg-[#F5F5F7]/30 transition-colors`}>
                                        <div className="w-9 h-9 bg-[#F5F5F7] rounded-xl flex items-center justify-center text-[#A0A0A0]"><item.icon size={16} /></div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-[#A0A0A0] uppercase tracking-wider mb-0.5">{item.label}</span>
                                            <span className="text-[13px] md:text-[14px] font-bold text-[#333333] tracking-tight leading-none">{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {isPartner ? (
                                    <>
                                        <StatMiniCard label="Numbers of Vehicles" value="68" />
                                        <StatMiniCard label="Number of drivers assigned" value="28" />
                                        <StatMiniCard label="Average reviews received" value="5.0" icon={Star} />
                                        <StatMiniCard label="Total earnings" value="CDF 25K" />
                                        <StatMiniCard label="Pending payouts" value="CDF 1.2K" />
                                        <StatMiniCard label="Completed payouts" value="CDF 19K" />
                                    </>
                                ) : (
                                    <>
                                        <StatMiniCard label={isDriver ? "Total earnings" : "Total spent"} value="CDF 6k+" />
                                        <StatMiniCard label="Completed trips" value="1,240" />
                                        <StatMiniCard label={isDriver ? "Registered vehicles" : "Avg reviews"} value={isDriver ? "2" : "5.0"} icon={isDriver ? null : Star} />
                                        <StatMiniCard label="Wallet balance" value="CDF 25K" icon={Wallet} />
                                    </>
                                )}
                            </div>

                            {isDriver && (
                                <div className="flex flex-col gap-6 mt-4">
                                    <h3 className="text-[20px] font-black text-[#0B153D]">Trip metrics and analytics</h3>
                                    <div className="bg-white border-2 border-[#F5F5F7] rounded-[24px] p-6 flex flex-col gap-6">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[13px] font-bold text-[#666]">Total Rides</span>
                                            <div className="flex items-center gap-4">
                                                <span className="text-[28px] font-black text-[#333]">49</span>
                                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold text-[#00B230] bg-[#E6F7EB] border border-[#CFEFD8]">
                                                    <TrendingUp size={14} /> +1.5% / last month
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[13px] font-bold text-[#666]">Acceptance rates</span>
                                            <span className="text-[28px] font-black text-[#333]">92%</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="lg:col-span-7 flex flex-col gap-10">

                            <div className="flex flex-col gap-4">
                                <h3 className="text-[22px] font-black text-[#0B153D]">Actions and edit panel</h3>
                                <div className="bg-[#F5F5F7]/30 border-2 border-[#F5F5F7] rounded-[24px] p-6 lg:p-8 flex flex-col gap-2">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#F5F5F7] pb-6 mb-2">
                                        <span className="text-[14px] font-black text-[#666]">Account status</span>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <button className="bg-[#E6F7EB] text-[#00B230] border border-[#CFEFD8] px-5 py-2 rounded-full text-[12px] font-bold shadow-xs">Activate</button>
                                            <button className="bg-[#FFF8E6] text-[#FFB800] border border-[#FFEBBF] px-5 py-2 rounded-full text-[12px] font-bold shadow-xs">Suspend</button>
                                            <button className="bg-[#FFF4F4] text-[#E53935] border border-[#FFE6E6] px-5 py-2 rounded-full text-[12px] font-bold shadow-xs">{isPartner || !isDriver ? 'Block' : 'Disactivate'}</button>
                                        </div>
                                    </div>
                                    <ToggleSwitch label="Flag for Review" active />
                                    <ToggleSwitch label="Suspend account" />
                                    <ToggleSwitch label="Reset access" />
                                </div>
                                <p className="text-[13px] font-bold text-[#E53935] px-2 italic">Note: Suspending a user immediately restricts platform access.</p>
                            </div>

                            <div className="bg-white border-2 border-[#F5F5F7] rounded-[32px] p-6 lg:p-10 flex flex-col gap-8 shadow-xs relative">
                                <h3 className="text-[22px] font-black text-[#0B153D]">Audits & logs</h3>
                                <div className="flex flex-col gap-0">
                                    {[
                                        { title: 'Admin marked the account status active', time: '25/03/2025 • just now', active: true },
                                        { title: isPartner ? 'A vehicle named COROLLA 27DC just added' : 'Bayan patience just made changes to names', time: '25/03/2025 • 2min ago', active: true },
                                        { title: isPartner ? 'Bayan just made changes to the company phone number' : 'Bayan patience just made changes to names', time: '25/03/2025 • 5:30 GMT', active: false },
                                        { title: isPartner ? 'Bayan just made changes to the company phone number' : 'Bayan patience just made changes to names', time: '25/03/2025 • 5:30 GMT', active: false },
                                    ].map((log, idx) => (
                                        <div key={idx} className="relative flex gap-6 pb-8 group last:pb-0">
                                            {idx !== 3 && <div className="absolute left-[7px] top-4 w-[2px] h-full bg-[#F5F5F7]"></div>}
                                            <div className={`w-3.5 h-3.5 rounded-full mt-1.5 shrink-0 z-10 ${log.active ? 'bg-[#0B153D]' : 'bg-[#E6E6EB]'}`}></div>
                                            <div className="flex flex-col gap-1 border-b border-[#F5F5F7] w-full pb-4 group-last:border-none">
                                                <span className={`text-[14px] font-black ${log.active ? 'text-[#333]' : 'text-[#A0A0A0]'}`}>{log.title}</span>
                                                <span className="text-[12px] font-bold text-[#A0A0A0]">{log.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 mt-4">
                                <span className="text-[14px] font-black text-[#0B153D] flex items-center gap-2 underline underline-offset-4">Send quick message</span>
                                <textarea
                                    className="w-full h-32 bg-[#F5F5F7] rounded-[24px] p-6 text-[14px] font-bold text-[#333] focus:ring-1 focus:ring-[#A20602] outline-none transition-shadow"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                                <button className="w-fit bg-[#02093A] text-white px-10 py-4 rounded-xl text-[14px] font-black shadow-xl active:scale-95 transition-all">Send message</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
