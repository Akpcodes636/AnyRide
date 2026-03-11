"use client";

import Image from "next/image";
import { useState } from "react";

export default function PaymentInfo(){
     const [paymentMethod, setPaymentMethod] = useState<"cash" | "inapp">("inapp");
    return (
        <>
        <div className="w-full">
          <div className="px-[16px] py-[8px] w-full">
            {paymentMethod === "cash" ? (
              <div
                className="flex items-center gap-2 px-3 py-1.5 text-[13px] font-semibold rounded-[8px]"
                style={{ background: "#E9F9EE", color: "#136C2E" }}
              >
                <Image
                  src="/images/money.png"
                  width={14}
                  height={14}
                  alt="cash icon"
                />
                Paying with Cash
              </div>
            ) : (
              <div
                className="flex items-center gap-2 px-3 py-1.5 text-[13px] font-semibold rounded-[8px]"
                style={{ background: "#E9F9EE", color: "#136C2E" }}
              >
                <Image
                  src="/images/money.png"
                  width={14}
                  height={14}
                  alt="card icon"
                />
                Paying In-App
              </div>
            )}
          </div>
        </div>
        </>
    )
}