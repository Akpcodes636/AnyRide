"use client";

import { useTripModal } from "@/store/Modals";
import ModalLayout from "./ModalLayout";
import Image from "next/image";

export default function FundWallet() {
  const { modal, closeModal } = useTripModal();
  return (
    <ModalLayout
      isOpen={modal === "fund"}
      onClose={() => closeModal()}
      className="relative max-h-[90vh] max-w-[525px]"
    >
      <div>
        <div className="p-[80px]">
          <h3 className="text-[18px] md:text-[20px] lg:text-[25px] font-bold mb-[18px] text-[#333333]">
            Top-up your Wallet
          </h3>
          <div className="flex items-center justify-center gap-2 bg-[#FDECEC] py-[6px] px-2 mb-6 rounded-[8px]">
            <div className="w-[16px] h-[16px]">
              <Image
                src="/images/Banknote.png"
                width={16}
                height={16}
                alt="icons"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[10px] font-light text-[#EF4444]">
              You are unning low on balances to cover the service charge
            </p>
          </div>
          <button className="bg-[#010C4A] h-[48px] rounded-[12px] w-full max-w-[364px] text-white">
            Add funds
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
