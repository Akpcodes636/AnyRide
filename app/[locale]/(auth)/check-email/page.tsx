"use client";
import Button from "@/app/components/ui/Button";
import { maskEmail } from "@/app/utils/helper";
import { useVerifyEmail } from "@/hooks/useAuthHook";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "your email";

  const { mutate, isPending } = useVerifyEmail();

  // Automatically verify email on page load if token exists
  useEffect(() => {
    if (token) {
      mutate({ token });
    }
  }, [token,mutate]);

  const handleResendEmail = () => {
    // simulate resend email
    toast.success("Verification email resent!");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Confirm email</h2>

        <p className="mb-8 text-[18px] text-[#545454] leading-[160%] tracking-[-2%]">
          We have sent a confirmation message to{" "}
          <strong>{maskEmail(email)}</strong>
        </p>

        <Button
          style="tertiary"
          css="!rounded-[12px] w-full h-[57px] text-[18px] tracking-[-2%] leading-[160%]"
          type="button"
          fn={() => {
            const token = localStorage.getItem("token");
            if (token) {
              router.push("/enter-phone");
            } else {
              toast.error("Please verify your email first");
            }
          }}
          loading={isPending}
          disabled={isPending}
        >
          Continue
        </Button>

        <button
          onClick={handleResendEmail}
          className="mt-6 text-sm underline text-gray-600"
        >
          Resend email
        </button>
      </div>
    </div>
  );
};

export default Page;
