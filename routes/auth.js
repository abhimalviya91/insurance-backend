const router = require("express").Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("LOGIN TRY:", email);

  const admin = await Admin.findOne({ email });
  if (!admin) {
    console.log("ADMIN NOT FOUND");
    return res.status(401).json("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    console.log("PASSWORD WRONG");
    return res.status(401).json("Invalid credentials");
  }

  const token = jwt.sign({ id: admin._id }, "secretkey");
  res.json({ token });
});

module.exports = router;
