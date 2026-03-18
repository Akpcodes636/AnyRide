"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "@/app/components/ui/Button";
import InputField from "@/app/components/ui/InputField";
import { useSendOtp, useVerifyOtp } from "@/hooks/useAuthHook";
import PinForm from "@/app/components/forms/auth/PinForm";

type Role = "customer" | "driver";

export default function RegisterPhonePage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Role>("customer");
  const [otpSent, setOtpSent] = useState(false);

  const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp();
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();

  // Form for phone number
  const phoneFormik = useFormik({
    initialValues: { phonenumber: "" },
    onSubmit: (values) => {
      sendOtp(
        { phonenumber: values.phonenumber, forgot_pin: false },
        {
          onSuccess: () => {
            toast.success("OTP sent! Enter it below.");
            setPhone(values.phonenumber);
            setOtpSent(true);
          },
          onError: () => {
            toast.error("Failed to send OTP. Try again.");
          },
        },
      );
    },
  });

  // Form for OTP
  const otpFormik = useFormik({
    initialValues: { otp_code: "" },
    onSubmit: (values) => {
      verifyOtp(
        { phonenumber: phone, otp_code: values.otp_code, role },
        {
          onSuccess: (data) => {
            if (data.status === "success") {
              toast.success("Logged in successfully!");
              router.push("/dashboard");
            } else if (data.status === "registration_required") {
              router.push(
                `/register/create-account?phone=${phone}&role=${role}&token=${data.session_info}`,
              );
            }
          },
          onError: () => {
            toast.error("Failed to verify OTP. Try again.");
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto mt-24 p-4">
      <h2 className="text-2xl font-semibold text-center">Register / Login</h2>

      {/* Phone input */}
      {!otpSent && (
        <form
          onSubmit={phoneFormik.handleSubmit}
          className="flex flex-col gap-4"
        >
          <InputField
            name="phonenumber"
            label="Phone Number"
            value={phoneFormik.values.phonenumber}
            onChange={phoneFormik.handleChange}
          />

          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
          >
            <option value="customer">Customer</option>
            <option value="driver">Driver</option>
          </select>

          <Button
            type="submit"
            style="tertiary"
            loading={isSendingOtp}
            css="!bg-[#010C4A] text-white"
          >
            Send OTP
          </Button>
        </form>
      )}

      {/* OTP input */}
      {otpSent && (
        <form onSubmit={otpFormik.handleSubmit} className="flex flex-col gap-4">
          {/* <InputField
            name="otp_code"
            label="Enter OTP"
            value={otpFormik.values.otp_code}
            onChange={otpFormik.handleChange}
          /> */}
          <PinForm
            value={otpFormik.values.otp_code}
            onChange={(val) => otpFormik.setFieldValue("otp_code", val)}
            onSubmit={() => otpFormik.handleSubmit()}
            isLoading={isVerifying}
            error={otpFormik.errors.otp_code as string}
          />

          <Button
            type="submit"
            style="tertiary"
            loading={isVerifying}
            css="!bg-[#010C4A] text-white"
          >
            Verify OTP
          </Button>

          {/* <Button
            type="button"
            style="secondary"
            fn={() =>
              sendOtp(
                { phonenumber: phone, forgot_pin: false },
                { onSuccess: () => toast.success("OTP resent!") }
              )
            }
            loading={isSendingOtp}
            css="!bg-gray-200 text-gray-800"
          >
            Resend OTP
          </Button> */}
          <p className="text-center text-gray-30 text-[16px] ">Resend OTP</p>
        </form>
      )}
    </div>
  );
}
