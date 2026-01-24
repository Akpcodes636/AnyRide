"use client";

import { useState } from "react";
import InputField from "../ui/InputField";
import { toast } from "sonner";
import Loader from "../ui/Loader";
import { useTranslations } from "next-intl";

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  partnershipCategory: string;
  message: string;
}

const PartnershipForm = () => {
  const t = useTranslations("partnerFormIntro");

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    partnershipCategory: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { fullName, organizationName, email, message } = formData;

    if (!fullName || !organizationName || !email || !message) {
      toast.error(t("errors.required"));
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error(t("errors.invalidEmail"));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/partnership-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(t("success.submitted"));
        setFormData({
          fullName: "",
          organizationName: "",
          email: "",
          phone: "",
          partnershipCategory: "",
          message: "",
        });
      } else {
        toast.error(data.error || t("errors.submissionFailed"));
      }
    } catch {
      toast.error(t("errors.network"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="container py-12">
        <div className="max-w-[700px] mx-auto bg-white rounded-lg p-8 md:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Full Name */}
            <InputField
              name="fullName"
              label={t("fields.fullName.label")}
              placeholder={t("fields.fullName.placeholder")}
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            {/* Organization Name */}
            <InputField
              name="organizationName"
              label={t("fields.organizationName.label")}
              placeholder={t("fields.organizationName.placeholder")}
              value={formData.organizationName}
              onChange={handleChange}
              required
            />

            {/* Email */}
            <InputField
              name="email"
              label={t("fields.email.label")}
              placeholder={t("fields.email.placeholder")}
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
            />

            {/* Phone */}
            <InputField
              name="phone"
              label={t("fields.phone.label")}
              placeholder={t("fields.phone.placeholder")}
              value={formData.phone}
              onChange={handleChange}
              type="tel"
            />

            {/* Partnership Category */}
            <InputField
              name="partnershipCategory"
              label={t("fields.partnershipCategory.label")}
              placeholder={t("fields.partnershipCategory.placeholder")}
              value={formData.partnershipCategory}
              onChange={handleChange}
            />

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-800">
                {t("fields.message.label")}
              </label>

              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder={t("fields.message.placeholder")}
                className="border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#A10000] text-white font-semibold rounded-full hover:opacity-90 disabled:opacity-60"
            >
              {loading ? <Loader /> : t("buttons.submit")}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default PartnershipForm;
