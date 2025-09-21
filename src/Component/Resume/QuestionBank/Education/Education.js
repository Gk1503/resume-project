import React, { useState, useEffect } from "react";
import "../Education/Education.css";
import axios from "axios";

function Education() {
  const emptyEducation = {
    SchoolName: "",
    SchoolLocation: "",
    Degree: "",
    FieldOfStudy: "",
    GraduationMonth: "",
    GraduationYear: "",
  };

  const [education, setEducation] = useState(emptyEducation);
  const [savedEducations, setSavedEducations] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch saved education on component mount
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "http://localhost:5000/education/get-resume",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.educationDetails) {
          setSavedEducations(res.data.educationDetails);
        }
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to fetch education.");
        setTimeout(() => setMessage(""), 3000);
      }
    };
    fetchEducation();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation({ ...education, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ You must be logged in to save education.");
        return;
      }

      // Clean default Month/Year values
      const eduToSave = { ...education };
      if (eduToSave.GraduationMonth === "Month") eduToSave.GraduationMonth = "";
      if (eduToSave.GraduationYear === "Year") eduToSave.GraduationYear = "";

      const res = await axios.post(
        "http://localhost:5000/education/save-education",
        { educationDetails: eduToSave },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSavedEducations(res.data.education);
      setEducation(emptyEducation);
      setMessage("✅ Education saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Failed to save education.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDelete = async (index) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ You must be logged in to delete education.");
        return;
      }

      const eduId = savedEducations[index]._id;

      const res = await axios.delete(
        `http://localhost:5000/education/delete-education/${eduId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSavedEducations(res.data.education);
      setMessage("🗑️ Education deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Failed to delete education.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="education">
      <h2>Tell us about your education</h2>
      <p>
        Enter your education experience so far, even if you are a current student or did not graduate.
      </p>

      {/* Education Form */}
      <form className="education-form" onSubmit={handleSave}>
        <div className="form-row">
          <div className="form-group">
            <label>School Name *</label>
            <input
              name="SchoolName"
              type="text"
              value={education.SchoolName}
              onChange={handleChange}
              placeholder="e.g. Oxford Software Institute"
              required
            />
          </div>
          <div className="form-group">
            <label>School Location</label>
            <input
              name="SchoolLocation"
              type="text"
              value={education.SchoolLocation}
              onChange={handleChange}
              placeholder="e.g. New Delhi, India"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group fullwidth">
            <label>Degree</label>
            <select
              name="Degree"
              value={education.Degree}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="bachelor">Bachelor’s</option>
              <option value="master">Master’s</option>
              <option value="phd">Ph.D</option>
              <option value="diploma">Diploma</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Field of Study</label>
            <input
              type="text"
              name="FieldOfStudy"
              value={education.FieldOfStudy}
              onChange={handleChange}
              placeholder="e.g. Financial Accounting"
            />
          </div>
          <div className="form-group">
            <label>Graduation Date (or expected)</label>
            <div className="grad-date-selectors">
              <select
                name="GraduationMonth"
                value={education.GraduationMonth}
                onChange={handleChange}
              >
                <option>Month</option>
                {[
                  "January","February","March","April","May","June",
                  "July","August","September","October","November","December"
                ].map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <select
                name="GraduationYear"
                value={education.GraduationYear}
                onChange={handleChange}
              >
                <option>Year</option>
                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i).map(
                  (year) => <option key={year} value={year}>{year}</option>
                )}
              </select>
            </div>
          </div>
        </div>

        <div className="form-row">
          <button type="submit" className="save-btn">
            💾 Save Education
          </button>
        </div>
      </form>

      {message && <p className="status-message">{message}</p>}

      {/* Saved Education Table */}
      {savedEducations.length > 0 && (
        <div className="saved-education-table">
          <h3>Saved Education</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>School Name</th>
                <th>Location</th>
                <th>Degree</th>
                <th>Field of Study</th>
                <th>Graduation Month</th>
                <th>Graduation Year</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {savedEducations.map((edu, idx) => (
                <tr key={edu._id || idx}>
                  <td>{idx + 1}</td>
                  <td>{edu.SchoolName}</td>
                  <td>{edu.SchoolLocation}</td>
                  <td>{edu.Degree}</td>
                  <td>{edu.FieldOfStudy}</td>
                  <td>{edu.GraduationMonth}</td>
                  <td>{edu.GraduationYear}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(idx)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Education;
