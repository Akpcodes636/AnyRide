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



export const registerValidationSchema = Yup.object().shape({
  phonenumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\+[1-9]\d{7,14}$/, 
      "Invalid phone number format. Use E.164 format (e.g., +1234567890)"
    ),
});


// Validate PIN: must be exactly 4-6 digits (adjust length as needed)
export const pinValidationSchema = Yup.object({
  pin: Yup.string()
    .required("PIN is required")
    .matches(/^\d+$/, "PIN must be numbers only")
    .length(4, "PIN must be exactly 4 digits"),
});


export const loginValidationSchema = Yup.object({
  phonenumber: Yup.string()
    .required("Phone number is required")
    .min(10, "Enter a valid phone number"),
  role: Yup.string()
    .oneOf(["customer", "driver"])
    .required("Select a role"),
});