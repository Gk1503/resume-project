import React, { useEffect, useState } from "react";
import "./Bn.css";
// import 'bootstrap/dist/css/bootstrap.min.css'; // Removing bootstrap dependency for custom grid
import Resume from "../../Gallery/Resumetem.avif";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar, faStarHalfAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";

function BN() { 
  const navigate = useNavigate();

  const OpenDesgin = () => {
    navigate('/DesginOne');
  }

  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElement(true);
    }, 500); // Faster load for better UX
    return () => clearTimeout(timer);
  }, []);

  // Framer Motion variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* Left Column: Text Content */}
        <div className="hero-content">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="hero-text-wrapper"
            >
                <div className="trust-badge">
                    <span className="stars">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </span>
                    <span className="trust-text">Rated #1 Resume Builder</span>
                </div>

                <h1 className="hero-title">
                    Build a  <span className="highlight-text">Perfect Resume</span> that gets you hired.
                </h1>
                
                <p className="hero-subtitle">
                    Create a professional resume in minutes with our AI-powered builder. 
                    Choose from ATS-friendly templates used by top recruiters.
                </p>

                <div className="hero-benefits">
                    <div className="benefit-item">
                        <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
                        <span>ATS-Friendly Templates</span>
                    </div>
                    <div className="benefit-item">
                        <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
                        <span>Expert Content Suggestions</span>
                    </div>
                </div>

                <div className="hero-actions">
                    <button className="primary-btn" onClick={OpenDesgin}>
                        Build My Resume <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                    <p className="no-card-text">No credit card required</p>
                </div>

                <div className="hero-social-proof">
                    <div className="stat-item">
                        <strong>30%</strong>
                        <span>Higher chance of getting hired</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <strong>42%</strong>
                        <span>Higher response rate</span>
                    </div>
                </div>

            </motion.div>
        </div>

        {/* Right Column: Image */}
        <div className="hero-image-wrapper">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="image-container"
            >
                <img src={Resume} alt="Professional Resume Template Preview" className="hero-img" />
                
                {/* Floating Elements decoration */}
                <div className="floating-badge badge-1">
                    <FontAwesomeIcon icon={faStar} /> Top Rated
                </div>
                <div className="floating-badge badge-2">
                    <FontAwesomeIcon icon={faCheckCircle} /> Hired!
                </div>
            </motion.div>
        </div>

      </div>
    </section>
  );
}

export default BN;
