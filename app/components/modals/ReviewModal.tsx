"use client";
import { useTripModal } from "@/store/Modals";
import ModalLayout from "./ModalLayout";
import StarRating from "../ui/StarRating";
import Button from "../ui/Button";

export default function ReviewModal() {
  const { modal, closeModal,openModal } = useTripModal();
  return (
    <ModalLayout
      isOpen={modal === "review"}
      onClose={() => closeModal()}
      className="relative max-h-[90vh]  max-w-[525px]"
    >
      <div className="flex items-center justify-center flex-col">
        <div className="w-[210px]">
          <h3 className="text-[25px] font-bold leading-[120%] tracking-[-4%] text-center mb-[16px]">
            How was your trip with Jacob?
          </h3>
          <p className="text-[16px] text-[#545454] leading-[140%] tracking-[-2%] text-center mb-[32px]">
            Your feedback helps improve our service
          </p>
        </div>
        <StarRating />
        <p>Tap on the stars to rate</p>
        <div className="flex flex-col items-start gap-3 p-4 bg-white rounded-lg shadow-sm w-[360px]">
          <label className="text-sm text-gray-700 font-medium flex justify-between w-full">
            Tell your experience (Optional)
            <span className="text-gray-400 text-xs">0/200</span>
          </label>

          <textarea
            name="review"
            id="review"
            placeholder="Write your experience here..."
            className="w-full h-28 p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none text-sm text-gray-800"
          ></textarea>

          <Button
            style="disabled"
            type="button"
            css="w-full h-12 rounded-lg mt-2"
            fn={() => openModal("tip")}
          >
            Submit review
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
