import React, { useState } from "react";
import "./DesginOne.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faCloudUploadAlt, faArrowRight, faMagic } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function DesginOne() {
  const [selectedOption, setSelectedOption] = useState(null); // 'scratch' or 'upload'
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === 'scratch') {
      navigate("/MainDesgin");
    } else if (selectedOption === 'upload') {
      // Future implementation for upload
      alert("Resume upload feature coming soon! Please use 'Start from scratch' for now.");
    }
  };

  return (
    <div className="DesginOneMain">
      <div className="Desbot">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <h1>How would you like to build?</h1>
          <div id="justreview">
            Choose your preferred path to create a resume that stands out.
          </div>
        </motion.div>

        <div className="options-container">
          <motion.div
            className={`selection-card ${selectedOption === 'scratch' ? "clicked" : ""}`}
            onClick={() => handleOptionSelect('scratch')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="selection-indicator"></div>
            <div className="card-icon-wrap">
              <FontAwesomeIcon icon={faMagic} />
            </div>
            <h5>No, start from scratch</h5>
            <p>
              We'll guide you through the whole process Step by step so your skills
              can shine perfectly.
            </p>
          </motion.div>

          <motion.div
            className={`selection-card ${selectedOption === 'upload' ? "clicked" : ""}`}
            onClick={() => handleOptionSelect('upload')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="selection-indicator"></div>
            <div className="card-icon-wrap">
              <FontAwesomeIcon icon={faCloudUploadAlt} />
            </div>
            <h5>Yes, upload my resume</h5>
            <p>
              We'll extract your data and place it into a fresh, ATS-friendly 
              template of your choice.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="actions-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleNext}
            className={`Nextbtn ${selectedOption ? "enabled" : "disabled"}`}
            disabled={!selectedOption}
          >
            Continue to Builder
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default DesginOne;
