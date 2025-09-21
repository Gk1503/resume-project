import React, { useContext, useState, useEffect } from "react";
import "../../QuestionBank/Heading/Heading.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import FormContext from "../../Context/FormContext";

function HeadingQuestion() {
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [showDriving, setShowDriving] = useState(false);
  const { personalDetails, setPersonalDetails } = useContext(FormContext);
  const [message, setMessage] = useState("");

  // Fetch saved personal details on mount
  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/personal-details/get", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          setPersonalDetails(res.data);

          // Auto-show optional fields if they have values
          if (res.data.LinkedIn) setShowLinkedIn(true);
          if (res.data.Website) setShowWebsite(true);
          if (res.data.DrivingLicence) setShowDriving(true);
        }
      } catch (err) {
        console.error("❌ Error fetching details:", err);
      }
    };

    fetchPersonalDetails();
  }, [setPersonalDetails]);

  // Handle input change
  const handleChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Save / Update details
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ You must be logged in to save details.");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/personal-details/save",
        personalDetails,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ " + res.data.message);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Failed to save details.");
    }
  };

  // Render extra field with delete button
  const renderInputField = (label, showSetter, key) => (
    <div className="input-wrapper">
      <label>{label}</label>
      <div className="input-with-delete">
        <input
          type="text"
          name={key}
          placeholder={`Enter your ${label}`}
          value={personalDetails[key] || ""}
          onChange={handleChange}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="faTrash"
          onClick={() => {
            setPersonalDetails({ ...personalDetails, [key]: "" });
            showSetter(false);
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="Desgin2">
      <h1 id="Designhtag">
        What’s the best way for employers to <br />
        contact you?
      </h1>
      <h6 id="Designhtag">We suggest including an email and phone number.</h6>

      <div id="indicates">* indicates a required field</div>

      <form onSubmit={handleSave}>
        <div className="mainfromdiv">
          <div id="sideone" className="sidedes">
            <div>
              <label htmlFor="FirstName">FIRSTNAME *</label>
              <input
                name="FirstName"
                type="text"
                value={personalDetails.FirstName || ""}
                onChange={handleChange}
                placeholder="e.g. Saanvi"
                required
              />
            </div>

            <div>
              <label htmlFor="City">CITY *</label>
              <input
                type="text"
                placeholder="e.g. Mumbai"
                value={personalDetails.City || ""}
                onChange={handleChange}
                name="City"
                required
              />
            </div>

            <div>
              <label htmlFor="PhoneNumber">PHONENUMBER *</label>
              <input
                type="text"
                placeholder="e.g. +91 22 1234 5677"
                name="PhoneNumber"
                value={personalDetails.PhoneNumber || ""}
                onChange={handleChange}
                required
              />
            </div>

            {showLinkedIn && renderInputField("LinkedIn", setShowLinkedIn, "LinkedIn")}
            {showWebsite && renderInputField("Website", setShowWebsite, "Website")}
          </div>

          <div id="sidetwo" className="sidedes">
            <div>
              <label htmlFor="SurName">SURNAME *</label>
              <input
                type="text"
                placeholder="e.g. Patel"
                value={personalDetails.SurName || ""}
                onChange={handleChange}
                name="SurName"
                required
              />
            </div>

            <div id="country">
              <label htmlFor="Country">COUNTRY *</label>&nbsp;&nbsp;
              <label htmlFor="Pincode">PINCODE *</label>
              <br />
              <input
                type="text"
                className="countryy"
                placeholder="e.g. India"
                name="Country"
                value={personalDetails.Country || ""}
                onChange={handleChange}
                required
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                className="country"
                placeholder="e.g. 123456"
                name="Pincode"
                value={personalDetails.Pincode || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="EmailId">EMAIL *</label>
              <input
                type="email"
                placeholder="e.g. Spatel@Sample.in"
                name="EmailId"
                value={personalDetails.EmailId || ""}
                onChange={handleChange}
                required
              />
            </div>

            {showDriving && renderInputField("Driving Licence", setShowDriving, "DrivingLicence")}
          </div>
        </div>

        {/* Save Button */}
        <div style={{ marginTop: "20px" }}>
          <button type="submit" className="save-btn">💾 Save Personal Details</button>
        </div>
      </form>

      {message && <p className="status-message">{message}</p>}

      <div className="AdditionalInformation">
        <h6 className="AdditionalInfor">
          Add additional information to your resume (optional)
        </h6>
        {!showLinkedIn && (
          <button onClick={() => setShowLinkedIn(true)}>LinkedIn</button>
        )}
       
        {!showWebsite && (
          <button onClick={() => setShowWebsite(true)}>Website</button>
        )}
      </div>
    </div>
  );
}

export default HeadingQuestion;
