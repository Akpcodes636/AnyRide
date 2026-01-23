"use client";

import { useState } from "react";
import InputField from "../ui/InputField";
import { toast } from "sonner";
import Loader from "../ui/Loader";

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  partnershipCategory: string;
  message: string;
}

const PartnershipForm = () => {
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
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
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
        toast.success("Form submitted successfully!");
        setFormData({
          fullName: "",
          organizationName: "",
          email: "",
          phone: "",
          partnershipCategory: "",
          message: "",
        });
      } else {
        toast.error(data.error || "Submission failed.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <div className="container py-12">
        <div className="max-w-[700px] mx-auto bg-white rounded-lg p-8 md:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Full Name */}
            <InputField
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            {/* Organization Name */}
            <InputField
              name="organizationName"
              label="Organization Name"
              placeholder="Enter your organization name"
              value={formData.organizationName}
              onChange={handleChange}
              required
            />

            {/* Email */}
            <InputField
              name="email"
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
            />

            {/* Phone */}
            <InputField
              name="phone"
              label="Phone Number (Optional)"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
            />

            {/* Partnership Category */}
            <InputField
              name="partnershipCategory"
              label="Partnership Category"
              placeholder="Specify partnership category"
              value={formData.partnershipCategory}
              onChange={handleChange}
            />

            {/* Message / Proposal Details */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-800">
                Message / Proposal Details*
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Provide your message or proposal details"
                className="border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#A10000] text-white font-semibold rounded-full hover:opacity-90 disabled:opacity-60"
            >
              {loading ? <Loader /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PartnershipForm;
