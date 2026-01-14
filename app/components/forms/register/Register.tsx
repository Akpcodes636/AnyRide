"use client";
import { registerValidationSchema } from "@/validation/userValidation";
import InputField from "../../ui/InputField";
import { useFormik } from "formik";
import { ILogin } from "@/types";
import Button from "../../ui/Button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { FaApple } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const goToEmailVerification = () => {
    router.push("/check-email");
  }
  const formik = useFormik<ILogin>({
    initialValues: {
      email: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      const { email } = values;
      //   mutate({ email, password });
    },
  });
  return (
    <>
      <form>
        <InputField
          name="email"
          label=""
          css="focus:border-[#A20602]! max-w-full  lg:max-w-full"
          //   label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null
          }
        />

        <div className="mt-[24px]">
          <div className="flex items-center justify-center gap-4 w-full max-w-full lg:max-w-full">
            <div className="h-[2px] w-full bg-[#E6E6E6]"></div>
            <div>Or</div>
            <div className="h-[2px] w-full bg-[#E6E6E6]"></div>
          </div>

          <Button
            css="mt-4 w-full rounded-[12px]! h-[48px]! max-w-full lg:max-w-full text-[#8A8C91]"
            style="reverse"
            type="button"
            //   fn={handleGoogle}
            //   disabled={isPending}
          >
            <div className="flex items-center gap-2">
              <FcGoogle size={24} />
              <span>Sign up with Google</span>
            </div>
          </Button>

          <Button
            css="mt-[16px] w-full rounded-[12px]! h-[48px]! max-w-full lg:max-w-full text-[#8A8C91]"
            style="reverse"
            type="button"
            //   fn={handleGoogle}
            //   disabled={isPending}
          >
            <div className="flex items-center gap-2">
              <FaApple size={24} color="black" />
              <span>Sign up with Apple</span>
            </div>
          </Button>

          {/* <div className="mt-8">
            <p className="text-center">
              Already have an account ?{" "}
              <Link
                href="/login"
                className="font-bold text-text-strong underline underline-offset-2"
              >
                Login
              </Link>{" "}
            </p>
          </div> */}
          <div className="pt-[80px] pb-[32px]">
          <Button style="tertiary" css="!rounded-[12px] w-full max-w-full lg:max-w-full h-[57px] text-[18px] tracking-[-2%] text-center leading-[160%]" type="button" fn={goToEmailVerification}>
            Continue
          </Button>
          </div>
          
          <p><span className="text-[#545454] text-center text-[16px] font-normal leading-[140%]">By clicking “Continue”, you&apos;re accepting with out</span> <Link href="/terms">Terms & Condition
          </Link> and <Link href="/privacy">Privacy policy</Link> </p>
        </div>
      </form>
    </>
  );
};

export default Register;
