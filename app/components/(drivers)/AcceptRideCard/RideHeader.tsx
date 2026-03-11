"use client";

export default function RideHeader(){
    return (
        <div className="px-5 pt-5">
          <p className="text-[18px] md:text-[20px] lg:text-[25px] font-bold text-[#333333] mb-1">
            Accept with..
          </p>

          <div
            className="flex items-center justify-between rounded-xl px-4 py-[10px] mt-2"
            style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
          >
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[#E6E6EB] text-xl">
              −
            </button>

            <span className="font-bold text-[25px] text-[#010C4A]">
              CF 1084
            </span>

            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[#A20602] text-white text-xl">
              +
            </button>
          </div>
        </div>
    )
}