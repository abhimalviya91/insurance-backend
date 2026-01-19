const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  await Admin.deleteMany(); // old admins clean (safe for dev)

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = new Admin({
    email: "admin@insuraone.com",
    password: hashedPassword,
  });

  await admin.save();
  console.log("ADMIN CREATED");
  process.exit();
}

createAdmin();
