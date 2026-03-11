"use client";
import { useState } from "react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { monthData, weekData, yearData } from "@/app/utils/Content";
import { CustomTooltipProps } from "@/types";
import WalletPayment from "./WalletPayment";

const filterOptions = ["This week", "This month", "This year"];

const dataMap: Record<string, typeof weekData> = {
  "This week": weekData,
  "This month": monthData,
  "This year": yearData,
};

const avgMap: Record<string, string> = {
  "This week": "CF 1084",
  "This month": "CF 1890",
  "This year": "CF 2340",
};

// Custom tooltip
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e] text-white text-sm font-semibold px-3 py-2 rounded-lg shadow-lg">
        CF {payload[0].value?.toLocaleString()}
      </div>
    );
  }
  return null;
};

export default function SpendingTrends() {
  const [filter, setFilter] = useState("This week");
  const [showDropdown, setShowDropdown] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(false);

  const data = dataMap[filter];
  const avg = avgMap[filter];

  return (
    <section className="min-h-screen">
      <div className="container mx-auto px-6 pt-[100px] pb-16">
        {/* Back link */}
        <Link
          href="/wallet"
          className="inline-flex items-center gap-2 text-[#A20602] text-sm font-medium mb-8 hover:opacity-75 transition-opacity"
        >
          ← Back to Wallet
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[28px] md:text-[36px] lg:text-[48px] font-bold text-[#333333]  leading-[-4%]">
            Spending trends
          </h1>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-[#F5F5F7] border border-gray-200 text-[#353A61] text-[18px] font-medium px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              {filter}
              <svg
                className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white  rounded-xl shadow-lg z-10 overflow-hidden">
                {filterOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setFilter(opt);
                      setShowDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${
                      filter === opt
                        ? "text-[#A20602] font-semibold"
                        : "text-[#333]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WalletPayment />

          {/* Chart Card */}
          <div className="bg-[#F5F5F7] rounded-[8px] p-4 h-[502px] flex flex-col">
            {/* Header */}
            <div className="mb-6">
              <p className="text-sm text-gray-500">Average cost per km</p>
              <p className="text-[28px] font-bold text-[#1a1a2e] tracking-tight">
                {avg}
              </p>
            </div>

            {/* Chart */}
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
                >
                  {/* Gradient */}
                  <defs>
                    <linearGradient
                      id="areaGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#7ab3c8"
                        stopOpacity={0.35}
                      />
                      <stop offset="100%" stopColor="#7ab3c8" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  {/* Grid */}
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#eaeaea"
                    vertical={false}
                  />

                  {/* X Axis */}
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />

                  {/* Y Axis */}
                  <YAxis
                    tickFormatter={(value) => `CF ${value}`}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />

                  {/* Tooltip */}
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{
                      stroke: "#1a1a2e",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                  />

                  {/* Area */}
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#7ab3c8"
                    strokeWidth={2.5}
                    fill="url(#areaGradient)"
                    dot={false}
                    activeDot={{
                      r: 6,
                      fill: "#1a1a2e",
                      stroke: "#ffffff",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
