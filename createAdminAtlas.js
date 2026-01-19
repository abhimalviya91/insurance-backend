const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  const email = "abhimalviya013@gmail.com";

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("⚠️ Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = new User({
    name: "Admin",
    email,
    password: hashedPassword,
    role: "admin", // 🔥 MOST IMPORTANT
  });

  await admin.save();

  console.log("✅ ADMIN CREATED IN ATLAS");
  process.exit();
}

createAdmin();
