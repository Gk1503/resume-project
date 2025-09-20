import React, { useContext } from "react";
import "../WorkHistory/WorkHistory.css";
import FormContext from "../../Context/FormContext";

function WorkHistory() {
  const { workHistory, setworkHistory, isFresher, setIsFresher } = useContext(FormContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setworkHistory(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleFresher = () => {
    setIsFresher(prev => !prev);
  };

  // Save button handler
  const handleSave = () => {
    console.log("Saved Work History:", workHistory);
    alert("Work history saved! Check console for output.");
  };

  return (
    <div className="MainWorkHsitory">
      <h1 className="form-title">Tell us about your most recent job</h1>
      <p className="form-subtitle">We’ll start there and work backward.</p>

      <form className="work-form">
        <div className="workone">
          <div className="form-group one">
            <label>What was your title? *</label>
            <input
              type="text"
              name="JobTitle"
              value={workHistory.JobTitle}
              onChange={handleChange}
              placeholder="e.g. Software Developer"
              disabled={isFresher}
              required
            />
          </div>

          <div className="form-group two">
            <label>Employer *</label>
            <input
              type="text"
              name="Employer"
              value={workHistory.Employer}
              onChange={handleChange}
              placeholder="e.g. Tech Corp"
              disabled={isFresher}
              required
            />
          </div>
        </div>

        <div className="form-group local">
          <label>Location</label>
          <input
            type="text"
            name="JobLocation"
            value={workHistory.JobLocation}
            onChange={handleChange}
            placeholder="e.g. New Delhi, India"
            disabled={isFresher}
          />
        </div>

        <div className="workrow3">
          <div className="form-group">
            <label>Start Date</label>
            <div className="date-inputs">
              <select
                name="JobStartMonth"
                value={workHistory.JobStartMonth}
                onChange={handleChange}
                disabled={isFresher}
              >
                <option>Month</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, idx) => (
                  <option key={idx} value={month}>{month}</option>
                ))}
              </select>
              <select
                name="JobStartYear"
                value={workHistory.JobStartYear}
                onChange={handleChange}
                disabled={isFresher}
              >
                <option>Year</option>
                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(year => (
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
                value={workHistory.JobEndMonth}
                onChange={handleChange}
                disabled={isFresher}
              >
                <option>Month</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, idx) => (
                  <option key={idx} value={month}>{month}</option>
                ))}
              </select>
              <select
                name="JobEndYear"
                value={workHistory.JobEndYear}
                onChange={handleChange}
                disabled={isFresher}
              >
                <option>Year</option>
                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="fresher-button-container">
          <button type="button" onClick={handleToggleFresher} className={`fresher-btn ${isFresher ? "active" : ""}`}>
            {isFresher ? "I am not Fresher" : "Fresher"}
          </button>
        </div>

        {/* Save Button */}
        <div className="save-button-container">
          <button type="button" onClick={handleSave} className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkHistory;
