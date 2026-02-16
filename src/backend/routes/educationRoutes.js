const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  saveEducation,
  getResume,
  deleteEducation,
} = require("../controllers/educationController");

router.post("/save-education", auth, saveEducation);
router.get("/get-resume", auth, getResume);
router.delete("/delete-education/:id", auth, deleteEducation);

module.exports = router;
