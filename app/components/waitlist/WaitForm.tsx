// "use client"
// import { useFormik } from "formik"
// import InputField from "../ui/InputField"
// import { waitListSchema } from "@/lib/validations/userValidations"
// import SelectField from "../ui/SelectField"
// import Button from "../ui/Button"
// import { toast } from "sonner"
// import { useState } from "react"
// import Loader from "../ui/Loader"
// // import { waitListSchema } from "@/schemas/waitListSchema" // adjust path as needed

// export default function WaitForm() {
//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       emailAddress: "",
//       userType:""
//     },
//     validationSchema: waitListSchema,
//     onSubmit: async (values, { setSubmitting, resetForm }) => {
//       try {
//         const res = await fetch("/api/waitlist", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(values),
//         });

//         const data = await res.json();

//         if (data.success) {
//           toast.success("Successfully joined the waitlist!") // ✅ Sonner success toast
//           resetForm()
//         } else {
//           toast.error("Error: " + data.error) // ✅ Sonner error toast
//         }
//       } catch (error: any) {
//         console.error(error)
//         toast.error("Something went wrong. Please try again.") // ✅ Sonner error toast
//       } finally {
//         setSubmitting(false)
//       }
//     }
//   })

//   const userTypeOptions = [
//   { value: "", label: "Select an option" },
//   { value: "rider", label: "Rider" },
//   { value: "driver", label: "Driver" },
//   { value: "partner", label: "Partner" },
// ];

// const [loading, setLoading] = useState(false);
//   return (
//     <section className="py-12 px-4">
//       <div className="container mx-auto">
//         <div className="w-full max-w-[562px] mx-auto">
    
//           <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
//             <InputField
//               type="text"
//               name="firstName"
//               label=""
//               placeholder="First Name"
//               css="!bg-white w-full !h-[60px] !rounded-[100px]"
//               value={formik.values.firstName}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={
//                 formik.touched.firstName && formik.errors.firstName
//                   ? formik.errors.firstName
//                   : null
//               }
//               autoComplete="given-name"
//             //   required
//             />

//             <InputField
//               type="text"
//               name="lastName"
//               label=""
//               placeholder="Last Name"
//               css="!bg-white w-full !h-[60px] !rounded-[100px]"
//               value={formik.values.lastName}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={
//                 formik.touched.lastName && formik.errors.lastName
//                   ? formik.errors.lastName
//                   : null
//               }
//               autoComplete="family-name"
//             //   required
//             />

            

//             <InputField
//               type="email"
//               name="emailAddress"
//               label=""
//               placeholder="Email Address"
//               css="!bg-white w-full !h-[60px] !rounded-[100px]"
//               value={formik.values.emailAddress}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={
//                 formik.touched.emailAddress && formik.errors.emailAddress
//                   ? formik.errors.emailAddress
//                   : null
//               }
//               autoComplete="email"
//             //   required
//             />
            
//             <SelectField
//             name="userType"
//             label=""
//             options={userTypeOptions}
//             value={formik.values.userType}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={
//             formik.touched.userType && formik.errors.userType
//                 ? formik.errors.userType
//                 : null
//             }
//             className="!h-[60px] !rounded-[100px]"
//              />
            
//             <div className="flex items-center justify-center">
//             <Button
//               type="submit"
//               style="danger"
//               disabled={formik.isSubmitting}
//               css="w-[200px] h-[60px] bg-red-500 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-[50px] transition-colors mt-2"
//             >
//               {formik.isSubmitting ? <Loader /> : "Join the waitlist"}
//             </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   )
// }

// "use client";

// import { useFormik } from "formik";
// import InputField from "../ui/InputField";
// import SelectField from "../ui/SelectField";
// import Button from "../ui/Button";
// import Loader from "../ui/Loader";
// import { waitListSchema } from "@/lib/validations/userValidations";
// import { toast } from "sonner";
// import { useTranslations } from "next-intl";

// export default function WaitForm() {
//   const t = useTranslations("WaitlistPage.form");
  
//   const userTypeOptions = [
//     { value: "", label: t("selectOption") },
//     { value: "rider", label: t("userTypes.rider") },
//     { value: "driver", label: t("userTypes.driver") },
//     { value: "partner", label: t("userTypes.partner") },
//   ];
  

//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       emailAddress: "",
//       userType: "",
//     },
   
//   onSubmit: async (values, { setSubmitting, resetForm }) => {
//   console.log("Submitting form...", values);
//   try {
//    const res = await fetch(`/api/waitlist`, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(values),
// });


//     console.log("Response status:", res.status);

//     const data = await res.json();
//     console.log("Response data:", data);

//     if (res.ok) {
//       toast.success("Successfully joined the waitlist!");
//       resetForm();
//     } else {
//       toast.error(data.message || "Something went wrong.");
//     }
//   } catch (error) {
//     console.error("Fetch error:", error);
//     toast.error("Something went wrong. Please try again.");
//   } finally {
//     setSubmitting(false);
//   }
// }


//   });

//   return (
//     <section className="py-12 px-4">
//       <div className="container mx-auto">
//         <div className="w-full max-w-[562px] mx-auto">
//           <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
//             <InputField
//               label=""
//               type="text"
//               name="firstName"
//               placeholder={t("firstNamePlaceholder")}
//               css="!bg-white w-full !h-[60px] !rounded-[100px]"
//               value={formik.values.firstName}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={
//                 formik.touched.firstName && formik.errors.firstName
//                   ? formik.errors.firstName
//                   : null
//               }
//             />

//             <InputField
//               label=""
//               type="text"
//               name="lastName"
//               placeholder={t("lastNamePlaceholder")}
//               css="!bg-white w-full !h-[60px] !rounded-[100px]"
//               value={formik.values.lastName}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={
//                 formik.touched.lastName && formik.errors.lastName
//                   ? formik.errors.lastName
//                   : null
//               }
//             />

//             <InputField
//               label=""
//               type="email"
//               name="emailAddress"
//               placeholder={t("emailPlaceholder")}
//               css="!bg-white w-full !h-[60px] !rounded-[100px]"
//               value={formik.values.emailAddress}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={
//                 formik.touched.emailAddress && formik.errors.emailAddress
//                   ? formik.errors.emailAddress
//                   : null
//               }
//             />

//             <SelectField
//               label=""
//               name="userType"
//               options={userTypeOptions}
//               value={formik.values.userType}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={
//                 formik.touched.userType && formik.errors.userType
//                   ? formik.errors.userType
//                   : null
//               }
//               className="!h-[60px] !rounded-[100px]"
//             />

//              <div>
//                           {/* Checkbox
//                           <label className="flex items-center gap-2 text-sm text-white">
//                             <input type="checkbox" className="accent-red-600" />
//                             {/* {t("fields.emailUpdates")} */}
//                           {/* </label>

//                           <label className="flex items-center gap-2 text-sm text-white">
//                             <input type="checkbox" className="accent-red-600" />
//                             {/* {t("fields.emailUpdates")} */}
//                           {/* </label> */} 

//                           {/* Privacy Policy & Terms & Conditions */}
//                           <label className="flex items-center gap-2 text-sm text-white">
//                             <input type="checkbox" className="accent-red-600" />I agree to
//                             the{" "}
//                             <span className="text-[#A10000] underline cursor-pointer">
//                               Privacy Policy
//                             </span>
//                           </label>

//                           <label className="flex items-center gap-2 text-sm text-white">
//                             <input type="checkbox" className="accent-red-600" />I agree to
//                             the{" "}
//                             <span className="text-[#A10000] underline cursor-pointer">
//                               Terms & Conditions
//                             </span>
//                           </label>

//                           <label className="flex items-center gap-2 text-sm text-white">
//                             <input type="checkbox" className="accent-red-600" />I consent to
//                             receive SMS messages, calls and emails for verification and
//                             communication purposes
//                           </label>

//                           {/* Disclaimer */}
//                           <p className="text-white text-xs mt-2 ">
//                             Disclaimer: By submitting this form, you consent to receive SMS
//                             messages, calls and emails from AnyRide for verification and
//                             communication purposes. Messages and data rates may apply. You
//                             can opt-out at any time by replying STOP to any message. This
//                             consent is not required to purchase goods or services.
//                           </p>

//             </div>

//             <div className="flex items-center justify-center">
//               <Button
//                 type="submit"
//                 style="danger"
//                 loading={formik.isSubmitting}
//                 disabled={formik.isSubmitting}
//                 fn={() => console.log("🔴 Button clicked!")}  
//                 css="w-[200px] h-[60px] bg-red-500 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-[50px] transition-colors mt-2"
//               >
//                 {formik.isSubmitting ? <Loader /> : t("submit")}
//               </Button>

             
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

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

  const userTypeOptions = [
    { value: "", label: t("selectOption") },
    { value: "rider", label: t("userTypes.rider") },
    { value: "driver", label: t("userTypes.driver") },
    { value: "partner", label: t("userTypes.partner") },
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
    <section className="py-12 px-4 ">
      <div className="container mx-auto">
        <div className="w-full max-w-[562px] mx-auto">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
                  onChange={formik.handleChange}
                />
                I agree to the{" "}
                <span className="text-[#A10000] underline cursor-pointer">Privacy Policy</span>
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
                I agree to the{" "}
                <span className="text-[#A10000] underline cursor-pointer">Terms & Conditions</span>
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
                I consent to receive SMS messages, calls, and emails for verification and communication purposes
              </label>
              {formik.touched.consentSMS && formik.errors.consentSMS && (
                <p className="text-red-600 text-xs">{formik.errors.consentSMS}</p>
              )}

              <p className="text-white text-xs mt-2">
                Disclaimer: By submitting this form, you consent to receive SMS messages, calls, and emails from AnyRide for verification and communication purposes. Messages and data rates may apply. You can opt-out at any time by replying STOP to any message. This consent is not required to purchase goods or services.
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
