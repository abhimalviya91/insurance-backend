const router = require("express").Router();
const Plan = require("../models/Plan");
const auth = require("../middleware/authMiddleware");

// ADD
router.post("/", auth, async (req, res) => {
    console.log("Admin add plan", req.body);
  const plan = new Plan(req.body);
  await plan.save();
  res.json(plan);
});

// GET (public)
router.get("/", async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  await Plan.findByIdAndUpdate(req.params.id, req.body);
  res.json("Updated");
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;
