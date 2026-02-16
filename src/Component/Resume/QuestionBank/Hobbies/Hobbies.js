import React, { useContext, useEffect, useState, useCallback } from "react";
import "./Hobbies.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import api from "../../../../utils/api.config";
import { ENDPOINTS } from "../../../../utils/constant";
import FormContext from "../../Context/FormContext";

function Hobbies() {
  const { hobbies, setHobbies } = useContext(FormContext);
  const [message, setMessage] = useState("");
  const [newHobby, setNewHobby] = useState("");

  const fetchHobbies = useCallback(async () => {
    try {
      const res = await api.get(ENDPOINTS.GET_HOBBIES);
      setHobbies(res.data.hobbies || []);
    } catch (err) {
      console.error(err);
    }
  }, [setHobbies]);

  useEffect(() => {
    fetchHobbies();
  }, [fetchHobbies]);

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      setHobbies((prev) => [...prev, newHobby.trim()]);
      setNewHobby("");
    }
  };

  const handleDeleteHobby = (index) => {
    setHobbies((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveHobbies = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await api.post(ENDPOINTS.SAVE_HOBBIES, { hobbies });
      setMessage("success: " + res.data.message);
      // Optional: Refetch or just rely on local state if success
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("error: Failed to save hobbies");
    }
  };

  return (
    <div className="hobbies-container">
      <h1>Interests & Hobbies</h1>
      <p>What do you like to do in your free time?</p>

      <div className="hobbies-manager">
        <div className="hobby-input-group">
          <input
            type="text"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            placeholder="e.g. Photography, Travelling"
            onKeyDown={(e) => e.key === "Enter" && handleAddHobby()}
          />
          <button className="add-hobby-btn" onClick={handleAddHobby}>
            <FontAwesomeIcon icon={faPlus} /> Add
          </button>
        </div>

        <div className="hobbies-list">
          {hobbies.map((hobby, index) => (
            <div className="hobby-tag" key={index}>
              <span>{hobby}</span>
              <button 
                className="delete-hobby-btn"
                onClick={() => handleDeleteHobby(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>

        {/* Hidden Trigger for Global Nav */}
        <form onSubmit={handleSaveHobbies}>
           <button type="submit" id="hobbies-form-submit" style={{ display: "none" }}></button>
        </form>
      </div>

      {message && (
        <p className={`status-message ${message.startsWith("success") ? "text-success" : "text-danger"}`}>
          {message.split(": ")[1]}
        </p>
      )}
    </div>
  );
}

export default Hobbies;
