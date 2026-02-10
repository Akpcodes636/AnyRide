"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import PinForm from "@/app/components/forms/auth/PinForm";
import Button from "@/app/components/ui/Button";
import { useSetPin } from "@/hooks/useAuthHook";

type Step = "create" | "confirm" | "success";

export default function SetPinPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("create");
  const [firstPin, setFirstPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  // rename mutation to avoid confusion
  const { mutate: submitPin, isPending } = useSetPin();

  const handleCreateSubmit = (pin: string) => {
    setFirstPin(pin);
    setError(null);
    setStep("confirm");
  };

  const handleConfirmSubmit = (pin: string) => {
    if (pin !== firstPin) {
      setError("PINs do not match. Try again.");
      return;
    }

    submitPin(
      { pin },
      {
        onSuccess: () => {
          setStep("success");
        },
        onError: (err: any) => {
          setError(err?.response?.data?.error || "Failed to set PIN");
        },
      }
    );
  };

  // ================= SUCCESS SCREEN =================

  if (step === "success") {
    return (
      <section className="h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>

          <h2 className="text-[20px] md:text-[48px] font-bold mb-4">
            PIN created successfully
          </h2>

          <p className="text-[#02093A] mb-8">
            Your PIN is now active.
          </p>

          <Button
            style="primary"
            css="w-full !bg-[#010C4A] text-white"
            type="button"
            fn={() => router.push("/request-ride")}
          >
            Continue
          </Button>
        </div>
      </section>
    );
  }

  // ================= FORM FLOW =================

  return (
    <section className="h-screen flex items-start justify-center px-4 pt-20">
      <div className="container mx-auto max-w-md">

        <h2 className="text-center font-bold text-2xl mb-2">
          {step === "create" ? "Set PIN" : "Confirm PIN"}
        </h2>

        <p className="text-[#545454] text-center mb-8">
          {step === "create"
            ? "Set a quick 4-digit PIN for faster, secure access to your app."
            : "Re-enter your PIN to confirm."}
        </p>

        <PinForm
          key={step} // forces reset when switching steps
          onSubmit={
            step === "create"
              ? handleCreateSubmit
              : handleConfirmSubmit
          }
          isLoading={isPending}
          error={error}
          buttonText={
            step === "create"
              ? "Continue"
              : "Confirm PIN"
          }
        />

        {step === "confirm" && (
          <button
            type="button"
            onClick={() => {
              setStep("create");
              setError(null);
            }}
            className="w-full text-center mt-4 text-sm text-gray-500 underline"
          >
            Back to Set PIN
          </button>
        )}

      </div>
    </section>
  );
}
