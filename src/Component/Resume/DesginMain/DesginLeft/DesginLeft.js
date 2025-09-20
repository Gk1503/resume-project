import React, { useContext } from "react";
import "../DesginLeft/DesginLeft.css";
// import HeadingQuestion from "../../QuestionBank/Heading/Heading";
// import Skill from "../../QuestionBank/Skill/Skill";
// import Summary from "../../QuestionBank/Summary/Summary";   
// import Education from "../../QuestionBank/Education/Education";
// import WorkHistory from "../../../Resume/QuestionBank/WorkHistory/WorkHistory";
import FormContext from "../../Context/FormContext";

function DesginLeft(props) {
const {changebtn , setchangebtn} = useContext(FormContext);
// const [showHeading, setShowHeading] = useState(true);
//   const [showEducation, setShowEducation] = useState(false);
//   const [showWorkHistory, setShowWorkHistory] = useState(false);
//   const [showSkill, setShowSkill] = useState(false);
//   const [ShowSummary, setShowSummary] = useState(false);  
//   const [showPreviewModal, setShowPreviewModal] = useState(false);


const handleRightsideView = (value) => {
  if(value === 1){
      props.setShowHeading(true);
      props.setShowEducation(false);
      props.setShowWorkHistory(false);
      props.setShowSkill(false);
      props.setShowSummary(false);
      props.setShowPreviewModal(false)
  }
  if(value === 2){
    props.setShowEducation(true);
    props.setShowHeading(false);
    props.setShowWorkHistory(false);
    props.setShowSkill(false);
    props.setShowSummary(false);
    props.setShowPreviewModal(false);
  }
  if(value === 3){
    props.setShowWorkHistory(true);
    props.setShowEducation(false);
    props.setShowHeading(false);
    props.setShowSkill(false);
    props.setShowSummary(false);
    props.setShowPreviewModal(false);
  }
  if(value === 4){
    props.setShowWorkHistory(false);
    props.setShowEducation(false);
    props.setShowHeading(false);
    props.setShowSkill(true);
    props.setShowSummary(false);
    props.setShowPreviewModal(false);
  }
 
  if(value === 5){
    props.setShowWorkHistory(false);
    props.setShowEducation(false);
    props.setShowHeading(false);
    props.setShowSkill(false);
    props.setShowSummary(true);
    props.setShowPreviewModal(false);
  }
}



return(
<>

<div className="Desgin1">
<div id="Desgin1h1tagg"><h6>my<span>perfect</span>resume</h6></div>

<div className="maintag" onClick={() => handleRightsideView(1)}> <div className={changebtn === 1 ? "filledCircle" : "circle"}>1</div><div className="text">HeadingQuestion</div></div>
<div className="maintag" onClick={() => handleRightsideView(2)} > <div className={changebtn === 2 ? "filledCircle" : "circle"}>2</div><div className="text">Education</div></div>
<div className="maintag" onClick={() => handleRightsideView(3)} > <div className={changebtn === 3 ? "filledCircle" : "circle"}>3</div><div className="text">Work History </div></div>
<div className="maintag" onClick={() => handleRightsideView(4)} > <div className={changebtn === 4 ? "filledCircle" : "circle"}>4</div><div className="text">Skills </div></div>
<div className="maintag" onClick={() => handleRightsideView(5)} > <div className={changebtn === 5 ? "filledCircle" : "circle"}>5</div><div className="text">Summary</div></div>
    
    </div>

</>


)

}

export default DesginLeft ;