"use client";

import Button from "../ui/Button";
import InputField from "../ui/InputField";
import { useRouter } from "next/navigation";

export default function AddFund() {
  const router = useRouter();

  return (
    <div>
      <p className="text-[#555A7B] font-normal text-[18px] leading-[120%] mb-[8px]">
        Amount to fund
      </p>
      <InputField
        name={""}
        label={""}
        value={""}
        onChange={(e) => console.log(e)}
      />
      <Button
        type="button"
        style="tertiary"
        css="w-full h-[57px] rounded-[12px] mt-[10px]"
        fn={() => router.push("/wallet/add-funds/payment-method")}
      >
        Proceed
      </Button>
    </div>
  );
}
