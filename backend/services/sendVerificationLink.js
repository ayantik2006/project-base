// sendVerificationLink.js
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // SendGrid API key from env

exports.sendVerificationLink = async (receiverEmail, id) => {
  const backendURL = "https://project-base-backend.onrender.com";

  const msg = {
    to: receiverEmail,
    from: process.env.SENDER_EMAIL, // must be a verified sender in SendGrid
    subject: "Please verify your email",
    html: `
      <h2 style="color: #4CAF50;">Welcome to Base 🎉</h2>
      <p>Thanks for signing up! Please click the button below to verify your email:</p>
      <p style="color:#fa1946"><b>This link is valid only for 10 minutes.</b></p>
      <a href="${backendURL}/auth/verification/${id}" 
         style="display:inline-block; padding:10px 15px; background:#4CAF50; color:white; border-radius:5px; text-decoration:none;">
         Verify Email
      </a>
      <p style="font-size:12px; color:#555;">If you didn't request this, you can ignore this email.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Failed to send email", err.response ? err.response.body : err);
  }
};
