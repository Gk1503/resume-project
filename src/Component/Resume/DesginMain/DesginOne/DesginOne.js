import React, { useState } from "react";
import "../DesginOne/DesginOne.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function DesginOne() {
  const [isClicked, setIsClicked] = useState(false);

  const handlesStartClick = () => {
    setIsClicked(true);
  };

  const navigate = useNavigate();

  const OpenMainDesgin = () => {
    navigate("/MainDesgin");
  };

  return (
    <>
      <div className="DesginOneMain">
        <div className="Destop">
          <h4>
            my<span>perfect</span>resume
          </h4>
        </div>
        <div className="Desbot">
          <h1>Job Seekers Trust MyPerfectResume’s Builder</h1>
          <div id="justreview">
            Just review, edit, and update it with new information
          </div>
          <div
            id="StartfromStrach"
            onClick={handlesStartClick}
            className={isClicked ? "clicked" : ""}
          >
            <div id="faFile">
              <FontAwesomeIcon icon={faFile} />
            </div>
            <div>
              <h5>No, start from scratch</h5>
            </div>
            <div id="well">
              We'll guide you through the whole process <br></br>so your skills
              can shine{" "}
            </div>
          </div>

          <button
            onClick={OpenMainDesgin}
            className={`Nextbtn ${isClicked ? "enabled" : "disabled"}`}
            disabled={!isClicked}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default DesginOne;
