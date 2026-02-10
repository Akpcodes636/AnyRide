"use client";

import OtpForm from "@/app/components/forms/register/OtpForm";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const phone = searchParams.get("phone") || "+24390648389";

  const maskedPhone = phone.replace(
    /(\+\d{3})\d+(\d{2})/,
    "$1******$2"
  );

  /* 
    PROTECTION:
    If this page is accessed directly without a token (e.g. user refresh, or manual nav), 
    the API calls will fail. We should redirect them back to start.
  */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login"); 
    }
  }, [router]);

  return (
    <section className="h-screen flex items-start justify-center flex-col">
      <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-center">Verify your number</h2>

          <p className="text-[#545454] text-[16px] md:text-[18px] text-center font-normal mb-[40px] leading-[160%] tracking-[-2%] w-full max-w-[207px] mx-auto">
            Enter the 6-digit OTP sent to {maskedPhone}
          </p>

          <OtpForm />
        </div>
      </div>
    </section>
  );
}
