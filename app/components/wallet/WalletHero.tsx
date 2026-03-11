"use client";

import Link from "next/link";
import WalletPayment from "./WalletPayment";
import WalletPaymentMethod from "./WalletPaymentMethod";

export default function WalletHero() {
  return (
    <section className="h-screen">
      <div className="container mx-auto pt-[120px]">
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] md:text-[32px] lg:text-[48px] text-[#333333] tracking-[-4%] leading-[120%]">
            Wallet
          </h1>
          <Link href="/trends">
            <p className="text-[#A20602] text-[18px] tracking-[-2%] leading-[160%] font-normal">
              See trends
            </p>
          </Link>
        </div>

        <div className="pt-[63px]">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[50px] h-full">
            <WalletPayment />
            <WalletPaymentMethod />
          </div>
        </div>
      </div>
    </section>
  );
}
