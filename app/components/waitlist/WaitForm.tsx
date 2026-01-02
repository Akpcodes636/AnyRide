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

"use client";

import { useFormik } from "formik";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import { waitListSchema } from "@/lib/validations/userValidations";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

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
    },
   
  onSubmit: async (values, { setSubmitting, resetForm }) => {
  console.log("Submitting form...", values);
  try {
   const res = await fetch(`/api/waitlist`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(values),
});


    console.log("Response status:", res.status);

    const data = await res.json();
    console.log("Response data:", data);

    if (res.ok) {
      toast.success("Successfully joined the waitlist!");
      resetForm();
    } else {
      toast.error(data.message || "Something went wrong.");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setSubmitting(false);
  }
}


  });

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="w-full max-w-[562px] mx-auto">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <InputField
              label=""
              type="text"
              name="firstName"
              placeholder={t("firstNamePlaceholder")}
              css="!bg-white w-full !h-[60px] !rounded-[100px]"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : null
              }
            />

            <InputField
              label=""
              type="text"
              name="lastName"
              placeholder={t("lastNamePlaceholder")}
              css="!bg-white w-full !h-[60px] !rounded-[100px]"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : null
              }
            />

            <InputField
              label=""
              type="email"
              name="emailAddress"
              placeholder={t("emailPlaceholder")}
              css="!bg-white w-full !h-[60px] !rounded-[100px]"
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.emailAddress && formik.errors.emailAddress
                  ? formik.errors.emailAddress
                  : null
              }
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

            <div className="flex items-center justify-center">
              <Button
                type="submit"
                style="danger"
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting}
                fn={() => console.log("🔴 Button clicked!")}  
                css="w-[200px] h-[60px] bg-red-500 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-[50px] transition-colors mt-2"
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
