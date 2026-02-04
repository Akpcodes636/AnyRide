// app/api/fleet-contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json(); // Use JSON instead of formData

    const {
      fullName,
      fleetName,
      email,
      phone,
      vehicleCount,
      operatingArea,
      message,
      emailUpdates,
      agreePrivacy,
      agreeTerms,
      consentMessages,
    } = data;

    // Validate required fields
    if (
      !fullName ||
      !fleetName ||
      !email ||
      !phone ||
      !vehicleCount ||
      !operatingArea ||
      !message ||
      !agreePrivacy ||
      !agreeTerms ||
      !consentMessages
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields or consent" },
        { status: 400 }
      );
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: "anyride.app",
      port: 465,
      secure: true,
      auth: {
        user: "webmaster@anyride.app",
        pass: "m8259tz!U&ekrjdkl",
      },
    });

    // Prepare email
    const mailOptions = {
      from: `"${fullName}" <${email}>`,
      to: "webmaster@anyride.app",
      subject: `[Fleet Contact] Fleet Request from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Fleet Name:</strong> ${fleetName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Number of Vehicles:</strong> ${vehicleCount}</p>
          <p><strong>Operating Area:</strong> ${operatingArea}</p>
          <p><strong>Email Updates:</strong> ${emailUpdates ? "Yes" : "No"}</p>
          <p><strong>Privacy Consent:</strong> ${agreePrivacy ? "Yes" : "No"}</p>
          <p><strong>Terms Consent:</strong> ${agreeTerms ? "Yes" : "No"}</p>
          <p><strong>SMS Consent:</strong> ${consentMessages ? "Yes" : "No"}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Fleet contact error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
