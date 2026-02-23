"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PinForm from "@/app/components/forms/auth/PinForm";
import { useVerifyPin } from "@/hooks/useAuthHook";
import { useState } from "react";
import { toast } from "sonner";

const EnterPinPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";

  const [pinValue, setPinValue] = useState("");
  const { mutate: verifyPin, isPending } = useVerifyPin();

  const handleSubmit = (pin: string) => {
    if (!phone.startsWith("+")) {
      toast.error("Invalid phone number format");
      return;
    }

    verifyPin({
      phonenumber: phone,
      pin,
    });
  };

  return (
    <section className="h-screen flex items-start justify-center flex-col px-4 pt-20">
      <div className="container mx-auto max-w-md">
        <h2 className="text-center font-bold text-2xl mb-2">Enter Passcode</h2>

        <p className="text-[#545454] text-center mb-8">
          Verify this is YOU. Enter your current PIN.
        </p>

        <PinForm
          value={pinValue}
          onChange={setPinValue}
          onSubmit={handleSubmit}
          isLoading={isPending}
          buttonText="Verify"
        />

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-gray-500 underline"
          >
            Forgot PIN? Log out
          </button>
        </div>
      </div>
    </section>
  );
};

export default EnterPinPage;
