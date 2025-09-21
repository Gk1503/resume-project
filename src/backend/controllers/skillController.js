const Skill = require("../models/skill");

// Save skills
exports.saveSkills = async (req, res) => {
  try {
    const userId = req.user.id;
    const skills = req.body.skills;

    if (!skills || skills.length === 0) {
      return res.status(400).json({ message: "No skills provided" });
    }

    // Optional: remove old skills
    await Skill.deleteMany({ userId });

    // Insert new skills
    const savedSkills = await Skill.insertMany(
      skills.map((s) => ({ ...s, userId }))
    );

    res.json({ message: "Skills saved successfully", data: savedSkills });
  } catch (err) {
    res.status(500).json({ message: "Error saving skills", error: err.message });
  }
};

// Get all skills of a user
exports.getSkills = async (req, res) => {
  try {
    const userId = req.user.id;
    const skills = await Skill.find({ userId });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: "Error fetching skills", error: err.message });
  }
};

// Delete skill
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    await Skill.findByIdAndDelete(id);
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting skill", error: err.message });
  }
};
