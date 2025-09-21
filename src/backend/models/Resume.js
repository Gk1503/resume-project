const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  SchoolName: String,
  SchoolLocation: String,
  Degree: String,
  FieldOfStudy: String,
  GraduationMonth: String,
  GraduationYear: String,
});

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  educationDetails: [educationSchema],
});

module.exports = mongoose.model("Resume", resumeSchema);
