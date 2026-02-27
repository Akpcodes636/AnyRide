// components/modals/ModalManager.tsx
"use client";
import { useTripModal } from "@/store/Modals";
import TripCompleted from "./TripCompleted";
import ReviewModal from "./ReviewModal";
import DisputeModal from "./DisputeModal";
import TipModal from "./TipModal";


export default function ModalManager() {
  const { modal } = useTripModal();

  return (
    <>
      {modal === "tripCompleted" && <TripCompleted />}
      {modal === "review" && <ReviewModal />}
      {modal === "dispute" && <DisputeModal />}
      {modal === "tip" && <TipModal />}
    </>
  );
}