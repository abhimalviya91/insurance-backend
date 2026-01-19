require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.ADMIN_EMAIL,
  subject: "Test Mail",
  text: "This is a test email from InsuraOne",
}, (err, info) => {
  if (err) {
    console.log("❌ ERROR:", err);
  } else {
    console.log("✅ SUCCESS:", info.response);
  }
});
