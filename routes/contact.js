const router = require("express").Router();
const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

// 📩 SAVE CONTACT (PUBLIC)
router.post("/", async (req, res) => {
  try {
    console.log("📩 CONTACT API HIT");
    console.log("BODY:", req.body);

    const { name, email, phone, message } = req.body;

    // 1️⃣ Save to DB
    const contact = new Contact({
      name,
      email,
      phone,
      message,
    });
    await contact.save();
    console.log("✅ CONTACT SAVED");

    // 2️⃣ Send email
    await sendEmail({ name, email, phone, message });
    console.log("✅ EMAIL FUNCTION CALLED");

    // 3️⃣ Response
    res.json({ success: true });
  } catch (err) {
    console.log("❌ CONTACT ROUTE ERROR", err);
    res.status(500).json({ success: false });
  }
});

// 📥 GET ALL CONTACTS (ADMIN DASHBOARD)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json([]);
  }
});

module.exports = router;
