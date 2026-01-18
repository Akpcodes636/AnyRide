"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner"; // optional, for notifications
import Loader from "../ui/Loader";
import Button from "../ui/Button";

const PartnerForm = () => {
  const t = useTranslations("FleetPartnersPage.form");

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
    if (!form.name || !form.company || !form.email || !form.message) {
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
      Object.entries(form).forEach(([key, value]) => formData.append(key, value as string));

      // POST to your backend API
      const res = await fetch("/api/partners", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("API hit!");

      console.log("Response:", data);

      if (data.success) {
        toast.success(t("success"));
        setForm({ name: "", company: "", email: "", phone: "", message: "" });
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-center font-semibold mb-8">{t("sectionTitle")}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder={t("name")}
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 border rounded-md"
            required
          />
          <input
            type="text"
            name="company"
            placeholder={t("company")}
            value={form.company}
            onChange={handleChange}
            className="w-full p-4 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t("email")}
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 border rounded-md"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder={t("phone")}
            value={form.phone}
            onChange={handleChange}
            className="w-full p-4 border rounded-md"
          />
          <textarea
            name="message"
            placeholder={t("message")}
            value={form.message}
            onChange={handleChange}
            className="w-full p-4 border rounded-md h-32 resize-none"
            required
          />
          <Button type="submit" style="danger" css="w-full font-semibold rounded-md">
            {loading ? <Loader /> : t("submit")}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default PartnerForm;
