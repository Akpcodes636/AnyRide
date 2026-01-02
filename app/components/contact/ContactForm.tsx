// "use client";
// import { useState } from "react";
// import InputField from "../ui/InputField";
// import SelectField from "../ui/SelectField";
// import { useTranslations } from "next-intl";

// const ContactForm = () => {
//   const t = useTranslations("ContactPage.form");
//   const [formData, setFormData] = useState({
//     subject: "",
//     fullname: "",
//     email: "",
//     phone: "",
//     category: "",
//     country: "",
//     language: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <section className="bg-value">
//       <div className="container py-[32px] md:py-[64px]">
//         <div className="">
//           <h2 className="text-white text-center">{t("title")}</h2>
//           <p className="text-[#E6E6EB] text-center text-[16px] md:text-[18px] mb-[48px]">
//             {t("description")}
//           </p>

//           <div className="w-full max-w-[335px] md:max-w-full lg:max-w-[778px] mx-auto rounded-[8px]">
//             <div className="bg-[#F5F5F7] rounded-[12px] p-6 md:p-10">
//               <form className="flex gap-y-[24px] flex-col">
//                 <InputField
//                   name="subject"
//                   label={t("fields.subject")}
//                   placeholder={t("fields.subjectPlaceholder")}
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                 />

//                 <InputField
//                   name="fullname"
//                   label={t("fields.fullName")}
//                   placeholder={t("fields.fullNamePlaceholder")}
//                   value={formData.fullname}
//                   onChange={handleChange}
//                   required
//                 />

//                 <InputField
//                   name="email"
//                   label={t("fields.email")}
//                   placeholder={t("fields.emailPlaceholder")}
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />

//                 <InputField
//                   name="phone"
//                   label={t("fields.phone")}
//                   placeholder={t("fields.phonePlaceholder")}
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />

//                 <SelectField
//                   name="category"
//                   label={t("fields.category")}
//                   value={formData.category}
//                   onChange={handleChange}
//                   options={[
//                     { value: "", label: t("fields.selectCategory") },
//                     { value: "payment", label: t("fields.paymentIssue") },
//                     { value: "ride", label: t("fields.rideIssue") },
//                   ]}
//                 />

//                 <SelectField
//                   name="country"
//                   label={t("fields.country")}
//                   value={formData.country}
//                   onChange={handleChange}
//                   options={[
//                     { value: "", label: t("fields.selectCountry") },
//                     { value: "ng", label: "Nigeria" },
//                     { value: "gh", label: "Ghana" },
//                   ]}
//                 />

//                 <SelectField
//                   name="language"
//                   label={t("fields.responseLanguage")}
//                   value={formData.language}
//                   onChange={handleChange}
//                   options={[
//                     { value: "", label: t("fields.selectLanguage") },
//                     { value: "en", label: "English" },
//                     { value: "fr", label: "Français" },
//                     { value: "sw", label: "Kiswahili" },
//                   ]}
//                 />

//                 {/* Message */}
//                 <div className="flex flex-col gap-2">
//                   <label className="label-class">
//                     {t("fields.message")} <span className="text-text-negative">*</span>
//                   </label>
//                   <textarea
//                     rows={4}
//                     placeholder={t("fields.messagePlaceholder")}
//                     className="input-class resize-none h-[189px] w-full rounded-[8px] bg-white p-2"
//                   />
//                   <p className="text-right text-xs text-gray-500">0/1000</p>
//                 </div>

//                 {/* Attachment */}
//                 <div className="flex flex-col gap-2">
//                   <label className="label-class">{t("fields.attachment")}</label>
//                   <div className="flex h-12 w-12 items-center justify-center rounded-md border border-dashed border-gray-400 text-xl">
//                     +
//                   </div>
//                 </div>

//                 {/* Checkbox */}
//                 <label className="flex items-center gap-2 text-sm">
//                   <input type="checkbox" className="accent-red-600" />
//                   {t("fields.emailUpdates")}
//                 </label>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   className="mt-4 w-full rounded-full bg-[#A10000] py-3 text-white font-semibold hover:opacity-90"
//                 >
//                   {t("submit")}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactForm;

"use client";

import { useState } from "react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import Loader from "../ui/Loader";

const WEB3FORMS_KEY = "86a1d540-923d-4744-b150-1476ff023238";

const ContactForm = () => {
  const t = useTranslations("ContactPage.form");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    subject: "",
    fullname: "",
    email: "",
    phone: "",
    category: "",
    country: "",
    language: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "message") {
      setMessage(value);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    } else {
      setAttachment(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🔒 Validation (all required except attachment)
    if (!formData.subject || !formData.fullname || !formData.email || !formData.phone || !message) {
      toast.error(t("form.errors.required"));
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error(t("form.errors.invalidEmail"));
      return;
    }

    setLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append("access_key", WEB3FORMS_KEY);
      formPayload.append("subject", formData.subject);
      formPayload.append("name", formData.fullname);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone);
      formPayload.append("category", formData.category);
      formPayload.append("country", formData.country);
      formPayload.append("language", formData.language);
      formPayload.append("message", message);

      // Only append attachment if user selected one
      if (attachment) {
        formPayload.append("attachment", attachment);
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const data = await res.json();

      if (data.success) {
        toast.success(t("form.success"));
        setFormData({
          subject: "",
          fullname: "",
          email: "",
          phone: "",
          category: "",
          country: "",
          language: "",
        });
        setMessage("");
        setAttachment(null);
      } else {
        toast.error(t("form.errors.failed"));
      }
    } catch {
      toast.error(t("form.errors.network"));
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
            <form
              onSubmit={handleSubmit}
              className="flex gap-y-[24px] flex-col"
            >
              {/* All existing InputFields */}
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
                  { value: "ng", label: "Nigeria" },
                  { value: "gh", label: "Ghana" },
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
                  className="input-class resize-none h-[189px] w-full rounded-[8px] bg-white p-2"
                />
              </div>

              {/* Optional Attachment Box */}
              <div className="flex flex-col gap-2">
                <label className="label-class">{t("fields.attachment")}</label>
                <label className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-400 text-xl bg-white hover:bg-gray-50">
                  +
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-red-600" />
                {t("fields.emailUpdates")}
              </label>

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
