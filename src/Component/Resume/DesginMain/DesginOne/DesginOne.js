import React, { useContext, useState } from "react";
import "./DesginOne.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheckCircle, faMagic, faShapes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FormContext from "../../Context/FormContext";
import LivePreviewMini from "../LivePreviewMini";
import { DUMMY_RESUME_DATA } from "../../../../utils/dummyData";

function DesginOne() {
  const { selectedTemplate, setSelectedTemplate } = useContext(FormContext);
  const [showTemplates, setShowTemplates] = useState(false);
  const navigate = useNavigate();

  const templates = [
    { id: "modern", name: "Modern Professional", desc: "Clean, contemporary design with a touch of color." },
    { id: "executive", name: "Executive Suite", desc: "Traditional and authoritative, perfect for senior roles." },
    { id: "minimal", name: "Sleek Minimal", desc: "Simplistic elegance that focuses purely on content." },
    { id: "photo", name: "Visual Identity", desc: "Modern layout with a prominent profile photo." }
  ];

  const handleNext = () => {
    if (selectedTemplate) {
      navigate("/MainDesgin");
    }
  };

  return (
    <div className="DesginOneMain">
      <div className="Desbot">
        <AnimatePresence mode="wait">
          {!showTemplates ? (
            <motion.div
              key="start-scratch"
              className="start-scratch-hero-section"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="scratch-card-wrapper">
                <div className="scratch-icon-halo">
                    <FontAwesomeIcon icon={faMagic} />
                </div>
                <h2>Start From Scratch</h2>
                <p>We'll guide you through building a professional resume step-by-step. Perfect for a fresh start.</p>
                <button className="btn-begin-journey" onClick={() => setShowTemplates(true)}>
                    Continue to Templates <FontAwesomeIcon icon={faArrowRight} className="ms-3" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="template-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="template-selection-header">
                <h1>Select Your Template</h1>
                <p id="justreview">
                  Choose a starting point for your perfect resume. You can always change this later.
                </p>
              </div>

              <div className="template-workspace">
                {/* Left side: Template Options */}
                <div className="template-options-sidebar">
                  {templates.map((tpl, idx) => (
                    <motion.div
                      key={tpl.id}
                      className={`template-selection-card ${selectedTemplate === tpl.id ? "active" : ""}`}
                      onClick={() => setSelectedTemplate(tpl.id)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="tpl-card-info">
                        <h5>{tpl.name}</h5>
                        <p>{tpl.desc}</p>
                      </div>
                      {selectedTemplate === tpl.id && (
                        <div className="tpl-active-check">
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Right side: Live Preview with Dummy Data */}
                <div className="template-preview-area">
                  <div className="preview-label">Live Preview (Sample)</div>
                  <div className="preview-mini-wrapper">
                    <LivePreviewMini data={DUMMY_RESUME_DATA} />
                  </div>
                </div>
              </div>

              <div className="actions-footer">
                <button
                  onClick={handleNext}
                  className={`Nextbtn ${selectedTemplate ? "enabled" : "disabled"}`}
                  disabled={!selectedTemplate}
                >
                  Start Building with this Template
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DesginOne;
