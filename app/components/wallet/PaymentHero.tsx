"use client";

import { Search } from "lucide-react";
import WalletPayment from "./WalletPayment";
import WalletPaymentMethod from "./WalletPaymentMethod";
import PaymentGrid from "./PaymentGrid";

export default function PaymentHero() {
  return (
    <section className="h-screen">
      <div className="container mx-auto pt-[120px]">
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block lg:block text-[16px] md:text-[28px] lg:text-[48px] text-[#333333] tracking-[-4%] leading-[120%] font-bold">
            Pay with
          </h1>
          <div className="w-full md:max-w-[400px] lg:max-w-[618px] h-[57px] rounded-[8px] bg-[#F5F5F7] flex items-center px-4">
            <Search size={16} className="text-gray-400 mr-2" />

            <input
              type="search"
              placeholder="Search for anything"
              className="bg-transparent outline-none w-full text-sm placeholder:text-gray-400"
            />
          </div>
        </div>
       
       <div>
        <PaymentGrid />
       </div>

      </div>
    </section>
  );
}
