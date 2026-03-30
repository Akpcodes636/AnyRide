"use client";
import AcceptRideCard from "@/app/[locale]/drivers/(main)/incoming-request/page";
import Availability from "./Availability";
// import AcceptRideCard from "./AcceptRideCard";
import RiderAssigned from "./RiderAssigned";
import { useDriverStore } from "@/store/driverStore";

export default function DriverFlow() {
  const step = useDriverStore((s) => s.step);

  if (step === "availability") return <Availability />;
  if (step === "acceptRide") return <AcceptRideCard />;
  if (step === "riderAssigned") return <RiderAssigned />;
  return null;
}