const router = require("express").Router();
const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {
  try {
    console.log("📩 CONTACT API HIT");
    console.log("BODY:", req.body);

    // 1️⃣ save to DB
    const contact = new Contact(req.body);
    await contact.save();
    console.log("✅ CONTACT SAVED");

    // 2️⃣ send email (🔥 THIS WAS NOT FIRING)
    await sendEmail(req.body);
    console.log("✅ EMAIL FUNCTION CALLED");

    // 3️⃣ respond
    res.json({ success: true });
  } catch (err) {
    console.log("❌ CONTACT ROUTE ERROR");
    console.log(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
