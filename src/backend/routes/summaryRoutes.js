const express = require("express");
const router = express.Router();
const summaryController = require("../controllers/summaryController");
const authMiddleware = require("../middleware/authMiddleware");

// Save or update summary
router.post("/save", authMiddleware, summaryController.saveSummary);

// Get user summary
router.get("/get", authMiddleware, summaryController.getSummary);

module.exports = router;
