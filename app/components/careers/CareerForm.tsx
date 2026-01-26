"use client";

import { useState } from "react";
import { toast } from "sonner";
import Loader from "../ui/Loader";
import Button from "../ui/Button";
import { useTranslations } from "next-intl";

const PartnerForm = () => {
  const t = useTranslations("CareersPage.form");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    expertise: "",
    experience: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.expertise || !form.message) {
      toast.error(t("errors.required"));
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error(t("errors.invalidEmail"));
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      const res = await fetch("/api/career", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success(t("success"));
        setForm({
          fullName: "",
          email: "",
          phone: "",
          expertise: "",
          experience: "",
          message: "",
        });
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
    <section className="py-10">
      <div className="container mx-auto rounded-[8px] p-10 max-w-2xl bg-[#F5F5F7]">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              {t("labels.fullName")} <span className="text-red-500">{t("required")}</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder={t("placeholders.fullName")}
              value={form.fullName}
              onChange={handleChange}
              className="w-full p-4 border rounded-md bg-[#FFFFFF]"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              {t("labels.email")} <span className="text-red-500">{t("required")}</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder={t("placeholders.email")}
              value={form.email}
              onChange={handleChange}
              className="w-full p-4 border rounded-md bg-[#FFFFFF]"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              {t("labels.phone")}
            </label>
            <input
              type="text"
              name="phone"
              placeholder={t("placeholders.phone")}
              value={form.phone}
              onChange={handleChange}
              className="w-full p-4 border rounded-md bg-[#FFFFFF]"
            />
          </div>

          {/* Expertise */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              {t("labels.expertise")}{" "}
              <span className="text-red-500">{t("required")}</span>
            </label>
            <input
              type="text"
              name="expertise"
              placeholder={t("placeholders.expertise")}
              value={form.expertise}
              onChange={handleChange}
              className="w-full p-4 border rounded-md bg-[#FFFFFF]"
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              {t("labels.experience")}
            </label>
            <input
              type="text"
              name="experience"
              placeholder={t("placeholders.experience")}
              value={form.experience}
              onChange={handleChange}
              className="w-full p-4 border rounded-md bg-[#FFFFFF]"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              {t("labels.message")} <span className="text-red-500">{t("required")}</span>
            </label>
            <textarea
              name="message"
              placeholder={t("placeholders.message")}
              value={form.message}
              onChange={handleChange}
              className="w-full p-4 border rounded-md h-32 resize-none bg-[#FFFFFF]"
              required
            />
          </div>

          <Button
            type="submit"
            style="danger"
            css="w-full font-semibold rounded-md"
          >
            {loading ? <Loader /> : t("submit")}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default PartnerForm;
