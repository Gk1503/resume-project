import React, { useContext, useState } from "react";
import "./Desgin.css";
import DesginLeft from "./DesginLeft/DesginLeft";
import HeadingQuestion from "../QuestionBank/Heading/Heading";
import Education from "../QuestionBank/Education/Education";
import WorkHistory from "../QuestionBank/WorkHistory/WorkHistory";
import Skill from "../QuestionBank/Skill/Skill";
import Hobbies from "../QuestionBank/Hobbies/Hobbies";
import Summary from "../QuestionBank/Summary/Summary";
import Preview from "../../Preview/Preview";
import LivePreviewMini from "./LivePreviewMini";
import FormContext from "../Context/FormContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faEye } from "@fortawesome/free-solid-svg-icons";

function Desgin() {
  const [showHeading, setShowHeading] = useState(true);
  const [showEducation, setShowEducation] = useState(false);
  const [showWorkHistory, setShowWorkHistory] = useState(false);
  const [showSkill, setShowSkill] = useState(false);
  const [showHobbies, setShowHobbies] = useState(false);
  const [ShowSummary, setShowSummary] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const { changebtn, setchangebtn } = useContext(FormContext);

  const handleShowPreview = () => setShowPreviewModal(true);
  const handleClosePreview = () => setShowPreviewModal(false);

  // Trigger internal form save before moving
  const triggerFormSave = () => {
    let submitBtnId = "";
    if (showHeading) submitBtnId = "heading-form-submit";
    else if (showEducation) submitBtnId = "education-form-submit";
    else if (showWorkHistory) submitBtnId = "work-form-submit";
    else if (showSkill) submitBtnId = "skill-form-submit";
    else if (showHobbies) submitBtnId = "hobbies-form-submit";
    else if (ShowSummary) submitBtnId = "summary-form-submit";

    if (submitBtnId) {
      const btn = document.getElementById(submitBtnId);
      if (btn) btn.click();
    }
  };

  const handlePreviousClick = () => {
    if (showEducation) { setShowEducation(false); setShowHeading(true); setchangebtn(1); }
    else if (showWorkHistory) { setShowWorkHistory(false); setShowEducation(true); setchangebtn(2); }
    else if (showSkill) { setShowSkill(false); setShowWorkHistory(true); setchangebtn(3); }
    else if (showHobbies) { setShowHobbies(false); setShowSkill(true); setchangebtn(4); }
    else if (ShowSummary) { setShowSummary(false); setShowHobbies(true); setchangebtn(5); }
  };

  const handleNextClick = () => {
    // Save current stage data
    triggerFormSave();

    // Small delay to allow save message to appear if needed, then move
    setTimeout(() => {
      if (showHeading) { setShowHeading(false); setShowEducation(true); setchangebtn(2); }
      else if (showEducation) { setShowEducation(false); setShowWorkHistory(true); setchangebtn(3); }
      else if (showWorkHistory) { setShowWorkHistory(false); setShowSkill(true); setchangebtn(4); }
      else if (showSkill) { setShowSkill(false); setShowHobbies(true); setchangebtn(5); }
      else if (showHobbies) { setShowHobbies(false); setShowSummary(true); setchangebtn(6); }
    }, 100);
  };

  return (
    <div className="MainDesgin">
      {/* Sidebar - Stage Tracker */}
      <DesginLeft
        setShowHeading={setShowHeading}
        setShowEducation={setShowEducation}
        setShowWorkHistory={setShowWorkHistory}
        setShowSkill={setShowSkill}
        setShowHobbies={setShowHobbies}
        setShowSummary={setShowSummary}
        setShowPreviewModal={setShowPreviewModal}
      />

      {/* Main Content Area - Form Studio */}
      <main className="DesginRight" id="form-studio-container">
        <div className="form-center-panel">
          {showHeading && <HeadingQuestion />}
          {showEducation && <Education />}
          {showWorkHistory && <WorkHistory />}
          {showSkill && <Skill />}
          {showHobbies && <Hobbies />}
          {ShowSummary && <Summary />}
        </div>
      </main>

      {/* Live View Sidebar Overlay */}
      <aside className="preview-panel-sidebar">
        <div className="resume-paper-preview">
          <LivePreviewMini />
        </div>
      </aside>

      {/* Persistent Navigation Footer */}
      <footer className="app-navigation-footer">
        <div className="nav-left">
          {!showHeading && (
            <button className="btn-builder-nav btn-prev" onClick={handlePreviousClick}>
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back
            </button>
          )}
        </div>
        
        <div className="nav-right">
          {!ShowSummary ? (
            <button className="btn-builder-nav btn-next" onClick={handleNextClick}>
              Continue <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </button>
          ) : (
            <div className="final-actions">
               <button className="btn-builder-nav btn-next me-3" onClick={() => triggerFormSave()}>
                Save Final Summary
              </button>
              <button className="btn-builder-nav btn-preview" onClick={handleShowPreview}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> Finish & Preview
              </button>
            </div>
          )}
        </div>
      </footer>

      <Preview show={showPreviewModal} handleClose={handleClosePreview} />
    </div>
  );
}

export default Desgin;
