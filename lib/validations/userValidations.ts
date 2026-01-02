import * as Yup from "yup";

export const waitListSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .trim()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  emailAddress: Yup.string()
    .trim()
    .required("Email address is required")
    .email("Please enter a valid email address"),
    userType: Yup.string().required("Please select an option"),
});