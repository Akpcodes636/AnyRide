"use client";

import InputField from "../../ui/InputField";
import { useFormik } from "formik";
import { ILogin } from "@/types";
import Button from "../../ui/Button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { FaApple } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { registerValidationSchema } from "@/lib/validations/userValidations";
import { useState } from "react";

const Register = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const formik = useFormik<ILogin>({
    initialValues: {
      email: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setServerError(null);

      try {
        console.log("Simulating register:", values);

        // Fake network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Fake success
      router.push(`/check-email?email=${encodeURIComponent(values.email)}`);
      } catch (err) {
        setServerError("Something went wrong. Try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <InputField
          name="email"
          label=""
          css="focus:border-[#A20602]! max-w-full lg:max-w-full"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null
          }
        />

        {serverError && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {serverError}
          </p>
        )}

        <div className="mt-[24px]">
          <div className="flex items-center justify-center gap-4 w-full max-w-full lg:max-w-full">
            <div className="h-[2px] w-full bg-[#E6E6E6]" />
            <div>Or</div>
            <div className="h-[2px] w-full bg-[#E6E6E6]" />
          </div>

          {/* Google */}
          <Button
            css="mt-4 w-full rounded-[12px]! h-[48px]! max-w-full lg:max-w-full text-[#8A8C91]"
            style="reverse"
            type="button"
            disabled={isLoading}
          >
            <div className="flex items-center gap-2">
              <FcGoogle size={24} />
              <span>Sign up with Google</span>
            </div>
          </Button>

          {/* Apple */}
          <Button
            css="mt-[16px] w-full rounded-[12px]! h-[48px]! max-w-full lg:max-w-full text-[#8A8C91]"
            style="reverse"
            type="button"
            disabled={isLoading}
          >
            <div className="flex items-center gap-2">
              <FaApple size={24} color="black" />
              <span>Sign up with Apple</span>
            </div>
          </Button>

          {/* Continue */}
          <div className="pt-[80px] pb-[32px]">
            <Button
              style="tertiary"
              css="!rounded-[12px] w-full max-w-full lg:max-w-full h-[57px] text-[18px] tracking-[-2%] text-center leading-[160%]"
              type="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Continue"}
            </Button>
          </div>

          <p className="text-center">
            <span className="text-[#545454] text-[16px] font-normal leading-[140%]">
              By clicking “Continue”, you&apos;re accepting our{" "}
            </span>
            <Link href="/terms" className="underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Register;
