"use client";


import Link from 'next/link';
import { Wallet, Bookmark, HelpCircle, User, Route, Car, Bell, Shield, Info, LogOut, Star } from 'lucide-react';
import { AiOutlineUser } from 'react-icons/ai';
import { RiMotorbikeFill } from 'react-icons/ri';
import { useAuth } from '@/providers/AuthProvider';

interface DriverProfilePopoverProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DriverProfilePopover({ isOpen, onClose }: DriverProfilePopoverProps) {
     const { isAuthenticated, userName } = useAuth();
            const displayName =
        userName && userName.length > 12
          ? userName.slice(0, 12) + "..."
          : userName || "User";
    if (!isOpen) return null;

    return (
        <div className="absolute right-0 mt-[20px] w-[411px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[24px] overflow-hidden z-[100] transform origin-top-right animate-in fade-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto scrollbar-hide">

            {/* NEW TOP ACTION: Manage Account moved ABOVE the image */}
            {/* <div className="p-2 pb-0 pt-4 px-4">
                <Link
                    href="/account"
                    onClick={onClose}
                    className="flex items-center gap-4 px-6 py-4 bg-[#F5F5F7] hover:bg-gray-200 rounded-[20px] transition-all group/item shadow-sm"
                >
                    <User className="w-6 h-6 text-[#0B153D]" />
                    <span className="text-[15px] font-black text-[#0B153D]">Manage account</span>
                </Link>
            </div> */}

            {/* Header / Profile Image section */}
            <div className="p-[24px] pb-2 pt-4">
                <div className="flex items-center gap-4 px-2">
                    <div className="w-14 h-14 bg-[#E0E0E0] rounded-full shrink-0 shadow-inner"></div>
                    <h3 className="text-[22px] md:text-[40px] font-black text-[#0B153D] truncate">
                        {displayName}
                    </h3>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="px-[24px] py-4 grid grid-cols-3 gap-3">
                <Link href="/wallet" onClick={onClose} className="flex flex-col items-center gap-2 p-4 bg-[#F5F5F7] rounded-[16px] hover:bg-gray-200 transition-colors">
                    <Wallet className="w-5 h-5 text-[#0B153D]" />
                    <span className="text-[18px] font-bold text-[#333333]">Wallet</span>
                </Link>
                <Link href="/saved" onClick={onClose} className="flex flex-col items-center gap-2 p-4 bg-[#F5F5F7] rounded-[16px] hover:bg-gray-200 transition-colors">
                    <Bookmark className="w-5 h-5 text-[#0B153D]" />
                    <span className="text-[18px] font-bold text-[#333333]">Saved</span>
                </Link>
                <Link href="/support" onClick={onClose} className="flex flex-col items-center gap-2 p-4 bg-[#F5F5F7] rounded-[16px] hover:bg-gray-200 transition-colors">
                    <HelpCircle className="w-5 h-5 text-[#0B153D]" />
                    <span className="text-[18px] font-bold text-[#333333]">Support</span>
                </Link>
            </div>

            {/* Driver Menu List */}
            <div className="py-2 px-2 flex flex-col gap-1 pb-4">
                <Link href="/drivers/verifications" onClick={onClose} className="flex items-center gap-4 px-6 py-3.5 bg-[#F5F5F7]/60 hover:bg-[#F5F5F7] rounded-[16px] transition-colors group/item">
                    <Shield className="w-5 h-5 text-[#A0A0A0] group-hover/item:text-[#0B153D]" />
                    <span className="text-[18px] font-bold text-[#333333]">Verifications</span>
                </Link>
                <Link href="/drivers/main/drive-and-earn" onClick={onClose} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#F5F5F7] rounded-[16px] transition-colors group/item">
                    <Car className="w-5 h-5 text-[#A0A0A0] group-hover/item:text-[#0B153D]" />
                    <span className="text-[18px] font-bold text-[#333333]">Drive & Earn</span>
                </Link>
                <Link href="/request-ride" onClick={onClose} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#F5F5F7] rounded-[16px] transition-colors group/item">
                    <RiMotorbikeFill className="w-5 h-5 text-[#A0A0A0] group-hover/item:text-[#0B153D]" />
                    <span className="text-[18px] font-bold text-[#333333]">Book a ride</span>
                </Link>
                <Link href="/drivers/main/reviews" onClick={onClose} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#F5F5F7] rounded-[16px] transition-colors group/item">
                    <Star className="w-5 h-5 text-[#A0A0A0] group-hover/item:text-[#0B153D]" />
                    <span className="text-[18px] font-bold text-[#333333]">Reviews</span>
                </Link>
                <Link href="/drivers/main/my-vehicles" onClick={onClose} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#F5F5F7] rounded-[16px] transition-colors group/item">
                    <Car className="w-5 h-5 text-[#A0A0A0] group-hover/item:text-[#0B153D]" />
                    <span className="text-[18px] font-bold text-[#333333]">My Vehicles</span>
                </Link>
                <Link href="/notifications" onClick={onClose} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#F5F5F7] rounded-[16px] transition-colors group/item">
                    <Bell className="w-5 h-5 text-[#A0A0A0] group-hover/item:text-[#0B153D]" />
                    <span className="text-[18px] font-bold text-[#333333]">Notifications</span>
                </Link>
            </div>

            {/* Sign Out */}
            <div className="p-4 mt-auto mb-2 px-6">
                <button
                    onClick={() => { onClose(); /* Handle logout */ }}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-[#F5F5F7] text-[#E53935] hover:bg-red-50 rounded-[16px] transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-bold text-[15px]">Sign out</span>
                </button>
            </div>
        </div>
    );
}
