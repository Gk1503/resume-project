const mongoose = require("mongoose");

const workHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  JobTitle: { type: String },
  Employer: { type: String },
  JobLocation: { type: String },
  JobStartMonth: { type: String },
  JobStartYear: { type: String },
  JobEndMonth: { type: String },
  JobEndYear: { type: String },
  isFresher: { type: Boolean, default: false },
});

module.exports = mongoose.model("WorkHistory", workHistorySchema);
