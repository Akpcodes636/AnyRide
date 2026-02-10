import { sendEmail } from "./emailService";
import { WELCOME_EMAIL_TEMPLATE } from "./emailTemplate";

export const sendWelcomeEmail = async (
  email: string,
  firstname: string,
  lastname: string,
): Promise<void> => {
  const subject = "Welcome to AnyRide";
  // ensure correct replacement
  const html = WELCOME_EMAIL_TEMPLATE(firstname, lastname);

  try {
    // Explicitly passing the `html` field in the email
    const response = await sendEmail(email, subject, html);
    console.log("Welcome email sent successfully", response);
  } catch (error: unknown) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};