"use client";

import { useFormik } from "formik";
import { useState } from "react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import * as Yup from "yup";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function WaitForm() {
  const t = useTranslations("WaitlistPage.form");
  // const ths = useTranslations("waitlistPage.modal");
  const th = useTranslations("WaitlistPage.hero");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Yup schema must be inside component to use t
  const waitListSchema = Yup.object({
    firstName: Yup.string().required(t("validation.required")),
    lastName: Yup.string().required(t("validation.required")),
    emailAddress: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.required")),
    userType: Yup.string().required(t("validation.required")),
    agreePrivacy: Yup.boolean().oneOf([true], t("validation.required")),
    agreeTerms: Yup.boolean().oneOf([true], t("validation.required")),
    consentSMS: Yup.boolean().oneOf([true], t("validation.required")),
  });

  const userTypeOptions = [
    { value: "", label: t("selectOption") },
    { value: "rider", label: t("userTypes.rider") },
    { value: "driver", label: t("userTypes.driver") },
    { value: "fleet_owner", label: t("userTypes.fleet_owner") },
    { value: "partner", label: t("userTypes.partner") },
    { value: "team_member", label: t("userTypes.team_member") },
  ];

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      userType: "",
      agreePrivacy: false,
      agreeTerms: false,
      consentSMS: false,
    },
    validationSchema: waitListSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (res.ok) {
          setShowSuccessModal(true);
          resetForm();
        } else {
          toast.error(t("toast.genericError"));
        }
      } catch (error) {
        console.error(error);
        toast.error(t("toast.retryError"));
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    formik.setFieldValue(name, checked);
  };

  return (
    <>
      <section className="pb-12 pt-0 px-4">
        <div className="container mx-auto">
          <div className="w-full max-w-full md:max-w-full lg:max-w-[662px] mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">{th("title")}</h2>
              <p className="text-[16px] md:text-[18px] text-white opacity-80">{th("description")}</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              {/* First Name */}
              <InputField
                label=""
                type="text"
                name="firstName"
                placeholder={t("firstNamePlaceholder")}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : null}
                css="!bg-white w-full !h-[60px] !rounded-[100px]"
              />

              {/* Last Name */}
              <InputField
                label=""
                type="text"
                name="lastName"
                placeholder={t("lastNamePlaceholder")}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : null}
                css="!bg-white w-full !h-[60px] !rounded-[100px]"
              />

              {/* Email */}
              <InputField
                label=""
                type="email"
                name="emailAddress"
                placeholder={t("emailPlaceholder")}
                value={formik.values.emailAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.emailAddress && formik.errors.emailAddress ? formik.errors.emailAddress : null}
                css="!bg-white w-full !h-[60px] !rounded-[100px]"
              />

              {/* User Type */}
              <SelectField
                label=""
                name="userType"
                options={userTypeOptions}
                value={formik.values.userType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.userType && formik.errors.userType ? formik.errors.userType : null}
                className="!h-[60px] !rounded-[100px]"
              />

              {/* Checkboxes */}
              <div className="flex flex-col gap-2 text-sm text-white">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="agreePrivacy"
                    className="accent-red-600"
                    checked={formik.values.agreePrivacy}
                    onChange={handleCheckboxChange}
                  />
                  {t("agreements.privacyPolicy")}
                </label>
                {formik.touched.agreePrivacy && formik.errors.agreePrivacy && (
                  <p className="text-red-600 text-xs">{formik.errors.agreePrivacy}</p>
                )}

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    className="accent-red-600"
                    checked={formik.values.agreeTerms}
                    onChange={handleCheckboxChange}
                  />
                  {t("agreements.termsConditions")}
                </label>
                {formik.touched.agreeTerms && formik.errors.agreeTerms && (
                  <p className="text-red-600 text-xs">{formik.errors.agreeTerms}</p>
                )}

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="consentSMS"
                    className="accent-red-600"
                    checked={formik.values.consentSMS}
                    onChange={handleCheckboxChange}
                  />
                  {t("agreements.consentMessages")}
                </label>
                {formik.touched.consentSMS && formik.errors.consentSMS && (
                  <p className="text-red-600 text-xs">{formik.errors.consentSMS}</p>
                )}

                <p className="text-white text-xs mt-2">{t("agreements.disclaimer")}</p>
              </div>

              {/* Submit */}
              <div className="flex items-center justify-center mt-4">
                <Button
                  type="submit"
                  style="danger"
                  loading={formik.isSubmitting}
                  disabled={formik.isSubmitting}
                  css="w-[200px] h-[60px] bg-red-500 hover:bg-red-600 text-white font-semibold rounded-[50px] transition-colors"
                >
                  {formik.isSubmitting ? <Loader /> : t("submit")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl transform transition-all">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t("modal.title") || "You're on the list!"}
            </h3>
            <p className="text-gray-600 mb-6">
              {t("modal.message") || "Thank you for joining our waitlist. We'll be in touch soon!"}
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-colors w-full"
            >
              {t("modal.close") || "Close"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}