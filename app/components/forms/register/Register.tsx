"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/ui/InputField";
import Button from "@/app/components/ui/Button";
import { toast } from "sonner";
import { useCheckPhone } from "@/hooks/useAuthHook";
import { parsePhoneNumberFromString } from "libphonenumber-js";

interface FormValues {
  phonenumber: string;
  role: "customer" | "driver" | "admin";
}

export default function Page() {
  const router = useRouter();
  const { mutate, isPending } = useCheckPhone();

  const formik = useFormik<FormValues>({
    initialValues: {
      phonenumber: "",
      role: "customer",
    },
    onSubmit: (values) => {
      // Validate & format phone
      const phoneNumber = parsePhoneNumberFromString(values.phonenumber);

      if (!phoneNumber || !phoneNumber.isValid()) {
        toast.error("Invalid phone number. Please use a valid number.");
        return;
      }

      const formattedPhone = phoneNumber.number; // E.164 format

      mutate(
        { phonenumber: formattedPhone, role: values.role },
        {
          onSuccess: (data) => {
            if (data.exists) {
              toast.error("Account already exists. Please login.");
              router.push("/login/verify-pin");
              return;
            }

            toast.success("Phone verified. Sending OTP...");
            router.push(
              `/register/verify-otp?phone=${formattedPhone}&role=${values.role}`,
            );
          },
          onError: () => {
            toast.error("Something went wrong. Please try again.");
          },
        },
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <InputField
        name="phonenumber"
        label="Phone Number"
        placeholder="+2348012345678"
        value={formik.values.phonenumber}
        onChange={formik.handleChange}
      />

      <select
        name="role"
        value={formik.values.role}
        onChange={formik.handleChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
      >
        <option value="customer">Customer</option>
        <option value="driver">Driver</option>
      </select>

      <Button
        style="tertiary"
        type="submit"
        loading={isPending}
        css="!bg-[#010C4A] text-white"
      >
        Continue
      </Button>
    </form>
  );
}
