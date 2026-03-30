"use client";
import { useTripModal } from "@/store/Modals";
import { useState, useEffect } from "react";
import { useDriverStore } from "@/store/driverStore";

type RideState =
  | "incoming"
  | "checking_payment"
  | "waiting_driver"
  | "confirmed"
  | "cancelled";

export default function RideActions() {
  const ridePrice = 184;
  const walletBalance = 1500;
  const [ rideState, setRideState ] = useState<RideState>("incoming");
  const { modal, openModal } = useTripModal();
  const { setStep } = useDriverStore();

  useEffect(() => {
    if (walletBalance < ridePrice) {
      openModal("fund");
    }
  }, [walletBalance, ridePrice, openModal]);

  const handleDecline = () => {
    setRideState("cancelled");
    setStep("availability"); // go back to availability
  };

  const handleAccept = () => {
    if (walletBalance < ridePrice) {
      openModal("fund");
      return;
    }
    setRideState("waiting_driver");
    setStep("riderAssigned"); // advance to next step
  };

  return (
    <>
      {rideState === "incoming" && (
        <div className="px-5 pt-3 pb-5 flex gap-3">
          <button
            onClick={handleDecline}
            className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-[#02093A] cursor-pointer"
            style={{ border: "1.5px solid #E2E8F0" }}
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 py-3.5 rounded-2xl text-sm font-bold text-white cursor-pointer"
            style={{ background: "#010C4A" }}
          >
            Accept
          </button>
        </div>
      )}
    </>
  );
}