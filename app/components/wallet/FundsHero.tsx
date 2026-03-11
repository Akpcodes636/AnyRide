"use client";

import AddFund from "./AddFund";
import WalletPayment from "./WalletPayment";


export default function FundHero() {
  return (
    <section className="h-screen">
      <div className="container mx-auto pt-[120px]">
        <div className="">
          <h1 className="text-[24px] md:text-[32px] lg:text-[48px] text-[#333333] tracking-[-4%] leading-[120%]">
           Fund Wallet
          </h1>
        </div>

         <div className="pt-[63px]">
           <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[50px] h-full">
             <WalletPayment />
             <AddFund />
           </div>
        </div>
         
      </div>
    </section>
  );
}
