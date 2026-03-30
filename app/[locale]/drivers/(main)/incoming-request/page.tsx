"use client";
import DriverInfo from "@/app/components/(drivers)/AcceptRideCard/DriverInfo";
import PaymentInfo from "@/app/components/(drivers)/AcceptRideCard/PaymentInfo";
import RideActions from "@/app/components/(drivers)/AcceptRideCard/RideActions";
import RideHeader from "@/app/components/(drivers)/AcceptRideCard/RideHeader";
import RouteDetails from "@/app/components/(drivers)/AcceptRideCard/RouteDetails";
import FundWallet from "@/app/components/modals/FundWallet";
import LocationSearchInput from "@/app/components/ui/LocationSearchInput";
import { useTripModal } from "@/store/Modals";
import { Coords } from "@/types";
import Image from "next/image";
import { useState } from "react";

export default function AcceptRideCard() {
  const TOTAL = 20;

  const [seconds] = useState(TOTAL);
  

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "inapp">("inapp");
  const [requestState, setRequestState] = useState<"incoming" | "waiting" |"confirmed">("incoming");

  const { modal, openModal } = useTripModal();
  console.log("Current modal:", modal, openModal);

  const pct = (seconds / TOTAL) * 100;
  const color = seconds > 10 ? "#1A3FD8" : seconds > 5 ? "#F59E0B" : "#EF4444";
  
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-[512px] min-h-[480px] shadow-[0px_4px_20px_0px_#00000017]">
        {/* Header */}
        <RideHeader />

        {/* Driver */}
        <DriverInfo />

        {/* Route */}
        <RouteDetails />

        {/* Payment */}
        <PaymentInfo />

        {/* Buttons */}
        <RideActions />
        
      </div>
    </div>
  );
}
