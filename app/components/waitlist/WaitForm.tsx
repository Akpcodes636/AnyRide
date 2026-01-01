"use client"
import { useFormik } from "formik"
import InputField from "../ui/InputField"
import { waitListSchema } from "@/lib/validations/userValidations"
// import { waitListSchema } from "@/schemas/waitListSchema" // adjust path as needed

export default function WaitForm() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: ""
    },
    validationSchema: waitListSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Add your API call here
        // await fetch('/api/waitlist', { 
        //   method: 'POST', 
        //   body: JSON.stringify(values),
        //   headers: { 'Content-Type': 'application/json' }
        // })
        
        console.log("Form submitted:", values)
        
        alert("Successfully joined the waitlist!")
        resetForm()
      } catch (error) {
        console.error("Submission error:", error)
        alert("Something went wrong. Please try again.")
      } finally {
        setSubmitting(false)
      }
    }
  })

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="w-full max-w-[562px] mx-auto bg-white">
        

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <InputField
              type="text"
              name="firstName"
              label=""
              placeholder="First Name"
              css="bg-blue-500 w-full h-[60px] rounded-[50px]"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : null
              }
              autoComplete="given-name"
              required
            />

            <InputField
              type="text"
              name="lastName"
              label=""
              placeholder="Last Name"
              css="bg-white w-full h-[60px] rounded-[50px]"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : null
              }
              autoComplete="family-name"
              required
            />

            <InputField
              type="email"
              name="emailAddress"
              label=""
              placeholder="Email Address"
              css="bg-white w-full h-[60px] rounded-[50px]"
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.emailAddress && formik.errors.emailAddress
                  ? formik.errors.emailAddress
                  : null
              }
              autoComplete="email"
              required
            />

            <InputField
              type="tel"
              name="phoneNumber"
              label=""
              placeholder="Phone Number"
              css="bg-white w-full h-[60px] rounded-[50px]"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? formik.errors.phoneNumber
                  : null
              }
              autoComplete="tel"
              required
            />

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full h-[60px] bg-red-500 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-[50px] transition-colors mt-2"
            >
              {formik.isSubmitting ? "Joining..." : "Join the waitlist"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}