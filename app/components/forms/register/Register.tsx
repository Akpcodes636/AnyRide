"use client";

import React from "react";
import InputField from "../../ui/InputField";
import { useFormik } from "formik";
import { registerValidationSchema } from "@/lib/validations/userValidations";
import Button from "../../ui/Button";
import { CircleAlert, CircleCheck } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { Link, useRouter } from "@/i18n/navigation";
import { RegisterPayload } from "@/types";
// import { useRegister } from "@/hooks/useAuthHooks";
import { toast } from "sonner";
import { EmailRoute } from "@/app/utils/Route";
import { useRegister } from "@/hooks/useAuthHook";

const Register = () => {
  const router = useRouter();
  const { mutate, isPending } = useRegister();

  const formik = useFormik<RegisterPayload>({
  initialValues: {
    email: "",
    authProvider: ""
  },
  validationSchema: registerValidationSchema,
  onSubmit: (values) => {
    mutate({
      ...values,
      authProvider: "email",
    });
  }
});


 

  // Apple Sign-in handler placeholder
  const handleApple = async () => {
    toast("Apple sign-in not implemented yet");
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      {/* Email */}
      <InputField
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email ? formik.errors.email : null}
      />

      {/* OR Divider */}
      <div className="flex items-center justify-center gap-4 my-4">
        <div className="h-[2px] w-full bg-[#0000001A]" />
        <div>Or</div>
        <div className="h-[2px] w-full bg-[#0000001A]" />
      </div>

      {/* Social Buttons */}
      <Button style="reverse" type="button" disabled={isPending} css="!rounded-[12px]">
        <div className="flex items-center gap-2">
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </div>
      </Button>

      <Button style="reverse" type="button" fn={handleApple} disabled={isPending} css="!rounded-[12px]">
        <div className="flex items-center gap-2">
          <FaApple size={20} color="black" />
          <span>Continue with Apple</span>
        </div>
      </Button>


      {/* Submit Button */}
      <Button
        style="primary"
        type="submit"
        loading={isPending}
        disabled={isPending || Object.keys(formik.errors).length > 0}
        css="!bg-[#010C4A] text-white"
      >
        continue
      </Button>

      {/* Terms & Conditions */}
      <p className="text-center mt-4 text-sm text-gray-500">
        By clicking “Continue”, you're agree to our{" "}
        <Link href="/terms" className="underline text-[#333333] font-bold">Terms & Conditions</Link> and{" "}
        <Link href="/privacy" className="underline text-[#333333] font-bold">Privacy Policy</Link>.
      </p>

      {/* Login link */}
      <p className="text-center mt-2">
        Already have an account?{" "}
        <Link href="/login" className="font-bold underline">Login</Link>
      </p>
    </form>
  );
};

export default Register;
