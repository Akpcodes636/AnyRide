"use client";

import RequestRide from "./RequestRide"; 
import FindingRide from "./FindingRide";
import ConfirmRide from "./ConfirmRide";
import { useRideStore } from "@/store/rideStore";
import SelectRideType from "./SelectRideType";

export default function RideFlow() {
  const step = useRideStore((s) => s.step);
  console.log("Current step:", step);

  if (step === "request") return <RequestRide />;
  if (step === "rideType") return <SelectRideType />;
  if (step === "findingRide") return <FindingRide />;
  if (step === "confirmRide") return <ConfirmRide />;

  return null;
}