require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // BUG FIX: was imported twice — second `const cors = require("cors")` threw a SyntaxError

const app = express();

app.use(express.json());

// BUG FIX: cors() must be called ONCE before any routes
app.use(cors({
  origin: "https://job-tracker-mern-eight.vercel.app",
  credentials: true,
}));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));

// Health-check endpoint — lets frontend ping to wake the Render server before the user logs in
app.get("/api/ping", (req, res) => res.json({ ok: true }));

app.listen(5000, () => console.log("Server running on port 5000"));

