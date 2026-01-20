const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  const hashed = await bcrypt.hash("admin123", 10);

  const admin = new User({
    name: "Admin",
    email: "abhimalviya013@gmail.com",
    password: hashed,
    role: "admin",
  });

  await admin.save();
  console.log("✅ ADMIN CREATED CLEANLY");
  process.exit();
}

createAdmin();
