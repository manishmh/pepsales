import nodemailer from 'nodemailer';

const FRONTEND_APP_BASE_URL = process.env.FRONTEND_APP_BASE_URL;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const GenerateMail = async (recipient: string, message: string, subject: string) => {
  if (!FRONTEND_APP_BASE_URL || !EMAIL_USER || !EMAIL_PASS) {
    return false;
  }


  const htmlBody = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      ${message}
    </div>
  `;

  const mailOptions = {
    from: `"Manish" <${EMAIL_USER}>`,
    to: recipient,
    subject: subject ? subject : "",
    html: htmlBody,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false;
  }
};