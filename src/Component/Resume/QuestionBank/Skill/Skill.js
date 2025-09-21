import React, { useContext, useEffect, useState } from "react";
import "./Skill.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Skillsimg from "../../../Gallery/Skills.jpg";
import FormContext from "../../Context/FormContext";
import axios from "axios";

function Skill() {
  const { skills, setSkills } = useContext(FormContext);
  const [message, setMessage] = useState("");

  // Fetch skills from backend on mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/skills/get", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSkills(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSkills();
  }, [setSkills]);

  // Add new skill locally
  const handleAddCustomSkill = () => {
    const newSkill = { name: "", rating: 1 };
    setSkills((prev) => [...prev, newSkill]);
  };

  // Delete skill
  const handleDeleteSkill = async (index) => {
    const skillToDelete = skills[index];
    try {
      const token = localStorage.getItem("token");
      if (skillToDelete._id && token) {
        await axios.delete(
          `http://localhost:5000/skills/delete/${skillToDelete._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setSkills((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  // Update name
  const handleNameChange = (index, newName) => {
    const updatedSkills = [...skills];
    updatedSkills[index].name = newName;
    setSkills(updatedSkills);
  };

  // Update rating
  const handleRatingChange = (index, rating) => {
    const updatedSkills = [...skills];
    updatedSkills[index].rating = rating;
    setSkills(updatedSkills);
  };

  // Save all skills
  const handleSaveSkills = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ Please login to save skills.");
        return;
      }

      if (skills.length === 0) {
        setMessage("❌ No skills to save.");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/skills/save",
        { skills },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ " + res.data.message);
      setSkills(res.data.data); // update skills with saved ones
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Failed to save skills");
    }
  };

  return (
    <div className="skillContainerUniqueskill">
      <h1>What skills would you like to highlight?</h1>
      <div className="subtit">Choose from our pre-written examples below or write your own.</div>

      <div className="skillLayoutUniqueskill">
        {/* Left side */}
        <div className="recommendedSectionUniqueskill">
          <div style={{ marginTop: "20px" }}>
            <h3>Add Yours</h3>
            <button className="addSkillBtnUniqueskill" onClick={handleAddCustomSkill}>
              ➕ Add Custom Skill
            </button>
            <button className="saveBtnUniqueskill" onClick={handleSaveSkills}>
              💾 Save Skills
            </button>
          </div>
          <img className="Skillimg" src={Skillsimg} alt="Skills Illustration" />
        </div>

        {/* Right side */}
        <div className="ratingSectionUniqueskill">
          <h3>Skills Rating</h3>
          {skills.map((skill, index) => (
            <div className="skillItemUniqueskill" key={index}>
              <div className="starRatingUniqueskill">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`singleStarUniqueskill ${i < skill.rating ? "filledStarUniqueskill" : ""}`}
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
                placeholder="Enter skill name (e.g., HTML)"
              />
              <button className="deleteSkillBtnUniqueskill" onClick={() => handleDeleteSkill(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default Skill;
