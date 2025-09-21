const express = require("express");
const router = express.Router();
const {
  savePersonalDetails,
  saveEducation,
  saveWorkHistory,
  saveSkills,
  saveSummary,
  getResume,
} = require("../controllers/resumeController");

router.post("/personal-details", savePersonalDetails);
router.post("/education", saveEducation);
router.post("/work-history", saveWorkHistory);
router.post("/skills", saveSkills);
router.post("/summary", saveSummary);
router.get("/get", getResume);

module.exports = router;
