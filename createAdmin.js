const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

async function run() {
  const hash = await bcrypt.hash("admin123", 10);

  const admin = new User({
    name: "Admin",
    email: "admin@insuraone.com",
    password: hash,
    role: "admin",
  });

  await admin.save();
  console.log("✅ ADMIN CREATED CLEAN");
  process.exit();
}

run();
