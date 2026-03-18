import React, { useContext, useEffect, useState, useCallback } from "react";
import "./Skill.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button } from "react-bootstrap";
import api from "../../../../utils/api.config";
import { ENDPOINTS } from "../../../../utils/constant";
import FormContext from "../../Context/FormContext";

function Skill() {
  const { skills, setSkills } = useContext(FormContext);
  const [message, setMessage] = useState("");

  const fetchSkills = useCallback(async () => {
    try {
      const res = await api.get(ENDPOINTS.GET_SKILLS);
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [setSkills]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleAddCustomSkill = () => {
    const newSkill = { name: "" };
    setSkills((prev) => [...prev, newSkill]);
  };

  const handleDeleteSkill = async (index) => {
    const skillToDelete = skills[index];
    try {
      if (skillToDelete._id) {
        await api.delete(`${ENDPOINTS.DELETE_SKILLS}/${skillToDelete._id}`);
      }
      setSkills((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  const handleNameChange = (index, newName) => {
    const charOnlyName = newName.replace(/[0-9]/g, "");
    const updatedSkills = [...skills];
    updatedSkills[index].name = charOnlyName;
    setSkills(updatedSkills);
  };

  const handleSaveSkills = async (e) => {
    if (e) e.preventDefault();
    try {
      if (skills.length === 0) {
        setMessage("error: No skills to save.");
        return;
      }
      const res = await api.post(ENDPOINTS.SAVE_SKILLS, { skills });
      setMessage("success: " + res.data.message);
      setSkills(res.data.data);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("error: Failed to save skills");
    }
  };

  return (
    <div className="skillContainerUniqueskill">
      <h1>What skills would you like to highlight?</h1>
      <div className="subtit">Choose from our pre-written examples below or write your own.</div>

      <div className="skillLayoutUniqueskill">
        <div className="skills-manager-header">
          <h3>Your Skills</h3>
          <button className="addSkillBtnUniqueskill" onClick={handleAddCustomSkill}>
            <FontAwesomeIcon icon={faPlus} /> Add Custom Skill
          </button>
        </div>

        {message && (
            <Alert variant={message.startsWith("success") ? "success" : "danger"} className="mt-3">
                {message.split(": ")[1]}
            </Alert>
        )}

        <form onSubmit={handleSaveSkills} className="skills-grid-lum">
          {skills.map((skill, index) => (
            <div className="skill-row-lum" key={index}>
              <div className="skill-input-wrap">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder="e.g. Project Management"
                  required
                />
              </div>

              <div className="skill-actions">
                <button 
                  type="button"
                  className="deleteSkillBtnUniqueskill" 
                  onClick={() => handleDeleteSkill(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
          
          <button type="submit" id="skill-form-submit" style={{ display: "none" }}></button>
        </form>
      </div>
    </div>
  );
}

export default Skill;
