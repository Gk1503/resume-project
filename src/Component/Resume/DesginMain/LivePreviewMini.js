import React, { useContext } from "react";
import FormContext from "../Context/FormContext";
import "./LivePreviewMini.css";

function LivePreviewMini({ data = null }) {
  const contextData = useContext(FormContext);
  const { selectedTemplate } = contextData;
  
  // Use provided data (e.g. dummy data) or fall back to context data
  const personalDetails = data?.personalDetails || contextData.personalDetails;
  const educationList = data?.educationList || contextData.educationList;
  const activeEducation = data?.activeEducation || contextData.activeEducation;
  const workHistoryList = data?.workHistoryList || contextData.workHistoryList;
  const activeWorkHistory = data?.activeWorkHistory || contextData.activeWorkHistory;
  const skills = data?.skills || contextData.skills;
  const hobbies = data?.hobbies || contextData.hobbies;
  const summary = data?.summary || contextData.summary;
  const isFresher = data?.isFresher || contextData.isFresher;

  // Helper to check if an object has any values
  const hasData = (obj) => obj && Object.values(obj).some(val => val !== "" && val !== null && val !== undefined);

  // Template configuration
  const config = {
    modern: { primary: "#2563eb", secondary: "#64748b", font: "Inter" },
    executive: { primary: "#0f172a", secondary: "#475569", font: "Merriweather" },
    minimal: { primary: "#000000", secondary: "#64748b", font: "Inter" },
    photo: { primary: "#2563eb", secondary: "#64748b", font: "Inter" }
  }[selectedTemplate || "modern"];

  // Sanitization Helpers
  const charOnly = (val) => typeof val === 'string' ? val.replace(/[0-9]/g, '') : val;
  const numOnly = (val) => typeof val === 'string' ? val.replace(/[^0-9+]/g, '') : val;

  return (
    <div className={`mini-resume-container template-${selectedTemplate || "modern"}`} style={{ fontFamily: config.font }}>
      <header className="mini-header" style={{ borderBottomColor: config.primary }}>
        {selectedTemplate === 'photo' && personalDetails.Photo && (
            <div className="mini-photo-wrap">
                <img src={personalDetails.Photo} alt="Profile" className="mini-photo" style={{ borderColor: config.primary }} />
            </div>
        )}
        <h2 className="mini-name" style={{ color: selectedTemplate === 'executive' ? config.primary : 'inherit' }}>
          {charOnly(personalDetails.FirstName) || "Your"} {charOnly(personalDetails.SurName) || "Name"}
        </h2>
        <div className="mini-contact">
          {personalDetails.EmailId && <span>{personalDetails.EmailId}</span>}
          {personalDetails.PhoneNumber && <span>{numOnly(personalDetails.PhoneNumber)}</span>}
          {(personalDetails.City || personalDetails.Country) && (
            <span>{charOnly(personalDetails.City)}{personalDetails.City && personalDetails.Country ? ", " : ""}{charOnly(personalDetails.Country)}</span>
          )}
          {personalDetails.Gender && <span>{personalDetails.Gender}</span>}
          {personalDetails.LinkedIn && <span>{personalDetails.LinkedIn}</span>}
        </div>
      </header>

      {summary && (
        <section className="mini-section">
          <h3 className="mini-section-title" style={{ color: config.primary }}>Professional Summary</h3>
          <p className="mini-summary-text">{summary}</p>
        </section>
      )}

      {(workHistoryList.length > 0 || hasData(activeWorkHistory)) && (
        <section className="mini-section">
          <h3 className="mini-section-title" style={{ color: config.primary }}>Experience</h3>
          {isFresher ? (
            <p className="mini-item-text">Fresher Path Selected</p>
          ) : (
            <>
              {hasData(activeWorkHistory) && (
                <div className="mini-item active-typing">
                  <div className="mini-item-header">
                    <strong>{charOnly(activeWorkHistory.JobTitle) || "Job Title"}</strong>
                  </div>
                  <p className="mini-item-sub">{charOnly(activeWorkHistory.Employer) || "Company Name"}</p>
                </div>
              )}
              {workHistoryList.map((job, index) => (
                <div className="mini-item" key={job._id || index}>
                  <div className="mini-item-header">
                    <strong>{charOnly(job.JobTitle)}</strong>
                  </div>
                  <p className="mini-item-sub">{charOnly(job.Employer)}</p>
                </div>
              ))}
            </>
          )}
        </section>
      )}

      {(educationList.length > 0 || hasData(activeEducation)) && (
        <section className="mini-section">
          <h3 className="mini-section-title" style={{ color: config.primary }}>Education</h3>
          {hasData(activeEducation) && (
            <div className="mini-item active-typing">
              <div className="mini-item-header">
                <strong>{activeEducation.Degree || "Degree"}</strong>
              </div>
              <p className="mini-item-sub">{charOnly(activeEducation.SchoolName) || "School Name"}</p>
            </div>
          )}
          {educationList.map((edu, index) => (
            <div className="mini-item" key={edu._id || index}>
              <div className="mini-item-header">
                <strong>{edu.Degree}</strong>
              </div>
              <p className="mini-item-sub">{charOnly(edu.SchoolName)}</p>
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mini-section">
          <h3 className="mini-section-title" style={{ color: config.primary }}>Skills</h3>
          <div className="mini-skills-grid">
            {skills.map((skill, index) => (
              <span key={index} className="mini-skill-tag">
                {charOnly(skill.name)}
              </span>
            ))}
          </div>
        </section>
      )}

      {hobbies && hobbies.length > 0 && (
        <section className="mini-section">
          <h3 className="mini-section-title" style={{ color: config.primary }}>Interests & Hobbies</h3>
          <div className="mini-skills-grid">
            {hobbies.map((hobby, index) => (
              <span key={index} className="mini-skill-tag hobby-tag">
                {charOnly(hobby)}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default LivePreviewMini;
