/*
 * Project: Base
 * Author: Ayantik Sarkar
 * Copyright (c) 2025
 * Licensed under Apache 2.0
 */

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // SendGrid API key from env

exports.sendForgotPasswordLink = async (receiverEmail, id) => {
  const isProduction = process.env.PRODUCTION === "true";

  const backendURL = isProduction
    ? "https://project-base-backend.onrender.com"
    : "http://localhost:8080";

  const msg = {
    to: receiverEmail,
    from: process.env.SENDER_EMAIL, // must be a verified sender in SendGrid
    subject: "Forgot Password",
    html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Reset your password</title>
  <style>
    @media only screen and (max-width:480px) {
      .container { width:100% !important; padding:12px !important; }
      .hero { padding:20px !important; }
      .btn { width:100% !important; display:block !important; }
    }
    .ExternalClass { width:100%; }
    .ReadMsgBody { width:100%; }
    .fallback-link { word-break:break-all; color:#16a34a; text-decoration:underline; }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table class="container" width="600" style="width:600px; max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.06);" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td class="hero" style="padding:32px; color:#0b1220;">
            <h1>Base</h1>
              <h1 style="margin:0 0 12px 0; font-size:22px; line-height:28px; font-weight:600;">Reset your password</h1>
              <p style="margin:0 0 18px 0; font-size:15px; line-height:22px; color:#374151;">
                We have received a request to reset your account password. Click the button below to choose a new one.
                <strong style="color:red">The link is valid for 10 minutes only</strong>
              </p>

              <!-- Green Button -->
              <table cellpadding="0" cellspacing="0" role="presentation" style="margin:-3px 0;">
                <tr>
                  <td align="center">
                    <a class="btn" href="${backendURL}/auth/forgot-password/${id}" target="_blank"
                       style="background:#22c55e; color:white; text-decoration:none; padding:12px 20px; border-radius:6px; font-weight:600; display:inline-block; font-size:15px;">
                      Reset password
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer note -->
          <tr>
            <td style="padding:20px 32px; border-top:1px solid #eef2f7; font-size:13px; color:#6b7280;">
              <p style="margin:0 0 8px 0;">If you didn't request a password reset, ignore this email. No changes were made to your account.
            </td>
          </tr>
      </td>
    </tr>
  </table>
</body>
</html>
`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully!");
  } catch (err) {
    console.error(
      "Failed to send email",
      err.response ? err.response.body : err
    );
  }
};
