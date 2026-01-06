import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { subject, fullname, email, phone, category, country, language, message } = data;

    // Configure SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
  const mailOptions = {
  from: `"${fullname}" <${email}>`, // sender
  to: process.env.CONTACT_RECEIVER_EMAIL, // recipient
  subject: `[Contact Form] ${subject}`,
  html: `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; padding: 20px; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <div style="background-color: #A10000; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">New Contact Form Submission</h2>
        </div>
        <div style="padding: 20px;">
          <p><strong>Name:</strong> ${fullname}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Language:</strong> ${language}</p>
          <p><strong>Message:</strong></p>
          <div style="border-left: 4px solid #A10000; padding-left: 10px; margin-top: 5px; color: #555;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
        </div>
        <div style="background-color: #f3f3f3; text-align: center; padding: 10px; font-size: 12px; color: #888;">
          This message was sent via AnyRide Contact Form
        </div>
      </div>
    </div>
  `,
};


    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to send email" });
  }
}
