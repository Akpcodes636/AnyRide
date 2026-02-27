"use client";
import { useState } from "react";
import ModalLayout from "./ModalLayout";
import { useTripModal } from "@/store/Modals";

export default function TipModal() {
   const { modal, closeModal,openModal } = useTripModal();
  const [selectedTip, setSelectedTip] = useState<string>("10%");
  const [customAmount, setCustomAmount] = useState<string>("");

  const tipOptions = ["10%", "20%", "50%", "100%"];

  return (
    <ModalLayout
      isOpen={modal === "tip"}
      onClose={() => closeModal()}
      className="relative max-h-[90vh] max-w-[525px]"
    >
      <div className="flex flex-col items-center px-8 pt-8 pb-6 gap-5">
        {/* Header Text */}
        <div className="text-center">
          <p className="text-[#545454] text-[16px] mb-[16px] leading-[140%] tracking-[-2%] w-[230px]">
            That looks like a positive review from you.
          </p>
          <h2 className="text-[#333333] text-[25px] font-bold leading-[120%] tracking-[-4%]">
            Like to tip Jacob?
          </h2>
        </div>

        {/* Tip Percentage Selector */}
        <div className="w-full flex flex-col items-center gap-3">
          <span className="text-[10px] font-normal uppercase tracking-[10%] leading-[120%] text-[#02093A] uppercase">
            Tip With
          </span>
          <div className="flex gap-2">
            {tipOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedTip(option)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-150 ${
                  selectedTip === option
                    ? "bg-[#0f1f3d] text-white border-[#0f1f3d]"
                    : "bg-white text-[#0f1f3d] border-gray-300 hover:border-[#0f1f3d]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount Input */}
        <div className="w-full flex flex-col items-center gap-2">
          <span className="text-[10px] font-normal tracking-widest text-[#02093A] uppercase mb-[16px]">
            Custom (Input Price)
          </span>
          <div className="w-full flex items-center border border-gray-200 rounded-lg px-4 py-3 bg-[#F5F5F7] focus-within:border-[#0f1f3d] transition-colors">
            <span className="text-[#8B8EA4] text-sm font-medium mr-2">CFD</span>
            <input
              type="text"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="67958"
              className="bg-transparent flex-1 outline-none text-[#0f1f3d] text-sm font-medium placeholder-[#000000]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex gap-3 mt-1">
          <button
            onClick={() => closeModal()}
            className="flex-1 py-3 cursor-pointer rounded-xl bg-[#F5F5F7] text-[#0f1f3d] text-sm font-normal  transition-colors"
          >
            No, thanks
          </button>
          <button
            onClick={() => {
              // handle tip logic
              closeModal();
            }}
            className="flex-1 py-3 cursor-pointer rounded-xl bg-[#010C4A] text-white text-sm font-normal transition-colors"
          >
            Tip
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}