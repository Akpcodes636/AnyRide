"use client";
import Image from "next/image";
import { useState } from "react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

export default function WalletPayment() {
  const [balanceVisible, setBalanceVisible] = useState(false);
  const router = useRouter();

  return (
    <div className="">
      {/* Balance Card */}
      <div className="bg-[#F5F5F7] w-full max-w-[614px] h-[503px] rounded-[8px] mb-[48px]">
        <div className="px-[16px] py-[24px]">
          <div className="flex flex-col md:flex-col lg:flex-row gap-[16px]">
            <div className="w-[40px] h-[40px]">
              <Image
                src="/images/wallet.png"
                width={500}
                height={500}
                alt="wallet icon"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[18px] text-[#02093A] leading-[140%]">
                Your Balance
              </h3>

              {/* Balance + Eye aligned side by side */}
              <div className="flex items-center gap-3">
                <span className="text-[32px] md:text-[48px] font-bold text-[#02093A] tracking-tight">
                  {balanceVisible ? "CF 12,400" : "****"}
                </span>

                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="text-gray-400 hover:text-gray-600 transition-colors flex items-center"
                >
                  {balanceVisible ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button  style="tertiary" type="button" css="w-[614px] h-[57px] rounded-[12px]" fn={()=> router.push("/wallet/add-funds")  }>Add funds</Button>
    </div>
  );
}
