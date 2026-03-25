"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setIsLoading(true);

        try {
            const res = await fetch('https://anyride.techenex.online/api/v1/auth/login/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    role: "admin"
                })
            });

            const resBody = await res.json();

            if (res.ok) {
                // The API wraps the token in a data object
                const token = resBody.data?.access_token || resBody.access_token || 'fake_token';
                console.log("Login successful! Saved Token:", token);
                localStorage.setItem('admin_token', token);
                router.push('/en/admin/dashboard');
            } else {
                console.error("Login failed with response:", resBody);
                setErrorMsg(resBody.message || 'Invalid credentials or unauthorized access');
            }
        } catch (err) {
            setErrorMsg('Network error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
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

                    {errorMsg && (
                        <div className="mb-6 p-4 text-[13px] font-bold text-[#A20602] bg-[#FFF4F4] border border-[#FFE6E6] rounded-[12px] flex items-center justify-between">
                            {errorMsg}
                        </div>
                    )}

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
                                disabled={isLoading}
                                className={`w-full ${isLoading ? 'bg-[#A0A0A0] cursor-not-allowed' : 'bg-[#02093A] hover:bg-[#070e28] hover:shadow-2xl hover:translate-y-[-2px] active:scale-[0.98] cursor-pointer'} text-white font-black text-[16px] md:text-[17px] py-4.5 rounded-[14px] lg:rounded-[16px] transition-all shadow-xl transform`}
                            >
                                {isLoading ? 'Authenticating...' : 'Login'}
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
