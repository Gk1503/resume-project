const Personal = require("../models/PersonalDetails");
const Education = require("../models/Education");
const Work = require("../models/WorkHistory");
const Skill = require("../models/skill");
const summary = require("../models/summary")

// Fetch all resume data for a user
exports.getResume = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware

    const personalDetails = await Personal.findOne({ userId });
    const educationDetails = await Education.find({ userId });
    const workHistory = await Work.find({ userId });
    const skills = await Skill.find({ userId });

    const summary = personalDetails?.Summary || "";

    res.json({
      success: true,
      resume: { personalDetails, educationDetails, workHistory, skills, summary },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
