import React, { useContext } from "react";
import "./Desgin.css";
import DesginLeft from "./DesginLeft/DesginLeft";
// import DesginRight from "./DesginRight/DesginRight";
import ResumeDesgin from "../../Gallery/ResumeDesgin.jpeg";
import HeadingQuestion from "../QuestionBank/Heading/Heading";
import Education from "../QuestionBank/Education/Education";
import WorkHistory from "../QuestionBank/WorkHistory/WorkHistory";
import Skill from "../QuestionBank/Skill/Skill";
import Summary from "../QuestionBank/Summary/Summary";
import { useState } from "react";
import Preview from "../../Preview/Preview"; // Import the Preview modal
import FormContext from "../Context/FormContext";
function Desgin() {
  const [showHeading, setShowHeading] = useState(true);
  const [showEducation, setShowEducation] = useState(false);
  const [showWorkHistory, setShowWorkHistory] = useState(false);
  const [showSkill, setShowSkill] = useState(false);
  const [ShowSummary, setShowSummary] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleShowPreview = () => setShowPreviewModal(true);
  const handleClosePreview = () => setShowPreviewModal(false);

  const { changebtn, setchangebtn } = useContext(FormContext);

  // const [show]

  const handlePreviousClick = () => {
    if (showEducation) {
      setShowEducation(false);
      setShowHeading(true);
      setchangebtn(1);
    }
    if (showWorkHistory) {
      setShowWorkHistory(false);
      setShowEducation(true);
      setchangebtn(2);
    }

    if (showSkill) {
      setShowSkill(false);
      setShowWorkHistory(true);
      setchangebtn(3);
    }
    if (ShowSummary) {
      setShowSummary(false);
      setShowSkill(true);
      setchangebtn(4);
    }
  };

  const handleNextClick = () => {
    if (showHeading) {
      setShowHeading(false);
      setShowEducation(true);
      setchangebtn(2);
    }
    if (showEducation) {
      setShowEducation(false);
      setShowWorkHistory(true);
      setchangebtn(3);
    }
    if (showWorkHistory) {
      setShowWorkHistory(false);
      setShowSkill(true);
      setchangebtn(4);
    }
    if (showSkill) {
      setShowSkill(false);
      setShowSummary(true);
      setchangebtn(5);
    }
  };

  return (
    <>
      <div className="MainDesgin">
        <div className="DesginLeft">
          <DesginLeft
            
            setShowHeading={setShowHeading}
            setShowEducation={setShowEducation}
            setShowWorkHistory={setShowWorkHistory}
            setShowSkill={setShowSkill}
            setShowSummary={setShowSummary}
            setShowPreviewModal={setShowPreviewModal}
          />
        </div>
        <div className="DesginRight">
          {/* Conditional Rendering */}
          {showHeading && <HeadingQuestion />}
          {showEducation && <Education />}
          {showWorkHistory && <WorkHistory />}
          {showSkill && <Skill />}
          {ShowSummary && <Summary />}
        </div>

        <div>
          <img className="Resumeimg" src={ResumeDesgin} alt="..." />
          <br></br>
          <div>
            {!showHeading && (
              <button onClick={handlePreviousClick}>Previous</button>
            )}
            {!ShowSummary && (
              <button id="nextclickbtn" onClick={handleNextClick}>
                Next
              </button>
            )}

            {ShowSummary && (
              <button id="previewbtn" onClick={handleShowPreview}>
                Preview
              </button>
            )}
          </div>
        </div>
      </div>
      <Preview show={showPreviewModal} handleClose={handleClosePreview} />
    </>
  );
}

export default Desgin;
