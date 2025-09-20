import React, { useContext, useEffect } from "react";
import "./Skill.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Skillsimg from "../../../Gallery/Skills.jpg";
import FormContext from "../../Context/FormContext";

function Skill() {
  const { skills, setSkills } = useContext(FormContext);

  useEffect(() => {
    console.log("Updated skills:", skills);
  }, [skills]);

  const handleDeleteSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleRatingChange = (index, rating) => {
    const updatedSkills = [...skills];
    updatedSkills[index].rating = rating;
    setSkills(updatedSkills);
  };

  const handleNameChange = (index, newName) => {
    const updatedSkills = [...skills];
    updatedSkills[index].name = newName;
    setSkills(updatedSkills);
  };

  const handleAddCustomSkill = () => {
    setSkills([...skills, { name: "", rating: 1 }]);
  };

  return (
    <div className="skillContainerUniqueskill">
      <h1>What skills would you like to highlight?</h1>
      <div className="subtit">
        Choose from our pre-written examples below or write your own.
      </div>
      <div className="skillLayoutUniqueskill">
        {/* Left side - Recommended Skills */}
        <div className="recommendedSectionUniqueskill">
          <div style={{ marginTop: "20px" }}>
            <h3>Add Yours</h3>
            <button
              className="addSkillBtnUniqueskill"
              onClick={handleAddCustomSkill}
            >
              ➕ Add Custom Skill
            </button>
          </div>
          <img className="Skillimg" src={Skillsimg} alt="..." />
        </div>

        {/* Right side - User Added Skills */}
        <div className="ratingSectionUniqueskill">
          <h3>Skills Rating</h3>
          {skills.map((skill, index) => (
            <div className="skillItemUniqueskill" key={index}>
              <div className="starRatingUniqueskill">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`singleStarUniqueskill ${
                      i < skill.rating ? "filledStarUniqueskill" : ""
                    }`}
                    onClick={() => handleRatingChange(index, i + 1)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
              />
              <button
                className="deleteSkillBtnUniqueskill"
                onClick={() => handleDeleteSkill(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skill;
