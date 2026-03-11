"use client";

import { useTripModal } from "@/store/Modals";
import { useState } from "react";
import FundWallet from "../../modals/FundWallet";

type RideState =
  | "incoming"
  | "checking_payment"
  | "waiting_driver"
  | "confirmed"
  | "cancelled";

export default function RideActions() {

  const ridePrice = 184;
  const walletBalance = 1500;

  const [rideState, setRideState] = useState<RideState>("incoming");

  const { modal, openModal } = useTripModal();

  const handleAccept = () => {
    if (walletBalance < ridePrice) {
      openModal("fund");
    } else {
      setRideState("waiting_driver");
    }
  };

  return (
    <>
      {rideState === "incoming" && (
        <div className="px-5 pt-3 pb-5 flex gap-3">
          <button
            className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-[#02093A]"
            style={{ border: "1.5px solid #E2E8F0" }}
          >
            Decline
          </button>

          <button
            className="flex-1 py-3.5 rounded-2xl text-sm font-bold text-white"
            style={{ background: "#010C4A" }}
            onClick={handleAccept}
          >
            Accept
          </button>

          {modal === "fund" && <FundWallet />}
        </div>
      )}
    </>
  );
}