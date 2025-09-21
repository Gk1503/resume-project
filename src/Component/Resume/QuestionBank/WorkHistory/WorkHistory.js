import React, { useContext, useEffect, useState } from "react";
import "../WorkHistory/WorkHistory.css";
import axios from "axios";
import FormContext from "../../Context/FormContext";

function WorkHistory() {
  const { workHistory, setworkHistory, isFresher, setIsFresher } = useContext(FormContext);
  const [savedWorkHistory, setSavedWorkHistory] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch saved work history on mount
  useEffect(() => {
    const fetchWorkHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/work-history/get", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedWorkHistory(res.data);
      } catch (err) {
        console.error("Error fetching work history:", err);
      }
    };
    fetchWorkHistory();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setworkHistory((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle Fresher
  const handleToggleFresher = () => {
    setIsFresher((prev) => !prev);
    if (!isFresher) {
      setworkHistory({}); // Clear work history fields if Fresher
    }
  };

  // Save work history
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ You must be logged in to save work history.");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/work-history/save",
        { ...workHistory, isFresher },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ " + res.data.message);
      setSavedWorkHistory((prev) => [res.data.data, ...prev]);
      setworkHistory({});
      if (isFresher) setIsFresher(true);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Failed to save work history.");
    }
  };

  // Delete work history
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/work-history/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedWorkHistory((prev) => prev.filter((item) => item._id !== id));
      setMessage("✅ Work history deleted");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to delete work history");
    }
  };

  return (
    <div className="MainWorkHsitory">
      <h1 className="form-title">Tell us about your most recent job</h1>
      <p className="form-subtitle">We’ll start there and work backward.</p>

      <form className="work-form">
        {!isFresher && (
          <>
            <div className="workone">
              <div className="form-group one">
                <label>What was your title? *</label>
                <input
                  type="text"
                  name="JobTitle"
                  value={workHistory.JobTitle || ""}
                  onChange={handleChange}
                  placeholder="e.g. Software Developer"
                  required
                />
              </div>

              <div className="form-group two">
                <label>Employer *</label>
                <input
                  type="text"
                  name="Employer"
                  value={workHistory.Employer || ""}
                  onChange={handleChange}
                  placeholder="e.g. Tech Corp"
                  required
                />
              </div>
            </div>

            <div className="form-group local">
              <label>Location</label>
              <input
                type="text"
                name="JobLocation"
                value={workHistory.JobLocation || ""}
                onChange={handleChange}
                placeholder="e.g. New Delhi, India"
              />
            </div>

            <div className="workrow3">
              <div className="form-group">
                <label>Start Date</label>
                <div className="date-inputs">
                  <select
                    name="JobStartMonth"
                    value={workHistory.JobStartMonth || ""}
                    onChange={handleChange}
                  >
                    <option value="">Month</option>
                    {[
                      "January","February","March","April","May","June","July","August","September","October","November","December"
                    ].map((month) => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <select
                    name="JobStartYear"
                    value={workHistory.JobStartYear || ""}
                    onChange={handleChange}
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>End Date</label>
                <div className="date-inputs">
                  <select
                    name="JobEndMonth"
                    value={workHistory.JobEndMonth || ""}
                    onChange={handleChange}
                  >
                    <option value="">Month</option>
                    {[
                      "January","February","March","April","May","June","July","August","September","October","November","December"
                    ].map((month) => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <select
                    name="JobEndYear"
                    value={workHistory.JobEndYear || ""}
                    onChange={handleChange}
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="fresher-button-container">
          <button type="button" onClick={handleToggleFresher} className={`fresher-btn ${isFresher ? "active" : ""}`}>
            {isFresher ? "I am not Fresher" : "Fresher"}
          </button>
        </div>

        <div className="save-button-container">
          <button type="button" onClick={handleSave} className="save-btn">
            Save
          </button>
        </div>
      </form>

      {message && <p className="status-message">{message}</p>}

      {/* Table of saved work history */}
      {savedWorkHistory.length > 0 && (
        <div className="work-history-table">
          <h3>Saved Work History</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Employer</th>
                <th>Location</th>
                <th>Start</th>
                <th>End</th>
                <th>Fresher</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {savedWorkHistory.map((item) => (
                <tr key={item._id}>
                  <td>{item.JobTitle || "-"}</td>
                  <td>{item.Employer || "-"}</td>
                  <td>{item.JobLocation || "-"}</td>
                  <td>{item.JobStartMonth}/{item.JobStartYear}</td>
                  <td>{item.JobEndMonth}/{item.JobEndYear}</td>
                  <td>{item.isFresher ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => handleDelete(item._id)} className="delete-btn">Delete</button>
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

export default WorkHistory;
