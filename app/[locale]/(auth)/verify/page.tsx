"use client";

import OtpForm from "@/app/components/forms/register/OtpForm";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const phone = searchParams.get("phone") || "+24390648389";

  const maskedPhone = phone.replace(
    /(\+\d{3})\d+(\d{2})/,
    "$1******$2"
  );

  return (
    <section className="h-screen flex items-start justify-center flex-col">
      <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-center">Verify your number</h2>

          <p className="text-[#545454] text-[16px] md:text-[18px] text-center font-normal mb-[40px] leading-[160%] tracking-[-2%] w-full max-w-[207px] mx-auto">
            Enter the 4-digit OTP sent to {maskedPhone}
          </p>

          <OtpForm />
        </div>
      </div>
    </section>
  );
}
