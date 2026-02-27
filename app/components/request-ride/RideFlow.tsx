"use client";

import RequestRide from "./RequestRide";
import FindingRide from "./FindingRide";
import ConfirmRide from "./ConfirmRide";
import { useRideStore } from "@/store/rideStore";
import SelectRideType from "./SelectRideType";
import AcceptingOffer from "./AcceptingOffer";
import RideTracker from "./RideTracker";

export default function RideFlow() {
  const step = useRideStore((s) => s.step);
  console.log("Current step:", step);

  if (step === "request") return <RequestRide />;
  if (step === "rideType") return <SelectRideType />;
  if (step === "findingRide") return <FindingRide />;
  if (step === "confirmRide") return <ConfirmRide />;
  if (step === "acceptingOffer") return <AcceptingOffer />;
  if (step === "rideTracker") return <RideTracker />;

  return null;
}
