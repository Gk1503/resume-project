import React, { useContext, useEffect, useCallback } from "react";
import "./Education.css";
import api from "../../../../utils/api.config";
import { ENDPOINTS } from "../../../../utils/constant";
import FormContext from "../../Context/FormContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Education() {
  const { 
    activeEducation, setActiveEducation, 
    educationList, setEducationList 
  } = useContext(FormContext);

  const emptyEducation = {
    SchoolName: "",
    SchoolLocation: "",
    Degree: "",
    FieldOfStudy: "",
    GraduationMonth: "",
    GraduationYear: "",
    Score: "",
    GradeType: ""
  };

  const fetchEducation = useCallback(async () => {
    try {
      const res = await api.get(ENDPOINTS.GET_EDUCATION);
      const data = res.data.educationDetails || res.data.education || res.data || [];
      setEducationList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }, [setEducationList]);

  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Conditional logic for Degree change
    if (name === "Degree") {
      let gradeType = "";
      if (value === "10th" || value === "12th") gradeType = "Percentage";
      else if (value) gradeType = "CGPA";

      setActiveEducation({ 
        ...activeEducation, 
        Degree: value,
        FieldOfStudy: "", // Reset field of study on degree change
        Score: "", // Reset score on degree change
        GradeType: gradeType
      });
    } else {
      setActiveEducation({ ...activeEducation, [name]: value });
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      const eduToSave = { ...activeEducation };
      
      // Ensure GradeType is set if not already
      if (!eduToSave.GradeType && eduToSave.Degree) {
        if (eduToSave.Degree === "10th" || eduToSave.Degree === "12th") {
          eduToSave.GradeType = "Percentage";
        } else {
           eduToSave.GradeType = "CGPA";
        }
      }

      if (eduToSave.GraduationMonth === "Month") eduToSave.GraduationMonth = "";
      if (eduToSave.GraduationYear === "Year") eduToSave.GraduationYear = "";

      console.log("=== SAVING EDUCATION ===");
      console.log("Data being sent to API:", eduToSave);

      const res = await api.post(ENDPOINTS.SAVE_EDUCATION, { educationDetails: eduToSave });

      console.log("API Response:", res.data);

      const data = res.data.educationDetails || res.data.education || res.data || [];
      console.log("Extracted education list:", data);
      
      setEducationList(Array.isArray(data) ? data : educationList); 
      setActiveEducation(emptyEducation);
    } catch (err) {
      console.error("Failed to save education:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`${ENDPOINTS.DELETE_EDUCATION}/${id}`);
      const data = res.data.educationDetails || res.data.education || res.data || [];
      setEducationList(Array.isArray(data) ? data : educationList.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to delete education:", err);
    }
  };

  return (
    <div className="education">
      <h2>Tell us about your education</h2>
      <p>
        Enter your education experience so far, even if you are a current student or did not graduate.
      </p>

      <form className="education-form" onSubmit={handleSave}>
        <div className="form-row">
          <div className="form-group">
            <label>School Name *</label>
            <input
              name="SchoolName"
              type="text"
              value={activeEducation.SchoolName || ""}
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
              value={activeEducation.SchoolLocation || ""}
              onChange={handleChange}
              placeholder="e.g. New Delhi, India"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Degree</label>
            <select
              name="Degree"
              value={activeEducation.Degree || ""}
              onChange={handleChange}
            >
              <option value="">Select Degree</option>
              <option value="10th">10th Standard</option>
              <option value="12th">12th Standard</option>
              <option value="Bachelor's">Bachelor’s</option>
              <option value="Master's">Master’s</option>
              <option value="Ph.D">Ph.D</option>
              <option value="Diploma">Diploma</option>
              <option value="Associate">Associate Degree</option>
            </select>
          </div>

          {activeEducation.Degree !== "10th" && (
            <div className="form-group">
              <label>Field of Study</label>
              {activeEducation.Degree === "12th" ? (
                <select 
                  name="FieldOfStudy"
                  value={activeEducation.FieldOfStudy || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Stream</option>
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <input
                  type="text"
                  name="FieldOfStudy"
                  value={activeEducation.FieldOfStudy || ""}
                  onChange={handleChange}
                  placeholder="e.g. Financial Accounting"
                />
              )}
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
             <label>{activeEducation.GradeType === "Percentage" ? "Percentage (%)" : "CGPA"}</label>
             <input
                type="text"
                name="Score"
                value={activeEducation.Score || ""}
                onChange={handleChange}
                placeholder={activeEducation.GradeType === "Percentage" ? "e.g. 85" : "e.g. 8.5/10"}
             />
          </div>

          <div className="form-group">
            <label>Graduation Year (or expected)</label>
            <div className="grad-date-selectors">
              <select
                name="GraduationMonth"
                value={activeEducation.GraduationMonth || ""}
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
                value={activeEducation.GraduationYear || ""}
                onChange={handleChange}
              >
                <option>Year</option>
                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() + 5 - i).map(
                  (year) => <option key={year} value={year}>{year}</option>
                )}
              </select>
            </div>
          </div>
        </div>

        <div className="btn-row mt-3">
          <button type="submit" className="btn btn-primary w-100">
            Save Education
          </button>
        </div>

        {/* Hidden Trigger for Global Nav */}
        <button type="submit" id="education-form-submit" style={{ display: "none" }}></button>
      </form>

      {educationList.length > 0 && (
        <div className="saved-education-list">
          <h3>Successfully Added</h3>
          <div className="education-cards-grid">
            {educationList.map((edu) => (
              <div className="edu-card" key={edu._id}>
                <div className="edu-info">
                  <h4>{edu.SchoolName}</h4>
                  <p>{edu.Degree} in {edu.FieldOfStudy} • {edu.GraduationYear}</p>
                </div>
                <div className="edu-actions">
                  <button className="delete-btn" onClick={() => handleDelete(edu._id)}>
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

export default Education;
