"use client";
import { useTripModal } from "@/store/Modals";
import ModalLayout from "./ModalLayout";
import { GiCheckMark } from "react-icons/gi";
import Button from "../ui/Button";
import ReviewModal from "./ReviewModal";

export default function TripCompleted() {
  const { modal, closeModal,openModal } = useTripModal();

  return (
    <ModalLayout
      isOpen={modal === "tripCompleted"}
      onClose={() => closeModal()}
      className="relative max-h-[90vh]  max-w-[525px]"
    >
      <div className="py-[101px] px-[36px] flex items-center justify-center flex-col">
        <div className="bg-[#188C3B] h-[68px] w-[68px] rounded-full flex items-center justify-center">
          <GiCheckMark size={17} color="white" />
        </div>
        <div className="text-center mb-[24px]">
          <h3 className="mb-[8px] mt-[8px]">Trip Completed</h3>
          <h2 className="mb-[8px]">-58.12 CFD</h2>
          <p className="text-[#545454]">
            Payment made from{" "}
            <span className="text-[#333333] font-bold"> ATM 6887 BH</span>{" "}
          </p>
        </div>

        <div>
          <div className="bg-[#F5F5F7] rounded-[12px] w-full ">
            <div className="p-[24px]">
              <h4 className="text-[14px] leading-[140%] text-[#02093A]">
                Fare breakdown
              </h4>
              <div className="flex justify-between items-start py-3 border-b border-dashed border-slate-200 gap-3">
                <span className="text-[10px] text-slate-400 shrink-0">
                  Trip details
                </span>
                <span className="text-[10px] text-slate-800 font-medium text-right leading-relaxed">
                  From 4827 Willowbrook Lane,OH 44126 to Oaklahoma hix road
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-dashed border-slate-200 gap-3">
                <span className="text-[10px] text-slate-400 shrink-0">
                  Completed on
                </span>
                <span className="mono text-[10px] text-slate-800 font-medium">
                  Sept 8th, 2025 08:33:21
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-dashed border-slate-200 gap-3">
                <span className="text-[10px] text-slate-400 shrink-0">
                  Base fare
                </span>
                <span className="mono text-[10px] text-slate-800 font-medium">
                  −$30
                </span>
              </div>

              <div className="flex justify-between items-start py-3 border-b border-dashed border-slate-200 gap-3">
                <span className="text-[10px] text-slate-400 shrink-0">
                  Distance &amp; time
                </span>
                <span className="text-right">
                  <span className="mono text-[10px] text-slate-800 font-medium">
                    −$23.12
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">
                    (for 3km in 8mins)
                  </span>
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-dashed border-slate-200 gap-3">
                <span className="text-[10px] text-slate-400 shrink-0">
                  Service fee
                </span>
                <span className="mono text-[10px] text-slate-800 font-medium">
                  −$5
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-dashed border-slate-200 gap-3">
                <span className="text-[10px] text-slate-900 font-semibold shrink-0">
                  Total charged
                </span>
                <span className="mono text-[10px] text-slate-900 font-bold">
                  −$58.12
                </span>
              </div>

              <div className="flex justify-between items-center pt-3 gap-3">
                <span className="text-[10px] text-slate-400 shrink-0">
                  Status
                </span>
                <span className="flex items-center gap-1.5 text-[13px] font-medium text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot"></span>
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>
         
         <div className="flex items-center justify-between gap-[16px] mt-[20px]">

        <Button type="button" style="disabled" css="w-[201px] h-[48px] rounded-[8px]" fn={() => openModal("dispute")}>Open dispue</Button>
        <Button type="button" style="tertiary" css="w-[201px] h-[48px] rounded-[8px]" fn={() => openModal("review")} >Done</Button>
         </div>
      </div>
    </ModalLayout>
  );
}
