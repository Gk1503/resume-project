const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

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

// -------------------- User Schema --------------------
const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
  otp: String,
  otpExpires: Date,
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);

// -------------------- Resume Schema --------------------
const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  personalDetails: Object,
  educationDetails: [
    {
      SchoolName: String,
      SchoolLocation: String,
      Degree: String,
      FieldOfStudy: String,
      GraduationMonth: String,
      GraduationYear: String,
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    },
  ],
  workHistory: Object,
  isFresher: Boolean,
  skills: [{ name: String, rating: Number }],
  summary: String,
  createdAt: { type: Date, default: Date.now },
});
const Resume = mongoose.model("Resume", resumeSchema);

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

// -------------------- Forgot Password --------------------
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `<p>Your OTP for password reset is: <b>${otp}</b></p><p>Valid for 15 minutes.</p>`,
    };
    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent to your email." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------- Verify OTP --------------------
app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------- Reset Password --------------------
app.post("/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------- Fetch Resume --------------------
app.get("/get-resume", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const resume = await Resume.findOne({ user: userId });
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------- Save Education --------------------
app.post("/save-education", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { educationDetails } = req.body;
    if (!educationDetails)
      return res.status(400).json({ message: "Education details required" });

    let resume = await Resume.findOne({ user: userId });

    if (!resume) {
      resume = new Resume({
        user: userId,
        educationDetails: [educationDetails],
      });
    } else {
      if (!resume.educationDetails) resume.educationDetails = [];
      resume.educationDetails.push(educationDetails);
    }

    await resume.save();

    res.json({ message: "Education saved successfully", education: resume.educationDetails });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------- Delete Education --------------------
app.delete("/delete-education/:id", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const educationId = req.params.id;

    const updatedResume = await Resume.findOneAndUpdate(
      { user: userId },
      { $pull: { educationDetails: { _id: educationId } } },
      { new: true }
    );

    if (!updatedResume)
      return res.status(404).json({ message: "Resume or education not found" });

    res.json({ message: "Education deleted successfully", education: updatedResume.educationDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------- Start Server --------------------
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
