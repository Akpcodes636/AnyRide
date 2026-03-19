// "use client";
// import { useState } from "react";
// import { useFormik } from "formik";
// import { useSearchParams, useRouter } from "next/navigation";
// import Button from "@/app/components/ui/Button";
// import PinForm from "@/app/components/forms/auth/PinForm";
// import InputField from "@/app/components/ui/InputField";
// import {
//   useVerifyPin,
//   useSendForgotPinOtp,
//   useResetPin,
// } from "@/hooks/useAuthHook";
// import { useAuth } from "@/providers/AuthProvider";
// import { toast } from "sonner";

// export default function OTPLoginPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { login } = useAuth();
//   const phones = searchParams.get("phone");

//   // Phone number should come from previous flow or be passed via state/prop
//   const [phone, setPhone] = useState("+2348012345678"); // Example placeholder
//   const [showForgotPin, setShowForgotPin] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);

//   const { mutate: verifyPin, isPending: isVerifying } = useVerifyPin();
//   const { mutate: sendOtp, isPending: isSendingOtp } = useSendForgotPinOtp();
//   const { mutate: resetPin, isPending: isResetting } = useResetPin();

//   // ----- Verify PIN Form -----
//   const pinFormik = useFormik({
//     initialValues: { pin: "" },
//     onSubmit: (values) => {
//       if (!phones) {
//         alert("Phone number missing. Please login again.");
//         router.push("/login");
//         return;
//       }
//       verifyPin(
//         { phonenumber: phones, pin: values.pin },
//         {
//           onSuccess: async (data) => {
//             if (data.status === "success" && data.data) {
//               // Call login to store tokens + user profile
//               await login(data.data.access_token, data.data.refresh_token);
//               // Redirect to Start Riding page
//               router.push("/start-riding");
//             }
//           },
//         },
//       );
//     },
//   });

//   // ----- Forgot PIN Form -----
//   const forgotPinFormik = useFormik({
//     initialValues: { otp: "", newPin: "" },
//     onSubmit: (values) => {
//       resetPin(
//         { phonenumber: phone, otp_code: values.otp, new_pin: values.newPin },
//         {
//           onSuccess: async (data) => {
//             if (data.status === "success" && data.data) {
//               await login(data.data.access_token, data.data.refresh_token);
//               router.push("/start-riding");
//             }
//           },
//         },
//       );
//     },
//   });

//   return (
//     <div className="flex flex-col gap-6 max-w-md mx-auto mt-24 p-4">
//       <h2 className="text-2xl font-semibold text-center">Verify Your PIN</h2>

//       {/* ----- PIN Form ----- */}
//       {!showForgotPin && (
//         <form onSubmit={pinFormik.handleSubmit} className="flex flex-col gap-4">
//           <PinForm
//             value={pinFormik.values.pin}
//             onChange={(val) => pinFormik.setFieldValue("pin", val)}
//           />

//           <Button type="submit" style="primary" loading={isVerifying}>
//             Verify PIN
//           </Button>

//           <button
//             type="button"
//             className="text-sm mt-2 text-blue-600"
//             onClick={() => setShowForgotPin(true)}
//           >
//             Forgot PIN?
//           </button>
//         </form>
//       )}

//       {/* ----- Forgot PIN Flow ----- */}
//       {showForgotPin && (
//         <form
//           onSubmit={forgotPinFormik.handleSubmit}
//           className="flex flex-col gap-4"
//         >
//           {!forgotPinFormik.values.otp && (
//            <Button
//   type="button"
//   style="primary"
//   loading={isSendingOtp}
//   fn={() =>
//     sendOtp(
//       { phonenumber: phone, forgot_pin: true },
//       {
//         onSuccess: () => {
//           toast("OTP sent!");
//           setOtpSent(true);
//         },
//       },
//     )
//   }
// >
//   Send OTP
// </Button>
//           )}

//           {forgotPinFormik.values.otp !== "" && (
//             <>
//               <PinForm
//                 value={forgotPinFormik.values.newPin}
//                 onChange={(val) => forgotPinFormik.setFieldValue("newPin", val)}
//               />
//               <InputField
//                 name="otp"
//                 label="Enter OTP"
//                 value={forgotPinFormik.values.otp}
//                 onChange={forgotPinFormik.handleChange}
//               />
//               <Button type="submit" style="primary" loading={isResetting}>
//                 Reset PIN
//               </Button>
//             </>
//           )}
//         </form>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useSearchParams, useRouter } from "next/navigation";

import Button from "@/app/components/ui/Button";
import PinForm from "@/app/components/forms/auth/PinForm";

import {
  useVerifyPin,
  useSendForgotPinOtp,
  useResetPin,
} from "@/hooks/useAuthHook";

import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";

export default function OTPLoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  const phone = searchParams.get("phone") || "";

  const [showForgotPin, setShowForgotPin] = useState(false);
  const [step, setStep] = useState<"sendOtp" | "enterOtp" | "resetPin">(
    "sendOtp"
  );

  const { mutate: verifyPin, isPending: isVerifying } = useVerifyPin();
  const { mutate: sendOtp, isPending: isSendingOtp } = useSendForgotPinOtp();
  const { mutate: resetPin, isPending: isResetting } = useResetPin();

  /* -------------------------------- */
  /* VERIFY PIN */
  /* -------------------------------- */

  const pinFormik = useFormik({
    initialValues: { pin: "" },
    onSubmit: (values) => {
      verifyPin(
        { phonenumber: phone, pin: values.pin },
        {
          onSuccess: async (data) => {
            if (data.status === "success" && data.data) {
              await login(data.data.access_token, data.data.refresh_token);
              router.push("/start-riding");
            }
          },
        }
      );
    },
  });

  /* -------------------------------- */
  /* FORGOT PIN FORM */
  /* -------------------------------- */

  const forgotPinFormik = useFormik({
    initialValues: {
      otp: "",
      newPin: "",
    },

    onSubmit: (values) => {
      resetPin(
        {
          phonenumber: phone,
          otp_code: values.otp,
          new_pin: values.newPin,
        },
        {
          onSuccess: async (data) => {
            if (data.status === "success" && data.data) {
              await login(data.data.access_token, data.data.refresh_token);
              router.push("/start-riding");
            }
          },
        }
      );
    },
  });

  /* -------------------------------- */
  /* SEND OTP */
  /* -------------------------------- */

  const handleSendOtp = () => {
    sendOtp(
      { phonenumber: phone, forgot_pin: true },
      {
        onSuccess: () => {
          toast.success("OTP sent");
          setStep("enterOtp");
        },
      }
    );
  };

  /* -------------------------------- */
  /* VERIFY OTP STEP */
  /* -------------------------------- */

  const handleOtpNext = () => {
    if (!forgotPinFormik.values.otp) {
      toast.error("Enter OTP");
      return;
    }

    setStep("resetPin");
  };

  /* -------------------------------- */
  /* UI */
  /* -------------------------------- */

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto mt-24 p-4">
      <h2 className="text-2xl font-semibold text-center">
        {!showForgotPin ? "Verify Your PIN" : "Forgot PIN"}
      </h2>

      {/* ----------------------------- */}
      {/* VERIFY PIN */}
      {/* ----------------------------- */}

      {!showForgotPin && (
        <form onSubmit={pinFormik.handleSubmit} className="flex flex-col gap-4">
          <PinForm
            value={pinFormik.values.pin}
            onChange={(val) => pinFormik.setFieldValue("pin", val)}
          />

          <Button type="submit" style="primary" loading={isVerifying}>
            Verify PIN
          </Button>

          <button
            type="button"
            className="text-sm text-blue-600"
            onClick={() => setShowForgotPin(true)}
          >
            Forgot PIN?
          </button>
        </form>
      )}

      {/* ----------------------------- */}
      {/* FORGOT PIN FLOW */}
      {/* ----------------------------- */}

      {showForgotPin && (
        <form
          onSubmit={forgotPinFormik.handleSubmit}
          className="flex flex-col gap-4"
        >
          {/* STEP 1 — SEND OTP */}

          {step === "sendOtp" && (
            <Button
              type="button"
              style="primary"
              loading={isSendingOtp}
              fn={handleSendOtp}
            >
              Send OTP
            </Button>
          )}

          {/* STEP 2 — ENTER OTP */}

          {step === "enterOtp" && (
            <>
              <label className="text-[16px] text-[#02093A] font-normal">
                Enter OTP
              </label>

              <PinForm
                value={forgotPinFormik.values.otp}
                onChange={(val) =>
                  forgotPinFormik.setFieldValue("otp", val)
                }
              />

              <Button type="button" style="primary" fn={handleOtpNext}>
                Continue
              </Button>
            </>
          )}

          {/* STEP 3 — RESET PIN */}

          {step === "resetPin" && (
            <>
              <label className="text-[16px] text-[#02093A] font-normal">
                Reset PIN
              </label>

              <PinForm
                value={forgotPinFormik.values.newPin}
                onChange={(val) =>
                  forgotPinFormik.setFieldValue("newPin", val)
                }
              />

              <Button
                type="submit"
                style="primary"
                loading={isResetting}
                disabled={!forgotPinFormik.values.newPin}
              >
                Reset PIN
              </Button>
            </>
          )}

          <button
            type="button"
            className="text-sm text-gray-500"
            onClick={() => {
              setShowForgotPin(false);
              setStep("sendOtp");
            }}
          >
            Back to Login
          </button>
        </form>
      )}
    </div>
  );
}