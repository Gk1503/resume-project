const express = require("express");
const router = express.Router();
const { getResume } = require("../controllers/resumeController");
const authMiddleware = require("../middleware/authMiddleware"); // JWT middleware

// GET /resume/get
router.get("/get", authMiddleware, getResume);

module.exports = router;
