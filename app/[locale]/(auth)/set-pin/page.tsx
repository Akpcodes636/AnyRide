"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, FieldProps } from "formik";
import PinForm from "@/app/components/forms/auth/PinForm";
import Button from "@/app/components/ui/Button";
import { useSetPin } from "@/hooks/useAuthHook";
import { pinValidationSchema } from "@/lib/validations/userValidations";

type Step = "create" | "confirm" | "success";

interface PinFormValues {
  pin: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      error?: string;
    };
  };
}

function isErrorWithResponse(error: unknown): error is ErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as ErrorResponse).response?.data?.error === "string"
  );
}

export default function SetPinPage() {
  const router = useRouter();
  const { mutate: submitPin, isPending } = useSetPin();

  const [step, setStep] = useState<Step>("create");
  const [firstPin, setFirstPin] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);

  // ================= SUCCESS SCREEN =================
  if (step === "success") {
    return (
      <section className="h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>

          <h2 className="text-[20px] md:text-[48px] font-bold mb-4">
            PIN created successfully
          </h2>

          <p className="text-[#02093A] mb-8">Your PIN is now active.</p>

          <Button
            style="primary"
            css="w-full !bg-[#010C4A] text-white"
            type="button"
            fn={() => router.push("/request-ride")}
          >
            Continue
          </Button>
        </div>
      </section>
    );
  }

  // ================= FORM =================
  const initialValues: PinFormValues = { pin: "" };

  return (
    <section className="h-screen flex items-start justify-center px-4 pt-20">
      <div className="container mx-auto max-w-md">
        <h2 className="text-center font-bold text-2xl mb-2">
          {step === "create" ? "Set PIN" : "Confirm PIN"}
        </h2>

        <p className="text-[#545454] text-center mb-8">
          {step === "create"
            ? "Set a quick 4-digit PIN for faster, secure access to your app."
            : "Re-enter your PIN to confirm."}
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={pinValidationSchema}
          enableReinitialize
          onSubmit={(values, actions) => {
            const { pin } = values;

            // CLEAR OLD ERROR
            setServerError(null);

            // ================= STEP 1: CREATE =================
            if (step === "create") {
              setFirstPin(pin);
              setStep("confirm");

              // Reset form to prevent auto re-submit loop
              actions.resetForm();
              return;
            }

            // ================= STEP 2: CONFIRM =================
            if (pin !== firstPin) {
              setServerError("PINs do not match. Try again.");
              return;
            }

            submitPin(
              { pin },
              {
                onSuccess: () => {
                  actions.resetForm();
                  setStep("success");
                },
                onError: (err: unknown) => {
                  if (isErrorWithResponse(err)) {
                    setServerError(
                      err.response?.data?.error || "Failed to set PIN"
                    );
                  } else if (err instanceof Error) {
                    setServerError(err.message);
                  } else {
                    setServerError("Failed to set PIN");
                  }
                },
              }
            );
          }}
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              <Field name="pin">
                {({ field, form }: FieldProps<string>) => (
                  <PinForm
                    value={field.value}
                    onChange={(value) =>
                      form.setFieldValue("pin", value)
                    }
                    onComplete={() => {
                      // Only auto-submit when 4 digits entered
                      if (field.value.length === 4) {
                        form.handleSubmit();
                      }
                    }}
                    isLoading={isSubmitting || isPending}
                    error={serverError}
                    buttonText={
                      step === "create" ? "Continue" : "Confirm PIN"
                    }
                  />
                )}
              </Field>

              {step === "confirm" && (
                <button
                  type="button"
                  onClick={() => {
                    setStep("create");
                    setServerError(null);
                    setFirstPin("");
                    resetForm();
                  }}
                  className="w-full text-center mt-4 text-sm text-gray-500 underline"
                >
                  Back to Set PIN
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
