const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: String,
  price: String,
  term: String,
  description: String,
});

module.exports = mongoose.model("Plan", PlanSchema);
