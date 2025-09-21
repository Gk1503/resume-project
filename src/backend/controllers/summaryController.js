const Summary = require("../models/summary");

// Save or update summary
exports.saveSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Summary cannot be empty" });
    }

    // Check if user already has a summary
    let userSummary = await Summary.findOne({ userId });

    if (userSummary) {
      // Update existing
      userSummary.content = content;
      await userSummary.save();
    } else {
      // Create new
      userSummary = await Summary.create({ userId, content });
    }

    res.json({ message: "Summary saved successfully", data: userSummary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving summary", error: err.message });
  }
};

// Get user summary
exports.getSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const summary = await Summary.findOne({ userId });
    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: "Error fetching summary", error: err.message });
  }
};
