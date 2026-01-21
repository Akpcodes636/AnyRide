// "use client";

// import { useState } from "react";
// import InputField from "../ui/InputField";
// import { toast } from "sonner";
// import Loader from "../ui/Loader";
// import { useTranslations } from "next-intl";

// const FleetContactForm = () => {
//   const t = useTranslations("ContactPage.form");

//   const [formData, setFormData] = useState({
//     fullName: "",
//     fleetName: "",
//     email: "",
//     phone: "",
//     vehicleCount: "",
//     operatingArea: "",
//   });

//   const [message, setMessage] = useState("");
//   const [emailUpdates, setEmailUpdates] = useState(false);
//   const [agreePrivacy, setAgreePrivacy] = useState(false);
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [consentMessages, setConsentMessages] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     if (name === "message") setMessage(value);
//     else setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (
//       !formData.fullName ||
//       !formData.fleetName ||
//       !formData.email ||
//       !formData.phone ||
//       !formData.vehicleCount ||
//       !formData.operatingArea ||
//       !message
//     ) {
//       toast.error(t("errorsRequired"));
//       return;
//     }

//     if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       toast.error(t("errorsInvalidEmail"));
//       return;
//     }

//     if (!agreePrivacy || !agreeTerms || !consentMessages) {
//       toast.error(t("errorsConsentRequired"));
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("/api/fleet-contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           message,
//           emailUpdates,
//           agreePrivacy,
//           agreeTerms,
//           consentMessages,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         toast.success(t("success"));
//         setFormData({
//           fullName: "",
//           fleetName: "",
//           email: "",
//           phone: "",
//           vehicleCount: "",
//           operatingArea: "",
//         });
//         setMessage("");
//         setEmailUpdates(false);
//         setAgreePrivacy(false);
//         setAgreeTerms(false);
//         setConsentMessages(false);
//       } else {
//         toast.error(data.error || t("errorsFailed"));
//       }
//     } catch {
//       toast.error(t("errorsNetwork"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="bg-value">
//       <div className="container py-[32px] md:py-[64px]">
//         <div className="max-w-[778px] mx-auto bg-[#F5F5F7] rounded-[12px] p-6 md:p-10">
//           <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//             <InputField
//               name="fullName"
//               label={t("fullNameLabel")}
//               placeholder={t("fullNamePlaceholder")}
//               value={formData.fullName}
//               onChange={handleChange}
//               required
//             />
//             <InputField
//               name="fleetName"
//               label={t("fleetNameLabel")}
//               placeholder={t("fleetNamePlaceholder")}
//               value={formData.fleetName}
//               onChange={handleChange}
//               required
//             />
//             <InputField
//               name="email"
//               label={t("emailLabel")}
//               placeholder={t("emailPlaceholder")}
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <InputField
//               name="phone"
//               label={t("phoneLabel")}
//               placeholder={t("phonePlaceholder")}
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//             <InputField
//               name="vehicleCount"
//               label={t("vehicleCountLabel")}
//               placeholder={t("vehicleCountPlaceholder")}
//               value={formData.vehicleCount}
//               onChange={handleChange}
//               required
//             />
//             <InputField
//               name="operatingArea"
//               label={t("operatingAreaLabel")}
//               placeholder={t("operatingAreaPlaceholder")}
//               value={formData.operatingArea}
//               onChange={handleChange}
//               required
//             />

//             <div className="flex flex-col gap-2">
//               <label className="label-class">
//                 {t("messageLabel")} <span className="text-text-negative">*</span>
//               </label>
//               <textarea
//                 name="message"
//                 rows={4}
//                 value={message}
//                 onChange={handleChange}
//                 placeholder={t("messagePlaceholder")}
//                 className="input-class resize-none !h-[160px]"
//               />
//             </div>

//             <div className="flex flex-col gap-2">
//               <label className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={emailUpdates}
//                   onChange={(e) => setEmailUpdates(e.target.checked)}
//                   className="accent-red-600"
//                 />
//                 {t("emailUpdates")}
//               </label>
//               <label className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={agreePrivacy}
//                   onChange={(e) => setAgreePrivacy(e.target.checked)}
//                   className="accent-red-600"
//                 />
//                 {t("emailConsent")}
//               </label>
//               <label className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={agreeTerms}
//                   onChange={(e) => setAgreeTerms(e.target.checked)}
//                   className="accent-red-600"
//                 />
//                 {t("termsConsent")}
//               </label>
//               <label className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={consentMessages}
//                   onChange={(e) => setConsentMessages(e.target.checked)}
//                   className="accent-red-600"
//                 />
//                 {t("smsConsent")}
//               </label>
//               <p className="text-gray-600 text-xs mt-2">{t("disclaimer")}</p>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="mt-4 w-full rounded-full bg-[#A10000] py-3 text-white font-semibold hover:opacity-90 disabled:opacity-60"
//             >
//               {loading ? <Loader /> : t("submit")}
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FleetContactForm;

"use client";

import { useState } from "react";
import InputField from "../ui/InputField";
import { toast } from "sonner";
import Loader from "../ui/Loader";
import { useTranslations } from "next-intl";

interface FormData {
  fullName: string;
  fleetName: string;
  email: string;
  phone: string;
  vehicleCount: string;
  operatingArea: string;
  message: string;
  emailUpdates: boolean;
  agreePrivacy: boolean;
  agreeTerms: boolean;
  consentMessages: boolean;
}

type TextFieldName = "fullName" | "fleetName" | "email" | "phone" | "vehicleCount" | "operatingArea";

interface InputFieldConfig {
  name: TextFieldName;
  label: string;
  placeholder: string;
  type?: string;
}

const FleetContactForm = () => {
  const t = useTranslations("fleetOwner");

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    fleetName: "",
    email: "",
    phone: "",
    vehicleCount: "",
    operatingArea: "",
    message: "",
    emailUpdates: false,
    agreePrivacy: false,
    agreeTerms: false,
    consentMessages: false,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { 
      fullName, 
      fleetName, 
      email, 
      phone, 
      vehicleCount, 
      operatingArea, 
      message, 
      agreePrivacy, 
      agreeTerms, 
      consentMessages 
    } = formData;

    if (!fullName || !fleetName || !email || !phone || !vehicleCount || !operatingArea || !message) {
      toast.error(t("errorsRequired"));
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error(t("errorsInvalidEmail"));
      return;
    }

    if (!agreePrivacy || !agreeTerms || !consentMessages) {
      toast.error(t("errorsConsentRequired"));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/fleet-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(t("success"));
        setFormData({
          fullName: "",
          fleetName: "",
          email: "",
          phone: "",
          vehicleCount: "",
          operatingArea: "",
          message: "",
          emailUpdates: false,
          agreePrivacy: false,
          agreeTerms: false,
          consentMessages: false,
        });
      } else {
        toast.error(data.error || t("errorsFailed"));
      }
    } catch {
      toast.error(t("errorsNetwork"));
    } finally {
      setLoading(false);
    }
  };

  const inputFields: InputFieldConfig[] = [
    { 
      name: "fullName", 
      label: t("fullNameLabel"), 
      placeholder: t("fullNamePlaceholder") 
    },
    { 
      name: "fleetName", 
      label: t("fleetNameLabel"), 
      placeholder: t("fleetNamePlaceholder") 
    },
    { 
      name: "email", 
      label: t("emailLabel"), 
      placeholder: t("emailPlaceholder"), 
      type: "email" 
    },
    { 
      name: "phone", 
      label: t("phoneLabel"), 
      placeholder: t("phonePlaceholder"), 
      type: "tel" 
    },
    { 
      name: "vehicleCount", 
      label: t("vehicleCountLabel"), 
      placeholder: t("vehicleCountPlaceholder") 
    },
    { 
      name: "operatingArea", 
      label: t("operatingAreaLabel"), 
      placeholder: t("operatingAreaPlaceholder") 
    },
  ];

  return (
    <section className="bg-value">
      <div className="container py-[32px] md:py-[64px]">
        <div className="max-w-[778px] mx-auto bg-[#F5F5F7] rounded-[12px] p-6 md:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {inputFields.map((field) => (
              <InputField
                key={field.name}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
                type={field.type || "text"}
              />
            ))}

            <div className="flex flex-col gap-2">
              <label className="label-class">
                {t("messageLabel")} <span className="text-text-negative">*</span>
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder={t("messagePlaceholder")}
                className="input-class resize-none !h-[160px]"
                required
              />
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="emailUpdates"
                  checked={formData.emailUpdates}
                  onChange={handleChange}
                  className="accent-red-600"
                />
                {t("emailUpdates")}
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                  className="accent-red-600"
                />
                {t("emailConsent")}
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="accent-red-600"
                />
                {t("termsConsent")}
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="consentMessages"
                  checked={formData.consentMessages}
                  onChange={handleChange}
                  className="accent-red-600"
                />
                {t("smsConsent")}
              </label>
              <p className="text-gray-600 text-xs mt-2">{t("disclaimer")}</p>
            </div>

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
    </section>
  );
};

export default FleetContactForm;