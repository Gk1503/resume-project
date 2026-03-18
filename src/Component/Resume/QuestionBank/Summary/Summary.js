import React, { useContext, useEffect, useState, useCallback } from "react";
import "./Summary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faMagic, faSync, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, Spinner } from "react-bootstrap";
import api from "../../../../utils/api.config";
import { ENDPOINTS } from "../../../../utils/constant";
import FormContext from "../../Context/FormContext";

function Summary() {
  const { 
    summary, setSummary,
    personalDetails,
    workHistoryList,
    educationList,
    skills 
  } = useContext(FormContext);
  
  const [message, setMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);

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

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setAiSuggestions([]);

    // Data extraction for AI context
    const lastJob = workHistoryList[0] || {};
    const lastEdu = educationList[0] || {};
    const skillList = skills.slice(0, 4).map(s => s.name).join(", ");
    const name = personalDetails.FirstName || "Professional";

    // Simulate AI Generation logic
    setTimeout(() => {
      const suggestions = [
        `Results-oriented ${lastJob.JobTitle || "professional"} with a strong background from ${lastEdu.SchoolName || "top institutions"}. Proven expertise in ${skillList || "core industry skills"} and a dedicated history of performance at ${lastJob.Employer || "leading organizations"}.`,
        `Dynamic ${lastJob.JobTitle || "Expert"} specializing in ${lastEdu.FieldOfStudy || "strategic development"}. Highly proficient in ${skillList || "modern technologies"} with a track record of delivering high-impact results at ${lastJob.Employer || "previous roles"}.`,
        `Motivated ${personalDetails.FirstName ? personalDetails.FirstName : "individual"} with comprehensive knowledge in ${lastEdu.FieldOfStudy || "relevant fields"}. Skilled in ${skillList || "essential tools"} and committed to driving innovation as a ${lastJob.JobTitle || "team player"}.`
      ];
      setAiSuggestions(suggestions);
      setIsGenerating(false);
    }, 1200);
  };

  const handleSelectSuggestion = (text) => {
    setSummary(text);
    setAiSuggestions([]); // Clear after choice
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      if (!summary || summary.trim() === "") {
        setMessage("error: Summary cannot be empty");
        return;
      }
      const res = await api.post(ENDPOINTS.SAVE_SUMMARY, { content: summary });
      setMessage("success: Summary saved successfully.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("error: Failed to save summary");
    }
  };

  return (
    <div className="summary-section-container">
      <div className="summary-header-wrap">
        <div>
          <h2 className="summary-heading">Briefly tell us about your background *</h2>
          <p className="summary-subtext">
            Choose from our pre-written examples, write your own, or use our AI.
          </p>
        </div>
        <Button 
          variant="outline-primary" 
          className="ai-gen-btn" 
          onClick={handleGenerateAI}
          disabled={isGenerating}
        >
          {isGenerating ? <Spinner size="sm" animation="border" className="me-2" /> : <FontAwesomeIcon icon={faMagic} className="me-2" />}
          {isGenerating ? "Generating..." : "Generate with AI"}
        </Button>
      </div>

      {message && (
        <Alert variant={message.startsWith("success") ? "success" : "danger"} className="mt-3 mb-3 shadow-sm">
          {message.split(": ")[1]}
        </Alert>
      )}

      {aiSuggestions.length > 0 && (
        <div className="ai-suggestions-grid mt-3 mb-4">
          <h4 className="ai-title"><FontAwesomeIcon icon={faSync} className="me-2" /> AI Suggestions</h4>
          <div className="suggestions-list">
            {aiSuggestions.map((text, idx) => (
              <div key={idx} className="suggestion-card" onClick={() => handleSelectSuggestion(text)}>
                <p>{text}</p>
                <div className="use-this">
                   <FontAwesomeIcon icon={faCheckCircle} className="me-2" /> Use This
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="summary-form mt-3">
        <textarea
          className="summary-textarea shadow-sm"
          placeholder="e.g. Professional, result-oriented software developer..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        ></textarea>
        
        <div className="mt-4 text-center">
             <Button variant="primary" type="submit" className="save-summary-btn px-5 py-2">
                <FontAwesomeIcon icon={faSave} className="me-2" /> Save Summary
             </Button>
        </div>

        <button type="submit" id="summary-form-submit" style={{ display: "none" }}></button>
      </form>
    </div>
  );
}

export default Summary;
