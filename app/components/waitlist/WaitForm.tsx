"use client";

import { useFormik } from "formik";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import * as Yup from "yup";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

// Validation schema
const waitListSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  emailAddress: Yup.string().email("Invalid email").required("Required"),
  userType: Yup.string().required("Required"),

  agreePrivacy: Yup.boolean().oneOf([true], "Required"),
  agreeTerms: Yup.boolean().oneOf([true], "Required"),
  consentSMS: Yup.boolean().oneOf([true], "Required"),
});

export default function WaitForm() {
  const t = useTranslations("WaitlistPage.form");
  const th = useTranslations("WaitlistPage.hero");

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
        // Send data to your own backend endpoint
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();
        // console.log(data);

        if (res.ok) {
          toast.success("Successfully joined the waitlist!");
          resetForm();
        } else {
          toast.error("Something went wrong.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Use this handler for all checkboxes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target; // <-- checked is boolean
    formik.setFieldValue(name, checked);
  };

  return (
    <section className="pb-12 pt-0 px-4 ">
      <div className="container mx-auto">
        <div className="w-full max-w-full md:max-w-full  lg:max-w-[562px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">{th("title")}</h2>
            <p className="text-[16px] md:text-[18px] text-white opacity-80">{th("description")}</p>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <InputField
              label=""
              type="text"
              name="firstName"
              placeholder={t("firstNamePlaceholder")}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : null
              }
              css="!bg-white w-full !h-[60px] !rounded-[100px]"
            />

            <InputField
              label=""
              type="text"
              name="lastName"
              placeholder={t("lastNamePlaceholder")}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : null
              }
              css="!bg-white w-full !h-[60px] !rounded-[100px]"
            />

            <InputField
              label=""
              type="email"
              name="emailAddress"
              placeholder={t("emailPlaceholder")}
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.emailAddress && formik.errors.emailAddress
                  ? formik.errors.emailAddress
                  : null
              }
              css="!bg-white w-full !h-[60px] !rounded-[100px]"
            />

            <SelectField
              label=""
              name="userType"
              options={userTypeOptions}
              value={formik.values.userType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.userType && formik.errors.userType
                  ? formik.errors.userType
                  : null
              }
              className="!h-[60px] !rounded-[100px]"
            />

            {/* Checkboxes */}
            <div className="flex flex-col gap-2 text-sm text-white">
              {/* Privacy Policy */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  className="accent-red-600"
                  checked={formik.values.agreePrivacy}
                  onChange={formik.handleChange}
                />
                {t("agreements.privacyPolicy")}{" "}
                {/* <span className="text-[#A10000] underline cursor-pointer">
      {t("agreements.privacyPolicyLink") /* Optional link text */}
                {/* </span> */}
              </label>
              {formik.touched.agreePrivacy && formik.errors.agreePrivacy && (
                <p className="text-red-600 text-xs">
                  {formik.errors.agreePrivacy}
                </p>
              )}

              {/* Terms & Conditions */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  className="accent-red-600"
                  checked={formik.values.agreeTerms}
                  onChange={handleCheckboxChange}
                />
                {t("agreements.termsConditions")}{" "}
                {/* <span className="text-[#A10000] underline cursor-pointer">
      {t("agreements.termsConditionsLink") /* Optional link text */}
                {/* </span> */}
              </label>
              {formik.touched.agreeTerms && formik.errors.agreeTerms && (
                <p className="text-red-600 text-xs">
                  {formik.errors.agreeTerms}
                </p>
              )}

              {/* Consent SMS/Email */}
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
                <p className="text-red-600 text-xs">
                  {formik.errors.consentSMS}
                </p>
              )}

              {/* Disclaimer */}
              <p className="text-white text-xs mt-2">
                {t("agreements.disclaimer")}
              </p>
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
  );
}
