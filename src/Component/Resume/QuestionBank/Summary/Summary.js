import React, { useContext, useEffect, useState, useCallback } from "react";
import "./Summary.css";
import api from "../../../../utils/api.config";
import { ENDPOINTS } from "../../../../utils/constant";
import FormContext from "../../Context/FormContext";

function Summary() {
  const { summary, setSummary } = useContext(FormContext);
  const [message, setMessage] = useState("");

  const fetchSummary = useCallback(async () => {
    try {
      const res = await api.get(ENDPOINTS.GET_SUMMARY);
      if (res.data) setSummary(res.data.content);
    } catch (err) {
      console.error(err);
    }
  }, [setSummary]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      if (!summary || summary.trim() === "") {
        setMessage("error: Summary cannot be empty");
        return;
      }
      const res = await api.post(ENDPOINTS.SAVE_SUMMARY, { content: summary });
      setMessage("success: " + res.data.message);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("error: Failed to save summary");
    }
  };

  return (
    <div className="summary-section-container">
      <h2 className="summary-heading">Briefly tell us about your background</h2>
      <p className="summary-subtext">
        Choose from our pre-written examples or write your own.
      </p>

      <form onSubmit={handleSave} className="summary-form">
        <textarea
          className="summary-textarea"
          placeholder="Professional, result-oriented software developer with 5+ years of experience in building scalable web applications..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        ></textarea>
        
        <button type="submit" id="summary-form-submit" style={{ display: "none" }}></button>
      </form>

      {message && (
        <p className={`status-message ${message.startsWith("success") ? "text-success" : "text-danger"}`}>
          {message.split(": ")[1]}
        </p>
      )}
    </div>
  );
}

export default Summary;
