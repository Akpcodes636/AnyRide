"use client";

import React from "react";
import InputField from "../../ui/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../ui/Button";
import { Link, useRouter } from "@/i18n/navigation";
import { useLogin } from "@/hooks/useAuthHook";

// Simple validation schema for login (only email)
const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const Login = () => {
  const router = useRouter();
  const { mutate, isPending } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

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

      {/* Submit Button */}
      <Button
        style="primary"
        type="submit"
        loading={isPending}
        disabled={isPending || Object.keys(formik.errors).length > 0}
        css="!bg-[#010C4A] text-white mt-4"
      >
        Continue
      </Button>

      {/* Register link */}
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link href="/register" className="font-bold underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default Login;
