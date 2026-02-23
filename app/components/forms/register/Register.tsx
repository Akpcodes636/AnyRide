"use client";
import InputField from "../../ui/InputField";
import { useFormik } from "formik";
import Button from "../../ui/Button";
import { useSearchParams } from "next/navigation";
import { useRegister } from "@/hooks/useAuthHook";

const Register = () => {
  const searchParams = useSearchParams();

  const phone = searchParams.get("phone") || "";
  const registrationToken = searchParams.get("token") || "";
  const role = (searchParams.get("role") as "customer" | "driver") || "customer";

  const { mutate, isPending } = useRegister();

  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      pin: "",
    },
    onSubmit: (values) => {
      mutate({
        ...values,
        phonenumber: phone,
        registration_token: registrationToken,
        role,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

      <InputField
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />

      <InputField
        name="firstname"
        label="First name"
        value={formik.values.firstname}
        onChange={formik.handleChange}
      />

      <InputField
        name="lastname"
        label="Last name"
        value={formik.values.lastname}
        onChange={formik.handleChange}
      />

      <InputField
        name="pin"
        label="Create PIN"
        type="password"
        value={formik.values.pin}
        onChange={formik.handleChange}
      />

      <Button
       style="tertiary"
        type="submit"
        loading={isPending}
        css="!bg-[#010C4A] text-white"
      >
        Complete registration
      </Button>
    </form>
  );
};

export default Register;
