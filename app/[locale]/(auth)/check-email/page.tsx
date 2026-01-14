"use client";
import Button from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
     const goToPhoneVerification = () => {
       router.push("/verify-phone");
     }

  return (
    <section className="h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4 max-w-md">
        <h2 className="font-semibold mb-4">Confirm email</h2>
        <p className="mb-8 text-[18px] text-[#545454] leading-[160%] tracking-[-2%]">
          We have sent a confirmation message to <strong>ex******l@gmail.com</strong>
        </p>

        <Button
          style="tertiary"
          css="!rounded-[12px] w-full max-w-[518.5px] h-[57px] text-[18px] tracking-[-2%] leading-[160%]"
          type="button"
          fn={goToPhoneVerification}
        >
         Open email app
        </Button>
      </div>
    </section>
  );
};

export default Page;
