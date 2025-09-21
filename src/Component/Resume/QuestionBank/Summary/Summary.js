import React, { useContext, useEffect, useState } from "react";
import "./Summary.css";
import FormContext from "../../Context/FormContext";
import axios from "axios";

function Summary() {
  const { summary, setSummary } = useContext(FormContext);
  const [message, setMessage] = useState("");

  // Fetch summary on mount
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/summary/get", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) setSummary(res.data.content);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSummary();
  }, [setSummary]);

  // Save summary
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ Please login to save summary");
        return;
      }

      if (!summary || summary.trim() === "") {
        setMessage("❌ Summary cannot be empty");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/summary/save",
        { content: summary },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ " + res.data.message);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Failed to save summary");
    }
  };

  return (
    <div className="summary-section-container">
      <h2 className="summary-heading">Briefly tell us about your background</h2>
      <p className="summary-subtext">
        Choose from our pre-written examples or write your own.
      </p>

      <textarea
        className="summary-textarea"
        placeholder="Write your summary here..."
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      ></textarea>

      <button className="summary-btn save-btn" onClick={handleSave}>
        💾 Save Summary
      </button>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default Summary;
