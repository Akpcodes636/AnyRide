"use client";

export default function LocationButton() {
  return (
    <div className="inline-flex items-center gap-2 bg-[#F6E6E6]  border-[#E05C5C] rounded-full px-5 h-[56px] w-full max-w-[215px] cursor-pointer hover:bg-[#f0d8d8] transition-colors duration-200">
      {/* Location Pin Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#E05C5C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>

      {/* Label */}
      <span className="text-[#E05C5C] font-bold text-[16px] flex-1 truncate">
        Abuja, Nigeria
      </span>

      {/* Dropdown chevron */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#E05C5C"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}