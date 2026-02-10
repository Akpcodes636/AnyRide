// import sgMail from "@sendgrid/mail";
// import dotenv from "dotenv";

// dotenv.config();

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// export const sendEmail = async (
//   to: string,
//   subject: string,
//   html: string // 👈 required now
// ) => {
//   try {
//     console.log("🔵 [STEP] Sending email via SendGrid...");

//     const msg = {
//       to,
//       from: process.env.SENDGRID_VERIFIED_SENDER!,
//       subject,
//       html,
//     };

//     console.log("🔵 Email payload:", {
//       to: msg.to,
//       from: msg.from,
//       subject: msg.subject,
//       htmlLength: msg.html.length,
//     });

//     const response = await sgMail.send(msg);

//     console.log("✅ Email sent successfully");

//     return response;

//   } catch (error: any) {
//     console.error(
//       "❌ [ERROR] Failed to send email:",
//       error?.response?.body || error
//     );
//     throw error;
//   }
// };


// /sendgrid/emailService.ts
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  from =process.env.SENDGRID_FROM_EMAIL!
) {
  try {
    await sgMail.send({
      to,
      from,
      subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error: any) {
    console.error("Failed to send email:", error.response?.body || error);
    throw error;
  }
}
