const nodemailer = require("nodemailer");

exports.sendVerificationLink = async (receiverEmail, id) => {
  const backendURL="http://localhost:8080";
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.SENDER_EMAIL, 
        pass: process.env.APP_PASS, 
      },
    });
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: receiverEmail,
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
    });

    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Failed to send email", err);
  }
};
