"use client";

import {
  Africanpayment,
  Americanpayments,
  cardPayment,
} from "@/app/utils/Content";
import Image from "next/image";

export default function PaymentGrid() {
  return (
    <div className="pt-[56px]">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[32px]">
        <div>
          <h3 className="font-normal text-[18px] leading-[160%] tracking-[-2%] text-[#02093A] mb-[16px] text-center">
            African Payments
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-[16px]">
            {Africanpayment.map((item, index) => (
              <div
                key={index}
                className="flex p-4 cursor-pointer items-center justify-center bg-white rounded-[9.51px] shadow-[0px_0px_11.88px_4.75px_#0000000A]"
              >
                <div className="w-[71px] h-[35px]">
                  <Image
                    src={item.img}
                    alt="payment logo"
                    width={90}
                    height={35}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <p className="text-[#555A7B] text-[16px] font-medium">
                Show more options
              </p>

              <div className="w-4 h-4 text-[#555A7B] flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-[#555A7B]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </div>

            </div>
        </div>
        <div>
          <h3 className="font-normal text-[18px] leading-[160%] tracking-[-2%] text-[#02093A] mb-[16px] text-center">
            American Payments
          </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-[16px]">
            {Americanpayments.map((item, index) => (
              <div
                key={index}
                className="w-full cursor-pointer p-4 flex items-center justify-center bg-white rounded-[9.51px] shadow-[0px_0px_11.88px_4.75px_#0000000A]"
              >
                <div className="w-[71px] h-[35px]">
                  <Image
                    src={item.img}
                    alt="payment logo"
                    width={100}
                    height={40}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
           <div className="flex items-center justify-center gap-2 cursor-pointer">
              <p className="text-[#555A7B] text-[16px] font-medium">
                Show more options
              </p>

              <div className="w-4 h-4 text-[#555A7B] flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-[#555A7B]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </div>

            </div>
        </div>
        <div>
          <h3 className="font-normal text-[18px] leading-[160%] tracking-[-2%] text-[#02093A] text-center mb-[16px]">
            Card options
          </h3>
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-[16px]">
            {cardPayment.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full cursor-pointer p-2 flex items-center justify-center rounded-[9.51px] shadow-[0px_0px_11.88px_4.75px_#0000000A]"
                >
                  <div className="w-[71px] h-[35px]">
                    <Image
                      src={item.img}
                      alt="payment logo"
                      width={100}
                      height={40}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
