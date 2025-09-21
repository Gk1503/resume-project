const PersonalDetails = require("../models/PersonalDetails");
const jwt = require("jsonwebtoken");

// 🔹 Save or Update Personal Details
exports.savePersonalDetails = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const {
      FirstName,
      SurName,
      City,
      Country,
      Pincode,
      PhoneNumber,
      EmailId,
      LinkedIn,
      Website,
      DrivingLicence,
    } = req.body;

    // If personal details already exist, update them
    let details = await PersonalDetails.findOne({ userId });

    if (details) {
      details.FirstName = FirstName;
      details.SurName = SurName;
      details.City = City;
      details.Country = Country;
      details.Pincode = Pincode;
      details.PhoneNumber = PhoneNumber;
      details.EmailId = EmailId;
      details.LinkedIn = LinkedIn;
      details.Website = Website;
      details.DrivingLicence = DrivingLicence;

      await details.save();
      return res.json({ message: "Personal details updated", details });
    }

    // Else create new record
    const newDetails = new PersonalDetails({
      userId,
      FirstName,
      SurName,
      City,
      Country,
      Pincode,
      PhoneNumber,
      EmailId,
      LinkedIn,
      Website,
      DrivingLicence,
    });

    await newDetails.save();
    res.status(201).json({ message: "Personal details saved", details: newDetails });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🔹 Get Personal Details for a User
exports.getPersonalDetails = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const details = await PersonalDetails.findOne({ userId });
    if (!details) return res.status(404).json({ message: "No details found" });

    res.json(details);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
