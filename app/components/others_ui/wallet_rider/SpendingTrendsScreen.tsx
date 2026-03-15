"use client";

import React from 'react';
import { Wallet, ChevronDown } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceArea
} from 'recharts';

const data = [
    { distance: '10km', cost: 1200 },
    { distance: '20km', cost: 1000 },
    { distance: '30km', cost: 2586 },
    { distance: '40km', cost: 1800 },
    { distance: '50km', cost: 2700 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#111111] text-white text-[12px] font-semibold px-3 py-1.5 rounded-md shadow-lg flex items-center gap-2">
                <span>CF {payload[0].value}</span>
            </div>
        );
    }

    return null;
};

export default function SpendingTrendsScreen() {
    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 font-sans">

            {/* Top Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none">Spending trends</h2>

                <button className="flex items-center gap-2 bg-[#F5F5F7] hover:bg-gray-200 text-[#333333] px-4 py-2 rounded-full text-[14px] font-medium transition-colors">
                    This week
                    <ChevronDown size={16} className="text-gray-500" />
                </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20">

                {/* Left Column: Balance Card */}
                <div className="bg-[#F5F5F7] rounded-[16px] px-8 py-10 flex flex-col justify-start min-h-[320px]">
                    <div className="flex items-start gap-4">
                        <div className="bg-[#0B153D] text-white p-2.5 rounded-lg flex items-center justify-center mt-1">
                            <Wallet size={24} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                            <span className="text-[15px] font-medium text-[#0B153D]">Your Balance</span>
                            <div className="text-[36px] font-extrabold text-[#0B153D] tracking-[0.2em] leading-none translate-y-2">
                                ****
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Chart */}
                <div className="bg-[#F5F5F7] rounded-[16px] p-8 flex flex-col min-h-[320px]">
                    <span className="text-[14px] text-[#666666] font-medium mb-1">Average cost per km</span>
                    <div className="text-[28px] font-bold text-[#333333] mb-8 leading-none">CF 1084</div>

                    <div className="flex-1 w-full min-h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                {/* Horizontal grid lines only, dashed */}
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />

                                <XAxis
                                    dataKey="distance"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#A3A3A3', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#A3A3A3', fontSize: 12 }}
                                    ticks={[500, 1000, 2000, 3000]}
                                    tickFormatter={(value) => `CF ${value}`}
                                />

                                {/* Custom active dot styling and tooltip */}
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ fill: 'rgba(200, 200, 220, 0.4)' }}
                                    isAnimationActive={false}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="cost"
                                    stroke="#79a2b8"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 6, fill: '#111111', stroke: '#fff', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}
