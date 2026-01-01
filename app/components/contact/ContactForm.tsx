"use client";
import { useState } from "react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

const ContactForm = () => {
  //   const [category, setCategory] = useState("");

  //   const categories = [
  //     { value: "billing", label: "Billing" },
  //     { value: "technical", label: "Technical Support" },
  //     { value: "general", label: "General Inquiry" },
  //     { value: "other", label: "Other" },
  //   ];

  return (
    <section className="bg-value">
      <div className="container py-[32px] md:py-[64px]">
        <div className="">
          <h2 className="text-white text-center">Got an issue?</h2>
          <p className="text-[#E6E6EB] text-center text-[16px] md:text-[18px] mb-[48px]">
            Fill out the form below, submit the ticket and we&apos;ll get back
            to you.
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
                  label="Subject"
                  placeholder="Enter subject"
                  value=""
                  onChange={() => {}}
                  required
                />

                <InputField
                  name="fullname"
                  label="Full Name"
                  placeholder="Enter your full name"
                  value=""
                  onChange={() => {}}
                  required
                />

                <InputField
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  value=""
                  onChange={() => {}}
                  required
                />

                <InputField
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  value=""
                  onChange={() => {}}
                  required
                />

                <SelectField
                  name="category"
                  label="Category"
                  value=""
                  options={[
                    { value: "", label: "Select category" },
                    { value: "payment", label: "Payment issue" },
                    { value: "ride", label: "Ride issue" },
                  ]}
                  
                />

                <SelectField
                  name="country"
                  label="Country"
                  value=""
                  options={[
                    { value: "", label: "Select Country" },
                    { value: "ng", label: "Nigeria" },
                    { value: "gh", label: "Ghana" },
                  ]}
                 
                />

                <SelectField
                  name="language"
                  label="Response language"
                  value=""
                  options={[
                    { value: "", label: "Select response language" },
                    { value: "en", label: "English" },
                    { value: "fr", label: "French" },
                  ]}
                />

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="label-class">
                    Message <span className="text-text-negative">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Type your message/comment/complaints"
                    className="input-class resize-none h-[189px] w-full rounded-[8px] bg-white p-2"
                  />
                  <p className="text-right text-xs text-gray-500">0/1000</p>
                </div>

                {/* Attachment */}
                <div className="flex flex-col gap-2">
                  <label className="label-class">Attachment(s)</label>
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-dashed border-gray-400 text-xl">
                    +
                  </div>
                </div>

                {/* Checkbox */}
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-red-600" />
                  Send me updates via email
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-4 w-full rounded-full bg-[#A10000] py-3 text-white font-semibold hover:opacity-90"
                >
                  Submit
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
