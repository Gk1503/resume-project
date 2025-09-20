import React, { useContext } from "react";
import "./Summary.css";
import FormContext from "../../Context/FormContext";

function Summary() {
  const { summary, setSummary } = useContext(FormContext);

  const handleSave = () => {
    console.log("Saved Summary:", summary); // Optional: confirm in console
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
        Save Summary
      </button>
    </div>
  );
}

export default Summary;
  