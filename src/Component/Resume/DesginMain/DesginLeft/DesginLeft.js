import React, { useContext } from "react";
import "./DesginLeft.css";
import FormContext from "../../Context/FormContext";

function DesginLeft(props) {
  const { changebtn, setchangebtn } = useContext(FormContext);

  const stages = [
    { id: 1, name: "Identity & Contact", ref: "Heading" },
    { id: 2, name: "Education Hub", ref: "Education" },
    { id: 3, name: "Work History", ref: "WorkHistory" },
    { id: 4, name: "Professional Skills", ref: "Skill" },
    { id: 5, name: "Interests & Hobbies", ref: "Hobbies" },
    { id: 6, name: "Career Summary", ref: "Summary" }
  ];

  const handleRightsideView = (value) => {
    setchangebtn(value);
    props.setShowHeading(value === 1);
    props.setShowEducation(value === 2);
    props.setShowWorkHistory(value === 3);
    props.setShowSkill(value === 4);
    props.setShowHobbies(value === 5);
    props.setShowSummary(value === 6);
    props.setShowPreviewModal(false);
  };

  return (
    <div className="Desgin1">
      <div id="Desgin1h1tagg">
        <h6>my<span>perfect</span>resume</h6>
      </div>

      <div className="stages-wrapper">
        {stages.map((stage) => (
          <div 
            key={stage.id}
            className={`maintag ${changebtn === stage.id ? "active-stage" : ""}`} 
            onClick={() => handleRightsideView(stage.id)}
          >
            <div className={changebtn >= stage.id ? "filledCircle" : "circle"}>
              {stage.id}
            </div>
            <div className="text">{stage.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesginLeft;
