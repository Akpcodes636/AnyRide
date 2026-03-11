import { FormState } from "@/types";
type FormField = keyof FormState;

type FormErrors = Partial<Record<FormField, string>>;


export const maskEmail = (email: string) => {
  return email.replace(/(.{2}).+(@.+)/, "$1******$2");
};


export function formatCardNumber(value: string): string {
  return value.replace(/\D/g, "").substring(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

export function formatExpiry(value: string): string {
  const d = value.replace(/\D/g, "").substring(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

export function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (form.cardNumber.replace(/\s/g, "").length < 16) errors.cardNumber = "Enter a valid 16-digit card number";
  if (!/^\d{2}\/\d{2}$/.test(form.expiry)) errors.expiry = "Use MM/YY format";
  if (form.cvv.length < 3) errors.cvv = "CVV must be 3–4 digits";
  if (!form.accountName.trim()) errors.accountName = "Name is required";
  return errors;
}

