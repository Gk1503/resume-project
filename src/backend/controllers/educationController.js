const Resume = require("../models/Resume");

// Save education
exports.saveEducation = async (req, res) => {
  try {
    const userId = req.user.id; // from middleware
    const { educationDetails } = req.body;

    if (!educationDetails) {
      return res.status(400).json({ message: "Education details required" });
    }

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

    res.json({
      message: "Education saved successfully",
      education: resume.educationDetails,
    });
  } catch (err) {
    console.error("Save Education Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete education
exports.deleteEducation = async (req, res) => {
  try {
    const userId = req.user.id;
    const educationId = req.params.id;

    const updatedResume = await Resume.findOneAndUpdate(
      { user: userId },
      { $pull: { educationDetails: { _id: educationId } } },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume or education not found" });
    }

    res.json({
      message: "Education deleted successfully",
      education: updatedResume.educationDetails,
    });
  } catch (err) {
    console.error("Delete Education Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Fetch user's resume with education
exports.getResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const resume = await Resume.findOne({ user: userId });

    res.json({
      educationDetails: resume?.educationDetails || [],
    });
  } catch (err) {
    console.error("Get Resume Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
