import React, { useContext, useEffect, useState, useCallback } from "react";
import "./WorkHistory.css";
import api from "../../../../utils/api.config";
import { ENDPOINTS } from "../../../../utils/constant";
import FormContext from "../../Context/FormContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBriefcase, faGraduationCap, faSave } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button } from "react-bootstrap";

function WorkHistory() {
  const { 
    activeWorkHistory, setActiveWorkHistory, 
    workHistoryList, setWorkHistoryList,
    isFresher, setIsFresher 
  } = useContext(FormContext);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const fetchWorkHistory = useCallback(async () => {
    try {
      const res = await api.get(ENDPOINTS.GET_WORK_HISTORY);
      setWorkHistoryList(res.data);
    } catch (err) {
      console.error("Error fetching work history:", err);
    }
  }, [setWorkHistoryList]);

  useEffect(() => {
    fetchWorkHistory();
  }, [fetchWorkHistory]);

  const validate = () => {
    const newErrors = [];
    const nameRegex = /^[a-zA-Z\s.-]*$/;

    if (!isFresher) {
        if (!activeWorkHistory.JobTitle || activeWorkHistory.JobTitle.trim() === "") {
            newErrors.push("Job Title is required.");
        } else if (!nameRegex.test(activeWorkHistory.JobTitle)) {
            newErrors.push("Job Title cannot contain numbers.");
        }

        if (!activeWorkHistory.Employer || activeWorkHistory.Employer.trim() === "") {
            newErrors.push("Employer is required.");
        } else if (!nameRegex.test(activeWorkHistory.Employer)) {
            newErrors.push("Employer cannot contain numbers.");
        }

        if (!activeWorkHistory.JobLocation || activeWorkHistory.JobLocation.trim() === "") {
            newErrors.push("Job Location is required.");
        }

        if (!activeWorkHistory.JobStartMonth || !activeWorkHistory.JobStartYear) {
            newErrors.push("Start Date (Month and Year) is required.");
        }

        if (!activeWorkHistory.JobEndMonth || !activeWorkHistory.JobEndYear) {
            newErrors.push("End Date (Month and Year) is required.");
        }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActiveWorkHistory((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleFresher = () => {
    setIsFresher((prev) => !prev);
    if (!isFresher) setActiveWorkHistory({});
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    try {
      const res = await api.post(ENDPOINTS.SAVE_WORK_HISTORY, { ...activeWorkHistory, isFresher });
      setMessage("success: Experience saved successfully.");
      
      // Re-fetch to be safe and consistent
      const updated = await api.get(ENDPOINTS.GET_WORK_HISTORY);
      setWorkHistoryList(updated.data);
      
      setActiveWorkHistory({});
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("error: Failed to save work history.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`${ENDPOINTS.DELETE_WORK_HISTORY}/${id}`);
      setWorkHistoryList((prev) => prev.filter((item) => item._id !== id));
      setMessage("success: Experience removed.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Failed to delete work history:", err);
    }
  };

  return (
    <div className="MainWorkHsitory">
      <h1 className="form-title">Tell us about your most recent job</h1>
      <p className="form-subtitle">We’ll start there and work backward.</p>

      {errors.length > 0 && (
        <Alert variant="danger" className="mb-3 mt-3">
            <ul className="mb-0">
                {errors.map((err, idx) => <li key={idx}>{err}</li>)}
            </ul>
        </Alert>
      )}

      {message && (
        <Alert variant={message.startsWith("success") ? "success" : "danger"} className="mb-3 mt-3">
          {message.split(": ")[1]}
        </Alert>
      )}

      <div className="fresher-section">
        <div className="fresher-info">
          <h5>Are you a student or fresh graduate?</h5>
          <p>Toggle this if you don't have work experience yet.</p>
        </div>
        <div className="fresher-toggle-wrap">
          <button 
            type="button" 
            onClick={handleToggleFresher} 
            className={`fresher-btn ${isFresher ? "active" : ""}`}
          >
             <FontAwesomeIcon icon={isFresher ? faGraduationCap : faBriefcase} className="me-2" />
             {isFresher ? "I'm a Fresher" : "Experienced"}
          </button>
        </div>
      </div>

      <form className="work-form" onSubmit={handleSave}>
        {!isFresher && (
          <>
            <div className="workone">
              <div className="form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  name="JobTitle"
                  value={activeWorkHistory.JobTitle || ""}
                  onChange={handleChange}
                  placeholder="e.g. Software Developer"
                  required
                />
              </div>

              <div className="form-group">
                <label>Employer / Company *</label>
                <input
                  type="text"
                  name="Employer"
                  value={activeWorkHistory.Employer || ""}
                  onChange={handleChange}
                  placeholder="e.g. Tech Corp"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="JobLocation"
                value={activeWorkHistory.JobLocation || ""}
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
                    value={activeWorkHistory.JobStartMonth || ""}
                    onChange={handleChange}
                  >
                    <option value="">Month</option>
                    {[
                      "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
                    ].map((month) => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <select
                    name="JobStartYear"
                    value={activeWorkHistory.JobStartYear || ""}
                    onChange={handleChange}
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 40 }, (_, i) => new Date().getFullYear() - i).map((year) => (
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
                    value={activeWorkHistory.JobEndMonth || ""}
                    onChange={handleChange}
                  >
                    <option value="">Month</option>
                    {[
                      "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
                    ].map((month) => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <select
                    name="JobEndYear"
                    value={activeWorkHistory.JobEndYear || ""}
                    onChange={handleChange}
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 40 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="form-actions-bar mt-4">
                 <Button variant="primary" type="submit" className="save-work-btn">
                    <FontAwesomeIcon icon={faSave} className="me-2" /> Save & Add Experience
                 </Button>
            </div>
          </>
        )}

        {isFresher && (
             <div className="form-actions-bar mt-4">
                <Button variant="primary" type="submit" className="save-work-btn">
                    <FontAwesomeIcon icon={faSave} className="me-2" /> Save Fresher Status
                </Button>
            </div>
        )}

        <button type="submit" id="work-form-submit" style={{ display: "none" }}></button>
      </form>

      {workHistoryList.length > 0 && (
        <div className="work-history-cards-wrap">
          <h3>Successfully Added</h3>
          <div className="history-cards-grid">
            {workHistoryList.map((item) => (
              <div className="history-card" key={item._id}>
                <div className="hist-info">
                  <h4>{item.JobTitle || (item.isFresher ? "Fresher Path" : "No Title")}</h4>
                  <p>{item.Employer || "Self-employed"} • {item.JobStartYear} - {item.JobEndYear || "Present"}</p>
                </div>
                <div className="hist-actions">
                  <button onClick={() => handleDelete(item._id)} className="delete-btn">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkHistory;
