"use client";
import { useState } from "react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import { useTranslations } from "next-intl";

const ContactForm = () => {
  const t = useTranslations("ContactPage.form");

  return (
    <section className="bg-value">
      <div className="container py-[32px] md:py-[64px]">
        <div className="">
          <h2 className="text-white text-center">{t("title")}</h2>
          <p className="text-[#E6E6EB] text-center text-[16px] md:text-[18px] mb-[48px]">
            {t("description")}
          </p>

          <form action="">
            {/* <div className="w-full max-w-[335px] md:max-w-full lg:max-w-[778px] bg-[#F5F5F7] mx-auto rounded-[8px]">
              <div className="p-[40px]">
                <InputField
                  name="subject"
                  label="Subject"
                  placeholder="Enter Subject"
                  type="text"
                  required
                />

                <InputField
                  name="fullname"
                  label="Full Name"
                  placeholder="Enter your full name"
                  type="text"
                  required
                />

                <InputField
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  type="text"
                  required
                />

                <InputField
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  type="text"
                  required
                />

                <SelectField
                  name="category"
                  label="Category"
                  options={categories}
                  value={category}
                />
              </div>
            </div> */}
            <div className="w-full max-w-[335px] md:max-w-full lg:max-w-[778px] mx-auto rounded-[8px]">
            <div className="bg-[#F5F5F7] rounded-[12px] p-6 md:p-10">
              <form className="flex gap-y-[24px] flex-col">
                <InputField
                  name="subject"
                  label={t("fields.subject")}
                  placeholder={t("fields.subjectPlaceholder")}
                  value=""
                  onChange={() => {}}
                  required
                />

                <InputField
                  name="fullname"
                  label={t("fields.fullName")}
                  placeholder={t("fields.fullNamePlaceholder")}
                  value=""
                  onChange={() => {}}
                  required
                />

                <InputField
                  name="email"
                  label={t("fields.email")}
                  placeholder={t("fields.emailPlaceholder")}
                  value=""
                  onChange={() => {}}
                  required
                />

                <InputField
                  name="phone"
                  label={t("fields.phone")}
                  placeholder={t("fields.phonePlaceholder")}
                  value=""
                  onChange={() => {}}
                  required
                />

                <SelectField
                  name="category"
                  label={t("fields.category")}
                  value=""
                  options={[
                    { value: "", label: t("fields.selectCategory") },
                    { value: "payment", label: t("fields.paymentIssue") },
                    { value: "ride", label: t("fields.rideIssue") },
                  ]}
                  
                />

                <SelectField
                  name="country"
                  label={t("fields.country")}
                  value=""
                  options={[
                    { value: "", label: t("fields.selectCountry") },
                    { value: "ng", label: "Nigeria" },
                    { value: "gh", label: "Ghana" },
                  ]}
                 
                />

                <SelectField
                  name="language"
                  label={t("fields.responseLanguage")}
                  value=""
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
                    rows={4}
                    placeholder={t("fields.messagePlaceholder")}
                    className="input-class resize-none h-[189px] w-full rounded-[8px] bg-white p-2"
                  />
                  <p className="text-right text-xs text-gray-500">0/1000</p>
                </div>

                {/* Attachment */}
                <div className="flex flex-col gap-2">
                  <label className="label-class">{t("fields.attachment")}</label>
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-dashed border-gray-400 text-xl">
                    +
                  </div>
                </div>

                {/* Checkbox */}
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-red-600" />
                  {t("fields.emailUpdates")}
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-4 w-full rounded-full bg-[#A10000] py-3 text-white font-semibold hover:opacity-90"
                >
                  {t("submit")}
                </button>
              </form>
            </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
