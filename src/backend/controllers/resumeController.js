const jwt = require("jsonwebtoken");
const Resume = require("../models/Resume");

// Save or update personal details
exports.savePersonalDetails = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { personalDetails } = req.body;
    if (!personalDetails)
      return res.status(400).json({ message: "Personal details required" });

    let resume = await Resume.findOne({ user: userId });
    if (!resume) {
      resume = new Resume({ user: userId, personalDetails });
    } else {
      resume.personalDetails = personalDetails;
    }

    await resume.save();
    res.json({ message: "Personal details saved", personalDetails: resume.personalDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Save or update education
exports.saveEducation = async (req, res) => {
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
      resume = new Resume({ user: userId, educationDetails: [educationDetails] });
    } else {
      if (!resume.educationDetails) resume.educationDetails = [];
      resume.educationDetails.push(educationDetails);
    }

    await resume.save();
    res.json({ message: "Education saved", education: resume.educationDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Save or update work history
exports.saveWorkHistory = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { work } = req.body;
    if (!work) return res.status(400).json({ message: "Work history required" });

    let resume = await Resume.findOne({ user: userId });
    if (!resume) {
      resume = new Resume({ user: userId, workHistory: [work] });
    } else {
      if (!resume.workHistory) resume.workHistory = [];
      resume.workHistory.push(work);
    }

    await resume.save();
    res.json({ message: "Work history saved", workHistory: resume.workHistory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Save or update skills
exports.saveSkills = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { skills } = req.body;
    if (!skills) return res.status(400).json({ message: "Skills required" });

    let resume = await Resume.findOne({ user: userId });
    if (!resume) {
      resume = new Resume({ user: userId, skills });
    } else {
      resume.skills = skills;
    }

    await resume.save();
    res.json({ message: "Skills saved", skills: resume.skills });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Save or update summary
exports.saveSummary = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { summary } = req.body;

    let resume = await Resume.findOne({ user: userId });
    if (!resume) {
      resume = new Resume({ user: userId, summary });
    } else {
      resume.summary = summary;
    }

    await resume.save();
    res.json({ message: "Summary saved", summary: resume.summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get full resume
exports.getResume = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const resume = await Resume.findOne({ user: userId });
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
