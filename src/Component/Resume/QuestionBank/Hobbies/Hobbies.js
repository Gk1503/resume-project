import React, { useContext, useEffect, useState, useCallback } from "react";
import "./Hobbies.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button } from "react-bootstrap";
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
    const cleanedHobby = newHobby.replace(/[0-9]/g, "").trim();
    if (cleanedHobby) {
      setHobbies((prev) => [...prev, cleanedHobby]);
      setNewHobby("");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const charOnlyValue = value.replace(/[0-9]/g, "");
    setNewHobby(charOnlyValue);
  };

  const handleDeleteHobby = (index) => {
    setHobbies((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveHobbies = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await api.post(ENDPOINTS.SAVE_HOBBIES, { hobbies });
      setMessage("success: Hobbies saved successfully.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("error: Failed to save hobbies");
    }
  };

  return (
    <div className="hobbies-container">
      <h1>Interests & Hobbies</h1>
      <p>What do you like to do in your free time?</p>

      {message && (
        <Alert variant={message.startsWith("success") ? "success" : "danger"} className="mt-3 mb-3">
          {message.split(": ")[1]}
        </Alert>
      )}

      <div className="hobbies-manager">
        <div className="hobby-input-group">
          <input
            type="text"
            value={newHobby}
            onChange={handleInputChange}
            placeholder="e.g. Photography, Travelling"
            onKeyDown={(e) => e.key === "Enter" && handleAddHobby()}
          />
          <button className="add-hobby-btn" onClick={handleAddHobby}>
            <FontAwesomeIcon icon={faPlus} /> Add
          </button>
        </div>

        <div className="hobbies-list shadow-sm">
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
          {hobbies.length === 0 && <p className="text-muted p-3 mb-0">No hobbies added yet.</p>}
        </div>



        <form onSubmit={handleSaveHobbies}>
           <button type="submit" id="hobbies-form-submit" style={{ display: "none" }}></button>
        </form>
      </div>
    </div>
  );
}

export default Hobbies;
