import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rateLimit";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // 1. Rate Limiting Check (e.g. 3 submissions per 10 minutes per IP/sender)
    const rateLimit = checkRateLimit(req, email, {
      max: 3,
      windowMs: 10 * 60 * 1000,
    });

    const rateLimitHeaders = getRateLimitHeaders(rateLimit);

    if (!rateLimit.success) {
      const waitMinutes = Math.ceil(rateLimit.retryAfterSeconds / 60);
      console.warn(
        `⛔ [DEV_OS] Transmission rate limit triggered for ${email || "unknown"}. Retry in ${rateLimit.retryAfterSeconds}s.`
      );

      return NextResponse.json(
        {
          error: `Transmission rate limit exceeded. Too many requests. Please wait ${waitMinutes} minute${waitMinutes > 1 ? "s" : ""} before transmitting again.`,
          retryAfter: rateLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: rateLimitHeaders,
        }
      );
    }

    // 2. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, message)." },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format provided." },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    // 3. Read SMTP credentials & clean formatting (removes spaces from Google App Passwords)
    const rawHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpHost = rawHost.replace(/['"]+/g, "").trim();
    const smtpPort = Number(process.env.SMTP_PORT?.replace(/['"]+/g, "").trim()) || 465;
    const smtpUser = process.env.SMTP_USER?.replace(/['"]+/g, "").trim();
    const smtpPass = process.env.SMTP_PASS?.replace(/['"]+/g, "").replace(/\s+/g, "").trim();
    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL?.replace(/['"]+/g, "").trim() || smtpUser;

    console.log("📨 [DEV_OS] Attempting to send transmission...");
    console.log(`   From: ${name} <${email}>`);
    console.log(`   To: ${receiverEmail}`);
    console.log(`   SMTP User: ${smtpUser || "NOT SET"}`);
    console.log(`   SMTP Host: ${smtpHost}:${smtpPort}`);

    if (!smtpUser || !smtpPass) {
      const missingConfig = `Something Went Wrong`;
      console.error(`❌ [DEV_OS] ${missingConfig}`);
      return NextResponse.json(
        { error: missingConfig },
        { status: 500, headers: rateLimitHeaders }
      );
    }

    // 4. Create Transporter (supports Gmail service helper & standard SMTP)
    const isGmail =
      smtpHost.includes("gmail") || smtpUser.toLowerCase().includes("@gmail.com");

    const transporter = isGmail
      ? nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        })
      : nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

    const mailSubject = subject
      ? `[DEV_OS] ${subject} - from ${name}`
      : `[DEV_OS] New Transmission from ${name}`;

    // 5. Styled HTML Transmission Payload
    const htmlContent = `
      <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; background-color: #0e141a; color: #dde3eb; padding: 24px; border-radius: 12px; border: 1px solid #424754;">
        <div style="border-bottom: 1px solid #424754; padding-bottom: 12px; margin-bottom: 16px;">
          <h2 style="color: #4cd7f6; margin: 0; font-size: 18px;">[DEV_OS] Incoming Transmission</h2>
          <p style="color: #8c909f; margin: 4px 0 0 0; font-size: 12px;">Initiated from contact_protocol.sh</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <tr>
            <td style="color: #8c909f; padding: 6px 0; width: 120px;"><strong>IDENTIFIER:</strong></td>
            <td style="color: #dde3eb; padding: 6px 0;">${name}</td>
          </tr>
          <tr>
            <td style="color: #8c909f; padding: 6px 0;"><strong>REPLY_TO:</strong></td>
            <td style="color: #4cd7f6; padding: 6px 0;"><a href="mailto:${email}" style="color: #4cd7f6; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="color: #8c909f; padding: 6px 0;"><strong>INTENT:</strong></td>
            <td style="color: #dde3eb; padding: 6px 0;">${subject || "General Inquiry"}</td>
          </tr>
          <tr>
            <td style="color: #8c909f; padding: 6px 0;"><strong>TIMESTAMP:</strong></td>
            <td style="color: #8c909f; padding: 6px 0;">${new Date().toUTCString()}</td>
          </tr>
        </table>

        <div style="background-color: #131920; border: 1px solid #2f353c; border-radius: 8px; padding: 16px;">
          <p style="color: #8c909f; margin: 0 0 8px 0; font-size: 12px;"><strong>MESSAGE PAYLOAD:</strong></p>
          <div style="color: #dde3eb; line-height: 1.6; white-space: pre-wrap; font-size: 14px;">${message}</div>
        </div>

        <div style="margin-top: 20px; font-size: 11px; color: #8c909f; text-align: right;">
          SYSTEM_CORE // ALL RIGHTS RESERVED
        </div>
      </div>
    `;

    // 6. Send Email
    const info = await transporter.sendMail({
      from: `"${name} (DEV_OS)" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: mailSubject,
      text: `From: ${name} (${email})\nSubject: ${subject || "None"}\n\nMessage:\n${message}`,
      html: htmlContent,
    });

    console.log(`✅ [DEV_OS] Transmission successfully dispatched! Message ID: ${info.messageId}`);

    return NextResponse.json(
      {
        success: true,
        message: "Transmission dispatched successfully.",
        messageId: info.messageId,
      },
      {
        headers: rateLimitHeaders,
      }
    );
  } catch (error: unknown) {
    console.error("❌ [DEV_OS] Nodemailer Transmission Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal transmission failure";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
