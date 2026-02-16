import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faArrowRight, faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import axios from "axios";
import api from "../../utils/api.config";
import { ENDPOINTS } from "../../utils/constant";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(ENDPOINTS.LOGIN, formData);
      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("authChange"));
      setMessage("success: Authenticated successfully.");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessage("error: Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="aura-login-container">
      <div className="aura-glow"></div>
      
      <motion.div 
        id="aura-login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="aura-header">
           <div className="aura-icon-wrap">
              <FontAwesomeIcon icon={faFingerprint} />
           </div>
           <h3>Aura Identity</h3>
           <p>Access your professional space</p>
        </div>

        {message && (
          <Alert variant={message.startsWith("success") ? "success" : "danger"} className="aura-alert">
            {message.split(": ")[1]}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="aura-form">
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
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <Form.Control 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
              <div className="underglow"></div>
            </div>
          </Form.Group>

          <div className="aura-extras">
            <span className="forgot-link" onClick={() => setMessage("info: Password recovery flow under construction.")}>
              Forgot Password?
            </span>
          </div>

          <Button id="btn-aura-submit" type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Enter Workspace"}
            {!loading && <FontAwesomeIcon icon={faArrowRight} className="ms-3" />}
          </Button>
        </Form>

        <div className="aura-footer">
           <p>New to Aura? <span onClick={() => navigate("/signup")}>Sign Up</span></p>
           <div className="footer-divider"></div>
           <span className="back-link" onClick={() => navigate("/")}>Back to Home</span>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
