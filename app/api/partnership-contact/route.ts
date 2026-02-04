// app/api/partnership-contact/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      fullName,
      organizationName,
      email,
      phone,
      partnershipCategory,
      message,
    } = data;

    // ✅ Validate required fields
    if (
      !fullName ||
      !organizationName ||
      !email ||
      !message
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Email transporter
    const transporter = nodemailer.createTransport({
      host: "anyride.app",
      port: 465,
      secure: true,
      auth: {
        user: "webmaster@anyride.app",
        pass: process.env.MAIL_PASSWORD, // 🔐 MOVE TO ENV
      },
    });

    // ✅ Email template
    const mailOptions = {
      from: `"${fullName}" <${email}>`,
      to: "webmaster@anyride.app",
      subject: `[Partnership Request] ${organizationName}`,
      html: `
        <div style="font-family: Arial; font-size: 16px;">
          <h2>New Partnership Request</h2>

          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Organization:</strong> ${organizationName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Category:</strong> ${
            partnershipCategory || "Not specified"
          }</p>

          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Partnership contact error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
