const express = require("express");
const router = express.Router();
const workHistoryController = require("../controllers/workHistoryController");
const authMiddleware = require("../middleware/authMiddleware");

// Save Work History
router.post("/save", authMiddleware, workHistoryController.saveWorkHistory);

// Get Work History
router.get("/get", authMiddleware, workHistoryController.getWorkHistory);

// Delete Work History
router.delete("/delete/:id", authMiddleware, workHistoryController.deleteWorkHistory);

module.exports = router;
