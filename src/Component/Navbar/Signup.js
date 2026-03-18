import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faLock, 
  faUser, 
  faPhone, 
  faArrowRight, 
  faUserPlus,
  faEye,
  faEyeSlash 
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import api from "../../utils/api.config";
import { ENDPOINTS } from "../../utils/constant";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("error: Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await api.post(ENDPOINTS.REGISTER, registerData);
      setMessage("success: Account created! Redirecting to login...");
      window.dispatchEvent(new Event("authChange"));
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage("error: Registration failed. Email might already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="aura-signup-container">
      <div className="aura-glow"></div>
      
      <motion.div 
        id="aura-signup-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="aura-header">
           <div className="aura-icon-wrap">
              <FontAwesomeIcon icon={faUserPlus} />
           </div>
           <h3>My Perfect Resume</h3>
           <p>Welcome! Create your account to get started.</p>
        </div>

        {message && (
          <Alert variant={message.startsWith("success") ? "success" : "danger"} className="aura-alert">
            {message.split(": ")[1]}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="aura-form">
          <div className="aura-grid">
            <Form.Group className="aura-field">
              <div className="aura-input-wrapper">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <Form.Control 
                  type="text" 
                  name="full_name" 
                  placeholder="Full Name" 
                  value={formData.full_name} 
                  onChange={handleChange} 
                  required 
                />
                <div className="underglow"></div>
              </div>
            </Form.Group>

            <Form.Group className="aura-field">
              <div className="aura-input-wrapper">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <Form.Control 
                  type="email" 
                  name="email" 
                  placeholder="Email Address" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
                <div className="underglow"></div>
              </div>
            </Form.Group>
            
            <Form.Group className="aura-field">
              <div className="aura-input-wrapper">
                <FontAwesomeIcon icon={faPhone} className="input-icon" />
                <Form.Control 
                  type="text" 
                  name="phone" 
                  placeholder="Contact Number" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
                <div className="underglow"></div>
              </div>
            </Form.Group>
          </div>

          <div className="aura-grid">
            <Form.Group className="aura-field">
              <div className="aura-input-wrapper">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <Form.Control 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="Password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle-btn" 
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
                <div className="underglow"></div>
              </div>
            </Form.Group>

            <Form.Group className="aura-field">
              <div className="aura-input-wrapper">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <Form.Control 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirmPassword" 
                  placeholder="Confirm Password" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle-btn" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
                <div className="underglow"></div>
              </div>
            </Form.Group>
          </div>

          <Button id="btn-aura-submit" type="submit" disabled={loading}>
            {loading ? "Initializing..." : "Register"}
            {!loading && <FontAwesomeIcon icon={faArrowRight} className="ms-2" />}
          </Button>
        </Form>

        <div className="aura-footer">
           <p>Already have an account? <span onClick={() => navigate("/login")}>Log In</span></p>
           <div className="footer-divider"></div>
           <span className="back-link" onClick={() => navigate("/")}>Back to Home</span>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
