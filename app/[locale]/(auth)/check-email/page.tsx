"use client";

import Button from "@/app/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "your email";

  const [isLoading, setIsLoading] = useState(false);

  const goToPhoneVerification = async () => {
    setIsLoading(true);

    // simulate opening email app / waiting
    await new Promise((resolve) => setTimeout(resolve, 1200));

    router.push("/enter-phone");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4 max-w-md">
        <h2 className="font-semibold mb-4">Confirm email</h2>

        <p className="mb-8 text-[18px] text-[#545454] leading-[160%] tracking-[-2%]">
          We have sent a confirmation message to{" "}
          <strong>{email.replace(/(.{2}).+(@.+)/, "$1******$2")}</strong>
        </p>

        <Button
          style="tertiary"
          css="!rounded-[12px] w-full max-w-[518.5px] h-[57px] text-[18px] tracking-[-2%] leading-[160%]"
          type="button"
          fn={goToPhoneVerification}
          loading={isLoading}
          disabled={isLoading}
        >
          Open email app
        </Button>

        {/* Resend */}
        <button
          onClick={() => alert("Simulating resend email")}
          className="mt-6 text-sm underline text-gray-600"
        >
          Resend email
        </button>
      </div>
    </div>
  );
};

export default Page;
