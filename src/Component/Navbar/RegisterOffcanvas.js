import React, { useState } from "react";
import { Offcanvas, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faEnvelope, 
  faLock, 
  faEye, 
  faEyeSlash,
  faArrowRightToBracket
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./RegisterOffcanvas.css";

function RegisterOffcanvas({ show, handleClose, openLogin }) {
  const [formData, setFormData] = useState({ 
    full_name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
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
      if (res.data.status === "success" || res.data.message?.toLowerCase().includes("success")) {
          setTimeout(() => {
            handleClose();
            openLogin();
          }, 1500);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Offcanvas 
      show={show} 
      onHide={handleClose} 
      placement="end" 
      id="signup-offcanvas-root"
    >
      <Offcanvas.Header closeButton id="signup-offcanvas-header">
        <Offcanvas.Title id="signup-offcanvas-title">
          Join the platform
        </Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body id="signup-offcanvas-body">
        <p id="signup-offcanvas-desc">
          Enter your professional details to get started.
        </p>

        {message && (
          <Alert id="signup-offcanvas-alert" variant={message.includes("success") ? "success" : "danger"}>
            {message}
          </Alert>
        )}

        <Form id="signup-offcanvas-form" onSubmit={handleSubmit}>
          <Form.Group className="offcanvas-field-group">
            <Form.Label>Full Name</Form.Label>
            <div className="offcanvas-input-wrapper">
              <FontAwesomeIcon icon={faUser} />
              <Form.Control 
                type="text" 
                name="full_name" 
                placeholder="John Sterling"
                value={formData.full_name} 
                onChange={handleChange} 
                required 
              />
            </div>
          </Form.Group>

          <Form.Group className="offcanvas-field-group">
            <Form.Label>Email Address</Form.Label>
            <div className="offcanvas-input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} />
              <Form.Control 
                type="email" 
                name="email" 
                placeholder="john@example.com"
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
          </Form.Group>

          <Form.Group className="offcanvas-field-group">
            <Form.Label>Password</Form.Label>
            <div className="offcanvas-input-wrapper">
              <FontAwesomeIcon icon={faLock} />
              <Form.Control 
                type={showPass ? "text" : "password"} 
                name="password" 
                placeholder="••••••••"
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
              <FontAwesomeIcon 
                className="offcanvas-pass-toggle"
                icon={showPass ? faEyeSlash : faEye} 
                onClick={() => setShowPass(!showPass)}
              />
            </div>
          </Form.Group>

          <Form.Group className="offcanvas-field-group">
            <Form.Label>Confirm Password</Form.Label>
            <div className="offcanvas-input-wrapper">
              <FontAwesomeIcon icon={faLock} />
              <Form.Control 
                type={showConfirm ? "text" : "password"} 
                name="confirmPassword" 
                placeholder="••••••••"
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
              <FontAwesomeIcon 
                className="offcanvas-pass-toggle"
                icon={showConfirm ? faEyeSlash : faEye} 
                onClick={() => setShowConfirm(!showConfirm)}
              />
            </div>
          </Form.Group>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button id="signup-offcanvas-submit" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Create Account"}
              {!loading && <FontAwesomeIcon icon={faArrowRightToBracket} className="ms-2" />}
            </Button>
          </motion.div>

          <div id="signup-offcanvas-footer">
            Already a member? <span id="switch-to-signin" onClick={() => { handleClose(); openLogin(); }}>Sign In</span>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default RegisterOffcanvas;
