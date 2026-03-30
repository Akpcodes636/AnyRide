"use client";
import ModalLayout from "./ModalLayout";

type FareBreakdownModalProps = {
  isOpen: boolean;
  onClose: () => void;
  driverName?: string;
  driverDestination?: string;
  completedAt?: string;
  baseFare?: number;
  distanceFare?: number;
  distanceLabel?: string;
  serviceFee?: number;
  totalCharged?: number;
  paymentMethod?: string;
};

export default function FeesBreakDownModal({
  isOpen,
  onClose,
  driverName = "James Okeke",
  driverDestination = "on a trip to Oklahoma the road",
  completedAt = "Sept 9th, 2026 08.23.21",
  baseFare = 580,
  distanceFare = 533.12,
  distanceLabel = "1hr 3km in 0mins",
  serviceFee = 6,
  totalCharged = 598.12,
  paymentMethod = "Wallet/Card",
}: FareBreakdownModalProps) {
  const total = -(totalCharged);

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      className="relative max-h-[90vh] max-w-[525px]"
    >
      <div className="w-full px-6 py-8 flex flex-col items-center">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all cursor-pointer z-10"
        >
          ✕
        </button>

        {/* Green checkmark */}
        <div className="w-[56px] h-[56px] rounded-full bg-[#22C55E] flex items-center justify-center mb-4">
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
            <path d="M2 10L9.5 17.5L24 2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Congrats text */}
        <p className="text-[14px] text-[#02093A] text-center font-normal leading-[160%]">
          Congratulations, you just<br />earned yourself
        </p>

        {/* Amount */}
        <h2 className="text-[32px] font-bold text-[#02093A] mt-1 mb-1">
          {total.toFixed(2)} CFD
        </h2>

        {/* Added to wallet */}
        <p className="text-[13px] text-[#1A6CF6] font-medium mb-5">
          Added to your Wallet
        </p>

        {/* Fare breakdown card */}
        <div className="w-full bg-[#F5F5F7] rounded-[12px] px-4 py-4">

          {/* Header row */}
          <div className="flex items-start justify-between mb-3">
            <p className="text-[14px] font-bold text-[#02093A]">Fare breakdown</p>
            <div className="text-right max-w-[55%]">
              <p className="text-[11px] text-[#555A7B] font-light leading-[140%]">
                {driverName},<br />
                <span className="text-[10px]">{driverDestination}</span>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-b border-[#E6E6E6] mb-3" />

          {/* Completed on */}
          <div className="flex justify-between items-center mb-2.5">
            <p className="text-[12px] text-[#555A7B] font-light">Completed on</p>
            <p className="text-[12px] text-[#02093A] font-normal">{completedAt}</p>
          </div>

          {/* Base fare */}
          <div className="flex justify-between items-center mb-2.5">
            <p className="text-[12px] text-[#555A7B] font-light">Base fare</p>
            <p className="text-[12px] text-[#02093A] font-normal">+{baseFare.toFixed(0)}</p>
          </div>

          {/* Distance & time */}
          <div className="flex justify-between items-center mb-2.5">
            <p className="text-[12px] text-[#555A7B] font-light">Distance & time</p>
            <p className="text-[12px] text-[#02093A] font-normal">
              +{distanceFare.toFixed(2)} ({distanceLabel})
            </p>
          </div>

          {/* Service fee */}
          <div className="flex justify-between items-center mb-2.5">
            <p className="text-[12px] text-[#555A7B] font-light">Service fee</p>
            <p className="text-[12px] text-[#02093A] font-normal">-{serviceFee}</p>
          </div>

          {/* Total charged */}
          <div className="flex justify-between items-center mb-2.5">
            <p className="text-[12px] text-[#555A7B] font-light">Total charged</p>
            <p className="text-[12px] font-bold text-[#02093A]">+{totalCharged.toFixed(2)}</p>
          </div>

          {/* Payment method */}
          <div className="flex justify-between items-center mb-2.5">
            <p className="text-[12px] text-[#555A7B] font-light">Payment method</p>
            <p className="text-[12px] text-[#02093A] font-normal">{paymentMethod}</p>
          </div>

          {/* Status */}
          <div className="flex justify-between items-center">
            <p className="text-[12px] text-[#555A7B] font-light">Status</p>
            <p className="text-[12px] text-[#22C55E] font-medium">● Completed</p>
          </div>
        </div>

        {/* Done button */}
        <button
          onClick={onClose}
          className="mt-5 w-full h-[48px] rounded-[12px] bg-[#010C4A] text-white text-[15px] font-semibold hover:bg-[#02093A] transition-all cursor-pointer"
        >
          Done
        </button>

      </div>
    </ModalLayout>
  );
}