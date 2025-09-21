const express = require("express");
const router = express.Router();
const {
  savePersonalDetails,
  getPersonalDetails,
} = require("../controllers/personalDetailsController");

// Save or Update
router.post("/save", savePersonalDetails);

// Get
router.get("/get", getPersonalDetails);

module.exports = router;
