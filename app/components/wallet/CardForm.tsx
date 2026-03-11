"use client";

import { formatCardNumber, formatExpiry, validate } from "@/app/utils/helper";
import { FormState } from "@/types";
import { useState, ChangeEvent, FormEvent, FocusEvent } from "react";

type FormField = keyof FormState;

type FormErrors = Partial<Record<FormField, string>>;

// ─── Icons ───────────────────────────────────────────────────────────────────

function MastercardIcon() {
  return (
    <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
      <circle cx="14" cy="12" r="8" fill="#EB001B" />
      <circle cx="24" cy="12" r="8" fill="#F79E1B" />
      <path
        d="M19 6.4C20.9 7.8 22.1 10 22.1 12s-1.2 4.2-3.1 5.6C17.1 16.2 15.9 14 15.9 12s1.2-4.2 3.1-5.6z"
        fill="#FF5F00"
      />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  ) : (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

// ─── Component ───────────────────────────────────────────────────────────────

export default function CardForm() {
  const [form, setForm] = useState<FormState>({
    cardNumber: "4412 8272 7262 9721",
    expiry: "07/27",
    cvv: "",
    accountName: "Saleem Ammar",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showCvv, setShowCvv] = useState<boolean>(false);
  const [focused, setFocused] = useState<FormField | null>("cvv");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    const field = name as FormField;
    let formatted = value;
    if (field === "cardNumber") formatted = formatCardNumber(value);
    if (field === "expiry") formatted = formatExpiry(value);
    if (field === "cvv") formatted = value.replace(/\D/g, "").substring(0, 4);
    setForm((prev) => ({ ...prev, [field]: formatted }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleFocus(e: FocusEvent<HTMLInputElement>): void {
    setFocused(e.target.name as FormField);
  }

  function handleBlur(): void {
    setFocused(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  function inputClass(field: FormField): string {
    const base =
      "w-full rounded-2xl px-4 py-3.5 bg-white text-slate-800 text-sm font-medium placeholder-slate-400 border-2 transition-all duration-200 outline-none rounded-[8px]";
    if (errors[field]) return `${base} border-red-300 bg-red-50`;
    if (focused === field) return `${base} border-blue-400 bg-white`;
    return `${base} border-transparent bg-slate-100`;
  }

  return (
    <div className="min-h-screen  flex items-center flex-col justify-center pt-[100px] container mx-auto">
      <div className="">
        <h2 className="text-center">Add debit/credit card</h2>
        <p className="mb-[16px] text-[#545454] text-[18px] leading-[160%] tracking-[-2%] text-center">
          Add your bank credit/debit card to pay with{" "}
        </p>
        <div className="bg-[#F5F5F7] rounded-[12px] w-full max-w-[618px] p-4">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Card Number */}
            <div>
              <label className="block text-[16px] font-medium text-[#686C75] mb-1.5 ml-1">
                Card number
              </label>
              <div className="relative">
                <input
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="0000 0000 0000 0000"
                  className={`${inputClass("cardNumber")} pr-14 tracking-wider`}
                  inputMode="numeric"
                  autoComplete="cc-number"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <MastercardIcon />
                </span>
              </div>
              {errors.cardNumber && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.cardNumber}
                </p>
              )}
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[16px] font-medium text-[#686C75] mb-1.5 ml-1">
                  Expiry date
                </label>
                <input
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="MM/YY"
                  className={inputClass("expiry")}
                  inputMode="numeric"
                  autoComplete="cc-exp"
                />
                {errors.expiry && (
                  <p className="text-xs text-red-500 mt-1 ml-1">
                    {errors.expiry}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[16px] font-medium text-[#686C75] mb-1.5 ml-1">
                  CVV
                </label>
                <div className="relative">
                  <input
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    type={showCvv ? "text" : "password"}
                    placeholder="•••"
                    className={`${inputClass("cvv")} pr-9`}
                    inputMode="numeric"
                    autoComplete="cc-csc"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCvv((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label={showCvv ? "Hide CVV" : "Show CVV"}
                  >
                    <EyeIcon open={showCvv} />
                  </button>
                </div>
                {errors.cvv && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            {/* Account Name */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">
                Account name
              </label>
              <input
                name="accountName"
                value={form.accountName}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Full name"
                className={inputClass("accountName")}
                autoComplete="cc-name"
              />
              {errors.accountName && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.accountName}
                </p>
              )}
            </div>

            {/* Submit */}
          </form>
        </div>
        <button
          type="submit"
          disabled={loading || submitted}
          className={`w-full max-w-[618px] mt-[32px] font-semibold text-sm rounded-2xl py-4 transition-all duration-200 active:scale-95 focus:outline-none
              ${submitted ? "bg-green-600 text-white" : loading ? "bg-slate-700 text-white cursor-wait" : "bg-slate-900 hover:bg-slate-700 text-white"}`}
        >
          {submitted ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Card added!
            </span>
          ) : loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Adding card…
            </span>
          ) : (
            "Add card"
          )}
        </button>
      </div>
    </div>
  );
}
