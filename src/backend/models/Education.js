const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  SchoolName: { type: String, required: true },
  SchoolLocation: { type: String },
  Degree: { type: String },
  FieldOfStudy: { type: String },
  GraduationMonth: { type: String },
  GraduationYear: { type: String },
  Score: { type: String },
  GradeType: { type: String },
});

module.exports = mongoose.model("Education", educationSchema, "Education"); // exact collection name
