"use client";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useFormik } from "formik";
import Button from "../../ui/Button";
import { usePhoneCheck } from "@/hooks/useAuthHook";
import { loginValidationSchema } from "@/lib/validations/userValidations";
import { useRouter } from "next/navigation";
import { LoginFormValues } from "@/types";

const Login = () => {
  const router = useRouter();
  const { mutate, isPending } = usePhoneCheck();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      phonenumber: "",
      role: "customer",
    },

    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <label className="font-semibold">Phone Number</label>
      <PhoneInput
        international
        defaultCountry="NG"
        value={formik.values.phonenumber}
        onChange={(value) => formik.setFieldValue("phonenumber", value)}
        onBlur={() => formik.setFieldTouched("phonenumber")}
        className="h-[48px]
        bg-white
        min-w-full
        p-2
        rounded-lg
        border-[#000000]
        px-4
        py-3
        text-[#000000E5]
        border-[3px]
        [&_.PhoneInputInput]:outline-none
        [&_.PhoneInputInput]:shadow-none
        [&_.PhoneInputInput]:border-none
        [&_.PhoneInputInput:focus]:outline-none
        [&_.PhoneInputInput:focus]:shadow-none
        [&_.PhoneInputInput:focus]:ring-0"
          />
      {formik.touched.phonenumber && formik.errors.phonenumber && (
        <p className="text-red-500 text-sm">{formik.errors.phonenumber}</p>
      )}

      {/* Role Selection */}
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="role"
            value="customer"
            checked={formik.values.role === "customer"}
            onChange={formik.handleChange}
          />
          Rider
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="role"
            value="driver"
            checked={formik.values.role === "driver"}
            onChange={formik.handleChange}
          />
          Driver
        </label>
      </div>

      <Button
        style="primary"
        type="submit"
        loading={isPending}
        disabled={isPending}
        css="!bg-[#010C4A] text-white mt-4"
      >
        Continue
      </Button>
    </form>
  );
};

export default Login;
