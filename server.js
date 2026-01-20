const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://insurance-frontend-kappa.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/plans", require("./routes/plans"));
app.use("/api/users", require("./routes/userAuth"));
app.use("/api/contact", require("./routes/contact"));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
