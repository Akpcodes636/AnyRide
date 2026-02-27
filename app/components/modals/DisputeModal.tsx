"use client";
import { useState } from "react";
import ModalLayout from "./ModalLayout";
import { useTripModal } from "@/store/Modals";

const DISPUTE_CATEGORIES = [
  "Incorrect charge",
  "Service not received",
  "Unauthorized transaction",
  "Duplicate charge",
  "Other",
];

const DISPUTE_REASONS = [
  "I was charged the wrong amount",
  "The service was not completed",
  "I did not authorize this transaction",
  "I was charged more than once",
  "The driver/provider was unprofessional",
  "Other reason",
];

export default function DisputeModal() {
  const { modal, closeModal } = useTripModal();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const canSubmit = selectedCategory && selectedReason;

  return (
    <ModalLayout
      isOpen={modal === "dispute"}
      onClose={() => closeModal()}
      className="relative max-h-[90vh] max-w-[525px]"
    >
      <div className="flex flex-col items-center px-8 pt-8 pb-6 gap-5 w-full">

        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-3">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm mb-1">
            Something doesn&apos;t look right?
          </p>
          <h2 className="text-[#0f1f3d] text-2xl font-bold">
            File a Dispute
          </h2>
        </div>

        {/* Dispute Category Pills */}
        <div className="w-full flex flex-col items-center gap-3">
          <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Category
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {DISPUTE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-150 ${
                  selectedCategory === cat
                    ? "bg-[#0f1f3d] text-white border-[#0f1f3d]"
                    : "bg-white text-[#0f1f3d] border-gray-300 hover:border-[#0f1f3d]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Reason Select */}
        <div className="w-full flex flex-col items-center gap-2">
          <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Reason
          </span>
          <div className="w-full relative">
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className={`w-full appearance-none border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 text-sm font-medium outline-none focus:border-[#0f1f3d] transition-colors cursor-pointer pr-10 ${
                selectedReason ? "text-[#0f1f3d]" : "text-gray-400"
              }`}
            >
              <option value="" disabled>
                Select a reason...
              </option>
              {DISPUTE_REASONS.map((reason) => (
                <option key={reason} value={reason} className="text-[#0f1f3d]">
                  {reason}
                </option>
              ))}
            </select>
            {/* Custom chevron */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="w-full flex flex-col items-center gap-2">
          <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Description (Optional)
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please provide any additional details about your dispute..."
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 text-sm font-medium text-[#0f1f3d] placeholder-gray-400 outline-none focus:border-[#0f1f3d] transition-colors resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="w-full flex gap-3 mt-1">
          <button
            onClick={() => closeModal()}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-[#0f1f3d] text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!canSubmit}
            onClick={() => {
              // handle dispute submission
              closeModal();
            }}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
              canSubmit
                ? "bg-[#0f1f3d] text-white hover:bg-[#1a2f5a]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Submit Dispute
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}