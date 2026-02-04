

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.formData(); // For attachments

    const subject = data.get("subject")?.toString() || "";
    const fullname = data.get("fullname")?.toString() || "";
    const email = data.get("email")?.toString() || "";
    const phone = data.get("phone")?.toString() || "";
    const category = data.get("category")?.toString() || "";
    const country = data.get("country")?.toString() || "";
    const language = data.get("language")?.toString() || "";
    const message = data.get("message")?.toString() || "";

    const emailUpdates = data.get("emailUpdates")?.toString() === "Yes";
    const agreePrivacy = data.get("agreePrivacy")?.toString() === "Yes";
    const agreeTerms = data.get("agreeTerms")?.toString() === "Yes";
    const consentMessages = data.get("consentMessages")?.toString() === "Yes";

    const attachmentFile = data.get("attachment") as File | null;

    // Validate required fields
    if (!subject || !fullname || !email || !message || !agreePrivacy || !agreeTerms || !consentMessages) {
      return NextResponse.json({ success: false, error: "Missing required fields or consent" }, { status: 400 });
    }

    // SMTP transporter
    const transporter = nodemailer.createTransport({
      host: "anyride.app",
      port: 465,
      secure: true,
      auth: {
        user: "webmaster@anyride.app",
        pass: "m8259tz!U&ekrjdkl",
      },
    });

    const mailOptions: any = {
      from: `"${fullname}" <${email}>`,
      to: "webmaster@anyride.app",
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <p><strong>Name:</strong> ${fullname}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Language:</strong> ${language}</p>
          <p><strong>Email Updates:</strong> ${emailUpdates ? "Yes" : "No"}</p>
          <p><strong>Message Consent:</strong> ${consentMessages ? "Yes" : "No"}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    };

    if (attachmentFile && attachmentFile.size > 0) {
      const arrayBuffer = await attachmentFile.arrayBuffer();
      mailOptions.attachments = [
        {
          filename: attachmentFile.name,
          content: Buffer.from(arrayBuffer),
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}

