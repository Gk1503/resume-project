const mongoose = require("mongoose");

const personalDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  FirstName: { type: String, required: true },
  SurName: { type: String, required: true },
  City: { type: String, required: true },
  Country: { type: String, required: true },
  Pincode: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  EmailId: { type: String, required: true },

  LinkedIn: { type: String, default: "" },
  Website: { type: String, default: "" },
  DrivingLicence: { type: String, default: "" },
  DateOfBirth: { type: String, default: "" },
  MaritalStatus: { type: String, default: "" },
  Photo: { type: String, default: "" },
  Hobbies: { type: [String], default: [] }, // Adding hobbies here for easier access
});

module.exports = mongoose.model("PersonalDetails", personalDetailsSchema);
