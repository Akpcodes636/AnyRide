"use client";

import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import InputField from "@/app/components/ui/InputField";
import Button from "@/app/components/ui/Button";
import { toast } from "sonner";
import { useRegisterUser } from "@/hooks/useAuthHook";

interface FormValues {
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
  pin: string;
}

export default function CreateAccountPage() {
  const router = useRouter();
  const params = useSearchParams();

  const role = (params.get("role") as "customer" | "driver") || "customer";
  const token = params.get("token");

  const { mutate, isPending } = useRegisterUser();

  const formik = useFormik<FormValues>({
    initialValues: {
      firstname: "",
      lastname: "",
      gender: "",
      email: "",
      pin: "",
    },

    onSubmit: (values) => {
      if (!token) {
        toast.error("Invalid registration session.");
        return;
      }

      mutate(
        {
          registration_token: token,
          firstname: values.firstname,
          lastname: values.lastname,
          gender: values.gender,
          email: values.email || undefined,
          pin: values.pin,
          role,
        },
        {
          onSuccess: (data) => {
            toast.success("Account created successfully!");

            // save tokens
            localStorage.setItem("access_token", data.data.access_token);
            localStorage.setItem("refresh_token", data.data.refresh_token);

            router.push("/");
          },

          onError: () => {
            toast.error("Registration failed. Please try again.");
          },
        },
      );
    },
  });

  return (
    <div className="max-w-full mx-auto p-4 flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-center">
        Create your account
      </h2>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <InputField
          name="firstname"
          label="First Name"
          value={formik.values.firstname}
          onChange={formik.handleChange}
        />

        <InputField
          name="lastname"
          label="Last Name"
          value={formik.values.lastname}
          onChange={formik.handleChange}
        />

        <select
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <InputField
          name="email"
          label="Email (Optional)"
          value={formik.values.email}
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
          type="submit"
          style="tertiary"
          loading={isPending}
          css="!bg-[#010C4A] text-white"
        >
          Create Account
        </Button>
      </form>
    </div>
  );
}
