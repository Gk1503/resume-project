const WorkHistory = require("../models/WorkHistory");

// Save Work History
exports.saveWorkHistory = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { JobTitle, Employer, JobLocation, JobStartMonth, JobStartYear, JobEndMonth, JobEndYear, isFresher } = req.body;

    if (isFresher) {
      // If fresher, just save one record with fresher = true
      const fresherEntry = new WorkHistory({ userId, isFresher: true });
      await fresherEntry.save();
      return res.json({ message: "Saved as Fresher", data: fresherEntry });
    }

    const newWork = new WorkHistory({
      userId,
      JobTitle,
      Employer,
      JobLocation,
      JobStartMonth,
      JobStartYear,
      JobEndMonth,
      JobEndYear,
      isFresher: false,
    });

    await newWork.save();
    res.json({ message: "Work history saved", data: newWork });
  } catch (err) {
    res.status(500).json({ message: "Error saving work history", error: err.message });
  }
};

// Get all work histories of a user
exports.getWorkHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const workHistory = await WorkHistory.find({ userId });
    res.json(workHistory);
  } catch (err) {
    res.status(500).json({ message: "Error fetching work history", error: err.message });
  }
};

// Delete a work history
exports.deleteWorkHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await WorkHistory.findByIdAndDelete(id);
    res.json({ message: "Work history deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting work history", error: err.message });
  }
};
