const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const User = require("./models/User");
const Resume = require("./models/Resume");
const educationRoutes = require("./routes/educationRoutes");
const personalDetailsRoutes = require("./routes/personalDetailsRoutes");
const workHistoryRoutes = require("./routes/workHistoryRoutes");
const skillRoutes = require("./routes/skillRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const resumeRoutes = require("./routes/resumeRoutes");


const app = express();
app.use(express.json());
app.use(cors());

// -------------------- MongoDB Connection --------------------
mongoose
  .connect("mongodb://127.0.0.1:27017/resume_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// -------------------- Nodemailer Transporter --------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// -------------------- Register API --------------------
app.post("/register", async (req, res) => {
  try {
    const { full_name, email, phone, password } = req.body;
    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      full_name,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------- Login API --------------------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      user: { full_name: user.full_name, email: user.email, phone: user.phone },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------- Other APIs (forgot-password, reset-password etc.) --------------------
// (keep your existing forgot-password, verify-otp, reset-password, get-resume APIs here)

// -------------------- Education Routes --------------------
app.use("/education", educationRoutes);
app.use("/personal-details", personalDetailsRoutes);
app.use("/work-history", workHistoryRoutes);
app.use("/skills", skillRoutes);
app.use("/summary", summaryRoutes);
app.use("/resume", resumeRoutes);

// -------------------- Start Server --------------------
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
