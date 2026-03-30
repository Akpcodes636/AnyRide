"use client";

import ModalLayout from "./ModalLayout";
import { useState } from "react";
import { useTripModal } from "@/store/Modals";

export default function WithdrawModal() {
  const { modal, closeModal } = useTripModal();
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsProcessing(true);
    // TODO: Add API call for withdrawal
    setTimeout(() => {
      setIsProcessing(false);
      closeModal();
      setAmount("");
    }, 2000);
  };

  return (
    <ModalLayout
      isOpen={modal === "withdraw"}
      onClose={closeModal}
      className="relative max-h-[90vh] max-w-[500px] w-full"
    >
      <div className="px-[96px] py-5">
        {/* Header */}
        <div className="flex flex-col mb-6">
          <h3 className="text-lg font-bold text-gray-900">Withdraw Money</h3>
          <p className="font-normal text-[#545454] leading-[160%] tracking-[-2%]">Select a withdrawal method</p>
        </div>


        {/* Withdrawal Method */}
        <div className="mb-6">
          <div className="flex flex-col gap-[16px] items-center justify-center">

            {/* Bank */}
            <button
              onClick={() => setSelectedMethod("bank")}
              className={`p-3 w-[335px] h-[74px] rounded-[16px] transition-colors ${selectedMethod === "bank"
                  ? "bg-[#F5F5F7]"
                  : "border border-gray-200 bg-white hover:border-gray-300"
                }`}
            >
              <div className="flex items-center gap-3">

                {/* Icon */}
                <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M3 9l9-7 9 7-11-4v6h12v-6l-9 7z" />
                    <path d="M3 15h18" />
                  </svg>
                </div>

                {/* Text */}
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Bank Transfer</span>
                  <span className="text-[10px] text-gray-500">
                    Transfer to banks
                  </span>
                </div>

              </div>
            </button>

            {/* Mobile Money */}
            <button
              onClick={() => setSelectedMethod("paypal")}
              className={`p-3 w-[335px] h-[74px] rounded-[16px] transition-colors ${selectedMethod === "paypal"
                  ? "bg-[#F5F5F7]"
                  : "border border-gray-200 bg-white hover:border-gray-300"
                }`}
            >
              <div className="flex items-center gap-3">

                {/* Icon */}
                <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M7 16V8m0 0l4-4m4 4l-4 4m6-4v8m0 0l-4 4m-4-4l4 4" />
                  </svg>
                </div>

                {/* Text */}
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Mobile money</span>
                  <span className="text-[10px] text-gray-500">
                    Transfer to mobile money
                  </span>
                </div>

              </div>
            </button>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={closeModal}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleWithdraw}
            disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              "Withdraw"
            )}
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
