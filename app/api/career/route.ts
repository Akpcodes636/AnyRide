// app/api/career/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const fullName = data.get("fullName")?.toString() || "";
    const email = data.get("email")?.toString() || "";
    const phone = data.get("phone")?.toString() || "";
    const expertise = data.get("expertise")?.toString() || "";
    const experience = data.get("experience")?.toString() || "";
    const message = data.get("message")?.toString() || "";

    const attachmentFile = data.get("attachment") as File | null;

    // ✅ Validate required fields
    if (!fullName || !email || !expertise || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ SMTP transporter (same config)
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
      from: `"${fullName}" <${email}>`,
      to: "webmaster@anyride.app",
      subject: `[Career Application] ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Area of Expertise:</strong> ${expertise}</p>
          <p><strong>Years of Experience:</strong> ${experience}</p>
          <p><strong>Message:</strong><br/>${message.replace(
            /\n/g,
            "<br/>"
          )}</p>
        </div>
      `,
    };

    // ✅ Attachment (CV / Resume)
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
    console.error("Career form error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
