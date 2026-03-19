"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('exampleofemail@gmail.com');
    const [password, setPassword] = useState('JBNDFJ87W3Y');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        router.push('/en/admin/dashboard');
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0B0B0C] relative overflow-hidden font-sans p-4">
            {/* Background Red Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#A20602]/30 via-transparent to-transparent pointer-events-none transition-all duration-1000"></div>

            <div className="relative z-10 w-full max-w-[480px]">
                {/* Header title top-left style like in screenshot */}
                <div className="hidden sm:block absolute -top-12 left-6 text-[#A0A0A0] text-[18px] md:text-[20px] font-bold opacity-30 tracking-widest uppercase">
                    login
                </div>

                <div className="bg-white rounded-[24px] lg:rounded-[32px] shadow-2xl p-6 md:p-10 lg:p-12 pb-14 md:pb-16 flex flex-col transition-all">
                    <h1 className="text-[32px] md:text-[40px] font-black text-[#333333] leading-tight mb-3 tracking-tighter">
                        Admin access
                    </h1>
                    <p className="text-[14px] md:text-[16px] font-bold text-[#A0A0A0] mb-8 md:mb-10 lg:mb-12">
                        Enter username/email and password to login.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-6 md:space-y-8">
                        <div>
                            <label className="block text-[13px] md:text-[14px] font-black text-[#0B153D] mb-2.5 px-1 uppercase tracking-wide">
                                Username/Password
                            </label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#F5F5F7] border border-transparent rounded-[12px] px-5 py-4 text-[14px] md:text-[15px] font-bold text-[#0B153D] outline-none focus:bg-white focus:ring-2 focus:ring-[#A20602]/20 focus:border-[#A20602] transition-all shadow-inner"
                                placeholder="Email address"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] md:text-[14px] font-black text-[#0B153D] mb-2.5 px-1 uppercase tracking-wide">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#F5F5F7] border border-transparent rounded-[12px] px-5 py-4 text-[14px] md:text-[15px] font-bold text-[#0B153D] outline-none focus:bg-white focus:ring-2 focus:ring-[#A20602]/20 focus:border-[#A20602] transition-all shadow-inner"
                                placeholder="Password"
                            />
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-[#02093A] hover:bg-[#070e28] text-white font-black text-[16px] md:text-[17px] py-4.5 rounded-[14px] lg:rounded-[16px] transition-all shadow-xl active:scale-[0.98] transform hover:shadow-2xl hover:translate-y-[-2px] cursor-pointer"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 lg:mt-12 border-t border-[#F5F5F7] pt-8">
                        <p className="text-[#A20602] text-[12px] md:text-[13px] font-black leading-relaxed tracking-wide">
                            Authorized personnel only.<br />
                            Access restricted only to AnyRide administrators.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
