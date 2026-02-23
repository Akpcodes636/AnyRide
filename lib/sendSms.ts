import twilio from "twilio";
import { sendEmail } from "@/sendgrid/emailService";

// Create Twilio client
const twilioClient: ReturnType<typeof twilio> = twilio(
  process.env.TWILIO_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function sendSms(phone: string, message: string, fallbackEmail?: string) {
  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: phone,
    });
    console.log(`📲 OTP sent to ${phone}`);
  } catch (err) {
    console.error("Twilio SMS error:", err);

    if (fallbackEmail) {
      console.log(`📧 Sending fallback email to ${fallbackEmail}`);
      await sendEmail(
        fallbackEmail,
        "Your AnyRide OTP Code",
        `<div>Your OTP is: ${message.replace(/\D/g, "")}</div>`
      );
    }
  }
}
