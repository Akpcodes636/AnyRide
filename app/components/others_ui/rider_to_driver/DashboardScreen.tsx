"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { Search, MapPin, Navigation, Car, Calendar, Clock, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProfilePopover from "../../nav/ProfilePopover";

export default function DashboardScreen() {
    const router = useRouter();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const displayName = "Guest (Dev Preview)";

    return (
        <div className="w-full min-h-screen bg-white">
            <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 lg:py-28">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* LEFT SIDE - FORM */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start">
                        <h1 className="text-[48px] md:text-[64px] font-black text-[#0B153D] leading-[1.1] mb-8 max-w-xl">
                            Get where you're going faster, safer, and fair.
                        </h1>

                        {/* Location Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#FFF4F4] px-5 py-3 rounded-full mb-12">
                            <MapPin size={18} className="text-[#E53935]" />
                            <span className="text-[15px] font-extrabold text-[#E53935]">Abuja, Nigeria</span>
                            <ChevronDown size={14} className="text-[#E53935]" />
                        </div>

                        {/* Form Fields */}
                        <div className="w-full max-w-lg flex flex-col gap-6 mb-10">
                            <div>
                                <label className="block text-[14px] font-extrabold text-[#333333] mb-2 uppercase tracking-wide">Enter pickup location</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0]">
                                        <Navigation size={20} className="rotate-45" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Abuja, Nigeria"
                                        className="w-full h-16 bg-[#F5F5F7] rounded-[16px] pl-14 pr-6 text-[16px] font-medium text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#A20602]/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[14px] font-extrabold text-[#333333] mb-2 uppercase tracking-wide">Enter destination</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0]">
                                        <Navigation size={20} className="rotate-45" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Abuja, Nigeria"
                                        className="w-full h-16 bg-[#F5F5F7] rounded-[16px] pl-14 pr-6 text-[16px] font-medium text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#A20602]/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[14px] font-extrabold text-[#333333] mb-2 uppercase tracking-wide">Enter ride type</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0]">
                                        <Car size={20} />
                                    </div>
                                    <select className="w-full h-16 bg-[#F5F5F7] rounded-[16px] pl-14 pr-6 text-[16px] font-medium text-[#333333] focus:outline-none appearance-none">
                                        <option>Abuja, Nigeria</option>
                                        <option>Standard</option>
                                        <option>Premium</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronDown size={20} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[14px] font-extrabold text-[#333333] mb-2 uppercase tracking-wide">Date</label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0]">
                                            <Calendar size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Today"
                                            className="w-full h-16 bg-[#F5F5F7] rounded-[16px] pl-14 pr-6 text-[16px] font-medium text-[#333333] focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[14px] font-extrabold text-[#333333] mb-2 uppercase tracking-wide">Time</label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0]">
                                            <Clock size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Now"
                                            className="w-full h-16 bg-[#F5F5F7] rounded-[16px] pl-14 pr-12 text-[16px] font-medium text-[#333333] focus:outline-none"
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <ChevronDown size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => router.push("/drivers/choose-location")}
                            className="bg-[#A20602] hover:bg-[#8e0502] text-white font-extrabold px-12 py-5 rounded-full text-[18px] transition-colors shadow-lg"
                        >
                            Check prices
                        </button>
                    </div>

                    {/* RIGHT SIDE - IMAGE */}
                    <div className="w-full lg:w-1/2 flex flex-col items-end">
                        {/* Profile Button moved ABOVE the image */}
                        <div className="relative mb-6 mr-6">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-[188px] flex items-center justify-between px-4 py-2 bg-[#A20602] text-white rounded-full font-bold text-[14px] transition-colors hover:bg-[#8e0502]"
                            >
                                <span className="truncate">Menu</span>
                                <ChevronDown size={16} />
                            </button>

                            <ProfilePopover
                                isOpen={isProfileOpen}
                                onClose={() => setIsProfileOpen(false)}
                            />
                        </div>

                        <div className="relative w-full aspect-[4/5] max-w-[500px] rounded-[32px] overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-500">
                            <Image
                                src="/images/image-in-signin-page.png"
                                alt="Driver"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
