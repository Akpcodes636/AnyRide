"use client";
import { CountdownBarProps } from "@/types";

export default function CountdownBar({ seconds, total }: CountdownBarProps) {
  const pct: number = ((total - seconds) / total) * 100;
  return (
    <div className="mb-4">
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1 text-right">
        Auto-advancing in {seconds}s
      </p>
    </div>
  );
}