const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillController");
const authMiddleware = require("../middleware/authMiddleware");

// Save all skills
router.post("/save", authMiddleware, skillController.saveSkills);

// Get all skills
router.get("/get", authMiddleware, skillController.getSkills);

// Delete single skill
router.delete("/delete/:id", authMiddleware, skillController.deleteSkill);

module.exports = router;
