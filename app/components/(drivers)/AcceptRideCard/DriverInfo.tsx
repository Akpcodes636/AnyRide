"use client";

export default function DriverInfo(){
    return (
         <div className="px-5 py-4 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: "linear-gradient(135deg, #FF9A3C, #FF5733)" }}
                  >
                    MB
                  </div>
        
                  <span className="text-[16px] font-bold text-[#02093A] flex-1">
                    Mike Brown
                  </span>
        
                  <div className="text-right">
                    <span className="text-[16px] text-[#02093A]">1.2km, </span>
                    <span className="text-[16px] font-bold text-[#188C3B]">
                      50 mins
                    </span>
                  </div>
                </div>
    )
}