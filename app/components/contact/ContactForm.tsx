"use client";

import { useState } from "react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import Loader from "../ui/Loader";

const ContactForm = () => {
  const t = useTranslations("ContactPage.form");

  // Form state
  const [formData, setFormData] = useState({
    subject: "",
    fullname: "",
    email: "",
    phone: "",
    category: "",
    country: "",
    language: "",
  });
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  // Checkbox state
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [consentMessages, setConsentMessages] = useState(false);

  const [loading, setLoading] = useState(false);

  // Handle input/select changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "message") setMessage(value);
    else setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file attachment
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setAttachment(e.target.files[0]);
    else setAttachment(null);
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🔒 Validation
    if (
      !formData.subject ||
      !formData.fullname ||
      !formData.email ||
      !formData.phone ||
      !message
    ) {
      toast.error(t("errors.required"));
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error(t("errors.invalidEmail"));
      return;
    }

    if (!agreePrivacy || !agreeTerms || !consentMessages) {
      toast.error(t("errors.consentRequired") || "Please agree to Privacy Policy, Terms & Consent");
      return;
    }

    setLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append("subject", formData.subject);
      formPayload.append("fullname", formData.fullname);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone);
      formPayload.append("category", formData.category);
      formPayload.append("country", formData.country);
      formPayload.append("language", formData.language);
      formPayload.append("message", message);

      // Append checkboxes
      formPayload.append("emailUpdates", emailUpdates ? "Yes" : "No");
      formPayload.append("agreePrivacy", agreePrivacy ? "Yes" : "No");
      formPayload.append("agreeTerms", agreeTerms ? "Yes" : "No");
      formPayload.append("consentMessages", consentMessages ? "Yes" : "No");

      if (attachment) formPayload.append("attachment", attachment);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formPayload,
      });

      const data = await res.json();

      if (data.success) {
        toast.success(t("success"));
        setFormData({ subject: "", fullname: "", email: "", phone: "", category: "", country: "", language: "" });
        setMessage("");
        setAttachment(null);
        setEmailUpdates(false);
        setAgreePrivacy(false);
        setAgreeTerms(false);
        setConsentMessages(false);
      } else {
        toast.error(data.error || t("errors.failed"));
      }
    } catch {
      toast.error(t("errors.network"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-value">
      <div className="container py-[32px] md:py-[64px]">
        <h2 className="text-white text-center">{t("title")}</h2>
        <p className="text-[#E6E6EB] text-center text-[16px] md:text-[18px] mb-[48px]">
          {t("description")}
        </p>

        <div className="w-full max-w-[335px] md:max-w-full lg:max-w-[778px] mx-auto">
          <div className="bg-[#F5F5F7] rounded-[12px] p-6 md:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-[24px]">

              {/* Subject, Fullname, Email, Phone */}
              <InputField
                name="subject"
                label={t("fields.subject")}
                placeholder={t("fields.subjectPlaceholder")}
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <InputField
                name="fullname"
                label={t("fields.fullName")}
                placeholder={t("fields.fullNamePlaceholder")}
                value={formData.fullname}
                onChange={handleChange}
                required
              />
              <InputField
                name="email"
                label={t("fields.email")}
                placeholder={t("fields.emailPlaceholder")}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <InputField
                name="phone"
                label={t("fields.phone")}
                placeholder={t("fields.phonePlaceholder")}
                value={formData.phone}
                onChange={handleChange}
                required
              />

              {/* Category, Country, Language */}
              <SelectField
                name="category"
                label={t("fields.category")}
                value={formData.category}
                onChange={handleChange}
                options={[
                  { value: "", label: t("fields.selectCategory") },
                  { value: "payment", label: t("fields.paymentIssue") },
                  { value: "ride", label: t("fields.rideIssue") },
                ]}
              />
              <SelectField
                name="country"
                label={t("fields.country")}
                value={formData.country}
                onChange={handleChange}
                options={[
                  { value: "", label: t("fields.selectCountry") },
                  { value: "US", label: "United States" },
                  { value: "CG", label: "Congo" },
                ]}
              />
              <SelectField
                name="language"
                label={t("fields.responseLanguage")}
                value={formData.language}
                onChange={handleChange}
                options={[
                  { value: "", label: t("fields.selectLanguage") },
                  { value: "en", label: "English" },
                  { value: "fr", label: "Français" },
                  { value: "sw", label: "Kiswahili" },
                ]}
              />

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="label-class">
                  {t("fields.message")} <span className="text-text-negative">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={message}
                  onChange={handleChange}
                  placeholder={t("fields.messagePlaceholder")}
                  className="input-class resize-none !h-[189px] w-full rounded-[8px] bg-white p-2"
                />
              </div>

              {/* Attachment */}
              <div className="flex flex-col gap-2">
                <label className="label-class">{t("fields.attachment")}</label>
                <label className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-400 text-xl bg-white hover:bg-gray-50">
                  +
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={emailUpdates}
                    onChange={(e) => setEmailUpdates(e.target.checked)}
                    className="accent-red-600"
                  />
                  {t("fields.emailUpdates")}
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    className="accent-red-600"
                  />
                  {t("fields.emailConsent")}
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="accent-red-600"
                  />
                  {t("fields.termsConsent")}
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={consentMessages}
                    onChange={(e) => setConsentMessages(e.target.checked)}
                    className="accent-red-600"
                  />
                  {t("fields.smsConsent")}
                </label>

                {/* Disclaimer */}
                <p className="text-gray-600 text-xs mt-2">
                  {t("fields.disclaimer")}
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full rounded-full bg-[#A10000] py-3 text-white font-semibold hover:opacity-90 disabled:opacity-60"
              >
                {loading ? <Loader /> : t("submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
