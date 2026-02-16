import React, { useState } from "react";
import { Container, Button, Form, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faEnvelope, 
  faPhone, 
  faLock, 
  faEye, 
  faEyeSlash,
  faArrowLeft,
  faCheck,
  faChartLine,
  faMicrochip,
  faCompass
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ full_name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/register", formData);
      setMessage(res.data.message);
      setTimeout(() => { navigate("/"); }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const springTransition = { type: "spring", stiffness: 300, damping: 30 };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: springTransition
    }
  };

  return (
    <div id="registration-gateway">
      <div id="split-canvas">
        
        {/* Visual Showcase Panel (50%) */}
        <div id="visual-showcase">
          <div id="dynamic-mesh-canvas"></div>
          <div id="grain-texture-overlay"></div>
          
          <div id="showcase-inner">
            <motion.div 
              id="showcase-brand"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 id="brand-wordmark">my<span>perfect</span>resume</h1>
              <h2 id="brand-vision">The New Standard in Career Engineering.</h2>
            </motion.div>

            <div id="metrics-floating-grid">
              <motion.div 
                className="metric-glass-tile"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05, rotateZ: 1 }}
              >
                <div className="tile-icon primary-gradient"><FontAwesomeIcon icon={faChartLine} /></div>
                <div className="tile-content">
                  <h6>Hiring Impact</h6>
                  <p>75% higher response rates reported.</p>
                </div>
              </motion.div>

              <motion.div 
                className="metric-glass-tile"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                style={{ alignSelf: "flex-end" }}
                whileHover={{ scale: 1.05, rotateZ: -1 }}
              >
                <div className="tile-icon secondary-gradient"><FontAwesomeIcon icon={faMicrochip} /></div>
                <div className="tile-content">
                  <h6>ATS Optimization</h6>
                  <p>98/100 Average readability score.</p>
                </div>
              </motion.div>

              <motion.div 
                className="metric-glass-tile"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05, rotateZ: 1 }}
              >
                <div className="tile-icon accent-gradient"><FontAwesomeIcon icon={faCompass} /></div>
                <div className="tile-content">
                  <h6>Career Pathing</h6>
                  <p>Personalized role recommendations.</p>
                </div>
              </motion.div>
            </div>

            <motion.div 
              id="trust-signature"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div id="trust-avatars">
                <div className="avatar-dot"></div>
                <div className="avatar-dot"></div>
                <div className="avatar-dot"></div>
              </div>
              <span>Trusted by 5M+ professionals globally.</span>
            </motion.div>
          </div>
        </div>

        {/* Action Input Panel (50%) */}
        <div id="action-panel">
          <motion.div 
            id="panel-scroll-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div id="panel-top-nav">
              <button id="nav-action-back" onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faArrowLeft} /> <span>Return to platform</span>
              </button>
            </div>

            <motion.div id="form-intro-block" variants={itemVariants}>
              <h3 id="form-hero-title">Start your journey</h3>
              <p id="form-hero-subtitle">Experience the future of professional growth.</p>
            </motion.div>

            <AnimatePresence>
              {message && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Alert id="feedback-toast" variant={message.includes("success") ? "success" : "danger"}>
                    <FontAwesomeIcon icon={faCheck} className="me-2" /> {message}
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div id="third-party-auth" variants={itemVariants}>
              <Button id="auth-google-modern">
                <FontAwesomeIcon icon={faGoogle} /> <span>Continue with Google</span>
              </Button>
              <Button id="auth-linkedin-modern">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Button>
            </motion.div>

            <motion.div id="action-divider" variants={itemVariants}>
              <span>or register with email</span>
            </motion.div>

            <Form id="main-onboarding-form" onSubmit={handleSubmit}>
              <div id="form-personal-group">
                <motion.div variants={itemVariants}>
                  <Form.Group className="refined-field-box">
                    <Form.Label>Full Professional Name</Form.Label>
                    <div className="field-inner-wrapper">
                      <FontAwesomeIcon icon={faUser} />
                      <Form.Control 
                        id="entry-full-name"
                        type="text" 
                        name="full_name" 
                        placeholder="e.g. Alexander Sterling"
                        value={formData.full_name} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </Form.Group>
                </motion.div>

                <Row>
                  <Col md={12}>
                    <motion.div variants={itemVariants}>
                      <Form.Group className="refined-field-box">
                        <Form.Label>Email Address</Form.Label>
                        <div className="field-inner-wrapper">
                          <FontAwesomeIcon icon={faEnvelope} />
                          <Form.Control 
                            id="entry-email"
                            type="email" 
                            name="email" 
                            placeholder="alexander@sterling.com"
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                      </Form.Group>
                    </motion.div>
                  </Col>
                </Row>
              </div>

              <div id="form-security-group">
                <Row>
                  <Col md={6}>
                    <motion.div variants={itemVariants}>
                      <Form.Group className="refined-field-box">
                        <Form.Label>Password</Form.Label>
                        <div className="field-inner-wrapper">
                          <FontAwesomeIcon icon={faLock} />
                          <Form.Control 
                            id="entry-password"
                            type={showPass ? "text" : "password"} 
                            name="password" 
                            placeholder="••••••••"
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                          />
                          <FontAwesomeIcon 
                            className="pass-visibility-trigger"
                            icon={showPass ? faEyeSlash : faEye} 
                            onClick={() => setShowPass(!showPass)}
                          />
                        </div>
                      </Form.Group>
                    </motion.div>
                  </Col>
                  <Col md={6}>
                    <motion.div variants={itemVariants}>
                      <Form.Group className="refined-field-box">
                        <Form.Label>Confirm</Form.Label>
                        <div className="field-inner-wrapper">
                          <FontAwesomeIcon icon={faLock} />
                          <Form.Control 
                            id="entry-confirm"
                            type={showConfirm ? "text" : "password"} 
                            name="confirmPassword" 
                            placeholder="••••••••"
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            required 
                          />
                          <FontAwesomeIcon 
                            className="pass-visibility-trigger"
                            icon={showConfirm ? faEyeSlash : faEye} 
                            onClick={() => setShowConfirm(!showConfirm)}
                          />
                        </div>
                      </Form.Group>
                    </motion.div>
                  </Col>
                </Row>
              </div>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button id="onboarding-submit-trigger" type="submit" disabled={loading}>
                  {loading ? "Creating Profile..." : "Create Free Account"}
                </Button>
              </motion.div>

              <motion.div id="form-switch-prompt" variants={itemVariants}>
                Already a member? <span onClick={() => navigate("/")}>Sign In</span>
              </motion.div>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Register;
