"use client";

import Image from "next/image";

function Field({
  label,
  value,
  active = false,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div className="mb-5">
      <label className="block text-[12px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <div
        className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all
          ${active
            ? "border-[#02093A] bg-blue-50/40"
            : "border-[#E6E6EB] bg-[#FAFAFA]"
          }`}
      >
        <span className="text-[14px] text-[#02093A] font-normal">{value}</span>
        <button className="text-gray-400 hover:text-[#02093A] transition-colors">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function PersonalInfoPage() {
  return (
    <div>
      {/* Avatar row */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-[112px] h-[112px]">
          <Image
            src="https://i.pravatar.cc/80"
            alt="avatar"
            width={72}
            height={72}
            className="rounded-full w-full h-full"
          />
          <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#02093A] rounded-full flex items-center justify-center border-2 border-white">
            <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Fields */}
      <Field label="Name" value="Jamal Hassan" />
      <Field label="Email" value="jamalhassan@gmail.com" active />
      <Field label="Phone number" value="+23480 343 7828" />
      <Field label="Address" value="123 Main St, Springfield, IL 62704" />

      {/* Action buttons */}
      <div className="flex gap-3 mt-8">
        <button className="flex-1 py-3 rounded-xl bg-[#02093A] text-white font-semibold text-sm hover:bg-[#0a1a5c] transition-colors">
          Save
        </button>
        <button className="flex-1 py-3 rounded-xl bg-[#EF4444] text-white font-semibold text-sm hover:bg-red-100 transition-colors">
          Delete account
        </button>
      </div>
    </div>
  );
}