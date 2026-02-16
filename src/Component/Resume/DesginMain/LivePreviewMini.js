import React, { useContext } from "react";
import FormContext from "../Context/FormContext";
import "./LivePreviewMini.css";

function LivePreviewMini() {
  const { 
    personalDetails, 
    educationList, activeEducation,
    workHistoryList, activeWorkHistory,
    skills, hobbies, summary, isFresher 
  } = useContext(FormContext);

  // Helper to check if an object has any values
  const hasData = (obj) => obj && Object.values(obj).some(val => val !== "" && val !== null && val !== undefined);

  return (
    <div className="mini-resume-container">
      <header className="mini-header">
        {/* Photo hidden as per request - only shown in specific template */}
        {/* {personalDetails.Photo && (
            <div className="mini-photo-wrap">
                <img src={personalDetails.Photo} alt="Profile" className="mini-photo" />
            </div>
        )} */}
        <h2 className="mini-name">
          {personalDetails.FirstName || "Your"} {personalDetails.SurName || "Name"}
        </h2>
        <div className="mini-contact">
          {personalDetails.EmailId && <span>{personalDetails.EmailId}</span>}
          {personalDetails.PhoneNumber && <span>{personalDetails.PhoneNumber}</span>}
          {(personalDetails.City || personalDetails.Country) && (
            <span>{personalDetails.City}{personalDetails.City && personalDetails.Country ? ", " : ""}{personalDetails.Country}</span>
          )}
          {personalDetails.MaritalStatus && <span>{personalDetails.MaritalStatus}</span>}
          {personalDetails.DateOfBirth && <span>{personalDetails.DateOfBirth}</span>}
          {personalDetails.LinkedIn && <span>LinkedIn</span>}
          {personalDetails.Website && <span>Portfolio</span>}
        </div>
      </header>

      {summary && (
        <section className="mini-section">
          <h3 className="mini-section-title">Professional Summary</h3>
          <p className="mini-summary-text">{summary}</p>
        </section>
      )}

      {(workHistoryList.length > 0 || hasData(activeWorkHistory)) && (
        <section className="mini-section">
          <h3 className="mini-section-title">Experience</h3>
          {isFresher ? (
            <p className="mini-item-text">Fresher Path Selected</p>
          ) : (
            <>
              {/* Show active/unsaved entry first for immediate feedback */}
              {hasData(activeWorkHistory) && (
                <div className="mini-item active-typing">
                  <div className="mini-item-header">
                    <strong>{activeWorkHistory.JobTitle || "Job Title"}</strong>
                    <span>{activeWorkHistory.JobStartYear || "YYYY"} - {activeWorkHistory.JobEndYear || "Present"}</span>
                  </div>
                  <p className="mini-item-sub">{activeWorkHistory.Employer || "Company Name"}</p>
                </div>
              )}
              {/* Show saved entries */}
              {workHistoryList.map((job, index) => (
                <div className="mini-item" key={job._id || index}>
                  <div className="mini-item-header">
                    <strong>{job.JobTitle}</strong>
                    <span>{job.JobStartYear} - {job.JobEndYear || "Present"}</span>
                  </div>
                  <p className="mini-item-sub">{job.Employer}</p>
                </div>
              ))}
            </>
          )}
        </section>
      )}

      {(educationList.length > 0 || hasData(activeEducation)) && (
        <section className="mini-section">
          <h3 className="mini-section-title">Education</h3>
          {/* Show active entry */}
          {hasData(activeEducation) && (
            <div className="mini-item active-typing">
              <div className="mini-item-header">
                <strong>
                  {activeEducation.Degree || "Degree"}
                  {activeEducation.Degree !== "10th" && activeEducation.FieldOfStudy && ` in ${activeEducation.FieldOfStudy}`}
                </strong>
                <span>{activeEducation.GraduationYear || "YYYY"}</span>
              </div>
              <p className="mini-item-sub">
                {activeEducation.SchoolName || "School Name"}
                {activeEducation.Score && ` • ${activeEducation.GradeType === "Percentage" ? "Percentage: " : "CGPA: "}${activeEducation.Score}`}
              </p>
            </div>
          )}
          {/* Show saved entries */}
          {educationList.map((edu, index) => (
            <div className="mini-item" key={edu._id || index}>
              <div className="mini-item-header">
                <strong>
                  {edu.Degree}
                  {edu.Degree !== "10th" && edu.FieldOfStudy && ` in ${edu.FieldOfStudy}`}
                </strong>
                <span>{edu.GraduationYear}</span>
              </div>
              <p className="mini-item-sub">
                {edu.SchoolName}
                {edu.Score && ` • ${(edu.GradeType === "Percentage" || (!edu.GradeType && (edu.Degree === "10th" || edu.Degree === "12th"))) ? "Percentage: " : "CGPA: "}${edu.Score}`}
              </p>
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mini-section">
          <h3 className="mini-section-title">Skills</h3>
          <div className="mini-skills-grid">
            {skills.map((skill, index) => (
              <span key={index} className="mini-skill-tag">
                {skill.name} {skill.rating > 0 && `(${skill.rating}/5)`}
              </span>
            ))}
          </div>
        </section>
      )}

      {hobbies && hobbies.length > 0 && (
        <section className="mini-section">
          <h3 className="mini-section-title">Hobbies</h3>
          <div className="mini-skills-grid">
            {hobbies.map((hobby, index) => (
              <span key={index} className="mini-skill-tag">
                {hobby}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default LivePreviewMini;
