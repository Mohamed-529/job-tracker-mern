require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
const cors = require("cors");

app.use(cors({
  origin: "https://job-tracker-mern-eight.vercel.app",
  credentials: true
}));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
