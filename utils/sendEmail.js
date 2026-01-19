const nodemailer = require("nodemailer");

module.exports = async function sendEmail(data) {
  try {
    console.log("📨 EMAIL FUNCTION HIT");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"InsuraOne Lead" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Contact Lead Received",
      html: `
        <h3>New Contact Lead</h3>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Message:</b> ${data.message}</p>
      `,
    });

    // console.log("✅ EMAIL SENT:", info.response);
  } catch (err) {
    console.log("❌ EMAIL ERROR");
    console.log(err);
  }
};
