const express = require("express");
const router = express.Router();
const {
  saveEducation,
  deleteEducation,
  getResume,
} = require("../controllers/educationController");
const authMiddleware = require("../middleware/authMiddleware");

// All routes protected
router.post("/save-education", authMiddleware, saveEducation);
router.delete("/delete-education/:id", authMiddleware, deleteEducation);
router.get("/get-resume", authMiddleware, getResume);

module.exports = router;
