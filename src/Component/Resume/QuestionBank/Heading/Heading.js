import React, { useContext, useState, useEffect, useCallback } from "react";
import "./Heading.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import api from "../../../../utils/api.config";
import { ENDPOINTS } from "../../../../utils/constant";
import FormContext from "../../Context/FormContext";

function HeadingQuestion() {
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [showDriving, setShowDriving] = useState(false);
  const { personalDetails, setPersonalDetails } = useContext(FormContext);
  const [message, setMessage] = useState("");

  const fetchPersonalDetails = useCallback(async () => {
    try {
      const res = await api.get(ENDPOINTS.GET_PERSONAL_DETAILS);
      if (res.data) {
        setPersonalDetails(res.data);
        if (res.data.LinkedIn) setShowLinkedIn(true);
        if (res.data.Website) setShowWebsite(true);
        if (res.data.DrivingLicence) setShowDriving(true);
      }
    } catch (err) {
      console.error("❌ Error fetching details:", err);
    }
  }, [setPersonalDetails]);

  useEffect(() => {
    fetchPersonalDetails();
  }, [fetchPersonalDetails]);

  const handleChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await api.post(ENDPOINTS.SAVE_PERSONAL_DETAILS, personalDetails);
      setMessage("success: " + res.data.message);
    } catch (err) {
      setMessage("error: " + (err.response?.data?.message || "Failed to save details."));
    }
  };

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
      <h1 id="Designhtag">What’s the best way for employers to contact you?</h1>
      <h6 id="Designhtag">We suggest including an email and phone number.</h6>

      <div id="indicates">* indicates a required field</div>

      <form onSubmit={handleSave} className="lum-builder-form">
        <div className="mainfromdiv">
          <div id="sideone" className="sidedes">
            <div>
              <label>First Name *</label>
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
              <label>City *</label>
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
              <label>Phone Number *</label>
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
              <label>Surname *</label>
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
              <div className="country-unit">
                <label>Country *</label>
                <input
                  type="text"
                  className="countryy"
                  placeholder="e.g. India"
                  name="Country"
                  value={personalDetails.Country || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="pincode-unit">
                <label>Pincode *</label>
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
            </div>

            <div>
              <label>Email *</label>
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

        <div className="additional-details-section">
          <h3>Additional Details</h3>
          <div className="form-row-custom">
            <div>
              <label>Date of Birth</label>
              <input 
                type="date" 
                name="DateOfBirth" 
                value={personalDetails.DateOfBirth || ""} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Marital Status</label>
              <select name="MaritalStatus" value={personalDetails.MaritalStatus || ""} onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
          </div>
          

        </div>

        {/* Hidden Trigger for Global Nav Save */}
        <button type="submit" id="heading-form-submit" style={{ display: "none" }}></button>
      </form>

      {message && (
        <p className={`status-message ${message.startsWith("success") ? "text-success" : "text-danger"}`}>
          {message.split(": ")[1]}
        </p>
      )}

      <div className="AdditionalInformation">
        <h6 className="AdditionalInfor">Add additional information (optional)</h6>
        <div className="additional-btn-wrap">
          {!showLinkedIn && (
            <button className="btn-add-optional" onClick={() => setShowLinkedIn(true)}>
              <FontAwesomeIcon icon={faPlus} /> LinkedIn
            </button>
          )}
          {!showWebsite && (
            <button className="btn-add-optional" onClick={() => setShowWebsite(true)}>
              <FontAwesomeIcon icon={faPlus} /> Website
            </button>
          )}
          {!showDriving && (
            <button className="btn-add-optional" onClick={() => setShowDriving(true)}>
              <FontAwesomeIcon icon={faPlus} /> Driving Licence
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeadingQuestion;
