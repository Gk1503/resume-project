const Education = require("../models/Education");

// Save Education
exports.saveEducation = async (req, res) => {
  try {
    const { educationDetails } = req.body;
    const userId = req.user.id;

    if (!educationDetails.SchoolName) {
      return res.status(400).json({ message: "School Name is required" });
    }

    const newEducation = new Education({ ...educationDetails, userId });
    await newEducation.save();

    const allEducation = await Education.find({ userId });
    res.json({ education: allEducation });
  } catch (err) {
    console.error("Error saving education:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all education
exports.getResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const educationDetails = await Education.find({ userId });
    res.json({ educationDetails });
  } catch (err) {
    console.error("Error fetching education:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Education
exports.deleteEducation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await Education.findOneAndDelete({ _id: id, userId });

    const allEducation = await Education.find({ userId });
    res.json({ education: allEducation });
  } catch (err) {
    console.error("Error deleting education:", err);
    res.status(500).json({ message: "Server error" });
  }
};
